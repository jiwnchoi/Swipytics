import * as Comlink from "comlink";
import { type PyodideInterface, loadPyodide } from "pyodide";
import { runEntryPointAsync, setupPyodideFiles } from 'virtual:pyodide-files';
export interface PyodideRunner {
  pyodide: PyodideInterface | null;
  runPython: (code: string, globals?: Record<string, any>) => Promise<any>;
  callPythonFunction: (
    funcName: string,
    args?: any[],
    kwargs?: Record<string, any>,
  ) => Promise<any>;
  initialize: (packages?: string[]) => Promise<void>;
  writeFile: (fileName: string, data: Uint8Array) => Promise<void>;
  readFile: (fileName: string) => Promise<Uint8Array>;
}

export const PyodideWorker: PyodideRunner = {
  pyodide: null,

  async writeFile(fileName: string, data: Uint8Array): Promise<void> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");
    console.log(`[worker] writeFile ${fileName}`);
    this.pyodide.FS.writeFile(`${fileName}`, data, { encoding: "binary" });
  },

  async readFile(fileName: string): Promise<Uint8Array> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    return this.pyodide.FS.readFile(`${fileName}`);
  },

  async initialize(packages: string[] = []): Promise<void> {
    console.log(`[worker] initialize pyodide, packages: ${packages}`);
    this.pyodide = await loadPyodide({ indexURL: `${import.meta.env.BASE_URL}/artifacts` });
    for (const p of packages) {
      console.log(`[worker] load package ${p}`);
      await this.pyodide.loadPackage(p);
    }
    await setupPyodideFiles(this.pyodide);
    await runEntryPointAsync(this.pyodide);
  },

  async runPython(code: string, globals: Record<string, any> = {}): Promise<any> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    const namespace = this.pyodide.globals.get("dict")();
    for (const key in globals) {
      namespace.set(key, globals[key]);
    }
    

    return this.pyodide.runPython(code, { globals: namespace });
  },

  async callPythonFunction(
    funcName: string,
    args?: any[],
    kwargs?: Record<string, any>,
  ): Promise<any> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    const func = this.pyodide.globals.get(funcName);
    if (!func) throw new Error(`Function ${funcName} is not defined in globals`);

    let result;
    if (args === undefined && kwargs === undefined) {
      result = func.call();
    } else if (kwargs && args === undefined) {
      result = func.callKwargs(kwargs);
    } else {
      const pyArgs = this.pyodide.toPy(args);
      if (kwargs === undefined) {
        result = result = func(...pyArgs);
      } else {
        result = func.callKwargs(pyArgs, kwargs);
      }
    }

    if (result && typeof result.toJs === "function") {
      return result.toJs();
    }

    return result;
  },

  
};
// Expose the Pyodide worker via Comlink
Comlink.expose(PyodideWorker);

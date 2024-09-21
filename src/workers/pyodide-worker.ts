import * as Comlink from "comlink";
import { loadPyodide } from "pyodide";
import type { PyCallable, PyProxy } from "pyodide/ffi";

import { runEntryPointAsync, setupPyodideFiles } from "virtual:pyodide-files";
import type { PyodideRunner } from "./types";

export const PyodideWorker: PyodideRunner = {
  pyodide: null,

  async writeFile(filename: string, data: Uint8Array): Promise<void> {
    try {
      if (!this.pyodide) throw new Error("Pyodide is not initialized");

      this.pyodide.FS.mkdir("data");
      this.pyodide.FS.writeFile(`data/${filename}`, data, {
        encoding: "binary",
        flags: "w",
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async readFile(fileName: string): Promise<Uint8Array> {
    try {
      if (!this.pyodide) throw new Error("Pyodide is not initialized");
      return this.pyodide.FS.readFile(`${fileName}`, { encoding: "utf-8" });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async initialize(packages: string[] = []): Promise<void> {
    this.pyodide = await loadPyodide({
      indexURL: `${import.meta.env.BASE_URL}/artifacts`,
    });
    for (const p of packages) {
      await this.pyodide.loadPackage(p);
    }
    await setupPyodideFiles(this.pyodide);
    try {
      await runEntryPointAsync(this.pyodide);
    } catch (e) {
      console.error(e);
    }
  },

  terminate() {
    if (this.pyodide) {
      const interruptBuffer = new Uint8Array(new SharedArrayBuffer(1));
      interruptBuffer[0] = 2;
      this.pyodide.setInterruptBuffer(interruptBuffer);
      this.pyodide = null;
    }
  },

  async runPython(code: string, globals: Record<string, any> = {}): Promise<any> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    const namespace = this.pyodide.globals.get("dict")();
    for (const [key, value] of Object.entries(globals)) {
      namespace.set(key, value);
    }

    return this.pyodide.runPython(code, { globals: namespace });
  },

  async callPythonFunction(funcName: string, args: any[]): Promise<any> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    const func: PyCallable = this.pyodide.globals.get(funcName as string);
    if (!func) throw new Error(`Function ${funcName} is not defined in globals`);

    const pyArgs = this.pyodide.toPy(args);
    const resultPy: PyProxy = func.call(func, ...pyArgs);
    const resultJs = resultPy?.toJs({ dict_converter: Object.fromEntries, depth: 100000 });
    pyArgs.destroy();
    resultPy.destroy();

    return resultJs;
  },
};

// Expose the Pyodide worker via Comlink
Comlink.expose(PyodideWorker);

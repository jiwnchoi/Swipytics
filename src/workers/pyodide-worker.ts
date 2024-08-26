import * as Comlink from "comlink";
import { loadPyodide } from "pyodide";
import type { PyCallable, PyProxy } from "pyodide/ffi";

import { runEntryPointAsync, setupPyodideFiles } from "virtual:pyodide-files";
import type { PythonManifest } from "./manifest";
import type { PyodideRunner } from "./types";

export const PyodideWorker: PyodideRunner<PythonManifest> = {
  pyodide: null,

  async writeFile(fileName: string, data: Uint8Array): Promise<void> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");
    this.pyodide.FS.writeFile(`${fileName}`, data, { encoding: "binary" });
  },

  async readFile(fileName: string): Promise<Uint8Array> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");
    return this.pyodide.FS.readFile(`${fileName}`);
  },

  async initialize(packages: string[] = []): Promise<void> {
    this.pyodide = await loadPyodide({ indexURL: `${import.meta.env.BASE_URL}/artifacts` });
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

  async runPython(code: string, globals: Record<string, unknown> = {}): Promise<unknown> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    const namespace = this.pyodide.globals.get("dict")();
    for (const [key, value] of Object.entries(globals)) {
      namespace.set(key, value);
    }

    return this.pyodide.runPython(code, { globals: namespace });
  },

  async callPythonFunction<K extends keyof PythonManifest>(
    funcName: K,
    args: PythonManifest[K]["args"] = [],
    kwargs?: PythonManifest[K]["kwargs"],
  ): Promise<PythonManifest[K]["returns"]> {
    if (!this.pyodide) throw new Error("Pyodide is not initialized");

    const func: PyCallable = this.pyodide.globals.get(funcName as string);
    if (!func) throw new Error(`Function ${funcName} is not defined in globals`);

    const pyArgs = this.pyodide.toPy(args);
    const result: PyProxy = kwargs ? func.callKwargs(pyArgs, kwargs) : func(...pyArgs);

    return result?.toJs ? result.toJs({ dict_converter: Object.fromEntries }) : result;
  },
};

// Expose the Pyodide worker via Comlink
Comlink.expose(PyodideWorker);

// https://github.com/holdenmatt/use-pyodide/blob/main/src/pyodide-worker.ts

/**
 * Expose a pyodide API to the main thread, which executes
 * code in a web worker (via comlink).
 */
import * as Comlink from "comlink";

import Worker from "./pyodide-worker?worker";
import type { Pyodide, PyodideRunner } from "./types";

let _worker: Worker | null = null;
let _runner: Comlink.Remote<PyodideRunner> | null = null;

const runPython = async (code: string, globals?: Record<string, any>): Promise<any> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  const value = await _runner.runPython(code, globals);
  return value;
};

const callPythonFunction = async (funcName: string, args: any[]): Promise<any> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  return _runner.callPythonFunction(funcName, args);
};

const writeFile = async (fileName: string, data: Uint8Array): Promise<void> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  return _runner.writeFile(fileName, data);
};

const readFile = async (fileName: string): Promise<Uint8Array> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  return _runner.readFile(fileName);
};

export const initializeWorker = async (packages?: string[]): Promise<Pyodide> => {
  if (!_worker) {
    _worker = new Worker({
      name: "pyodide-worker",
    });
    _runner = Comlink.wrap(_worker);
    await _runner.initialize(packages);
  }

  return {
    runPython,
    callPythonFunction,
    writeFile,
    readFile,
    terminate: () => {
      _worker?.terminate();
      _worker = null;

      _runner?.[Comlink.releaseProxy]();
      _runner = null;
    },
    initialize: async (packages?: string[]) => {
      if (!_worker || !_runner) {
        throw new Error("pyodide isn't loaded yet");
      }

      await _runner.initialize(packages);
    },
  };
};

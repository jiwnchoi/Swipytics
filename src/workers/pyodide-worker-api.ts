// https://github.com/holdenmatt/use-pyodide/blob/main/src/pyodide-worker.ts

/**
 * Expose a pyodide API to the main thread, which executes
 * code in a web worker (via comlink).
 */
import * as Comlink from "comlink";

import type { PyodideRunner } from "./pyodide-worker";
import Worker from './pyodide-worker?worker';

export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONPrimitive | readonly JSONValue[] | { [key: string]: JSONValue };

let _worker: Worker | null = null;
let _runner: Comlink.Remote<PyodideRunner> | null = null;

export interface Pyodide {
  runPython: (code: string, globals?: Record<string, JSONValue>) => Promise<unknown>;
  runPythonJson: (code: string, globals?: Record<string, JSONValue>) => Promise<JSONValue | null>;
  callPythonFunction: (
    funcName: string,
    args?: any[],
    kwargs?: Record<string, JSONValue>,
  ) => Promise<unknown>;
  terminate: () => void;
  writeFile: (fileName: string, data: Uint8Array) => Promise<void>;
  readFile: (fileName: string) => Promise<Uint8Array>;
}

/**
 * Initialize the pyodide worker and load some given packages.
 */
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
    runPythonJson,
    callPythonFunction,
    terminate,
    writeFile,
    readFile,
  };
};

/**
 * Run a Python code string and return the value of the last statement.
 */
const runPython = async (code: string, globals?: Record<string, JSONValue>): Promise<unknown> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  const value = await _runner.runPython(code, globals);
  return value;
};

/**
 * Run a Python code string, and parse its result as JSON.
 */
const runPythonJson = async (
  code: string,
  globals?: Record<string, JSONValue>,
): Promise<JSONValue | null> => {
  const result = (await runPython(code, globals)) as string;
  if (result) {
    const json = JSON.parse(result) as JSONValue;
    return json;
  }

  return null;
};

const callPythonFunction = async (
  funcName: string,
  args?: any[],
  kwargs?: Record<string, JSONValue>,
): Promise<unknown> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  return _runner.callPythonFunction(funcName, args, kwargs);
};

/**
 * Terminate the worker.
 */
const terminate = () => {
  _worker?.terminate();
  _worker = null;

  _runner?.[Comlink.releaseProxy]();
  _runner = null;
};

const writeFile = async (fileName: string, data: Uint8Array): Promise<void> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  return _runner.writeFile(fileName, data);
}

const readFile = async (fileName: string): Promise<Uint8Array> => {
  if (!_worker || !_runner) {
    throw new Error("pyodide isn't loaded yet");
  }

  return _runner.readFile(fileName);
}
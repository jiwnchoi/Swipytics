import type { PyodideInterface } from "pyodide";
import type PythonManifest from "./manifest";

export interface WorkerManifest {
  [funcName: string]: {
    args?: unknown[];
    kwargs?: Record<string, unknown>;
    returns: unknown;
  };
}
export interface PyodideRunner<T extends WorkerManifest = PythonManifest> {
  pyodide: PyodideInterface | null;
  runPython: (code: string, globals?: Record<string, unknown>) => Promise<unknown>;
  callPythonFunction: <K extends keyof T>(
    funcName: K,
    args?: T[K]["args"],
    kwargs?: T[K]["kwargs"],
  ) => Promise<T[K]["returns"]>;
  initialize: (packages?: string[]) => Promise<void>;
  writeFile: (fileName: string, data: Uint8Array) => Promise<void>;
  readFile: (fileName: string) => Promise<Uint8Array>;
  terminate: () => void;
}
export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONPrimitive | readonly JSONValue[] | { [key: string]: JSONValue };

export type Pyodide = Omit<PyodideRunner, "pyodide">;

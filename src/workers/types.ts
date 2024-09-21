import type { PyodideInterface } from "pyodide";

export interface PyodideRunner {
  pyodide: PyodideInterface | null;
  runPython: (code: string, globals?: Record<string, any>) => Promise<any>;
  callPythonFunction: <R>(funcname: string, args: any[]) => Promise<R>;
  initialize: (packages?: string[]) => Promise<void>;
  writeFile: (fileName: string, data: Uint8Array) => Promise<void>;
  readFile: (fileName: string) => Promise<Uint8Array>;
  terminate: () => void;
}
export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONPrimitive | readonly JSONValue[] | { [key: string]: JSONValue };

export type Pyodide = Omit<PyodideRunner, "pyodide">;

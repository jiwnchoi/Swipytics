/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pyodide" />
declare module "virtual:pyodide-files" {
  export function setupPyodideFiles(pyodide: PyodideInterface): Promise<void>;
  export function runEntryPoint(pyodide: PyodideInterface): void;
  export function runEntryPointAsync(pyodide: PyodideInterface): Promise<void>;
}

type ObjectWithKey<T> = T & { key: string };

/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pyodide" />

declare module "virtual:pyodide-files" {
  export function setupPyodideFiles(pyodide: PyodideInterface): Promise<void>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export function runEntryPoint(pyodide: PyodideInterface): any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  export function runEntryPointAsync(pyodide: PyodideInterface): Promise<any>;
}

type ObjectWithKey<T> = T & { key: string };

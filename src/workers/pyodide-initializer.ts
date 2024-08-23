// https://github.com/holdenmatt/use-pyodide/blob/main/src/initializePyodide.ts

import { initializeWorker, Pyodide } from "./pyodide-worker-api";

let pyodide: Promise<Pyodide> | undefined;

/**
 * Initialize Pyodide, ensuring we only initialize it once.
 *
 * @param packages Additional python package names to load.
 */
export async function initializePyodide(options?: {
  packages?: string[];
}): Promise<Pyodide> {
  const { packages } = options || {};

  if (pyodide === undefined) {
    pyodide = _initializePyodide(packages);
  }
  return pyodide;
}

/**
 * Initialize Pyodide, and load any given packages.
 */
const _initializePyodide = async (packages?: string[]): Promise<Pyodide> => {
  pyodide = initializeWorker(packages);
  return pyodide;
};

/**
 * Get the pyodide instance, initializing it if needed.
 *
 * Typically `usePyodide` is used in React components instead, but this
 * method provides access outside of React contexts.
 */
export const getPyodide = async (): Promise<Pyodide> => {
  if (pyodide) {
    return pyodide;
  } else {
    return await initializePyodide({ packages: ["draco"] });
  }
};
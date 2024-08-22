import { runEntryPointAsync, setupPyodideFiles } from "virtual:pyodide-files";
import type { PyodideInterface } from "pyodide";

let pyodide: PyodideInterface | null = null;

async function loadEnvs(): Promise<PyodideInterface> {
  if (pyodide) {
    return pyodide;
  }
  const { loadPyodide } = await import("pyodide");
  pyodide = await loadPyodide({
    indexURL: "https://dig.cmu.edu/draco2/jupyterlite/static/pyodide",
  });
  await pyodide.loadPackage(["draco"]);
  await setupPyodideFiles(pyodide);
  await runEntryPointAsync(pyodide);

  return pyodide;
}
export { loadEnvs };

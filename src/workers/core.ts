import { runEntryPointAsync, setupPyodideFiles } from "virtual:pyodide-files";
import type { PyodideInterface } from "pyodide";

let pyodide: PyodideInterface | null = null;
let pyodideLoadPromise: Promise<PyodideInterface> | null = null;

async function loadEnvs(): Promise<PyodideInterface> {
  if (pyodideLoadPromise) {
    return pyodideLoadPromise;
  }

  pyodideLoadPromise = (async () => {
    const { loadPyodide } = await import("pyodide");
    const newPyodide = await loadPyodide({
      indexURL: "https://dig.cmu.edu/draco2/jupyterlite/static/pyodide",
    });

    await newPyodide.loadPackage(["draco"]);
    await setupPyodideFiles(newPyodide);
    await runEntryPointAsync(newPyodide);

    pyodide = newPyodide;
    return newPyodide;
  })();

  return pyodideLoadPromise;
}

function getPyodide(): PyodideInterface | null {
  return pyodide;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    pyodide = null;
    pyodideLoadPromise = null;
  });
}

export { getPyodide, loadEnvs };

import { type PyodideInterface, loadPyodide } from "pyodide";

let pyodide: PyodideInterface | null = null;

async function loadPackages() {
  pyodide = await loadPyodide({
    indexURL: "https://dig.cmu.edu/draco2/jupyterlite/static/pyodide",
  });

  await pyodide.loadPackage(["numpy", "pandas", "draco"]);
}

async function runPython(code: string) {
  if (!pyodide) {
    throw new Error("Pyodide is not loaded");
  }

  return pyodide.runPython(code);
}

export { loadPackages, pyodide };

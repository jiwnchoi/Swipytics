import { type PyodideInterface, loadPyodide } from "pyodide";

let pyodide: PyodideInterface | null = null;

async function pyodideReadyPromise() {
  pyodide = await loadPyodide({
    indexURL: "https://dig.cmu.edu/draco2/jupyterlite/static/pyodide",
  });

  await pyodide.loadPackage(["numpy", "pandas", "draco"]);
}

export { pyodide, pyodideReadyPromise };

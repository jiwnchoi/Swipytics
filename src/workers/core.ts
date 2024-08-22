import type { PyodideInterface } from "pyodide";
import { main } from "./manifest";

let pyodide: PyodideInterface | null = null;

async function loadEnvs() {
  const { loadPyodide } = await import("pyodide");
  pyodide = await loadPyodide({
    indexURL: "https://dig.cmu.edu/draco2/jupyterlite/static/pyodide",
  });

  await pyodide.loadPackage(["draco"]);
  pyodide.runPython(main);

  return pyodide;
}

export { loadEnvs, pyodide };

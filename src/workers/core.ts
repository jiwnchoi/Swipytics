import { runEntryPointAsync, setupPyodideFiles } from "virtual:pyodide-files";

import type { PyodideInterface } from "pyodide";

let pyodide: PyodideInterface | null = null;

async function loadEnvs(): Promise<PyodideInterface> {
  if (pyodide) {
    return pyodide;
  }
  const { loadPyodide } = await import("pyodide");
  // biome-ignore lint/nursery/noConsole: <explanation>
  console.log("Loading Envs TEST");
  // biome-ignore lint/nursery/noConsole: <explanation>
  console.log("Loading Pyodide from https://jiwnchoi.github.io/Swipytics/artifacts");
  pyodide = await loadPyodide({
    indexURL: "https://jiwnchoi.github.io/Swipytics/artifacts",
  });
  await pyodide.loadPackage(["draco"]);
  await setupPyodideFiles(pyodide);
  await runEntryPointAsync(pyodide);
  return pyodide;
}
export { loadEnvs };

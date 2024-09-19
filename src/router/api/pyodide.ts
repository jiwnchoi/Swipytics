import type { TChart } from "@shared/models";
import { getPyodide } from "@workers";
import { type API } from "./types";

async function loadDataPyodide(filename: string, fileBuffer: Uint8Array) {
  const pyodide = await getPyodide();
  await pyodide.writeFile(filename, fileBuffer);
  const data = await pyodide.callPythonFunction("loadData", { filename });
  return data;
}
async function appendNextChartPyodide() {
  const pyodide = await getPyodide();
  const chart = await pyodide.callPythonFunction("appendNextChart", {});
  return chart;
}
async function callAppendChartPyodide(chart: TChart) {
  const pyodide = await getPyodide();
  await pyodide.callPythonFunction("appendChart", { chart });
}

async function browseChartsPyodide(fieldNames: string[]) {
  const pyodide = await getPyodide();
  const charts = await pyodide.callPythonFunction("browseCharts", { field_names: fieldNames });
  return charts;
}

const pyodideAPI: API = {
  loadData: loadDataPyodide,
  appendNextChart: appendNextChartPyodide,
  callAppendChart: callAppendChartPyodide,
  browseCharts: browseChartsPyodide,
};

export default pyodideAPI;

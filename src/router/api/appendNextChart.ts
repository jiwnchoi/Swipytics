import { type TChart } from "@shared/models";
import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FAppendNextChart = (args: undefined) => Promise<TChart>;

async function appendNextChartPyodide() {
  const pyodide = await getPyodide();
  const chart = await pyodide.callPythonFunction<TChart>("appendNextChart", []);
  return chart;
}

async function appendNextChartFetch() {
  const response = await fetch("/api/appendNextChart");
  const chart = (await response.json()) as TChart;
  return chart;
}

export default {
  server: appendNextChartFetch,
  pyodide: appendNextChartPyodide,
} as TEndpoint<FAppendNextChart>;

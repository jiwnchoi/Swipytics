import { type TChart } from "@shared/models";
import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FGetCharts = ({ fieldNames }: { fieldNames: string[] }) => Promise<TChart[]>;

async function getChartsPyodide({ fieldNames }: { fieldNames: string[] }) {
  const pyodide = await getPyodide();
  const charts = await pyodide.callPythonFunction<TChart[]>("getCharts", [fieldNames]);
  return charts;
}

async function getChartsFetch({ fieldNames }: { fieldNames: string[] }) {
  const response = await fetch("/api/getCharts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field_names: fieldNames }),
  });
  const charts = (await response.json()) as TChart[];
  return charts;
}

export default {
  pyodide: getChartsPyodide,
  server: getChartsFetch,
} as TEndpoint<FGetCharts>;

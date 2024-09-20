import { type TChart } from "@shared/models";
import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FBrowseCharts = ({ fieldNames }: { fieldNames: string[] }) => Promise<TChart[]>;

async function browseChartsPyodide({ fieldNames }: { fieldNames: string[] }) {
  const pyodide = await getPyodide();
  const charts = await pyodide.callPythonFunction("browseCharts", { field_names: fieldNames });
  return charts;
}

async function browseChartsFetch({ fieldNames }: { fieldNames: string[] }) {
  const response = await fetch("/api/browseCharts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field_names: fieldNames }),
  });
  const charts = (await response.json()) as TChart[];
  return charts;
}

export default {
  pyodide: browseChartsPyodide,
  server: browseChartsFetch,
} as TEndpoint<FBrowseCharts>;

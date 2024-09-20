import { type TChart, type TSession } from "@shared/models";
import { getPyodide } from "@workers";
import type { TEndpoint } from "./TEndpoint";

type FAppendChart = ({ chart }: { chart: TChart }) => Promise<TSession>;

async function appendChartPyodide({ chart }: { chart: TChart }) {
  const pyodide = await getPyodide();
  return await pyodide.callPythonFunction("appendChart", { chart });
}
async function appendChartFetch({ chart }: { chart: TChart }) {
  const res = await fetch("/api/appendChart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chart }),
  });

  return (await res.json()) as TSession;
}

export default {
  pyodide: appendChartPyodide,
  server: appendChartFetch,
} as TEndpoint<FAppendChart>;

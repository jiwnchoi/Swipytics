import type { TChart, TSession } from "@shared/models";
import { type API } from "./types";

async function loadDataFetch(filename: string, fileBuffer: Uint8Array) {
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append("file", blob, filename);
  const response = await fetch("/api/loadData", {
    method: "POST",
    body: formData,
  });
  const data = (await response.json()) as TSession;
  return data;
}

async function appendNextChartFetch() {
  const response = await fetch("/api/appendNextChart");
  const chart = (await response.json()) as TChart;
  return chart;
}

async function callAppendChartFetch(chart: TChart) {
  return fetch("/api/appendChart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chart }),
  });
}

async function browseChartsFetch(fieldNames: string[]) {
  try {
    const response = await fetch("/api/browseCharts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field_names: fieldNames }),
    });
    const charts = (await response.json()) as TChart[];
    return charts;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
}

const serverAPI: API = {
  loadData: loadDataFetch,
  appendNextChart: appendNextChartFetch,
  callAppendChart: callAppendChartFetch,
  browseCharts: browseChartsFetch,
};

export default serverAPI;

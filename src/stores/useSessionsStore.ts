import type { TSession } from "@shared/models";
import { getPyodide } from "@workers";
import { type Draft, produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useDataStore from "./useDataStore";
import useSettingsStore from "./useSettingsStore";

interface SessionState extends TSession {
  loadingSession: boolean;
  loadSession: () => Promise<void>;
  appendingChart: boolean;
  appendChart: () => Promise<void>;
}

const useSessionsStore = create(
  persist<SessionState>(
    set => ({
      filename: "",
      timestamp: 0,
      charts: [],

      loadingSession: false,
      loadSession: async () => {
        set({ loadingSession: true });
        const filename = useDataStore.getState().filename;
        const fileBuffer = useDataStore.getState().fileBuffer;
        if (!(filename && fileBuffer)) throw new Error("No file buffer found");
        const session = await loadData(filename, fileBuffer);

        set(
          produce((draft: Draft<SessionState>) => {
            draft.filename = session.filename;
            draft.timestamp = session.timestamp;
            draft.charts = session.charts;
            draft.loadingSession = false;
          }),
        );
      },

      appendingChart: false,
      appendChart: async () => {
        set({ appendingChart: true });
        const chart = await appendChart();
        set(
          produce((draft: Draft<SessionState>) => {
            draft.charts.push(chart);
            draft.appendingChart = false;
          }),
        );
      },
    }),
    {
      name: `session-storage-${new Date().getTime()}`,
    },
  ),
);

export default useSessionsStore;

async function loadDataPyodide(filename: string, fileBuffer: Uint8Array) {
  const pyodide = await getPyodide();
  await pyodide.writeFile(filename, fileBuffer);
  const data = await pyodide.callPythonFunction("loadData", { filename });
  return data;
}

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

async function appendChartPyodide() {
  const pyodide = await getPyodide();
  const chart = await pyodide.callPythonFunction("appendChart", {});
  return chart;
}

async function appendChartFetch() {
  const response = await fetch("/api/appendChart");
  const chart = await response.json();
  return chart;
}

const loadData = useSettingsStore.getState().python === "pyodide" ? loadDataPyodide : loadDataFetch;
const appendChart =
  useSettingsStore.getState().python === "pyodide" ? appendChartPyodide : appendChartFetch;

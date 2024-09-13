import { CHART_PREFETCH_DELAY } from "@shared/constants";
import type { TChart, TSession } from "@shared/models";
import { getPyodide } from "@workers";
import { type Draft, produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { getThumbnailFromSpec } from "@shared/utils";
import useDataStore from "./useDataStore";
import useSettingsStore from "./useSettingsStore";

interface SessionState extends TSession {
  currentChartIndex: number;
  setCurrentChartIndex: (index: number) => Promise<void>;
  increaseCurrentChartIndex: () => void;
  decreaseCurrentChartIndex: () => void;
  setCurrentChartToLast: () => void;
  getChartIndexByKey: (key: string) => number | undefined;

  loadingSession: boolean;
  loadSession: () => Promise<void>;
  appendingChart: boolean;
  appendNextChart: () => Promise<void>;
  appendChartToRear: (chart: TChart) => void;

  renewCurrentChart: () => void;

  setCurrentChartPreferred: (preferred: boolean) => Promise<void>;
}

const useSessionsStore = create(
  devtools<SessionState>((set, get) => ({
    filename: "",
    timestamp: 0,
    charts: [],
    fields: [],

    currentChartIndex: -1,
    increaseCurrentChartIndex: () => {
      void get().setCurrentChartIndex(get().currentChartIndex + 1);
    },
    decreaseCurrentChartIndex: () => {
      void get().setCurrentChartIndex(get().currentChartIndex - 1);
    },
    setCurrentChartIndex: async (index) => {
      const state = get();
      if (index < -1) return;

      if (index > state.charts.length - CHART_PREFETCH_DELAY - 1) {
        await get().appendNextChart();
      }
      set({ currentChartIndex: index });
    },
    setCurrentChartToLast: () => {
      const state = get();
      void get().setCurrentChartIndex(state.charts.length - 1);
    },
    getChartIndexByKey: (key: string) => get().charts.findIndex((chart) => chart.key === key),

    loadingSession: false,
    loadSession: async () => {
      set({
        loadingSession: true,
        charts: [],
        filename: "",
        timestamp: 0,
        currentChartIndex: -1,
        fields: [],
      });
      const filename = useDataStore.getState().filename;
      const fileBuffer = useDataStore.getState().fileBuffer;
      if (!(filename && fileBuffer)) throw new Error("No file buffer found");
      const session = await loadData(filename, fileBuffer);

      set(
        produce((draft: Draft<SessionState>) => {
          draft.filename = session.filename;
          draft.timestamp = session.timestamp;
          draft.fields = session.fields;
          draft.charts = session.charts;
          draft.loadingSession = false;
        }),
      );
    },

    appendingChart: false,
    appendNextChart: async () => {
      set({ appendingChart: true });
      const chart = await appendNextChart();
      set(
        produce((draft: Draft<SessionState>) => {
          draft.charts.push(chart);
          draft.appendingChart = false;
        }),
      );
    },
    appendChartToRear: (chart: TChart) => {
      set(
        produce((draft: Draft<SessionState>) => {
          draft.charts.pop(); // should be removed after removing prefetching logic
          draft.charts.push(chart);
        }),
      );
    },

    renewCurrentChart: () =>
      set(
        produce((draft: Draft<SessionState>) => {
          const currentChart = draft.charts[draft.currentChartIndex];
          currentChart.specIndex = (currentChart.specIndex + 1) % currentChart.specs.length;
        }),
      ),

    setCurrentChartPreferred: async (preferred) => {
      const currentChart = get().charts[get().currentChartIndex];
      const data = useDataStore.getState().data;
      if (!data) return;

      if (!currentChart.thumbnail) {
        const spec = currentChart.specs[currentChart.specIndex];
        const thumbnail = await getThumbnailFromSpec(spec, data);

        set(
          produce((draft: Draft<SessionState>) => {
            draft.charts[draft.currentChartIndex].thumbnail = thumbnail;
            draft.charts[draft.currentChartIndex].preferred = preferred;
          }),
        );
      } else {
        set(
          produce((draft: Draft<SessionState>) => {
            draft.charts[draft.currentChartIndex].preferred = preferred;
          }),
        );
      }
    },
  })),
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

async function appendNextChartPyodide() {
  const pyodide = await getPyodide();
  const chart = await pyodide.callPythonFunction("appendNextChart", {});
  return chart;
}

async function appendNextChartFetch() {
  const response = await fetch("/api/appendNextChart");
  const chart = (await response.json()) as TChart;
  return chart;
}

const loadData = useSettingsStore.getState().python === "pyodide" ? loadDataPyodide : loadDataFetch;
const appendNextChart =
  useSettingsStore.getState().python === "pyodide" ? appendNextChartPyodide : appendNextChartFetch;

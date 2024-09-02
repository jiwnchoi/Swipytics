import { CHART_PREFETCH_DELAY } from "@shared/constants";
import type { TSession } from "@shared/models";
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

  loadingSession: boolean;
  loadSession: () => Promise<void>;
  appendingChart: boolean;
  appendChart: () => Promise<void>;

  renewCurrentChart: () => void;

  setCurrentChartPreferred: (preferred: boolean) => Promise<void>;
}

const useSessionsStore = create(
  devtools<SessionState>((set, get) => ({
    filename: "",
    timestamp: 0,
    charts: [],

    currentChartIndex: -1,
    increaseCurrentChartIndex: () => {
      get().setCurrentChartIndex(get().currentChartIndex + 1);
    },
    decreaseCurrentChartIndex: () => {
      get().setCurrentChartIndex(get().currentChartIndex - 1);
    },
    setCurrentChartIndex: async index => {
      const state = get();
      if (index < -1) return;

      if (index > state.charts.length - CHART_PREFETCH_DELAY - 1) {
        await get().appendChart();
      }
      set({ currentChartIndex: index });
    },

    loadingSession: false,
    loadSession: async () => {
      set({ loadingSession: true, charts: [], filename: "", timestamp: 0 });
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

    renewCurrentChart: () =>
      set(
        produce((draft: Draft<SessionState>) => {
          const currentChart = draft.charts[draft.currentChartIndex];
          currentChart.specIndex = (currentChart.specIndex + 1) % currentChart.specs.length;
        }),
      ),

    setCurrentChartPreferred: async preferred => {
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

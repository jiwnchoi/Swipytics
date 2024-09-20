import { CHART_PREFETCH_DELAY } from "@shared/constants";
import type { TChart, TSession } from "@shared/models";
import { type Draft, produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { router } from "@router";

interface SessionState extends TSession {
  currentChartIndex: number;
  setCurrentChartIndex: (index: number) => Promise<void>;
  increaseCurrentChartIndex: () => void;
  decreaseCurrentChartIndex: () => void;
  setCurrentChartToLast: () => void;
  getChartIndexByKey: (key: string) => number | undefined;

  loadingSession: boolean;
  loadSession: (filename: string) => Promise<void>;
  appendingChart: boolean;
  appendNextChart: () => Promise<void>;
  appendChart: (chart: TChart) => Promise<void>;

  renewCurrentChart: () => void;
  resetSession: () => void;

  setCurrentChartPreferred: (preferred: boolean) => void;
}

const useSessionsStore = create(
  devtools<SessionState>((set, get) => ({
    filename: "",
    timestamp: 0,
    charts: [],
    fields: [],

    resetSession: () =>
      set({
        filename: "",
        timestamp: 0,
        charts: [],
        fields: [],
        currentChartIndex: -1,
      }),

    currentChartIndex: -1,
    increaseCurrentChartIndex: () => {
      const { setCurrentChartIndex, currentChartIndex } = get();
      setCurrentChartIndex(currentChartIndex + 1);
    },
    decreaseCurrentChartIndex: () => {
      const { setCurrentChartIndex, currentChartIndex } = get();
      setCurrentChartIndex(currentChartIndex - 1);
    },
    setCurrentChartIndex: async (index) => {
      const { charts, appendingChart, appendNextChart } = get();
      if (index < -1 || appendingChart) return;

      set({ currentChartIndex: index });

      if (index > charts.length - CHART_PREFETCH_DELAY - 1) {
        await appendNextChart();
      }
    },
    setCurrentChartToLast: () => {
      const { charts, setCurrentChartIndex } = get();
      setCurrentChartIndex(charts.length - 1);
    },
    getChartIndexByKey: (key: string) => get().charts.findIndex((chart) => chart.key === key),

    loadingSession: false,
    loadSession: async (filename: string) => {
      set({
        loadingSession: true,
        filename,
      });
      const { timestamp, charts, fields } = get();

      const session = await router.call("loadSession", {
        session: {
          filename,
          timestamp,
          charts,
          fields,
        },
      });
      if (!session) {
        set({ loadingSession: false });
        return;
      }
      set(
        produce((draft: Draft<SessionState>) => {
          draft.timestamp = session.timestamp;
          draft.fields = session.fields;
          draft.charts = session.charts;
          draft.loadingSession = false;
          draft.currentChartIndex = 0;
        }),
      );
    },

    appendingChart: false,
    appendNextChart: async () => {
      set({ appendingChart: true });
      const chart = await router.call("appendNextChart");
      if (!chart) {
        set({ appendingChart: false });
        return;
      }
      set(
        produce((draft: Draft<SessionState>) => {
          draft.charts.push(chart);
          draft.appendingChart = false;
        }),
      );
    },
    appendChart: async (chart: TChart) => {
      set({ appendingChart: true });
      await router.call("appendChart", { chart });
      set(
        produce((draft: Draft<SessionState>) => {
          if (draft.charts.length > CHART_PREFETCH_DELAY) {
            draft.charts = draft.charts.slice(0, -CHART_PREFETCH_DELAY);
          }
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

    setCurrentChartPreferred: (preferred) => {
      const { charts, currentChartIndex } = get();
      const currentChart = charts[currentChartIndex];
      router.call("setPreferred", { key: currentChart.key, preferred });

      set(
        produce((draft: Draft<SessionState>) => {
          draft.charts[draft.currentChartIndex].preferred = preferred;
        }),
      );
    },
  })),
);

export default useSessionsStore;

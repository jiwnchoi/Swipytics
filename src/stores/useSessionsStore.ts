import { router } from "@api";
import { logger } from "@logger";
import { CHART_PREFETCH_DELAY } from "@shared/constants";
import type { TChart, TSession } from "@shared/models";
import { isEqual, pick } from "es-toolkit";
import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SessionState extends TSession {
  currentChartIndex: number;
  setCurrentChartIndex: (index: number) => void;
  setCurrentChartToLast: () => void;

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
  devtools<SessionState>(
    (set, get) => ({
      filename: "",
      timestamp: 0,
      charts: [],
      fields: [],

      // Client-only state
      currentChartIndex: -1,
      loadingSession: false,
      appendingChart: false,

      resetSession: () =>
        set({
          filename: "",
          timestamp: 0,
          charts: [],
          fields: [],
          currentChartIndex: -1,
        }),

      setCurrentChartIndex: (index) => {
        const { appendingChart, charts } = get();
        if (appendingChart || index < -1 || index > charts.length - 1) return;
        set({ currentChartIndex: index });
      },

      setCurrentChartToLast: () => {
        const { charts, setCurrentChartIndex } = get();
        setCurrentChartIndex(charts.length - 1);
      },

      loadSession: async (filename: string) => {
        set({ loadingSession: true, filename });
        const { timestamp, charts, fields, currentChartIndex } = get();

        const session = await router.call("loadSession", {
          session: { filename, timestamp, charts, fields },
        });

        if (session) {
          set(
            produce<SessionState>((draft) => {
              Object.assign(draft, session);
              draft.currentChartIndex = currentChartIndex === -1 ? 0 : currentChartIndex;
              draft.loadingSession = false;
            }),
          );
        } else {
          set({ loadingSession: false });
        }
      },

      appendNextChart: async () => {
        set({ appendingChart: true });
        const chart = await router.call("appendNextChart");
        if (chart) {
          set(
            produce<SessionState>((draft) => {
              draft.charts.push(chart);
              draft.appendingChart = false;
            }),
          );
        } else {
          set({ appendingChart: false });
        }
      },

      appendChart: async (chart: TChart) => {
        set({ appendingChart: true });
        await router.call("appendChart", { chart });
        set(
          produce<SessionState>((draft) => {
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
          produce<SessionState>((draft) => {
            const currentChart = draft.charts[draft.currentChartIndex];
            currentChart.specIndex = (currentChart.specIndex + 1) % currentChart.specs.length;
          }),
        ),

      setCurrentChartPreferred: (preferred) => {
        const { charts, currentChartIndex } = get();
        const currentChart = charts[currentChartIndex];
        router.call("setPreferred", { key: currentChart.key, preferred });

        set(
          produce<SessionState>((draft) => {
            draft.charts[draft.currentChartIndex].preferred = preferred;
          }),
        );
      },
    }),
    {
      name: "SessionStore",
      anonymousActionType: "SessionStore Action",
      enabled: import.meta.env.MODE === "development",
    },
  ),
);

const pickSessionStore = (state: SessionState) =>
  pick(
    {
      ...state,
      charts: state.charts.map((chart) =>
        pick(chart, ["key", "title", "preferred", "timestamp", "specs"]),
      ),
    },
    ["charts", "filename", "timestamp", "currentChartIndex"],
  );

useSessionsStore.subscribe((state, prevState) => {
  if (!isEqual(state, prevState) && state.loadingSession && state.appendingChart) return;
  logger.log("Session Store", "state", pickSessionStore(state));
});
export default useSessionsStore;

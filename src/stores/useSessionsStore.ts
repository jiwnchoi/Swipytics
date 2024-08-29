import type { TSession } from "@shared/models";
import { getPyodide } from "@workers";
import { type Draft, produce } from "immer";
import { create } from "zustand";

interface SessionState extends TSession {
  loadingSession: boolean;
  loadSession: (filename: string) => Promise<void>;
  appendingChart: boolean;
  appendChart: () => Promise<void>;
}

const useSessionsStore = create<SessionState>(set => ({
  filename: "",
  timestamp: 0,
  charts: [],

  loadingSession: false,
  loadSession: async (filename: string) => {
    set({ loadingSession: true });
    const pyodide = await getPyodide();
    const session = await pyodide.callPythonFunction("loadData", { filename });
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
    const pyodide = await getPyodide();
    const chart = await pyodide.callPythonFunction("appendChart", {});
    set(
      produce((draft: Draft<SessionState>) => {
        draft.charts.push(chart);
        draft.appendingChart = false;
      }),
    );
  },
}));

export default useSessionsStore;

import type { TChart, TSession } from "@shared/models";
import { getPyodide } from "@workers";
import { type Draft, produce } from "immer";
import { create } from "zustand";

interface SessionsState {
  sessions: TSession[];
  getSession: (sessionKey: string) => TSession | undefined;
  setSessions: (sessions: TSession[]) => void;
  appendSession: () => Promise<void>;
  appendChart: (sessionKey: string) => Promise<void>;
  getChart: (sessionKey: string, chartKey: string) => TChart;

  initSessions: () => void;
}

const useSessionsStore = create<SessionsState>((set, get) => ({
  sessions: [],

  initSessions: () => {
    set({ sessions: [] });
  },

  setSessions: (sessions: TSession[]) => {
    set({ sessions });
  },

  getSession: sessionKey => get().sessions.find(s => s.key === sessionKey),

  getChart: (sessionKey, chartKey) => {
    const session = get().getSession(sessionKey);
    if (!session) {
      throw new Error(`Session ${sessionKey} not found`);
    }

    const chart = session.charts.find(c => c.key === chartKey);
    if (!chart) {
      throw new Error(`Chart ${chartKey} not found in session ${sessionKey}`);
    }

    return chart;
  },

  appendSession: async () => {
    const pyodide = await getPyodide();
    const session = await pyodide.callPythonFunction("appendSession");
    set(
      produce((state: Draft<SessionsState>) => {
        state.sessions.push(session);
      }),
    );
  },

  appendChart: async sessionKey => {
    const pyodide = await getPyodide();
    let sessionIndex = get().sessions.findIndex(s => s.key === sessionKey);

    if (sessionIndex === -1) {
      sessionIndex = 0;
    }

    const chart = await pyodide.callPythonFunction("appendChart", [sessionKey]);

    set(
      produce((state: Draft<SessionsState>) => {
        state.sessions[sessionIndex].charts.push(chart);
      }),
    );
  },
}));

export default useSessionsStore;

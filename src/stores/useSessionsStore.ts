import type { ChartModel, TSession } from "@shared/models";

import { produce } from "immer";
import { create } from "zustand";

const DUMMY: ChartModel[] = [];
// [
//   new ChartModel({
//     spec: MockChart as VisualizationSpec,
//     description: "This is chart 1",
//     title: "Chart 1",
//   }),
//   new ChartModel({
//     spec: MockChart as VisualizationSpec,
//     description: "This is chart 2",
//     title: "Chart 2",
//   }),
//   new ChartModel({
//     spec: MockChart as VisualizationSpec,
//     description: "This is chart 3",
//     title: "Chart 3",
//   }),
// ];

interface SessionsState {
  _sessions: TSession[];
  createSession: (session: TSession) => void;
  getSession: (key: string) => TSession | undefined;

  appendChartToSession: (sessionKey: string) => (chart: ChartModel) => void;
  renewChartInSession: (sessionKey: string) => (chartKey: string) => void;
}

const useSessionsStore = create<SessionsState>((set, get) => ({
  _sessions: [
    {
      key: "dummy-session",
      charts: DUMMY,
      groundingAttributes: ["dummy"],
    },
  ],
  // Manage sessions
  createSession: (session: TSession) =>
    set(
      produce((state: SessionsState) => {
        state._sessions.push(session);
      }),
    ),
  getSession: (key: string) => {
    return get()._sessions.find(session => session.key === key);
  },

  // Manage charts in single session
  appendChartToSession: (sessionKey: string) => {
    return (chart: ChartModel) => {
      set(
        produce((state: SessionsState) => {
          const session = state._sessions.find(session => session.key === sessionKey);
          if (!session) {
            throw new Error(`Session ${sessionKey} not found`);
          }
          session.charts.push(chart);
        }),
      );
    };
  },
  renewChartInSession: (sessionKey: string) => {
    return (chartKey: string) => {
      set(
        produce((state: SessionsState) => {
          const session = state._sessions.find(session => session.key === sessionKey);
          if (!session) {
            throw new Error(`Session ${sessionKey} not found`);
          }

          const chart = session?.charts.find(chart => chart.key === chartKey);
          if (!chart) {
            throw new Error(`Chart ${chartKey} not found in session ${sessionKey}`);
          }

          chart.renew({});
          session.charts = [...session.charts];
        }),
      );
    };
  },
}));

export default useSessionsStore;

import type { TChart, TSession, TState } from "@shared/models";
import type { WorkerManifest } from "./types";

export interface PythonManifest extends WorkerManifest {
  loadData: {
    args: [string];
    returns: TState;
  };

  appendSession: {
    returns: TSession;
  };

  appendChart: {
    args: [string]; // sessionKey
    returns: TChart;
  };
}

export default PythonManifest;

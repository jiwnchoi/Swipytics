import type { TChart, TSession } from "@shared/models";
import type { WorkerManifest } from "./types";

export interface PythonManifest extends WorkerManifest {
  loadData: {
    returns: TSession;
    args: {
      filename: string;
    };
  };

  appendNextChart: {
    returns: TChart;
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    args: {};
  };
}

export default PythonManifest;

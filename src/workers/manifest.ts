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
    args: {};
  };

  appendChart: {
    returns: TSession;
    args: {
      chart: TChart;
    };
  };

  browseCharts: {
    returns: TChart[];
    args: {
      field_names: string[];
    };
  };
}

export default PythonManifest;

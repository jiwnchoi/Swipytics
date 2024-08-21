import type { VisualizationSpec } from "react-vega";

type TChart = {
  title?: string;
  description?: string;
  spec: VisualizationSpec;
};

class ChartModel {
  key: string;
  title: string | undefined;
  description: string;
  spec: VisualizationSpec;
  timestamp: number;

  constructor(chart: TChart) {
    this.timestamp = Date.now();
    this.key = this.getKey();
    this.title = chart.title ?? this.key;
    this.description = chart.description ?? this.key;
    this.spec = chart.spec;
  }

  getKey() {
    return `chart-${this.timestamp}-${Math.random().toString().slice(2, 8)}`;
  }

  renew(update: Partial<TChart>) {
    this.timestamp = Date.now();
    this.key = this.getKey();
    this.title = update.title ?? this.key;
    this.description = update.description ?? this.key;
    this.spec = update.spec ?? this.spec;
  }
}

export { ChartModel, type TChart };

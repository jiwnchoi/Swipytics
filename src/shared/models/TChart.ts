import type { VisualizationSpec } from "react-vega";

type TChart = {
  key: string;
  title: string | undefined;
  description: string;
  specs: VisualizationSpec[];
  specIndex: number;
  timestamp: number;
  preferred: boolean;
};

export default TChart;

import type { VisualizationSpec } from "react-vega";
import type TDataField from "./TDataField";

interface TChart {
  key: string;
  fields: TDataField[];
  specs: VisualizationSpec[];
  title: string | undefined;
  description: string;

  specIndex: number;
  preferred: boolean;
  timestamp: number;

  // Client-side only properties
  thumbnail?: string;
}

export default TChart;

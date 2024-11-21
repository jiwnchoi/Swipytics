import type { TopLevelSpec } from "vega-lite";
import type TDataField from "./TDataField";

interface TChart {
  key: string;
  fields: TDataField[];
  specs: TopLevelSpec[];
  title: string | undefined;
  description: string;

  specIndex: number;
  preferred: boolean;
  timestamp: number;

  // Client-side only properties
  thumbnail?: string;
}

export default TChart;

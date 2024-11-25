import type { TimeUnit } from "vega";
import type { TopLevelSpec } from "vega-lite";
import type TField from "./TField";

interface TChart {
  key: string;
  fields: TField[];
  spec: TopLevelSpec;
  title: string | undefined;
  description: string;

  preferred: boolean;
  timestamp: number;

  // Client-side only properties
  thumbnail?: string;
  timeUnit?: TimeUnit | null;

  generatedBy?: string;
}

export default TChart;

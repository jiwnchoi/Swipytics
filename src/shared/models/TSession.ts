import type { ChartModel } from "./ChartModel";

type TSession = {
  key: string;
  charts: ChartModel[];
  groundingAttributes: string[];
};

export default TSession;

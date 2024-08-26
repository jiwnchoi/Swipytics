import type TChart from "./TChart";

type TSession = {
  key: string;
  charts: TChart[];
  groundingAttributes: string[];
  timestamp: number;
};

export default TSession;

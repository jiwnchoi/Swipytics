import type TChart from "./TChart";

type TSession = {
  filename: string;
  timestamp: number;
  charts: TChart[];
};

export default TSession;

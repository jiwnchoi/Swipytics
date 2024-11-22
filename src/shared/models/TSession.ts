import type TChart from "./TChart";
import type TField from "./TField";

interface TSession {
  filename: string;
  timestamp: number;
  charts: TChart[];
  fields: TField[];
}

export default TSession;

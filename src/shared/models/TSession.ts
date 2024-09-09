import type TChart from "./TChart";
import type TDataField from "./TDataField";

interface TSession {
  filename: string;
  timestamp: number;
  charts: TChart[];
  fields: TDataField[];
}

export default TSession;

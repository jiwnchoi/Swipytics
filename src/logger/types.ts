export interface LogEntryPayload {
  key: string;
  data: object;
}

export interface LogEntrySavedType {
  key: string;
  data: object;
  version: number;
  timestamp: number;
}

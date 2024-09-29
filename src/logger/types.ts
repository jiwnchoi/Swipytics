export interface LogEntryPayload {
  key: string;
  event: string;
  data?: object;
}

export interface LogEntrySavedType extends LogEntryPayload {
  version: number;
  timestamp: number;
}

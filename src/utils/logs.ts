import { type IDBPDatabase, openDB } from "idb";

export interface LogEntry {
  dataTag: string | null;
  data: object;
}

interface LogEntryWithVersion extends LogEntry {
  version: number;
}

export const LOCAL_STORAGE_KEY = "logs";
export const INDEXED_DB_KEY = "logs";
export const LOG_VERSION = 1;
export const LOG_FILE_NAME = "log";
export const LOG_FILE_FORMAT = "json";

const getEmptyMap = () => new Map<number, LogEntryWithVersion>();

const readFromLocalStorage = () => {
  const existingLogs = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]";
  try {
    const parsedLogs = JSON.parse(existingLogs) as [number, LogEntryWithVersion][];
    const logMap = new Map<number, LogEntryWithVersion>(parsedLogs);
    return logMap;
  } catch (error) {
    console.error("Failed to parse existing logs:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return getEmptyMap();
  }
};

export const saveToLocalStorage = (timestamp: number, log: LogEntry) => {
  const logMap = readFromLocalStorage();
  logMap.set(timestamp, { ...log, version: LOG_VERSION });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(logMap.entries())));
};

export const getIndexedDB = () =>
  openDB(INDEXED_DB_KEY, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(INDEXED_DB_KEY)) {
        db.createObjectStore(INDEXED_DB_KEY, { keyPath: "timestamp" });
      }
    },
  });

const readFromIndexedDB = async (db: IDBPDatabase | null) => {
  if (db) {
    try {
      const tx = db.transaction(INDEXED_DB_KEY, "readonly");
      const store = tx.objectStore(INDEXED_DB_KEY);
      const logsMap = getEmptyMap();

      const allLogs = (await store.getAll()) as {
        timestamp: number;
        dataTag: string;
        data: object;
        version: number;
      }[];
      await tx.done;

      allLogs.forEach((log) => {
        if (log.timestamp !== undefined) {
          logsMap.set(log.timestamp, log);
        }
      });
      return logsMap;
    } catch (error) {
      console.error("IndexedDB read error:", error);
      return [];
    }
  }
  return [];
};

export const saveLog = (db: IDBPDatabase | null, timestamp: number, log: LogEntry) => {
  if (db) {
    try {
      const tx = db.transaction(INDEXED_DB_KEY, "readwrite");
      const store = tx.objectStore(INDEXED_DB_KEY);
      store.add({ timestamp, ...log, version: LOG_VERSION });
    } catch (error) {
      console.error("IndexedDB error:", error);
      saveToLocalStorage(timestamp, log);
    }
  } else {
    saveToLocalStorage(timestamp, log);
  }
};

export const downloadLogsAsJson = async () => {
  const indexedDB = await openDB(INDEXED_DB_KEY, 1);
  const indexedDBLogs = await readFromIndexedDB(indexedDB);
  const localStorageLogs = readFromLocalStorage();
  const combinedLogs = new Map([...indexedDBLogs, ...localStorageLogs]);
  const sortedLogs = Array.from(combinedLogs.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([timestamp, log]) => ({ ...log, timestamp: new Date(timestamp).toLocaleString() }));

  const blob = new Blob([JSON.stringify(sortedLogs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${LOG_FILE_NAME}.${LOG_FILE_FORMAT}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

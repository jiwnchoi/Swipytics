/* eslint-disable no-console */
import { type IDBPDatabase, openDB } from "idb";
import { INDEXED_DB_KEY, LOCAL_STORAGE_KEY, LOG_VERSION } from "./constants";
import type { LogEntryPayload, LogEntrySavedType } from "./types";

export const getEmptyMap = () => new Map<number, LogEntrySavedType>();

export const readFromLocalStorage = () => {
  const existingLogs = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]";
  try {
    const parsedLogs = JSON.parse(existingLogs) as [number, LogEntrySavedType][];
    const logMap = new Map<number, LogEntrySavedType>(parsedLogs);
    return logMap;
  } catch (error) {
    console.error("Failed to parse existing logs:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return getEmptyMap();
  }
};

export const saveToLocalStorage = (timestamp: number, log: LogEntryPayload) => {
  const logMap = readFromLocalStorage();
  logMap.set(timestamp, { ...log, timestamp, version: LOG_VERSION });
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

export const readFromIndexedDB = async (db: IDBPDatabase | null) => {
  if (db) {
    try {
      const tx = db.transaction(INDEXED_DB_KEY, "readonly");
      const store = tx.objectStore(INDEXED_DB_KEY);
      const logsMap = getEmptyMap();

      const allLogs = (await store.getAll()) as LogEntrySavedType[];
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

export const saveLog = (db: IDBPDatabase | null, timestamp: number, log: LogEntryPayload) => {
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

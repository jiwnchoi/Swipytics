/* eslint-disable no-console */
import { openDB, type IDBPDatabase } from "idb";
import type { LogEntryPayload, LogEntrySavedType } from "./types";

export const getIndexedDB = (storageKey: string) =>
  openDB(storageKey, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains(storageKey)) {
        db.createObjectStore(storageKey, { keyPath: "timestamp" });
      }
    },
  });

export const getEmptyMap = () => new Map<number, LogEntrySavedType>();

export const loadFromLocalStorage = (storageKey: string) => {
  const existingLogs = localStorage.getItem(storageKey) ?? "[]";
  try {
    const parsedLogs = JSON.parse(existingLogs) as [number, LogEntrySavedType][];
    return new Map<number, LogEntrySavedType>(parsedLogs);
  } catch (error) {
    console.error("Failed to parse existing logs:", error);
    localStorage.removeItem(storageKey);
    return getEmptyMap();
  }
};

export const saveToLocalStorage = (
  storageKey: string,
  timestamp: number,
  log: LogEntryPayload,
  logVersion: number,
) => {
  const logMap = loadFromLocalStorage(storageKey);
  logMap.set(timestamp, { ...log, timestamp, version: logVersion });
  localStorage.setItem(storageKey, JSON.stringify(Array.from(logMap.entries())));
};

export const loadFromIndexedDB = async (indexedDB: IDBPDatabase, storageKey: string) => {
  try {
    const tx = indexedDB.transaction(storageKey, "readonly");
    const store = tx.objectStore(storageKey);
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
    return getEmptyMap();
  }
};

export const saveToIndexedDB = (
  indexedDB: IDBPDatabase,
  storageKey: string,
  timestamp: number,
  log: LogEntryPayload,
  logVersion: number,
) => {
  const tx = indexedDB.transaction(storageKey, "readwrite");
  const store = tx.objectStore(storageKey);
  store.add({ timestamp, ...log, version: logVersion });
};

export const loadLogs = async (indexedDB: IDBPDatabase | null, storageKey: string) => {
  const indexedDBLogs = indexedDB ? await loadFromIndexedDB(indexedDB, storageKey) : getEmptyMap();
  const localStorageLogs = loadFromLocalStorage(storageKey);
  const combinedLogs = new Map([...indexedDBLogs, ...localStorageLogs]);
  return Array.from(combinedLogs.entries())
    .map(([timestamp, log]) => ({
      ...log,
      timestamp: timestamp,
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
};

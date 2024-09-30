/* eslint-disable no-console */
import { type IDBPDatabase } from "idb";
import type { LogEntryPayload } from "./types";
import { getIndexedDB, loadLogs, saveToIndexedDB, saveToLocalStorage } from "./utils";

class LoggerClient {
  private indexedDB: IDBPDatabase | null = null;
  private eventListeners: Record<string, (event: Event) => void> = {};
  private scrollLogged = false;

  private logFileName: string;
  private logFileFormat: string;
  private logVersion: number;
  private storageKey: string;

  constructor(
    logFileName = "logs",
    logFileFormat = "json",
    logVersion = 1.0,
    storageKey = "logger",
  ) {
    this.logFileName = logFileName;
    this.logFileFormat = logFileFormat;
    this.logVersion = logVersion;
    this.storageKey = storageKey;
    this.initializeDB();
  }

  public async initializeDB() {
    try {
      this.indexedDB = await getIndexedDB(this.storageKey);
    } catch (error) {
      console.warn("Failed to connect to IndexedDB:", error);
    }
  }

  private saveLog = (timestamp: number, log: LogEntryPayload) => {
    if (!this.indexedDB) {
      console.warn("IndexedDB is not initialized.");
      saveToLocalStorage(this.storageKey, timestamp, log, this.logVersion);
      return;
    }
    try {
      saveToIndexedDB(this.indexedDB, this.storageKey, timestamp, log, this.logVersion);
    } catch (error) {
      console.error("Failed to save log to IndexedDB:", error);
      saveToLocalStorage(this.storageKey, timestamp, log, this.logVersion);
    }
  };

  private createEventListener = (eventType: string, dataFn?: () => object) => (event: Event) => {
    if (event.type !== eventType) return;

    const target = event.target as HTMLElement;
    const closestEventElement = target.closest(`[data-log-${eventType}]`);
    if (!closestEventElement) return;

    const key = closestEventElement.getAttribute(`data-log-${eventType}`);
    if (typeof key !== "string") return;

    if (eventType === "scroll") {
      if (this.scrollLogged) return;
      this.scrollLogged = true;
    } else {
      this.scrollLogged = false;
    }

    if (dataFn) {
      this.saveLog(Date.now(), { key, event: eventType, data: dataFn() });
      return;
    } else {
      this.saveLog(Date.now(), { key, event: eventType });
    }
  };

  public registerEvent = (
    elem: HTMLElement | Window | Document,
    eventTypes: string[],
    dataFn?: () => object,
  ) => {
    eventTypes.forEach((eventType) => {
      if (!this.eventListeners[eventType]) {
        this.eventListeners[eventType] = this.createEventListener(eventType, dataFn);
      }

      if (eventType === "scroll") {
        elem.addEventListener(eventType, this.eventListeners[eventType], { capture: true });
      } else {
        elem.addEventListener(eventType, this.eventListeners[eventType]);
      }
    });

    return () => {
      this.detachEvent(elem, eventTypes);
    };
  };

  private detachEvent = (elem: HTMLElement | Window | Document, eventTypes: string[]) => {
    eventTypes.forEach((eventType) => {
      if (this.eventListeners[eventType]) {
        if (eventType === "scroll") {
          elem.removeEventListener(eventType, this.eventListeners[eventType], { capture: true });
        } else {
          elem.removeEventListener(eventType, this.eventListeners[eventType]);
        }
      }
    });
  };

  public log(key: string, event: string, data?: object) {
    this.saveLog(Date.now(), { key, event, data });
    if (event !== "scroll") {
      this.scrollLogged = false;
    }
  }

  public export = async () => {
    if (!this.indexedDB) {
      console.warn("IndexedDB is not initialized.");
    }

    const logs = await loadLogs(this.indexedDB, this.storageKey);

    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.logFileName}.${this.logFileFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  public registerLogger = (
    eventTypes: string[] = [],
    elem: Window | Document | HTMLElement = window,
  ) => {
    this.initializeDB().then(() => {
      this.registerEvent(elem, eventTypes);
    });
    return () => {
      this.detachEvent(elem, eventTypes);
    };
  };
}

export default LoggerClient;

/* eslint-disable no-console */
import { type IDBPDatabase } from "idb";
import { LOG_FILE_FORMAT, LOG_FILE_NAME } from "./constants";
import { getIndexedDB, readFromIndexedDB, readFromLocalStorage, saveLog } from "./utils";

class Logger {
  private indexedDB: IDBPDatabase | null = null;

  public async initializeDB() {
    try {
      this.indexedDB = await getIndexedDB();
    } catch (error) {
      console.error("Failed to connect to IndexedDB:", error);
    }
  }

  private onEvent = (targetEventType: string) => (event: Event) => {
    const eventType = event.type;
    if (eventType !== targetEventType) return;

    const target = event.target as HTMLElement;
    const closestEventElement = target.closest(`[data-log-${targetEventType}]`);
    if (!closestEventElement) return;

    const key = closestEventElement.getAttribute(`data-log-${targetEventType}`);
    if (typeof key !== "string") return;

    saveLog(this.indexedDB, Date.now(), { key, event: targetEventType });
  };

  private onClickListener = this.onEvent("click");
  private onScrollListener = this.onEvent("scroll");

  public attachEventListener = () => {
    window.addEventListener("click", this.onClickListener);
    window.addEventListener("scroll", this.onScrollListener);
  };

  public detachEventListener = () => {
    window.removeEventListener("click", this.onClickListener);
    window.removeEventListener("scroll", this.onScrollListener);
  };

  public log(key: string, event: string, data?: object) {
    saveLog(this.indexedDB, Date.now(), { key, event, data });
  }

  public export = async () => {
    if (!this.indexedDB) {
      console.error("IndexedDB is not initialized.");
      return;
    }

    const indexedDBLogs = await readFromIndexedDB(this.indexedDB);
    const localStorageLogs = readFromLocalStorage();
    const combinedLogs = new Map([...indexedDBLogs, ...localStorageLogs]);
    const sortedLogs = Array.from(combinedLogs.entries())
      .map(([timestamp, log]) => ({
        ...log,
        timestamp: timestamp,
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

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
}

export default new Logger();

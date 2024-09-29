/* eslint-disable no-console */
import { type IDBPDatabase } from "idb";
import { LOG_FILE_FORMAT, LOG_FILE_NAME } from "./constants";
import { getIndexedDB, loadLogs, saveLog } from "./utils";

class Logger {
  private indexedDB: IDBPDatabase | null = null;
  private eventListeners: Record<string, (event: Event) => void> = {};
  private scrollLogged = false;

  public async initializeDB() {
    try {
      this.indexedDB = await getIndexedDB();
    } catch (error) {
      console.error("Failed to connect to IndexedDB:", error);
    }
  }

  private createEventListener = (eventType: string) => (event: Event) => {
    console.log(eventType);
    if (event.type !== eventType) return;

    const target = event.target as HTMLElement;
    const closestEventElement = target.closest(`[data-log-${eventType}]`);
    if (!closestEventElement) return;

    const key = closestEventElement.getAttribute(`data-log-${eventType}`);
    if (typeof key !== "string") return;

    if (eventType === "scroll") {
      console.log(this.scrollLogged);
      if (this.scrollLogged) return;
      this.scrollLogged = true;
    } else {
      this.scrollLogged = false;
    }
    saveLog(this.indexedDB, Date.now(), { key, event: eventType });
  };

  public attachEvent = (elem: HTMLElement | Window, eventTypes: string[]) => {
    eventTypes.forEach((eventType) => {
      if (!this.eventListeners[eventType]) {
        this.eventListeners[eventType] = this.createEventListener(eventType);
      }

      if (eventType === "scroll") {
        elem.addEventListener(eventType, this.eventListeners[eventType], { capture: true });
      } else {
        elem.addEventListener(eventType, this.eventListeners[eventType]);
      }
    });
  };

  public detachEvent = (elem: HTMLElement | Window, eventTypes: string[]) => {
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
    saveLog(this.indexedDB, Date.now(), { key, event, data });
    if (event !== "scroll") {
      this.scrollLogged = false;
    }
  }

  public export = async () => {
    if (!this.indexedDB) {
      console.error("IndexedDB is not initialized.");
      return;
    }

    const logs = await loadLogs(this.indexedDB);

    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
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

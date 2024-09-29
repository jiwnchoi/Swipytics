/* eslint-disable no-console */
import { type IDBPDatabase } from "idb";
import { getIndexedDB, saveLog } from "./utils";

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
}

export default new Logger();

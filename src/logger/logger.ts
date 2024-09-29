import { type IDBPDatabase } from "idb";
import getLogData from "./getLogData";
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
    console.log(1, { eventType, targetEventType });
    if (eventType !== targetEventType) return;

    const target = event.target as HTMLElement;
    const timestamp = Date.now();
    const closestEventElement = target.closest(`[data-log-${targetEventType}]`);

    console.log(2, { target, closestEventElement });
    if (!closestEventElement) return;

    const key = closestEventElement.getAttribute(`data-log-${targetEventType}`);

    if (typeof key !== "string") return;
    const data = getLogData(key);
    saveLog(this.indexedDB, timestamp, { key, data });
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
}

export default new Logger();

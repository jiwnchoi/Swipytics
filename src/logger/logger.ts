import { type IDBPDatabase } from "idb";
import { getIndexedDB, isValidLogAttribute, saveLog } from "./utils";

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
    const logAttribute = target
      .closest(`[data-log-${targetEventType}]`)
      ?.getAttribute(`data-log-${targetEventType}`);
    console.log(2, { eventType, target, timestamp, logAttribute });
    if (typeof logAttribute !== "string") return;
    const parsedLogAttribute: unknown = JSON.parse(logAttribute);
    if (isValidLogAttribute(parsedLogAttribute)) {
      saveLog(this.indexedDB, timestamp, parsedLogAttribute);
    }
  };

  private onClickListener = this.onEvent("click");
  private onScrollListener = this.onEvent("scroll");

  public attatchEventListener = () => {
    window.addEventListener("click", this.onClickListener);
    window.addEventListener("scroll", this.onScrollListener);
  };

  public detachEventListener = () => {
    window.removeEventListener("click", this.onClickListener);
    window.removeEventListener("scroll", this.onScrollListener);
  };
}

export default new Logger();

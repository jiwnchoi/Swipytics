import { type IDBPDatabase } from "idb"; // A library for easier IndexedDB management
import { useEffect, useRef } from "react";
import { useDataStore, useInteractionStore, useSessionsStore, useSettingsStore } from "../stores";
import { getIndexedDB, saveLog } from "../utils/logs";

const useLogger = () => {
  const dataStore = useDataStore((state) => ({
    filename: state.filename,
    fileCache: state.fileCache,
    writingFile: state.writingFile,
  }));
  const interactionStore = useInteractionStore((state) => ({
    drawerExpanded: state.drawerExpanded,
    tabIndex: state.tabIndex,
    searchTargetFieldNames: state.searchTargetFieldNames,
  }));
  const sessionsStore = useSessionsStore((state) => ({
    filename: state.filename,
    timestamp: state.timestamp,
    charts: state.charts,
    fields: state.fields,
    currentChartIndex: state.currentChartIndex,
    loadingSession: state.loadingSession,
    appendingChart: state.appendingChart,
  }));
  const settingsStore = useSettingsStore((state) => ({
    apiKey: state.apiKey,
    locale: state.locale,
  }));

  const dataRef = useRef({ dataStore, interactionStore, sessionsStore, settingsStore });
  const dbRef = useRef<IDBPDatabase | null>(null);

  useEffect(() => {
    dataRef.current = { dataStore, interactionStore, sessionsStore, settingsStore };
  }, [dataStore, interactionStore, sessionsStore, settingsStore]);

  const initDB = async () => {
    try {
      const database = await getIndexedDB();
      dbRef.current = database;
    } catch (error) {
      console.error("Failed to connect to IndexedDB:", error);
    }
  };

  useEffect(() => {
    initDB();

    const handleClick = (event: MouseEvent) => {
      if (!event) return;
      const target = event.target as HTMLElement;
      const timestamp = Date.now();
      const dataTag = target.closest("[data-tag]")?.getAttribute("data-tag");

      if (!dataTag) return;

      const logEntry = {
        dataTag,
        data: dataRef.current,
      };

      saveLog(dbRef.current, timestamp, logEntry);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return;
};

export default useLogger;

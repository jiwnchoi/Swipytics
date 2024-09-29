import { logger } from "@logger";
import { isEqual, pickBy } from "es-toolkit";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SettingsState {
  apiKey: string;
  setApiKey: (key: string) => void;

  locale: "ko" | "en";
  setLocale: (locale: "ko" | "en") => void;

  // backend: "pyodide" | "server";
  // setBackend: (backend: "pyodide" | "server") => void;
}

const useSettingsStore = create(
  devtools(
    persist<SettingsState>(
      (set) => ({
        apiKey: "sk-...",
        setApiKey: (key: string) => set({ apiKey: key }),

        locale: "en",
        setLocale: (locale: "ko" | "en") => set({ locale }),
      }),
      {
        name: "settings-storage",
      },
    ),
    {
      name: "SettingStore",
      anonymousActionType: "SettingStore Action",
      enabled: import.meta.env.MODE === "development",
    },
  ),
);

useSettingsStore.subscribe((state, prevState) => {
  if (isEqual(state, prevState)) return;
  logger.log(
    "Setting Store",
    "state",
    pickBy(state, (value) => typeof value !== "function"),
  );
});

export default useSettingsStore;

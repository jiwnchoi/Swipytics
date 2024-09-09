import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SettingsState {
  apiKey: string;
  setApiKey: (key: string) => void;

  python: "pyodide" | "server";
  setPython: (python: "pyodide" | "server") => Promise<boolean>;
}

const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        apiKey: "sk-...",
        setApiKey: (key: string) => set({ apiKey: key }),
        python: "pyodide",
        setPython: async (python: "pyodide" | "server") => {
          if (python === "server") {
            const response = await fetch("/api");
            if (!response.ok) return false;
          }

          set({ python });
          return true;
        },
      }),
      {
        name: "settings-storage",
      },
    ),
  ),
);

export default useSettingsStore;

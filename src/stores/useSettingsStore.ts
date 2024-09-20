import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SettingsState {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        apiKey: "sk-...",
        setApiKey: (key: string) => set({ apiKey: key }),
      }),
      {
        name: "settings-storage",
      },
    ),
  ),
);

export default useSettingsStore;

import { Tabs } from "@chakra-ui/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const TABS = {
  charts: 0,
  search: 1,
  likes: 2,
  fields: -2,
  settings: -1,
};

interface SettingsState {
  tabIndex: number;
  setTabByIndex: (index: number) => void;
  setTabByName: (name: keyof typeof TABS) => void;

  searchTargetFieldNames: string[];
  setSearchTargetFieldNames: (
    fieldNamesOrUpdater: string[] | ((prev: string[]) => string[]),
  ) => void;
  appendSearchTarget: (fieldName: string) => void;

  resetInteractionStore: (tabName: keyof typeof TABS) => void;
}

const useInteractionStore = create(
  devtools<SettingsState>(
    (set) => ({
      tabIndex: TABS.settings,
      setTabByIndex: (index) =>
        set({ tabIndex: index < 0 ? Object.keys(Tabs).length + index : index }),
      setTabByName: (name) => set({ tabIndex: TABS[name] }),

      searchTargetFieldNames: [],
      setSearchTargetFieldNames: (fieldNamesOrUpdater) =>
        set((state) => ({
          searchTargetFieldNames:
            typeof fieldNamesOrUpdater === "function"
              ? fieldNamesOrUpdater(state.searchTargetFieldNames)
              : fieldNamesOrUpdater,
        })),
      appendSearchTarget: (fieldName) =>
        set((state) => ({ searchTargetFieldNames: [...state.searchTargetFieldNames, fieldName] })),
      resetInteractionStore: (tabName: keyof typeof TABS) =>
        set({ searchTargetFieldNames: [], tabIndex: TABS[tabName] }),
    }),

    {
      name: "InteractionStore",
      anonymousActionType: "InteractionStore Action",
      enabled: import.meta.env.MODE === "development",
    },
  ),
);

export default useInteractionStore;

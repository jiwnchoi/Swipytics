import { Tabs } from "@chakra-ui/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const TABS = {
  likes: 1,
  search: 2,
  fields: 3,
  charts: 0,
  settings: -1,
};

interface SettingsState {
  drawerExpanded: boolean;
  setDrawerExpanded: (expanded: boolean) => void;

  tabIndex: number;
  setTabByIndex: (index: number) => void;
  setTabByName: (name: keyof typeof TABS) => void;

  searchTargetFieldNames: string[];
  setSearchTargetFieldNames: (
    fieldNamesOrUpdater: string[] | ((prev: string[]) => string[]),
  ) => void;
  appendSearchTarget: (fieldName: string) => void;
}

const useInteractionStore = create(
  devtools<SettingsState>(
    (set) => ({
      drawerExpanded: true,
      setDrawerExpanded: (expanded) => set({ drawerExpanded: expanded }),

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
    }),
    {
      name: "InteractionStore",
      anonymousActionType: "InteractionStore Action",
      enabled: import.meta.env.MODE === "development",
    },
  ),
);

export default useInteractionStore;

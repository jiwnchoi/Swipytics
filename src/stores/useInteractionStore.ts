import { logger } from "@logger";
import { getDifferences } from "@shared/utils";
import { isEqual, pickBy } from "es-toolkit";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const TABS = {
  likes: 0,
  search: 1,
  fields: 2,
  settings: 3,
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
      setTabByIndex: (index) => set({ tabIndex: index }),
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

useInteractionStore.subscribe((state, prevState) => {
  const pickedState = pickBy(state, (value) => typeof value !== "function");
  const pickedPrevState = pickBy(prevState, (value) => typeof value !== "function");
  if (isEqual(pickedState, pickedPrevState)) return;
  logger.log("interaction-store", "state", getDifferences(pickedState, pickedPrevState));
});

export default useInteractionStore;

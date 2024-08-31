import { create } from "zustand";

interface SettingsState {
  drawerExpanded: boolean;
  setDrawerExpanded: (expanded: boolean) => void;
}

const useInteractionStore = create<SettingsState>()(set => ({
  drawerExpanded: false,
  setDrawerExpanded: expanded => set({ drawerExpanded: expanded }),
}));

export default useInteractionStore;

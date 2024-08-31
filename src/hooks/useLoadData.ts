import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";

function useLoadData() {
  const loadingData = useDataStore(state => state.loading);
  const loadData = useDataStore(state => state.loadData);
  const loadingSession = useSessionsStore(state => state.loadingSession);
  const loadSession = useSessionsStore(state => state.loadSession);
  const setExpanded = useInteractionStore(state => state.setDrawerExpanded);

  const initializeSession = async (file: File | string) => {
    await loadData(file);
    await loadSession();
    setExpanded(false);
  };

  return {
    loading: loadingData || loadingSession,
    initializeSession,
  };
}

export default useLoadData;

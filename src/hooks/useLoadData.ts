import { getFileNameFromURL } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";

function useLoadData() {
  const loadingData = useDataStore(state => state.loading);
  const loadData = useDataStore(state => state.loadData);
  const loadingSession = useSessionsStore(state => state.loadingSession);
  const loadSession = useSessionsStore(state => state.loadSession);
  const setExpanded = useInteractionStore(state => state.setDrawerExpanded);

  const initializeSessionWithFile = async (file: File) => {
    const filename = file.name;
    await loadData(file);
    await loadSession(filename);
    setExpanded(false);
  };

  const initializeSessionWithURL = async (url: string) => {
    const filename = getFileNameFromURL(url);
    await loadData(url);
    await loadSession(filename);
    setExpanded(false);
  };

  return {
    loading: loadingData || loadingSession,
    initializeSessionWithFile,
    initializeSessionWithURL,
  };
}

export default useLoadData;

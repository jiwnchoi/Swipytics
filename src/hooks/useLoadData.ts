import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";

function useLoadData() {
  const loadingData = useDataStore((state) => state.writingFile);
  const writeFile = useDataStore((state) => state.writeFile);
  const loadingSession = useSessionsStore((state) => state.loadingSession);
  const loadSession = useSessionsStore((state) => state.loadSession);
  const setExpanded = useInteractionStore((state) => state.setDrawerExpanded);
  const resetSession = useSessionsStore((state) => state.resetSession);
  const sessionFileName = useSessionsStore((state) => state.filename);
  const initializeSession = async (file: File | string) => {
    await writeFile(file);
    const filename = useDataStore.getState().filename;

    if (!filename) return;
    if (filename !== sessionFileName) resetSession();

    await loadSession(filename);
    setExpanded(false);
  };

  return {
    loading: loadingData || loadingSession,
    initializeSession,
  };
}

export default useLoadData;

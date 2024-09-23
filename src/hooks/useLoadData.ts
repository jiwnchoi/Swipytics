import { getFileNameFromURL } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";

function useLoadData() {
  const loadingData = useDataStore((state) => state.writingFile);
  const writeFile = useDataStore((state) => state.writeFile);
  const loadingSession = useSessionsStore((state) => state.loadingSession);
  const loadSession = useSessionsStore((state) => state.loadSession);
  const setExpanded = useInteractionStore((state) => state.setDrawerExpanded);
  const resetSession = useSessionsStore((state) => state.resetSession);
  const sessionFileName = useSessionsStore((state) => state.filename);
  const setTabByName = useInteractionStore((state) => state.setTabByName);

  const initializeSession = async (file: File | string) => {
    const filename = file instanceof File ? file.name : getFileNameFromURL(file);

    if (!filename) return;
    if (filename !== sessionFileName) {
      resetSession();
    }
    await writeFile(file);

    await loadSession(filename);
    setExpanded(false);
    setTabByName("fields");
  };

  return {
    loading: loadingData || loadingSession,
    initializeSession,
  };
}

export default useLoadData;

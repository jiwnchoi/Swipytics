import { useLayout } from "@hooks";
import { getFileNameFromURL } from "@shared/utils";
import { useDataStore, useInteractionStore, useSessionsStore } from "@stores";

function useLoadData() {
  const loadingData = useDataStore((state) => state.writingFile);
  const writeFile = useDataStore((state) => state.writeFile);
  const loadingSession = useSessionsStore((state) => state.loadingSession);
  const loadSession = useSessionsStore((state) => state.loadSession);
  const resetSession = useSessionsStore((state) => state.resetSession);
  const sessionFileName = useSessionsStore((state) => state.filename);
  const resetInteractionStore = useInteractionStore((state) => state.resetInteractionStore);
  const { mobile } = useLayout();

  const initializeSession = async (file: File | string) => {
    const filename = file instanceof File ? file.name : getFileNameFromURL(file);

    if (!filename) return;
    if (filename !== sessionFileName) {
      resetSession();
    }
    await writeFile(file);
    await loadSession(filename);

    if (mobile) {
      resetInteractionStore("charts");
    } else {
      resetInteractionStore("search");
    }
  };
  return {
    loading: loadingData || loadingSession,
    initializeSession,
  };
}

export default useLoadData;

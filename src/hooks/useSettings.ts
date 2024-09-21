import { useColorMode, useToast } from "@chakra-ui/react";
import { router } from "@router";
import { useDataStore, useSessionsStore, useSettingsStore } from "@stores";
import { useState } from "react";

export default function useSettings() {
  const { fileCache, writeFile } = useDataStore();
  const { loadSession, filename: currentFilename } = useSessionsStore();
  const { apiKey, setApiKey } = useSettingsStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [python, setPython] = useState<"pyodide" | "server">(() => router.getPythonType());
  const [locale, setLocale] = useState<"en" | "ko">("en");
  const toast = useToast();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    // eslint-disable-next-line no-console
    console.log("Downloading logs...");
  };

  const handleServerButtonClick = async () => {
    if (!router) return;
    const newType = python === "pyodide" ? "server" : "pyodide";
    const success = router.setPython(newType);
    if (!success) {
      toast({
        id: "server-not-available",
        title: "Server is not available.",
        description: "Failed to access Python backend. Only local Pyodide is available.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        containerStyle: { margin: 10 },
      });

      return;
    }

    setPython(newType);

    if (!fileCache) return;
    await writeFile(fileCache);
    await loadSession(currentFilename);
  };

  return {
    python,
    handleServerButtonClick,
    apiKey,
    handleApiKeyChange,
    handleDownloadLogs,
    colorMode,
    toggleColorMode,
    locale,
    setLocale,
  };
}

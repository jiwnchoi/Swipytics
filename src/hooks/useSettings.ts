import { router } from "@api";
import { useColorMode, useToast } from "@chakra-ui/react";
import { useDataStore, useSessionsStore, useSettingsStore } from "@stores";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { downloadLogsAsJson } from "../logger";

export default function useSettings() {
  const { fileCache, writeFile } = useDataStore();
  const { loadSession, filename: currentFilename } = useSessionsStore();
  const { apiKey, setApiKey } = useSettingsStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [python, setPython] = useState<"pyodide" | "server">(() => router.getPythonType());
  const { t, i18n } = useTranslation();
  const toast = useToast();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    try {
      downloadLogsAsJson();
    } catch (e) {
      toast({
        title: "Oh no!",
        description: JSON.stringify(e),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        containerStyle: { margin: 10 },
      });
    }
  };

  const handleServerButtonClick = async () => {
    if (!router) return;
    const newType = python === "pyodide" ? "server" : "pyodide";
    const success = router.setPython(newType);
    if (!success) {
      toast({
        id: "server-not-available",
        title: t("toast.server_not_available_title"),
        description: t("toast.server_not_available_description"),
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
    locale: i18n.language,
    setLocale: (newLanguage: string) => i18n.changeLanguage(newLanguage),
  };
}

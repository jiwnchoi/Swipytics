import { router } from "@api";
import { useColorMode, useToast } from "@chakra-ui/react";
import { useLoggerClient } from "@logger/react";
import { useDataStore, useSessionsStore } from "@stores";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function useSettings() {
  const { fileCache, writeFile } = useDataStore();
  const { loadSession, filename: currentFilename } = useSessionsStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [python, setPython] = useState<"pyodide" | "server">(() => router.getPythonType());
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const logger = useLoggerClient();

  const handleDownloadLogs = () => {
    try {
      logger.export();
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

  const handleRefreshApp = () => {
    window.location.reload();
  };

  const handleShareLogs = () => {
    try {
      logger.share();
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

  const handleClearLogs = () => {
    logger
      .clearLogs()
      .then(() => {
        toast({
          title: t("toast.logs_cleared_title"),
          description: t("toast.logs_cleared_description"),
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
          containerStyle: { margin: 10 },
        });
      })
      .catch((e) => {
        toast({
          title: t("toast.logs_clear_failed_title"),
          description: JSON.stringify(e),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
          containerStyle: { margin: 10 },
        });
      });
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
    handleDownloadLogs,
    handleClearLogs,
    colorMode,
    toggleColorMode,
    handleShareLogs,
    handleRefreshApp,
    locale: i18n.language,
    setLocale: (newLanguage: string) => i18n.changeLanguage(newLanguage),
  };
}

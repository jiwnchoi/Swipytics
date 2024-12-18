/* eslint-disable no-console */
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

  const getSessionBlob = () => {
    const charts = useSessionsStore.getState().charts;
    const filteredCharts = charts.map((chart) => ({
      title: chart.title,
      n_fields: chart.fields.length,
      preferred: chart.preferred,
      generatedBy: chart.generatedBy,
    }));

    return new Blob([JSON.stringify(filteredCharts, null, 2)], {
      type: "application/json",
    });
  };
  const handleExport = () => {
    const blob = getSessionBlob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentFilename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareSession = async () => {
    try {
      if (!navigator.share) {
        console.warn("Web Share API is not supported in this browser");
        handleExport();
        return;
      }

      const blob = getSessionBlob();
      const file = new File([blob], `${currentFilename}.json`, {
        type: "application/json",
      });
      await navigator.share({
        title: "Charts Data",
        files: [file],
      });
    } catch (error) {
      console.error("Failed to process share/export:", error);

      if (!(error instanceof DOMException && error.name === "AbortError")) {
        handleExport();
      }
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
    handleDownloadLogs,
    handleClearLogs,
    colorMode,
    toggleColorMode,
    handleShareLogs,
    handleRefreshApp,
    handleShareSession,
    locale: i18n.language,
    setLocale: (newLanguage: string) => i18n.changeLanguage(newLanguage),
  };
}

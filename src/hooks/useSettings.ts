import { useColorMode, useToast } from "@chakra-ui/react";
import { router } from "@router";
import { useSettingsStore } from "@stores";
import { useState } from "react";

export default function useSettings() {
  const { apiKey, setApiKey } = useSettingsStore();

  const { colorMode, toggleColorMode } = useColorMode();
  const [python, setPython] = useState<"pyodide" | "server">(() => router.getPythonType());
  const toast = useToast();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    // eslint-disable-next-line no-console
    console.log("Downloading logs...");
  };

  const [locale, setLocale] = useState<"en" | "ko">("en");

  const togglePython = () => {
    if (!router) return;
    const res = router.setPython(router.getPythonType() === "pyodide" ? "server" : "pyodide");
    if (res) {
      setPython(router.getPythonType());
    }
    if (!res && !toast.isActive("server-not-available")) {
      toast({
        id: "server-not-available",
        position: "bottom",
        title: "Server is not available.",
        description:
          "Failed to access Python backend. Only local Pyodide is available. Please refer the GitHub README for more information.",
        status: "error",
        duration: 3000,
        isClosable: true,
        containerStyle: {
          margin: 10,
        },
      });
    }
  };

  const handleServerButtonClick = () => {
    togglePython();
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

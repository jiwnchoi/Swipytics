import { useColorMode, useToast } from "@chakra-ui/react";
import { useSettingsStore } from "@stores";
import { useState } from "react";
import usePyodide from "./usePyodide";

export default function useSettings() {
  const { apiKey, setApiKey, python, setPython } = useSettingsStore();
  const { loadingPyodide } = usePyodide();

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    // eslint-disable-next-line no-console
    console.log("Downloading logs...");
  };

  const [locale, setLocale] = useState<"en" | "ko">("en");

  const togglePython = async () => {
    const res = await setPython(python === "pyodide" ? "server" : "pyodide");
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

  return {
    python,
    togglePython,
    apiKey,
    loadingPyodide,
    handleApiKeyChange,
    handleDownloadLogs,
    colorMode,
    toggleColorMode,
    locale,
    setLocale,
  };
}

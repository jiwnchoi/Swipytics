import { useColorMode } from "@chakra-ui/react";
import { useSettingsStore } from "@stores";
import { useState } from "react";
import usePyodide from "./usePyodide";

export default function useSettings() {
  const { apiKey, setApiKey } = useSettingsStore();
  const { loadingPyodide } = usePyodide();

  const { colorMode, toggleColorMode } = useColorMode();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    // biome-ignore lint/nursery/noConsole: <explanation>
    console.log("Downloading logs...");
  };

  const [locale, setLocale] = useState<"en" | "ko">("en");

  return {
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

import type { TDemo } from "@shared/models";
import { useSettingsStore } from "@stores";
import { useState } from "react";
import useLoadData from "./useLoadData";
import usePyodide from "./usePyodide";

export default function useSettings() {
  const { apiKey, setApiKey } = useSettingsStore();
  const { loadingPyodide } = usePyodide();
  const { loading, initializeSessionWithURL } = useLoadData();
  const [selectedDemo, _setSelectedDemo] = useState<TDemo | null>(null);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    // biome-ignore lint/nursery/noConsole: <explanation>
    console.log("Downloading logs...");
  };

  const handleDemoSelect = (demo: TDemo) => {
    _setSelectedDemo(demo);
  };

  const handleSubmit = async () => {
    if (selectedDemo?.href) {
      initializeSessionWithURL(selectedDemo.href);
    }
  };

  return {
    apiKey,
    loading: loading || loadingPyodide,
    selectedDemo,
    handleSubmit,
    handleApiKeyChange,
    handleDownloadLogs,
    handleDemoSelect,
  };
}

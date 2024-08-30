import type { TDemo } from "@shared/models";
import { getFileNameFromURL } from "@shared/utils";
import { useDataStore, useSessionsStore, useSettingsStore } from "@stores";
import { useState } from "react";

export default function useSettings() {
  const { apiKey, setApiKey } = useSettingsStore();

  const loadData = useDataStore(state => state.loadData);
  const loadSession = useSessionsStore(state => state.loadSession);

  const loadingDemo = useDataStore(state => state.loading);
  const loadDemo = async () => {
    const href = selectedDemo?.href;
    if (!href) return;
    const filename = getFileNameFromURL(href);
    await loadData(href);
    await loadSession(filename);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleDownloadLogs = () => {
    // biome-ignore lint/nursery/noConsole: <explanation>
    console.log("Downloading logs...");
  };

  const [selectedDemo, _setSelectedDemo] = useState<TDemo | null>(null);
  const handleDemoSelect = (demo: TDemo) => {
    _setSelectedDemo(demo);
  };

  return {
    loadDemo,
    loadingDemo,
    apiKey,
    handleApiKeyChange,
    handleDownloadLogs,
    selectedDemo,
    handleDemoSelect,
  };
}

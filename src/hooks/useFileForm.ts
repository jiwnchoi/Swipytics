import { getFileNameFromURL, isURL } from "@shared/utils";
import { useDataStore, useSessionsStore } from "@stores";
import { type ChangeEvent, useRef, useState } from "react";

function useFileForm() {
  const loadingSession = useSessionsStore(state => state.loadingSession);
  const loadSession = useSessionsStore(state => state.loadSession);

  const loadingData = useDataStore(state => state.loading);
  const loadData = useDataStore(state => state.loadData);

  const [pathInput, setPathInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[event.target.files?.length - 1].name ?? "";
    setPathInput(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPathInput(event.target.value);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.files = null;
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    const source = fileInputRef.current?.files?.[0] || (isURL(pathInput) ? pathInput : null);
    if (!source) return;

    const filename = fileInputRef.current?.files?.[0].name || getFileNameFromURL(pathInput);
    await loadData(source);
    await loadSession(filename);
  };

  const inputDisabled = !pathInput && !fileInputRef.current?.files?.length;

  return {
    fileInputRef,
    inputDisabled,

    loadData,
    loadingData,
    loadingSession,

    pathInput,
    handleInputChange,

    handleSubmit,
    handleFileChange,
    handleFileButtonClick,
  };
}

export default useFileForm;

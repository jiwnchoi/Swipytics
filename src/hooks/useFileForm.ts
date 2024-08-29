import { isURL } from "@shared/utils";
import { useDataStore, useSessionsStore } from "@stores";
import { getPyodide } from "@workers";
import { type ChangeEvent, useRef, useState } from "react";

function useFileForm() {
  const loadSession = useSessionsStore(state => state.loadSession);
  const loadingSession = useSessionsStore(state => state.loadingSession);

  const loadingData = useDataStore(state => state.loading);
  const loadData = useDataStore(state => state.load);

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
    const pyodide = await getPyodide();
    const source = fileInputRef.current?.files?.[0] || (isURL(pathInput) ? pathInput : null);

    if (source) {
      const [filename, fileBuffer] = await loadData(source);
      if (filename && fileBuffer) {
        await pyodide.writeFile(filename, fileBuffer);
        await loadSession(filename);
      }
    }
  };

  return {
    fileInputRef,
    inputDisabled: !pathInput && !fileInputRef.current?.files?.length,

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

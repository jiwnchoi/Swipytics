import { getFileNameFromURL, isURL } from "@shared/utils";
import { useDataStore, useSessionsStore } from "@stores";
import { type ChangeEvent, useMemo, useRef, useState } from "react";
import usePyodide from "./usePyodide";

function useFileForm() {
  const { loadingPyodide, pyodide } = usePyodide();
  const appendSession = useSessionsStore(state => state.appendSession);
  const initSessions = useSessionsStore(state => state.initSessions);
  const loadingData = useDataStore(state => state.loading);
  const load = useDataStore(state => state.load);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [urlInput, setUrlInput] = useState("");

  const isFileValid = () => fileInputRef.current?.files?.[0] !== undefined;

  const inputDisabled = useMemo(() => !(isFileValid() || isURL(urlInput)), [urlInput]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = "";
    }
    setUrlInput(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[event.target.files?.length - 1].name;
    setUrlInput(file || "");
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    initSessions();
    if (!pyodide) {
      throw new Error("Pyodide is not loaded");
    }
    let filename = "";

    if (isFileValid() && fileInputRef.current?.files?.[0]) {
      await load(fileInputRef.current?.files?.[0]);
      filename = fileInputRef.current.files[0].name;
    } else if (isURL(urlInput)) {
      await load(urlInput);
      filename = getFileNameFromURL(urlInput);
    }
    await pyodide.callPythonFunction("loadData", [filename]);
    await appendSession();
  };

  return {
    fileInputRef,
    load,
    loadingData,
    loadingPyodide,
    handleInputChange,
    urlInput,
    inputDisabled,
    handleSubmit,
    handleFileChange,
    handleFileButtonClick,
  };
}

export default useFileForm;

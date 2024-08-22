import { isURL } from "@shared/utils";
import { useDataStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { loadEnvs } from "@workers/core";
import { type ChangeEvent, useMemo, useRef, useState } from "react";

function useFileForm() {
  const { isLoading: loadingPyodide } = useQuery({
    queryKey: ["pyodide"],
    queryFn: loadEnvs,
  });

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
    if (isFileValid() && fileInputRef.current?.files?.[0]) {
      load(fileInputRef.current?.files?.[0]);
    } else if (isURL(urlInput)) {
      load(urlInput);
    }
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

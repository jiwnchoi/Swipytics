import { isURL } from "@shared/utils";
import { useDataStore } from "@stores";
import { type ChangeEvent, useMemo, useRef, useState } from "react";

function useFileForm() {
  const loading = useDataStore(state => state.loading);
  const load = useDataStore(state => state.load);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [urlInput, setUrlInput] = useState("");

  const validUrl = useMemo(() => isURL(urlInput), [urlInput]);
  const isFileValid = () => fileInputRef.current?.files?.[0] !== undefined;

  const inputDisabled = useMemo(() => isFileValid() && !validUrl, [validUrl]);

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
    } else if (validUrl) {
      load(urlInput);
    }
  };

  return {
    loading,
    fileInputRef,
    load,
    handleInputChange,
    urlInput,
    inputDisabled,
    handleSubmit,
    handleFileChange,
    handleFileButtonClick,
  };
}

export default useFileForm;

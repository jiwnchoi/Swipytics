import { isURL } from "@shared/utils";
import { type ChangeEvent, useRef, useState } from "react";
import useLoadData from "./useLoadData";

function useFileForm() {
  const {
    loading: loadingData,
    initializeSessionWithFile,
    initializeSessionWithURL,
  } = useLoadData();

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
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      await initializeSessionWithFile(file);
    } else if (isURL(pathInput)) {
      await initializeSessionWithURL(pathInput);
    }
  };

  const inputDisabled = !pathInput && !fileInputRef.current?.files?.length;

  return {
    fileInputRef,
    inputDisabled,

    loadingData,

    pathInput,
    handleInputChange,

    handleSubmit,
    handleFileChange,
    handleFileButtonClick,
  };
}

export default useFileForm;

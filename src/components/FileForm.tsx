import {
  Button,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFileForm, usePyodide } from "@hooks";
import { FileUploadIcon } from "hugeicons-react";

export default function FileForm() {
  const { loadingPyodide } = usePyodide();
  const {
    loadingData,
    fileInputRef,
    pathInput,
    inputDisabled,
    handleFileButtonClick,
    handleFileChange,
    handleInputChange,
    handleSubmit,
  } = useFileForm();

  return (
    <Flex as={FormControl} flexDir={"column"} gap={0}>
      <InputGroup>
        <Input placeholder="URL 또는 파일 선택" onChange={handleInputChange} value={pathInput} />
        <InputRightElement>
          <Input
            type="file"
            display={"none"}
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv,.json"
          />
          <IconButton
            aria-label="파일 선택"
            icon={<Icon as={FileUploadIcon} />}
            variant={"link"}
            onClick={handleFileButtonClick}
          />
        </InputRightElement>
      </InputGroup>
      <Button
        mt={2}
        colorScheme="gray"
        type="submit"
        isLoading={loadingData || loadingPyodide}
        loadingText={`Loading ${loadingData ? "data" : "pyodide"}...`}
        isDisabled={inputDisabled}
        onClick={handleSubmit}>
        {inputDisabled ? "Please Input Data" : "Load Data"}
      </Button>
    </Flex>
  );
}

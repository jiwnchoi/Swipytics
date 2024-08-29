import {
  Flex,
  type FlexProps,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFileForm, usePyodide } from "@hooks";
import { FileAttachmentIcon, StartUp02Icon } from "hugeicons-react";

interface FileFormProps extends FlexProps {}

export default function FileForm(props: FileFormProps) {
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
    <Flex as={FormControl} {...props}>
      <InputGroup>
        <Input
          placeholder="Input .csv/.json Link or File"
          onChange={handleInputChange}
          value={pathInput}
          borderRightRadius={0}
          _focusVisible={{ borderColor: "blue.200" }}
        />
        <InputRightElement>
          <Input
            type="file"
            display={"none"}
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv,.json"
          />
          <IconButton
            aria-label="Select File"
            icon={<Icon as={FileAttachmentIcon} />}
            variant={"link"}
            onClick={handleFileButtonClick}
          />
        </InputRightElement>
      </InputGroup>
      <IconButton
        borderLeftRadius={0}
        colorScheme="blue"
        type="submit"
        isLoading={loadingData || loadingPyodide}
        icon={<Icon as={StartUp02Icon} />}
        aria-label="Load Data"
        isDisabled={inputDisabled}
        onClick={handleSubmit}>
        {inputDisabled ? "Please Input Data" : "Load Data"}
      </IconButton>
    </Flex>
  );
}

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
import { useFileForm, useLoadingStatus } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";

import { FileAttachmentIcon, StartUp02Icon } from "hugeicons-react";

export default function FileForm(props: FlexProps) {
  const { loading } = useLoadingStatus();
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
          placeholder="https://..."
          onChange={handleInputChange}
          value={pathInput}
          borderRightRadius={0}
          _focusVisible={{ borderColor: PRIMARY_COLOR }}
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
            data-log-click={"file-attachment"}
          />
        </InputRightElement>
      </InputGroup>
      <IconButton
        borderLeftRadius={0}
        colorScheme={PRIMARY_COLOR}
        type="submit"
        isLoading={loadingData || loading}
        icon={<Icon as={StartUp02Icon} />}
        aria-label="Load Data"
        isDisabled={inputDisabled}
        data-log-click={"submit-data"}
        onClick={handleSubmit}>
        {inputDisabled ? "Please Input Data" : "Load Data"}
      </IconButton>
    </Flex>
  );
}

import {
  Button,
  Divider,
  Flex,
  type FlexProps,
  Icon,
  IconButton,
  Input,
  Select,
  type StackProps,
  TabPanel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDemo, useLoadingStatus, useSettings } from "@hooks";
import { DEMO_LIST, PRIMARY_COLOR } from "@shared/constants";
import {
  ArrowDown01Icon,
  CloudIcon,
  Moon01Icon,
  SmartPhone01Icon,
  StartUp02Icon,
  Sun03Icon,
} from "hugeicons-react";
import FileForm from "./FileForm";

interface SettingRowProps extends FlexProps {
  label: string;
  children: React.ReactNode;
}

function SettingRow({ label, children, ...props }: SettingRowProps) {
  return (
    <Flex w="full" flexDir={"row"} justify={"space-between"} alignItems={"center"} {...props}>
      <Text minW={"130px"}>{label}</Text>
      {children}
    </Flex>
  );
}

function DemoSelector() {
  const { handleSubmit, loading, selectedDemo, handleDemoSelect } = useDemo();
  const { loading: loadingRouter } = useLoadingStatus();
  return (
    <>
      <Select
        size="sm"
        onChange={(e) =>
          handleDemoSelect(DEMO_LIST.find((demo) => demo.name === e.target.value) ?? null)
        }
        placeholder="Select Demo"
        variant="outline"
        colorScheme={PRIMARY_COLOR}
        icon={<Icon as={ArrowDown01Icon} />}
        borderRightRadius={0}>
        {DEMO_LIST.map((demo) => (
          <option key={demo.name} value={demo.name}>
            {demo.name}
          </option>
        ))}
      </Select>
      <IconButton
        borderLeftRadius={0}
        colorScheme={PRIMARY_COLOR}
        type="submit"
        isLoading={loading || loadingRouter}
        isDisabled={!selectedDemo || loadingRouter}
        icon={<Icon as={StartUp02Icon} />}
        aria-label="Load Data"
        onClick={handleSubmit}
      />
    </>
  );
}

function Settings(props: StackProps) {
  const {
    python,
    handleServerButtonClick,
    apiKey,
    handleApiKeyChange,
    handleDownloadLogs,
    colorMode,
    toggleColorMode,
    locale,
    setLocale,
  } = useSettings();
  return (
    <TabPanel as={VStack} {...props}>
      <SettingRow label={"Load Data"}>
        <FileForm w="full" />
      </SettingRow>
      <SettingRow label={"Load Demo"}>
        <DemoSelector />
      </SettingRow>
      <SettingRow label={"OpenAI Key"}>
        <Input w="full" placeholder="sk-..." value={apiKey} onChange={handleApiKeyChange} />
      </SettingRow>

      <Divider my={4} />

      <SettingRow label={"Locale"}>
        <Select
          size="sm"
          variant="outline"
          value={locale}
          onChange={(e) => {
            setLocale(e.target.value as "en" | "ko");
          }}>
          <option value="en">English</option>
          <option value="ko">한국어</option>
        </Select>
      </SettingRow>
      <SettingRow label={"Color Mode"}>
        <Button
          leftIcon={<Icon as={colorMode === "light" ? Sun03Icon : Moon01Icon} />}
          onClick={toggleColorMode}
          size="sm"
          w={"full"}>
          {colorMode === "light" ? "Light" : "Dark"}
        </Button>
      </SettingRow>
      <SettingRow label={"Backend"}>
        <Button
          leftIcon={<Icon as={python === "server" ? CloudIcon : SmartPhone01Icon} />}
          onClick={handleServerButtonClick}
          size="sm"
          w={"full"}>
          {python && python[0].toUpperCase() + python?.slice(1)}
        </Button>
      </SettingRow>
      <SettingRow label={"System Logs"}>
        <Flex gap={2} w={"full"}>
          <Button w="full" onClick={handleDownloadLogs}>
            Load Latest
          </Button>
          <Button w="full" onClick={handleDownloadLogs}>
            Download
          </Button>
        </Flex>
      </SettingRow>
    </TabPanel>
  );
}

export default Settings;

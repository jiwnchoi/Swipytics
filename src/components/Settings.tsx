import {
  Button,
  Divider,
  Flex,
  type FlexProps,
  Icon,
  IconButton,
  Select,
  type StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDemo, useLoadingStatus, useSettings } from "@hooks";
import { DEMO_LIST, PRIMARY_COLOR } from "@shared/constants";
import {
  ArrowDown01Icon,
  ChartBreakoutSquareIcon,
  CleanIcon,
  CloudIcon,
  Moon01Icon,
  ReloadIcon,
  Share01Icon,
  SmartPhone01Icon,
  StartUp02Icon,
  Sun03Icon,
} from "hugeicons-react";
import { t } from "i18next";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import FileForm from "./FileForm";

interface SettingRowProps extends FlexProps {
  label: string;
  children: React.ReactNode;
}
const SettingRow = memo(SettingRowImpl);

function SettingRowImpl({ label, children, ...props }: SettingRowProps) {
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
  const { t } = useTranslation();
  return (
    <>
      <Select
        size="md"
        onChange={(e) =>
          handleDemoSelect(DEMO_LIST.find((demo) => demo.name === e.target.value) ?? null)
        }
        data-log-change="select-demo"
        placeholder={t("settings.select_demo")}
        variant="outline"
        colorScheme={PRIMARY_COLOR}
        icon={<Icon as={ArrowDown01Icon} boxSize={5} />}
        borderRightRadius={0}>
        {DEMO_LIST.map((demo) => (
          <option key={demo.name} value={demo.name}>
            {demo.name}
          </option>
        ))}
      </Select>
      <IconButton
        size={"md"}
        borderLeftRadius={0}
        colorScheme={PRIMARY_COLOR}
        type="submit"
        isLoading={loading || loadingRouter}
        isDisabled={!selectedDemo || loadingRouter}
        icon={<Icon as={StartUp02Icon} boxSize={5} />}
        aria-label={t("settings.load_data")}
        onClick={handleSubmit}
        data-log-click="load_demo"
      />
    </>
  );
}

function Settings(props: StackProps) {
  const {
    python,
    handleServerButtonClick,
    handleClearLogs,
    handleShareLogs,
    handleShareSession,
    handleRefreshApp,
    colorMode,
    toggleColorMode,
    locale,
    setLocale,
  } = useSettings();
  return (
    <VStack {...props}>
      <SettingRow label={t("settings.load_data")}>
        <FileForm w="full" />
      </SettingRow>
      <SettingRow label={t("settings.load_demo")}>
        <DemoSelector />
      </SettingRow>

      <Divider my={4} />

      <SettingRow label={t("settings.set_locale")}>
        <Select
          size="sm"
          variant="outline"
          value={locale}
          data-log-change="select-locale"
          onChange={(e) => {
            setLocale(e.target.value as "en" | "ko");
          }}>
          <option value="en">English</option>
          <option value="ko">한국어</option>
        </Select>
      </SettingRow>
      <SettingRow label={t("settings.set_color")}>
        <Button
          leftIcon={<Icon as={colorMode === "light" ? Sun03Icon : Moon01Icon} />}
          onClick={toggleColorMode}
          data-log-click="toggle_color_mode"
          size="sm"
          w={"full"}>
          {colorMode === "light" ? "Light" : "Dark"}
        </Button>
      </SettingRow>
      <SettingRow label={t("settings.set_backend")}>
        <Button
          leftIcon={<Icon as={python === "server" ? CloudIcon : SmartPhone01Icon} />}
          onClick={() => {
            handleServerButtonClick();
          }}
          data-log-click="toggle_server"
          size="sm"
          w={"full"}>
          {python && python[0].toUpperCase() + python?.slice(1)}
        </Button>
      </SettingRow>
      <SettingRow label={t("settings.monitor_logs")}>
        <Flex gap={2} w={"full"}>
          <IconButton
            aria-label={t("settings.refresh_app")}
            icon={<Icon as={ReloadIcon} boxSize={5} />}
            w="full"
            onClick={handleRefreshApp}
            data-log-click="refresh_app"
          />
          <IconButton
            aria-label={t("settings.clear_logs")}
            icon={<Icon as={CleanIcon} boxSize={5} />}
            w="full"
            onClick={handleClearLogs}
            data-log-click="clean_logs"
          />
          <IconButton
            aria-label={t("settings.share_logs")}
            icon={<Icon as={Share01Icon} boxSize={5} />}
            w="full"
            onClick={handleShareLogs}
            data-log-click="share_logs"
          />
          <IconButton
            aria-label={"Share Charts"}
            icon={<Icon as={ChartBreakoutSquareIcon} boxSize={5} />}
            w="full"
            onClick={() => {
              handleShareSession();
            }}
            data-log-click="share_charts"
          />
        </Flex>
      </SettingRow>
    </VStack>
  );
}

export default memo(Settings);

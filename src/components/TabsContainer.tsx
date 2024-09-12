import {
  Center,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  type TabsProps,
} from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { type FirstBracketIcon } from "hugeicons-react";
import { type ReactNode } from "react";

interface TabConfiguration {
  type: string;
  icon: typeof FirstBracketIcon;
  panel: ReactNode;
  displayingBeforeInit: boolean;
}

interface TabsContainerProps extends Omit<TabsProps, "children"> {
  tabs: TabConfiguration[];
}

function TabsContainer({ tabs, ...props }: TabsContainerProps) {
  const { tabIconSize, tabPanelHeight, scrollbarStyle } = useLayout();
  const fields = useSessionsStore((state) => state.fields);
  const initialized = fields.length > 0;
  const settingIndex = tabs.findIndex((config) => config.type === "Settings");

  return (
    <Tabs w={"full"} defaultIndex={settingIndex} isFitted colorScheme={PRIMARY_COLOR} {...props}>
      <TabList>
        {tabs.map((config) => (
          <Tab
            gap={1}
            as={Center}
            flexDir={"column"}
            key={`tab-${config.type}`}
            isDisabled={!initialized && !config.displayingBeforeInit}>
            <Icon boxSize={tabIconSize} as={config.icon} />
            <Text fontSize={12}>{config.type}</Text>
          </Tab>
        ))}
      </TabList>
      <TabPanels mt={4} flex={1} overflow={"auto"} h={tabPanelHeight} sx={scrollbarStyle}>
        {tabs.map((config) => (
          <TabPanel key={`tabpanel-${config.type}`}>{config.panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default TabsContainer;

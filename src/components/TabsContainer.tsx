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
import { useInteractionStore, useSessionsStore } from "@stores";
import { type FirstBracketIcon } from "hugeicons-react";
import { type ReactNode } from "react";

interface TabConfiguration {
  name: string;
  displayName: string;
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

  const tabIndex = useInteractionStore((state) => state.tabIndex);
  const setTabByIndex = useInteractionStore((state) => state.setTabByIndex);

  return (
    <Tabs
      w={"full"}
      defaultIndex={tabIndex}
      index={tabIndex}
      onChange={setTabByIndex}
      isFitted
      colorScheme={PRIMARY_COLOR}
      {...props}>
      <TabList>
        {tabs.map((config) => (
          <Tab
            gap={1}
            as={Center}
            flexDir={"column"}
            key={`tab-${config.name}`}
            isDisabled={!initialized && !config.displayingBeforeInit}
            data-log-click={{ key: `tab-${config.name}`, data: {} }}>
            <Icon boxSize={tabIconSize} as={config.icon} />
            <Text fontSize={"sm"}>{config.displayName}</Text>
          </Tab>
        ))}
      </TabList>
      <TabPanels mt={4} flex={1} overflow={"auto"} h={tabPanelHeight} sx={scrollbarStyle}>
        {tabs.map((config) => (
          <TabPanel key={`tabpanel-${config.name}`}>{config.panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default TabsContainer;

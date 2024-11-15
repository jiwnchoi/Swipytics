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
  Panel: ReactNode;
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

  const { mobile } = useLayout();
  const filteredTabs = tabs.filter((config) =>
    !mobile && config.name === "charts" ? false : true,
  );

  return (
    <Tabs
      display={"flex"}
      w={"full"}
      defaultIndex={filteredTabs.length - 1}
      index={tabIndex >= 0 ? tabIndex : filteredTabs.length + tabIndex}
      onChange={setTabByIndex}
      isFitted
      colorScheme={PRIMARY_COLOR}
      {...props}>
      <TabList my={2}>
        {filteredTabs.map((config) => (
          <Tab
            gap={1}
            as={Center}
            flexDir={"column"}
            key={`tab-${config.name}`}
            isDisabled={!initialized && !config.displayingBeforeInit}
            data-log-click={`tab-${config.name}`}>
            <Icon boxSize={tabIconSize} as={config.icon} />
            <Text fontSize={"xs"}>{config.displayName}</Text>
          </Tab>
        ))}
      </TabList>
      <TabPanels flex={1} overflow={"auto"} maxH={tabPanelHeight} sx={scrollbarStyle}>
        {filteredTabs.map((config) => (
          <TabPanel key={`tabpanel-${config.name}`}>{config.Panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default TabsContainer;

import {
  Center,
  Flex,
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
import { type ReactElement } from "react";
import ScrollIndicator from "./ScrollIndicator";

interface TabConfiguration {
  name: string;
  displayName: string;
  icon: typeof FirstBracketIcon;
  Panel: ReactElement;
  displayingBeforeInit: boolean;
}

interface TabsContainerProps extends Omit<TabsProps, "children"> {
  tabs: TabConfiguration[];
}

function TabsContainerBase({ tabs, ...props }: TabsContainerProps) {
  const { tabIconSize, cardWidth, cardHeight, cardColor, scrollbarStyle } = useLayout();
  const fields = useSessionsStore((state) => state.fields);
  const initialized = fields.length > 0;

  const tabIndex = useInteractionStore((state) => state.tabIndex);
  const setTabByIndex = useInteractionStore((state) => state.setTabByIndex);

  const filteredTabs = tabs.filter((config) => config.name !== "settings");
  return (
    <>
      <Tabs
        display={"flex"}
        w={"full"}
        index={tabIndex < 0 ? tabs.length + tabIndex : tabIndex}
        onChange={setTabByIndex}
        isFitted
        // isLazy
        colorScheme={PRIMARY_COLOR}
        {...props}>
        <TabPanels overflow={"hidden"}>
          {tabs.map((config) => (
            <TabPanel key={`tabpanel-${config.name}`}>
              <Flex
                maxW={cardWidth}
                bg={cardColor}
                borderRadius={"md"}
                flexDir={"column"}
                h={cardHeight}
                sx={scrollbarStyle}
                p={4}>
                {config.Panel}
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
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
      </Tabs>
      <ScrollIndicator
        left={2}
        w={8}
        h={cardHeight}
        visibility={tabIndex === 0 ? "visible" : "hidden"}
      />
    </>
  );
}

export default TabsContainerBase;

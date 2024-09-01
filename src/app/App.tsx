import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import {
  ChartPanel,
  ControlPanel,
  ControlPanelContent,
  ControlPanelNavigator,
  Controller,
  Settings,
} from "@components";
import { useLayout } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";

export default function App() {
  const { cardHeight, cardColor } = useLayout();

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      h={cardHeight}
      gap={4}
      flexDir={{ base: "column", lg: "row" }}>
      <ChartPanel flexDir={"column"} gap={{ base: 0, lg: 4 }} />
      <ControlPanel bgColor={cardColor} borderRadius={"lg"} minW={{ base: "full", lg: "sm" }}>
        <ControlPanelNavigator>
          <Controller gap={2} w={"full"} />
        </ControlPanelNavigator>
        <ControlPanelContent>
          <Tabs w={"full"} defaultIndex={2} isLazy isFitted colorScheme={PRIMARY_COLOR}>
            <TabList>
              <Tab>Bookmarks</Tab>
              <Tab>Information</Tab>
              <Tab>Settings</Tab>
            </TabList>
            <TabPanels mt={4}>
              <TabPanel>Bookmarks at Here</TabPanel>
              <TabPanel>Chart Description and Explanation at Here</TabPanel>
              <TabPanel>
                <Settings align={"start"} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ControlPanelContent>
      </ControlPanel>
    </Flex>
  );
}

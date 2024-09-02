import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import {
  Bookmarks,
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
  const { cardHeight, cardColor, tabPanelHeight } = useLayout();

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      maxH={cardHeight}
      h={cardHeight}
      gap={4}
      flex={1}
      flexDir={{ base: "column", lg: "row" }}>
      <ChartPanel w="full" flexDir={"column"} gap={{ base: 0, lg: 4 }} />
      <ControlPanel
        bgColor={cardColor}
        borderRadius={"lg"}
        w={{ base: "full", lg: "sm" }}
        minW={{ base: "full", lg: "sm" }}
        maxW={{ base: "full", lg: "sm" }}>
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
            <TabPanels mt={4} flex={1} overflow={"auto"} h={tabPanelHeight}>
              <Bookmarks p={0} m={0} gap={2} w="full" />
              <TabPanel>Chart Description and Explanation at Here</TabPanel>
              <Settings align={"start"} />
            </TabPanels>
          </Tabs>
        </ControlPanelContent>
      </ControlPanel>
    </Flex>
  );
}

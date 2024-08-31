import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import {
  Chart,
  ChartPanel,
  ControlPanel,
  ControlPanelContent,
  ControlPanelNavigator,
  Controller,
  PlaceHolder,
  Settings,
} from "@components";
import { useLayout, useSession } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession();
  const { cardHeight, cardColor, cardWidth } = useLayout();

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      h={cardHeight}
      gap={4}
      flexDir={{ base: "column", lg: "row" }}>
      <ChartPanel ref={scrollContainerRef} flexDir={"column"} gap={{ base: 0, lg: 4 }}>
        <PlaceHolder
          flexDir={"column"}
          minW="full"
          w={cardWidth}
          minH={cardHeight}
          bgColor={cardColor}
          borderRadius={"lg"}
        />
        {charts.map(chart => (
          <Chart
            w={cardWidth}
            maxW={cardWidth}
            key={chart.key}
            chart={chart}
            minH={cardHeight}
            bgColor={cardColor}
            flexDirection={"column"}
            borderRadius={"lg"}
          />
        ))}
      </ChartPanel>
      <ControlPanel bgColor={cardColor} borderRadius={"lg"} minW={{ base: "full", lg: "sm" }}>
        <ControlPanelNavigator>
          <Controller
            gap={2}
            w={"full"}
            scrollToChart={scrollToChart}
            renewCurrentChart={renewCurrentChart}
            currentChartIndex={currentChartIndex}
            disabled={charts.length === 0}
          />
        </ControlPanelNavigator>
        <ControlPanelContent>
          <Tabs
            w={"full"}
            defaultIndex={charts.length ? 1 : 2}
            isLazy
            isFitted
            colorScheme={PRIMARY_COLOR}>
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

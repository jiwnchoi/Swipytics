import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
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
import { useSession } from "@hooks";
import { PRIMARY_COLOR } from "@theme";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession();
  const cardHeight = useBreakpointValue({ base: "100vh", lg: "80vh" });
  const cardColor = useColorModeValue("gray.50", "gray.900");

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
          p={4}
          w={"3xl"}
          minH={cardHeight}
          bgColor={cardColor}
          borderRadius={"lg"}
          boxShadow={"xl"}
        />
        {charts.map(chart => (
          <Chart
            maxW={{ base: window.innerWidth, lg: "3xl" }}
            key={chart.key}
            chart={chart}
            minH={cardHeight}
            bgColor={cardColor}
            flexDirection={"column"}
            borderRadius={"lg"}
            boxShadow={"xl"}
          />
        ))}
      </ChartPanel>
      <ControlPanel
        bgColor={cardColor}
        borderRadius={"lg"}
        w={{ base: "full", lg: "sm" }}
        boxShadow={"xl"}>
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
            defaultIndex={charts.length ? 1 : 2}
            isLazy
            isFitted
            size={"md"}
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

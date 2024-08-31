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
  FileForm,
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
          {charts.length === 0 ? (
            <FileForm />
          ) : (
            <Controller
              w="full"
              gap={2}
              scrollToChart={scrollToChart}
              renewCurrentChart={renewCurrentChart}
              currentChartIndex={currentChartIndex}
              disabled={charts.length === 0}
            />
          )}
        </ControlPanelNavigator>
        <ControlPanelContent>
          <Tabs isLazy isFitted w="full" size={"md"} colorScheme={PRIMARY_COLOR}>
            <TabList>
              <Tab>Information</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels mt={4}>
              <TabPanel p={0}>Chart Description and Explanation at Here</TabPanel>
              <TabPanel p={0}>
                <Settings w="full" align={"start"} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ControlPanelContent>
      </ControlPanel>
    </Flex>
  );
}

import { Flex, VStack, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import {
  Chart,
  ChartPanel,
  ControlPanel,
  Controller,
  FileForm,
  PlaceHolder,
  Settings,
} from "@components";
import { useSession } from "@hooks";

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
          w={"4xl"}
          h={cardHeight}
          bgColor={cardColor}
          borderRadius={"lg"}
          boxShadow={"xl"}
        />
        {charts.map(chart => (
          <Chart
            maxW={{ base: window.innerWidth, lg: "4xl" }}
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
        <VStack w={"full"} h={"fit-content"} gap={4} rounded="lg" p={4} align={"start"}>
          {charts.length > 0 ? (
            <Controller
              w="full"
              gap={2}
              scrollToChart={scrollToChart}
              renewCurrentChart={renewCurrentChart}
              currentChartIndex={currentChartIndex}
              disabled={charts.length === 0}
            />
          ) : (
            <FileForm />
          )}
          <Settings w="full" align={"start"} />
        </VStack>
      </ControlPanel>
    </Flex>
  );
}

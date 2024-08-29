import { Card, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Chart, ChartPanel, ControlPanel, ControlPanelContent, PlaceHolder } from "@components";
import { useSession } from "@hooks";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession();
  const cardHeight = useBreakpointValue({ base: "100vh", lg: "80vh" });
  const mobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      h={cardHeight}
      gap={4}
      flexDir={{ base: "column", lg: "row" }}>
      <ChartPanel ref={scrollContainerRef} flexDir={"column"} gap={{ base: 0, lg: 4 }}>
        <PlaceHolder as={Card} flexDir={"column"} minW="full" gap={4} h={cardHeight} />
        {charts.map(chart => (
          <Chart key={chart.key} chart={chart} minH={cardHeight} />
        ))}
      </ChartPanel>
      <ControlPanel mobile={!!mobile}>
        <ControlPanelContent
          w={{ base: "full", lg: "md" }}
          disabled={charts.length === 0}
          currentChartIndex={currentChartIndex}
          scrollToChart={scrollToChart}
          renewCurrentChart={renewCurrentChart}
        />
      </ControlPanel>
    </Flex>
  );
}

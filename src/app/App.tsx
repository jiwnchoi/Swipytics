import { Card, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Chart, ChartPanel, ControlPanel, ControlPanelContent, PlaceHolder } from "@components";
import { useSession } from "@hooks";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession();
  const cardHeight = useBreakpointValue({ base: "100vh", lg: "80vh" });
  const cardPadding = useBreakpointValue({ base: 0, lg: 2 });
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? false;

  return (
    <Flex
      minW={{ base: "full", lg: "container.xl" }}
      h={cardHeight}
      flexDir={{ base: "column", lg: "row" }}>
      <ChartPanel
        ref={scrollContainerRef}
        p={cardPadding}
        maxH={cardHeight}
        flexDir={"column"}
        gap={{ base: 0, lg: 4 }}>
        <PlaceHolder
          as={Card}
          flexDir={"column"}
          minW="full"
          h={cardHeight}
          gap={4}
          p={cardPadding}
        />
        {charts.map(chart => (
          <Chart
            key={chart.key}
            p={cardPadding}
            chart={chart}
            minH={cardHeight}
            chartWidth={{
              base: 300,
              lg: 550,
            }}
            chartHeight={{
              base: 300,
              lg: 500,
            }}
          />
        ))}
      </ChartPanel>
      <ControlPanel isMobile={isMobile}>
        <ControlPanelContent
          p={2}
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

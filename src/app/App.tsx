import { Card, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import {
  Chart,
  ChartPanel,
  ControlPanel,
  ControlPanelContent,
  Controller,
  FileForm,
  PlaceHolder,
} from "@components";
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
        <ControlPanelContent w={{ base: "full", lg: "md" }}>
          <Controller
            w="full"
            gap={2}
            scrollToChart={scrollToChart}
            renewCurrentChart={renewCurrentChart}
            currentChartIndex={currentChartIndex}
            disabled={charts.length === 0}
          />
          <Heading size="sm">Load File</Heading>
          <FileForm />
          {/* <Heading size="sm">Settings</Heading>
          <Button>Settings</Button>
          <Button>Load Demo</Button> */}
        </ControlPanelContent>
      </ControlPanel>
    </Flex>
  );
}

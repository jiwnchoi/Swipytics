import { Card, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Chart, Controller, FileForm } from "@components";
import { useSession } from "@hooks";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession("dummy-session");
  const cardHeight = useBreakpointValue({ base: "100vh", md: "80vh" });
  const cardPadding = useBreakpointValue({ base: 0, md: 2 });

  return (
    <Flex
      w={{ base: "full", md: "container.xl" }}
      h={cardHeight}
      flexDir={{ base: "column", md: "row" }}>
      <Flex w="full" flexDir={"column"} gap={4} minH={"100lvh"}>
        <Flex
          p={cardPadding}
          ref={scrollContainerRef}
          flexDir={"column"}
          w={"full"}
          maxH={cardHeight}
          gap={{ base: 0, md: 4 }}
          scrollSnapType={"y mandatory"}
          overflowY={"auto"}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}>
          {charts.map(chart => (
            <Chart
              key={chart.key}
              p={cardPadding}
              chart={chart}
              minH={cardHeight}
              chartWidth={{
                base: 300,
                lg: 500,
              }}
              chartHeight={{
                base: 300,
                lg: 500,
              }}
            />
          ))}
        </Flex>
      </Flex>
      <Flex w={{ base: "full", md: "md" }} p={cardPadding} display={{ base: "none", md: "block" }}>
        <Card
          flexDir={"column"}
          h={"full"}
          justifyContent={"space-between"}
          rounded="lg"
          padding={4}
          bottom={0}>
          <FileForm />
          <Controller
            scrollToChart={scrollToChart}
            renewCurrentChart={renewCurrentChart}
            currentChartIndex={currentChartIndex}
          />
        </Card>
      </Flex>
    </Flex>
  );
}

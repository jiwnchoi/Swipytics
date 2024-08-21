import { Card, Flex } from "@chakra-ui/react";
import { Chart, Controller } from "@components";
import { useSession } from "@hooks";

const HEIGHT = "80vh";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession("dummy-session");

  return (
    <Flex
      w={{ base: "full", md: "container.xl" }}
      h={{ base: "full", md: HEIGHT }}
      flexDir={{ base: "column", md: "row" }}>
      <Flex w="full" flexDir={"column"} gap={4} minH={"100lvh"}>
        <Flex
          p={2}
          ref={scrollContainerRef}
          flexDir={"column"}
          w={"full"}
          maxH={{ base: "full", md: HEIGHT }}
          gap={4}
          rounded="md"
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
              p={2}
              chart={chart}
              minH={HEIGHT}
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
      <Flex w={{ base: "full", md: "md" }} p={2}>
        <Card
          flexDir={"column"}
          w="full"
          justifyContent={"space-between"}
          p={4}
          rounded="lg"
          bottom={0}>
          This Chart contains ...
          <Controller
            scrollToChart={scrollToChart}
            currentChartIndex={currentChartIndex}
            renewCurrentChart={renewCurrentChart}
          />
        </Card>
      </Flex>
    </Flex>
  );
}

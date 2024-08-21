import { Card, Flex } from "@chakra-ui/react";
import { Chart, Controller } from "@components";
import { useSession } from "@hooks";

export default function App() {
  const { scrollContainerRef, currentChartIndex, charts, scrollToChart, renewCurrentChart } =
    useSession("dummy-session");

  return (
    <Flex
      w={{ base: "full", md: "container.xl" }}
      h={{ base: "full", md: "80vh" }}
      flexDir={{ base: "column", md: "row" }}
      gap={4}>
      <Flex w="full" flexDir={"column"} gap={4} minH={"100lvh"}>
        <Flex
          ref={scrollContainerRef}
          flexDir={"column"}
          w={"full"}
          maxH={{ base: "full", md: "80vh" }}
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
              chart={chart}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={4}
              minW="full"
              minH={"80vh"}
              chartWidth={{
                base: 300,
                lg: 500,
              }}
              chartHeight={{
                base: 300,
                lg: 500,
              }}
              scrollSnapAlign={"start"}
              key={chart.key}
            />
          ))}
        </Flex>
      </Flex>
      <Flex
        as={Card}
        flexDir={"column"}
        justifyContent={"space-between"}
        w={{ base: "full", md: "md" }}
        p={4}
        rounded="md"
        bottom={0}>
        This Chart contains ...
        <Controller
          scrollToChart={scrollToChart}
          currentChartIndex={currentChartIndex}
          renewCurrentChart={renewCurrentChart}
        />
      </Flex>
    </Flex>
  );
}

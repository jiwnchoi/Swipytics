import { Flex, type FlexProps } from "@chakra-ui/react";
import { useChartContainer, useLayout } from "@hooks";
import Chart from "./Chart";
import PlaceHolder from "./PlaceHolder";

export default function ChartContainer(props: FlexProps) {
  const { charts, ref } = useChartContainer();
  const { cardHeight, cardColor, cardWidth } = useLayout();
  return (
    <Flex
      ref={ref}
      scrollSnapType={"x mandatory"}
      overflowX={"auto"}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      {...props}>
      <PlaceHolder
        flexDir={"column"}
        minW="full"
        w={cardWidth}
        maxW={cardWidth}
        minH={cardHeight}
        bgColor={cardColor}
        borderRadius={"lg"}
        scrollSnapAlign={"center"}
      />
      {charts.map((chart) => (
        <Chart
          minW={cardWidth}
          maxW={cardWidth}
          key={chart.key}
          chart={chart}
          minH={cardHeight}
          bgColor={cardColor}
          flexDirection={"column"}
          borderRadius={"lg"}
        />
      ))}
    </Flex>
  );
}

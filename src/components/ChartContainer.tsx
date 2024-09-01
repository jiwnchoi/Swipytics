import { Flex, type FlexProps } from "@chakra-ui/react";
import { useChartContainer, useLayout } from "@hooks";
import Chart from "./Chart";
import PlaceHolder from "./PlaceHolder";

export default function ChartContainer(props: FlexProps) {
  const { charts, ref } = useChartContainer();
  const { cardHeight, cardColor, cardWidth } = useLayout();
  return (
    <Flex
      {...props}
      ref={ref}
      w={"full"}
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
      <PlaceHolder
        flexDir={"column"}
        minW="full"
        w={cardWidth}
        minH={cardHeight}
        bgColor={cardColor}
        borderRadius={"lg"}
      />
      {charts.map(chart => (
        <Chart
          w={cardWidth}
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

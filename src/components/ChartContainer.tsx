import { Flex, type FlexProps } from "@chakra-ui/react";
import { useChartContainer, useLayout } from "@hooks";
import Chart from "./Chart";
import PlaceHolder from "./PlaceHolder";

interface ChartContainerProps extends FlexProps {
  orientation?: "horizontal" | "vertical";
}

export default function ChartContainer({
  orientation = "vertical",
  ...props
}: ChartContainerProps) {
  const { charts, ref, scrollContainerCallback } = useChartContainer({ orientation });
  const { cardHeight, cardColor, cardWidth } = useLayout();

  return (
    <Flex
      ref={ref}
      onScroll={(e) => scrollContainerCallback(e.currentTarget)}
      data-log-scroll={"chart-container"}
      scrollSnapType={`${orientation === "horizontal" ? "x" : "y"} mandatory`}
      flexDir={orientation === "horizontal" ? "row" : "column"}
      gap={2}
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
        h={cardHeight}
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

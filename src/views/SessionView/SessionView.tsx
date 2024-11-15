import { Flex, type FlexProps } from "@chakra-ui/react";
import { Chart, PlaceHolder } from "@components";
import { useLayout } from "@hooks";
import useSessionView from "./useSessionView";

interface ChartContainerProps extends FlexProps {
  orientation?: "horizontal" | "vertical";
}

export default function SessionView({ orientation = "vertical", ...props }: ChartContainerProps) {
  const { cardHeight, cardColor, cardWidth } = useLayout();
  const { charts, ref, scrollContainerCallback } = useSessionView({
    cardHeight,
    cardWidth,
    orientation,
  });
  return (
    <Flex
      ref={ref}
      onScroll={(e) => scrollContainerCallback(e.currentTarget)}
      data-log-scroll={"chart-container"}
      scrollSnapType={`${orientation === "horizontal" ? "x" : "y"} mandatory`}
      flexDir={orientation === "horizontal" ? "row" : "column"}
      gap={2}
      overflowX={"hidden"}
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
        w={cardWidth - 8}
        maxW={cardWidth}
        h={cardHeight}
        minH={cardHeight}
        bgColor={cardColor}
        borderRadius={"lg"}
        scrollSnapAlign={"center"}
      />
      {charts.map((chart) => (
        <Chart
          minH={cardHeight - 8}
          maxH={cardHeight - 8}
          minW={cardWidth - 8}
          maxW={cardWidth - 8}
          key={chart.key}
          chart={chart}
          bgColor={cardColor}
          flexDirection={"column"}
          borderRadius={"lg"}
        />
      ))}
    </Flex>
  );
}

import { Flex, type FlexProps } from "@chakra-ui/react";
import { Chart, PlaceHolder } from "@components";
import { useLayout } from "@hooks";
import useSessionView from "./useSessionView";

export default function SessionView(props: FlexProps) {
  const { cardColor, cardInnerHeight, cardInnerWidth } = useLayout();
  const { charts, ref, scrollContainerCallback } = useSessionView();
  return (
    <Flex
      ref={ref}
      onScroll={(e) => scrollContainerCallback(e.currentTarget)}
      data-log-scroll={"chart-container"}
      scrollSnapType={`y mandatory`}
      flexDir={"column"}
      borderRadius={"lg"}
      bgColor={cardColor}
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
        minH={cardInnerHeight}
        maxH={cardInnerHeight}
        scrollSnapStop={"always"}
        scrollSnapAlign={"start"}
      />
      {charts.map((chart) => (
        <Chart
          minH={cardInnerHeight}
          maxH={cardInnerHeight}
          w={cardInnerWidth}
          key={chart.key}
          chart={chart}
          flexDirection={"column"}
          borderRadius={"lg"}
          scrollSnapStop={"always"}
          scrollSnapAlign={"start"}
        />
      ))}
    </Flex>
  );
}

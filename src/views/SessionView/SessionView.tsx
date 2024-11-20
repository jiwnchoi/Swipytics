import { Flex, type FlexProps } from "@chakra-ui/react";
import { Chart, PlaceHolder } from "@components";
import { useLayout } from "@hooks";
import useSessionView from "./useSessionView";

export default function SessionView(props: FlexProps) {
  const { cardHeight, cardColor, cardWidth } = useLayout();
  const { charts, ref, scrollContainerCallback } = useSessionView({
    cardHeight,
  });
  return (
    <Flex
      ref={ref}
      onScroll={(e) => scrollContainerCallback(e.currentTarget)}
      data-log-scroll={"chart-container"}
      scrollSnapType={`y mandatory`}
      flexDir={"column"}
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
          minH={cardHeight}
          maxH={cardHeight}
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

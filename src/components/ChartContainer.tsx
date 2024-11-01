import { Flex, type FlexProps } from "@chakra-ui/react";
import { useChartContainer, useLayout } from "@hooks";
import { useSwipeable } from "react-swipeable";
import Chart from "./Chart";
import PlaceHolder from "./PlaceHolder";
import ScrollIndicator from "./ScrollIndicator";

export default function ChartContainer(props: FlexProps) {
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("Swiped left"),
    onSwipedRight: () => console.log("Swiped right"),
    onSwipedUp: () => console.log("Swiped up"),
    onSwipedDown: () => console.log("Swiped down"),
    delta: 10,
    trackTouch: true,
    trackMouse: true,
  });

  const { charts, ref, scrollContainerCallback } = useChartContainer();
  const { mobile, cardHeight, cardColor, cardWidth } = useLayout();
  return (
    <Flex
      ref={(element: HTMLDivElement | null) => {
        handlers.ref(element);
        ref.current = element;
      }}
      onScroll={(e) => scrollContainerCallback(e.currentTarget)}
      data-log-scroll={"chart-container"}
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
      <ScrollIndicator
        top={mobile ? 0 : undefined}
        bottom={mobile ? undefined : 0}
        h={8}
        p={2}
        w="full"
      />
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

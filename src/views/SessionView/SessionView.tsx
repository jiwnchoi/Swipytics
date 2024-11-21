import { Flex, type FlexProps, keyframes } from "@chakra-ui/react";
import { Chart, PlaceHolder } from "@components";
import { useLayout } from "@hooks";
import useSessionView from "./useSessionView";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
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
      animation={`${fadeIn} 0.2s ease-in-out`}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
      sx={{
        "&.removing": {
          animation: `${fadeOut} 0.1s ease-in-out forwards`,
        },
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

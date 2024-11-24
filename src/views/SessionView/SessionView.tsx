import { Fade, Flex, Icon, IconButton, type FlexProps } from "@chakra-ui/react";
import { Chart, PlaceHolder } from "@components";
import { keyframes } from "@emotion/react";
import { useLayout } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { ArrowDown03Icon } from "hugeicons-react";
import { memo } from "react";
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
      <ScrollToBottomButton position={"absolute"} bottom={"72px"} />
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
          key={`chart-${chart.key}-${chart.timestamp}`}
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

const ScrollToBottomButton = memo(ScrollToBottomButtonImpl);

function ScrollToBottomButtonImpl(props: FlexProps) {
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const charts = useSessionsStore((state) => state.charts);
  const appendingChart = useSessionsStore((state) => state.appendingChart);
  const { cardWidth } = useLayout();
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);

  return (
    <Fade
      in={
        currentChartIndex < charts.length - 2 ||
        (appendingChart && currentChartIndex === charts.length - 2)
      }>
      <Flex {...props}>
        <IconButton
          variant="outline"
          colorScheme={PRIMARY_COLOR}
          position="absolute"
          bottom={6}
          left={cardWidth / 2 - 24}
          borderRadius="xl"
          size="lg"
          aria-label="Scroll to bottom"
          icon={<Icon as={ArrowDown03Icon} boxSize={8} />}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentChartIndex(charts.length - 2);
          }}
          data-log-click="scroll-to-bottom"
        />
      </Flex>
    </Fade>
  );
}

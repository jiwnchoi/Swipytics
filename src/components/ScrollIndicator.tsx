import { Fade, Flex, Icon, IconButton, type FlexProps } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { PRIMARY_COLOR } from "@shared/constants";
import { useInteractionStore, useSessionsStore } from "@stores";
import { useParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { motion } from "framer-motion";
import { ArrowDown03Icon } from "hugeicons-react";
import { useMemo } from "react";

function ScrollIndicator(props: FlexProps) {
  const {
    cardHeight,
    mobile,
    cardWidth,
    preferredColor,
    indicatorGap,
    indicatorPadding,
    defaultGrayColor,
  } = useLayout();
  const { parentRef, width, height } = useParentSize({ debounceTime: 50 });
  const tabIndex = useInteractionStore((state) => state.tabIndex);
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendingChart = useSessionsStore((state) => state.appendingChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);

  const getIndicators = () => {
    const r = 3;
    const activeCharts = appendingChart ? charts : charts.slice(0, -1);
    const length = Math.min(
      height - indicatorPadding.TOP - indicatorPadding.BOTTOM,
      2 * r * activeCharts.length + indicatorGap * (activeCharts.length - 1),
    );

    const scale = scaleLinear({
      domain: [0, activeCharts.length - 1],
      range: [height / 2 - length / 2, height / 2 + length / 2],
    });

    return activeCharts.map((chart, i) => ({
      key: `indicator-${chart.key}`,
      cy: scale(i),
      r: i === currentChartIndex ? 6 : 3,
      fill: chart.preferred ? preferredColor : defaultGrayColor,
    }));
  };

  const indicators = useMemo(getIndicators, [
    appendingChart,
    charts,
    height,
    indicatorPadding.TOP,
    indicatorPadding.BOTTOM,
    indicatorGap,
    currentChartIndex,
    preferredColor,
    defaultGrayColor,
  ]);

  return (
    <Flex
      ref={parentRef}
      position="absolute"
      minH="28px"
      h={cardHeight}
      visibility={!mobile || tabIndex === 0 ? "visible" : "hidden"}
      {...props}>
      <svg width={width} height={height}>
        {indicators.map(({ key, cy, r, fill }) => (
          <motion.circle
            key={key}
            cx={9}
            cy={cy}
            fill={fill}
            initial={{ r: 0 }}
            animate={{ r, fill, cy }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              fill: { duration: 0.2 },
            }}
          />
        ))}
      </svg>

      <Fade
        in={
          currentChartIndex < charts.length - 2 ||
          (appendingChart && currentChartIndex === charts.length - 2)
        }>
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
          onClick={() => setCurrentChartIndex(charts.length - 2)}
          data-log-click="scroll-to-bottom"
        />
      </Fade>
    </Flex>
  );
}

export default ScrollIndicator;

import { Flex, type FlexProps } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { useInteractionStore, useSessionsStore } from "@stores";
import { useParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { motion } from "framer-motion";
import { useMemo } from "react";

function ScrollIndicator(props: FlexProps) {
  const { cardHeight, mobile, preferredColor, indicatorGap, indicatorPadding, defaultGrayColor } =
    useLayout();
  const { parentRef, width, height } = useParentSize({ debounceTime: 50 });
  const tabIndex = useInteractionStore((state) => state.tabIndex);
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendingChart = useSessionsStore((state) => state.appendingChart);

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
    </Flex>
  );
}

export default ScrollIndicator;

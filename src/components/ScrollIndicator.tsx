import { Flex, useColorModeValue, type FlexProps } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { chakraColors } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { useParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { motion } from "framer-motion";

const padding = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

export default function ScrollIndicator(props: FlexProps) {
  const { parentRef, width, height } = useParentSize({ debounceTime: 50 });
  const { preferredColor } = useLayout();
  const innerWidth = width - padding.left - padding.right;

  const indicatorBgColor = useColorModeValue(chakraColors["gray.200"], chakraColors["gray.700"]);

  const innerHeight = height - padding.top - padding.bottom;

  const centerY = innerHeight / 2 + padding.top;

  const charts = useSessionsStore((state) => state.charts);
  const radius = charts.length > 20 ? 3 : 6;
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);

  const x = scaleLinear({
    domain: [0, charts.length - 1],
    range: [padding.left, padding.left + innerWidth],
  });

  return (
    <Flex
      ref={parentRef}
      position={"absolute"}
      minH={`${padding.top + padding.bottom + radius * 2}px`}
      {...props}>
      <svg width={width} height={height}>
        <rect
          width={innerWidth}
          x={padding.left}
          y={centerY - radius}
          height={2 * radius}
          fill={indicatorBgColor}
        />
        {charts.map((chart, i) => (
          <motion.circle
            key={`indicator-${chart.key}`}
            cy={centerY}
            initial={{ cx: x(i), scale: 0, fill: chakraColors["gray.500"], r: 4 }}
            animate={{
              cx: x(i),
              scale: 1,
              r: i === currentChartIndex ? 2 * radius : radius,
              fill: chart.preferred ? preferredColor : chakraColors["gray.500"],
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              fill: { duration: 0.3 }, // 색상 변경에 대한 별도의 전환 설정
            }}
          />
        ))}
      </svg>
    </Flex>
  );
}

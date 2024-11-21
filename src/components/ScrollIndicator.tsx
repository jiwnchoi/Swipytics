import { Flex, type FlexProps } from "@chakra-ui/react";
import { useIndicators, useLayout } from "@hooks";
import { useInteractionStore } from "@stores";
import { useParentSize } from "@visx/responsive";
import { motion } from "framer-motion";

function Indicators({ width, height, r }: { width: number; height: number; r: number }) {
  const indicators = useIndicators({ width, height, r });

  return indicators.map(({ key, cx, cy, r, fill }) => (
    <motion.circle
      key={key}
      cy={cy}
      fill={fill}
      initial={{ r: 0 }}
      animate={{ cx, cy, r, fill }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        fill: { duration: 0.2 },
      }}
    />
  ));
}
export default function ScrollIndicator(props: FlexProps) {
  const { cardHeight, mobile } = useLayout();
  const { parentRef, width, height } = useParentSize({ debounceTime: 50 });
  const tabIndex = useInteractionStore((state) => state.tabIndex);

  return (
    <Flex
      ref={parentRef}
      position={"absolute"}
      minH={`${12 * 2 + 4 * 2}px`}
      h={cardHeight}
      visibility={!mobile || tabIndex === 0 ? "visible" : "hidden"}
      {...props}>
      <svg width={width} height={height}>
        <Indicators width={width} height={height} r={3} />
      </svg>
    </Flex>
  );
}

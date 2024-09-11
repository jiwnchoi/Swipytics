import { Flex, type FlexProps } from "@chakra-ui/react";
import { useIndicators } from "@hooks";
import { useParentSize } from "@visx/responsive";
import { motion } from "framer-motion";

function Indicators({ width, height, r }: { width: number; height: number; r: number }) {
  const indicators = useIndicators({ width, height, r });

  return indicators.map(({ key, cx, cy, r, fill }) => (
    <motion.circle
      key={key}
      cy={cy}
      initial={{ r: 0 }}
      animate={{ cx, r, fill }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        fill: { duration: 0.3 },
      }}
    />
  ));
}

export default function ScrollIndicator(props: FlexProps) {
  const { parentRef, width, height } = useParentSize({ debounceTime: 50 });

  return (
    <Flex ref={parentRef} position={"absolute"} minH={`${12 * 2 + 4 * 2}px`} {...props}>
      <svg width={width} height={height}>
        <Indicators width={width} height={height} r={3} />
      </svg>
    </Flex>
  );
}

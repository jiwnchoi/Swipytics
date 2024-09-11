import { useColorModeValue } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { chakraColors } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { scaleLinear } from "@visx/scale";

const PADDING = { TOP: 12, RIGHT: 10, BOTTOM: 12, LEFT: 10 };
const GAP = 6;

interface TIndicator {
  key: string;
  cx: number;
  cy: number;
  r: number;
  fill: string;
  isActive: boolean;
}

function useIndicators({ width, height, r: radius }: { width: number; height: number; r: number }) {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const { preferredColor } = useLayout();
  const fillColor = useColorModeValue(chakraColors["gray.400"], chakraColors["gray.600"]);

  const innerWidth = Math.min(
    width - PADDING.LEFT - PADDING.RIGHT,
    (GAP + 2 * radius) * charts.length,
  );
  const innerHeight = height - PADDING.TOP - PADDING.BOTTOM;
  const centerX = width / 2;
  const centerY = innerHeight / 2 + PADDING.TOP;
  const scaledRadius = radius - Math.floor(charts.length / 40);

  const x = scaleLinear({
    domain: [0, charts.length - 1],
    range: [centerX - innerWidth / 2, centerX + innerWidth / 2],
  });

  const circles: TIndicator[] = charts.map((chart, i) => ({
    key: `indicator-${chart.key}`,
    cx: x(i),
    cy: centerY,
    r: i === currentChartIndex ? 2 * scaledRadius : scaledRadius,
    fill: chart.preferred ? preferredColor : fillColor,
    isActive: i === currentChartIndex,
  }));

  return circles;
}

export default useIndicators;

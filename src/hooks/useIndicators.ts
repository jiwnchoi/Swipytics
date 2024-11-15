import { useColorModeValue } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { chakraColors } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { scaleLinear } from "@visx/scale";

const PADDING = { TOP: 12, RIGHT: 10, BOTTOM: 12, LEFT: 10 };
const GAP = 6;

type Orientation = "horizontal" | "vertical";

interface Props {
  width: number;
  height: number;
  r: number;
  orientation?: Orientation;
}

function useIndicators({ width, height, r, orientation = "vertical" }: Props) {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const { preferredColor } = useLayout();
  const fillColor = useColorModeValue(chakraColors["gray.400"], chakraColors["gray.600"]);

  const length =
    orientation === "vertical"
      ? height - PADDING.TOP - PADDING.BOTTOM
      : width - PADDING.LEFT - PADDING.RIGHT;

  const center = orientation === "vertical" ? width / 2 : height / 2;

  const maxLength = Math.min(length, (GAP + 2 * r) * charts.length);
  const scaledRadius = r - Math.floor(charts.length / 60);

  const scale = scaleLinear({
    domain: [0, charts.length - 1],
    range: [length / 2 - maxLength / 2, length / 2 + maxLength / 2],
  });

  return charts.map((chart, i) => ({
    key: `indicator-${chart.key}`,
    cx: orientation === "vertical" ? center : scale(i),
    cy: orientation === "vertical" ? scale(i) : center,
    r: i === currentChartIndex ? 2 * scaledRadius : scaledRadius,
    fill: chart.preferred ? preferredColor : fillColor,
  }));
}

export default useIndicators;

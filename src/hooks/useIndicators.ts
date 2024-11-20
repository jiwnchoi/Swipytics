import { useColorModeValue } from "@chakra-ui/react";
import { useLayout } from "@hooks";
import { chakraColors } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { scaleLinear } from "@visx/scale";

interface Props {
  height: number;
  r: number;
}

function useIndicators({ height, r }: Props) {
  const allCharts = useSessionsStore((state) => state.charts);
  const appendingChart = useSessionsStore((state) => state.appendingChart);
  const charts = appendingChart ? allCharts : allCharts.slice(0, allCharts.length - 1);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const { preferredColor, indicatorGap: gap, indicatorPadding: padding } = useLayout();
  const fillColor = useColorModeValue(chakraColors["gray.400"], chakraColors["gray.600"]);

  const length = Math.min(
    height - padding.TOP - padding.BOTTOM,
    2 * r * charts.length + gap * (charts.length - 1),
  );
  const scaledRadius = r - Math.floor(charts.length / 60);
  const scale = scaleLinear({
    domain: [0, charts.length - 1],
    range: [height / 2 - length / 2, height / 2 + length / 2],
  });

  return charts.map((chart, i) => ({
    key: `indicator-${chart.key}`,
    cx: 3 * r,
    cy: scale(i),
    r: i === currentChartIndex ? 2 * scaledRadius : scaledRadius,
    fill: chart.preferred ? preferredColor : fillColor,
  }));
}

export default useIndicators;

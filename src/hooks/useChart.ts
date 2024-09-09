import { useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { DATA_NAME } from "@shared/constants";
import type { TChart } from "@shared/models";
import { useDataStore } from "@stores";
import type { VisualizationSpec } from "react-vega";

export default function useChart(chart: TChart) {
  const { colorMode } = useColorMode();
  const _data = useDataStore((state) => state.data);
  const _spec = chart.specs[chart.specIndex];

  const chartTheme: "dark" | undefined = colorMode === "dark" ? "dark" : undefined;
  const [width, height] = useBreakpointValue({
    base: [300, 300],
    lg: [600, 600],
  }) ?? [300, 300];

  const spec = {
    ..._spec,
    width,
    height,
    background: "transparent",
    data: { name: DATA_NAME },
    config: {
      ...("config" in _spec ? _spec.config : {}),
      axis: {
        labelFontSize: 14,
        titleFontSize: 16,
        titlePadding: 16,
      },
      autosize: {
        type: "fit",
      },
    },
  } as VisualizationSpec;

  const data = { [DATA_NAME]: _data };

  return { data, chartTheme, spec };
}

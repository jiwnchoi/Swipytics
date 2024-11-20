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
    base: [window.innerWidth - 64, Math.min(window.innerHeight - 350, 500)],
    lg: [Math.min(window.innerWidth - 250, 600), Math.min(window.innerHeight - 250, 600)],
  }) ?? [300, 300];

  const spec = {
    ..._spec,
    width,
    mark: {
      ...("mark" in _spec ? (_spec.mark as object) : {}),
      // tooltip: { content: "data" },
    },
    height,
    background: "transparent",
    data: { name: DATA_NAME },
    config: {
      ...("config" in _spec ? _spec.config : {}),
      title: {
        fontSize: 18,
        offset: 16,
      },
      axis: {
        labelFontSize: 14,
        titleFontSize: 16,
        titlePadding: 16,
        labelLimit: 70,
      },
      autosize: {
        type: "fit",
      },
      legend: {
        direction: "horizontal",
        titleLimit: width,
        gradientLength: width - 20,
        columns: 2,
        orient: "bottom",
        labelFontSize: 14,
        titleFontSize: 16,
      },
      numberFormat: ".3~s",
    },
  } as VisualizationSpec;
  const data = { [DATA_NAME]: _data };

  return { data, chartTheme, spec };
}

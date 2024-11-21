import { useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { DATA_NAME } from "@shared/constants";
import type { TChart } from "@shared/models";
import { getKoreanVegaLite } from "@shared/utils";
import { useDataStore } from "@stores";
import { useTranslation } from "react-i18next";
import type { TopLevelSpec } from "vega-lite";

export default function useChart(chart: TChart) {
  const { i18n } = useTranslation();
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
        labelExpr: `
      datum.value == 0 ? '0' :
      datum.value >= 1e15 ? format(datum.value/1e15, ',.1f') + '천조' :
      datum.value >= 1e14 ? format(datum.value/1e14, ',.1f') + '백조' :
      datum.value >= 1e13 ? format(datum.value/1e13, ',.1f') + '십조' :
      datum.value >= 1e12 ? format(datum.value/1e12, ',.1f') + '조' :
      datum.value >= 1e11 ? format(datum.value/1e11, ',.1f') + '천억' :
      datum.value >= 1e10 ? format(datum.value/1e10, ',.1f') + '백억' :
      datum.value >= 1e9 ? format(datum.value/1e9, ',.1f') + '십억' :
      datum.value >= 1e8 ? format(datum.value/1e8, ',.1f') + '억' :
      datum.value >= 1e7 ? format(datum.value/1e7, ',.1f') + '천만' :
      datum.value >= 1e6 ? format(datum.value/1e6, ',.1f') + '백만' :
      datum.value >= 1e5 ? format(datum.value/1e5, ',.1f') + '십만' :
      datum.value >= 1e4 ? format(datum.value/1e4, ',.1f') + '만' :
      datum.value >= 1e3 ? format(datum.value/1e3, ',.1f') + '천' :
      datum.value >= 1e2 ? format(datum.value/1e2, ',.1f') + '백' :
      datum.value >= 1e1 ? format(datum.value/1e1, ',.1f') + '십' :
      format(datum.value, ',.0f')`,
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
  } as TopLevelSpec;

  const data = { [DATA_NAME]: _data };
  return { data, chartTheme, spec: i18n.language === "ko" ? getKoreanVegaLite(spec) : spec };
}

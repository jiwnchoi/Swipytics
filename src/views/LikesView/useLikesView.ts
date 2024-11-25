import { useLayout } from "@hooks";
import type { TChart } from "@shared/models";
import { useInteractionStore, useSessionsStore } from "@stores";

export default function useLikesView() {
  const charts = useSessionsStore((state) => state.charts);
  const { mobile } = useLayout();
  const setTabByName = useInteractionStore((state) => state.setTabByName);
  const preferredCharts = charts.filter((chart) => chart.preferred);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);

  const handleClickChart = (chart: TChart) => {
    const index = charts.findIndex((c) => c === chart);
    if (mobile) setTabByName("charts");
    setTimeout(() => {
      setCurrentChartIndex(index);
    }, 100);
  };

  return {
    preferredCharts,
    handleClickChart,
  };
}

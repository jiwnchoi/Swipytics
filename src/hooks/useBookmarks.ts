import type { TChart } from "@shared/models";
import { useSessionsStore } from "@stores";

export default function useBookmarks() {
  const charts = useSessionsStore((state) => state.charts);
  const preferredCharts = charts.filter((chart) => chart.preferred);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);

  const handleClickBookmark = (chart: TChart) => {
    const index = charts.findIndex((c) => c === chart);
    setCurrentChartIndex(index);
  };

  return {
    preferredCharts,
    handleClickBookmark,
  };
}

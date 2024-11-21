import { useSessionsStore } from "@stores";

export default function useController() {
  const charts = useSessionsStore((state) => state.charts);
  const fields = useSessionsStore((state) => state.fields);

  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const currentChartPreferred =
    0 <= currentChartIndex &&
    currentChartIndex < charts.length &&
    charts[currentChartIndex]?.preferred;

  const chartDisplaying = currentChartIndex !== -1;
  const sessionInitialized = fields.length > 0;

  const handleNextChart = () => setCurrentChartIndex(currentChartIndex + 1);
  const handlePrevChart = () => setCurrentChartIndex(currentChartIndex - 1);
  const handlePreferChart = () => {
    setCurrentChartPreferred(!currentChartPreferred);
  };

  return {
    sessionInitialized,
    chartDisplaying,
    currentChartPreferred,
    handleNextChart,
    handlePrevChart,
    handlePreferChart,
  };
}

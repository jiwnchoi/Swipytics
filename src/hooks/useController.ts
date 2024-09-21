import { useSessionsStore } from "@stores";

export default function useController() {
  const charts = useSessionsStore((state) => state.charts);
  const fields = useSessionsStore((state) => state.fields);

  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);
  const renewCurrentChart = useSessionsStore((state) => state.renewCurrentChart);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);

  const chartDisplaying = currentChartIndex !== -1;
  const currentChartPreferred = currentChartIndex !== -1 && charts[currentChartIndex].preferred;
  const sessionInitialized = fields.length > 0;

  const handleRenewChart = renewCurrentChart;
  const handleNextChart = () => setCurrentChartIndex(currentChartIndex + 1);
  const handlePrevChart = () => setCurrentChartIndex(currentChartIndex - 1);
  const handlePreferChart = () => setCurrentChartPreferred(!currentChartPreferred);

  return {
    sessionInitialized,
    chartDisplaying,
    currentChartPreferred,
    handleRenewChart,
    handleNextChart,
    handlePrevChart,
    handlePreferChart,
  };
}

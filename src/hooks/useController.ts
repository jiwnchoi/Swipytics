import { useSessionsStore } from "@stores";

export default function useController() {
  const charts = useSessionsStore((state) => state.charts);
  const fields = useSessionsStore((state) => state.fields);

  const increaseCurrentChartIndex = useSessionsStore((state) => state.increaseCurrentChartIndex);
  const decreaseCurrentChartIndex = useSessionsStore((state) => state.decreaseCurrentChartIndex);
  const renewCurrentChart = useSessionsStore((state) => state.renewCurrentChart);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);

  const chartDisplaying = currentChartIndex !== -1;

  const currentChartPreferred = currentChartIndex !== -1 && charts[currentChartIndex].preferred;

  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);

  const handleRenewChart = renewCurrentChart;
  const handleNextChart = increaseCurrentChartIndex;
  const handlePrevChart = decreaseCurrentChartIndex;
  const handlePreferChart = () => {
    setCurrentChartPreferred(!currentChartPreferred);
  };

  const sessionInitialized = fields.length > 0;

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

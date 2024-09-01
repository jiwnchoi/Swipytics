import { useSessionsStore } from "@stores";
import { useMemo } from "react";

export default function useController() {
  const charts = useSessionsStore(state => state.charts);
  const increaseCurrentChartIndex = useSessionsStore(state => state.increaseCurrentChartIndex);
  const decreaseCurrentChartIndex = useSessionsStore(state => state.decreaseCurrentChartIndex);
  const renewCurrentChart = useSessionsStore(state => state.renewCurrentChart);
  const currentChartIndex = useSessionsStore(state => state.currentChartIndex);

  const currentChartPreferred = useMemo(() => {
    return charts[currentChartIndex]?.preferred ?? false;
  }, [charts, currentChartIndex]);

  const setCurrentChartPreferred = useSessionsStore(state => state.setCurrentChartPreferred);

  const handleRenewChart = renewCurrentChart;
  const handleNextChart = increaseCurrentChartIndex;
  const handlePrevChart = decreaseCurrentChartIndex;
  const handlePreferChart = () => setCurrentChartPreferred(!currentChartPreferred);

  const disabled = charts.length === 0;

  return {
    disabled,
    currentChartPreferred,
    handleRenewChart,
    handleNextChart,
    handlePrevChart,
    handlePreferChart,
  };
}

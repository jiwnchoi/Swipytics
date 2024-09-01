import { useSessionsStore } from "@stores";
import { useCallback } from "react";

export default function useController() {
  const charts = useSessionsStore(state => state.charts);
  const currentChartIndex = useSessionsStore(state => state.currentChartIndex);
  const increaseCurrentChartIndex = useSessionsStore(state => state.increaseCurrentChartIndex);
  const decreaseCurrentChartIndex = useSessionsStore(state => state.decreaseCurrentChartIndex);

  const handleRenewChart = useCallback(() => {}, []);
  const handleNextChart = increaseCurrentChartIndex;
  const handlePrevChart = decreaseCurrentChartIndex;

  const disabled = charts.length === 0;
  const prevChartDisabled = disabled || currentChartIndex === 0;

  return {
    disabled,
    prevChartDisabled,
    handleRenewChart,
    handleNextChart,
    handlePrevChart,
  };
}

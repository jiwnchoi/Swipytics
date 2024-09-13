import { type TChart } from "../shared/models";
import { useSessionsStore } from "../stores";

export default function useAppendChart() {
  const { setCurrentChartToLast, appendChartToRear, callAppendChart } = useSessionsStore();

  const appendChart = async (chart: TChart) => {
    await callAppendChart(chart);
    // error handling

    appendChartToRear(chart);
    setCurrentChartToLast();
  };

  return { appendChart };
}

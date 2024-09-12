import { type TChart } from "../shared/models";
import { useSessionsStore } from "../stores";

export default function useAppendChart() {
  const { setCurrentChartToLast, appendChartToRear } = useSessionsStore();

  const appendChart = async (chart: TChart) => {
    const appendChartResponse = await fetch(`/api/appendChart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chart }),
    });
    if (appendChartResponse.status !== 200) {
      // other handling ..
      return;
    }
    appendChartToRear(chart);
    setCurrentChartToLast();
  };

  return { appendChart };
}

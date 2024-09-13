import { useQuery } from "@tanstack/react-query";
import { type TChart } from "../shared/models";
import { getThumbnailFromSpec } from "../shared/utils";
import { useDataStore } from "../stores";

export default function useBrowseCharts(fieldNames: string[]) {
  const data = useDataStore((state) => state.data);
  const { data: charts = [], isLoading } = useQuery({
    queryKey: ["browseCharts", ...fieldNames.sort().join("&")],
    queryFn: async () => {
      if (fieldNames.length === 0) return [];
      const response = await fetch(`/api/browseCharts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field_names: fieldNames }),
      });
      if (response.status !== 200) {
        // other handling ..
        return [];
      }
      const charts = (await response.json()) as TChart[]; // I trust server response
      if (!charts) return [];
      if (!data) return charts;
      const chartsWithThumbnails = await Promise.all(
        charts.map(async (chart) => {
          const thumbnail = await getThumbnailFromSpec(chart.specs[0], data);
          return { ...chart, thumbnail };
        }),
      );
      return chartsWithThumbnails;
    },
  });

  return { charts, isLoading };
}

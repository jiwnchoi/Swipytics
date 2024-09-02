import { getThumbnailFromSpec } from "@shared/utils";
import { useDataStore, useSessionsStore } from "@stores";
import { useQuery } from "@tanstack/react-query";

export default function useBookmarks() {
  const charts = useSessionsStore(state => state.charts);
  const data = useDataStore(state => state.data);

  const preferredCharts = charts.filter(chart => chart.preferred);
  const { data: thumbnails } = useQuery({
    queryKey: ["thumbnails", preferredCharts, data],
    queryFn: async () => {
      if (!data) return [];
      const thumbnails = await Promise.all(
        preferredCharts.map(chart => {
          if (!chart.specs[chart.specIndex]) return null;
          return getThumbnailFromSpec(chart.specs[chart.specIndex], data);
        }),
      );
      return thumbnails;
    },
  });

  return {
    preferredCharts,
    thumbnails,
  };
}

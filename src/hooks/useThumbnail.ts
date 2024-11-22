import type { TChart } from "@shared/models";
import { getThumbnailFromSpec } from "@shared/utils";
import { useDataStore } from "@stores";
import { useEffect, useState } from "react";

export default function useThumbnail(chart: TChart, size = 100): string | undefined {
  const data = useDataStore((state) => state.data);
  const [thumbnail, setThumbnail] = useState<string | undefined>(chart.thumbnail);

  useEffect(() => {
    if (!thumbnail && data) {
      const fetchThumbnail = async () => {
        console.log(chart.spec);
        const thumbnail = await getThumbnailFromSpec(chart.spec, data, size);

        setThumbnail(thumbnail);
      };
      fetchThumbnail();
    }
  }, [data, thumbnail, size, chart.spec]);

  return thumbnail;
}

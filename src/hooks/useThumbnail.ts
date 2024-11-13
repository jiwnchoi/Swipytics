import type { TChart } from "@shared/models";
import { getThumbnailFromSpec } from "@shared/utils";
import { useDataStore } from "@stores";
import { useEffect, useState } from "react";

export default function useThumbnail(chart: TChart): string | undefined {
  const data = useDataStore((state) => state.data);
  const [thumbnail, setThumbnail] = useState<string | undefined>(chart.thumbnail);

  useEffect(() => {
    if (!thumbnail && data) {
      const fetchThumbnail = async () => {
        const thumbnail = await getThumbnailFromSpec(chart.specs[0], data);
        setThumbnail(thumbnail);
      };
      fetchThumbnail();
    }
  }, [chart.specs, data, thumbnail]);

  return thumbnail;
}

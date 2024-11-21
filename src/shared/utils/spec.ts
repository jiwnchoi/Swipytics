import type { TSupportedDataType } from "@shared/models";
import embed from "vega-embed";
import type { TopLevelSpec } from "vega-lite";

function getKey(spec: TopLevelSpec) {
  return `thumbnail@${JSON.stringify(spec)}`;
}

export async function getThumbnailFromSpec(
  spec: TopLevelSpec,
  data: TSupportedDataType,
  size = 100,
) {
  const thumbnailFromCache = getThumbnailFromCache(spec);
  if (thumbnailFromCache) return thumbnailFromCache;
  const thumbnail = await generateThumbnailFromSpec(spec, data, size);
  if (thumbnail) sessionStorage.setItem(getKey(spec), thumbnail);
  return thumbnail;
}

function getThumbnailFromCache(spec: TopLevelSpec) {
  return sessionStorage.getItem(getKey(spec));
}

async function generateThumbnailFromSpec(
  spec: TopLevelSpec,
  data: TSupportedDataType,
  size = 100,
): Promise<string | undefined> {
  if (!spec || !data) return undefined;

  const newSpec = {
    ...spec,
    width: size,
    height: size,
    config: {
      ...spec.config,
      // line: {
      //   width: 8,
      // },
      legend: { disable: true },
      axis: {
        title: null,
        disable: true,
        grid: false,
        ticks: false,
        labels: false,
      },
      style: {
        view: { stroke: "transparent" },
        cell: { stroke: "transparent" },
      },
    },
    data: { values: data },
    background: "transparent",
    title: undefined,
  };

  const view = await embed(document.createElement("div"), newSpec, {
    actions: false,
  }).then((result) => result.view);
  return (await view.toCanvas()).toDataURL();
}

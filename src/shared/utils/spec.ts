import type { TSupportedDataType } from "@shared/models";
import embed from "vega-embed";
import type { TopLevelSpec } from "vega-lite";
import type { Field } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";

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
  if (!("mark" in spec)) return undefined;
  if (!spec || !data) return undefined;

  const thumbnailAxis = {
    disable: true,
    title: "",
    grid: false,
    ticks: false,
    labels: false,
  };
  const newSpec = {
    ...spec,
    width: size,
    height: size,
    config: {
      ...spec.config,
      mark: { strokeWidth: spec.mark === "line" ? 4 : 0 },
      legend: { disable: true },
      axis: { disable: true },
      style: {
        view: { stroke: "transparent" },
        cell: { stroke: "transparent" },
      },
    },
    data: { values: data },
    background: "transparent",
    title: undefined,
    encoding: Object.fromEntries(
      Object.entries(spec.encoding ?? {}).map(([key, value]: [string, Encoding<Field>]) => [
        key,
        {
          ...value,
          legend: null,
          axis: thumbnailAxis,
        },
      ]),
    ),
  };

  const view = await embed(document.createElement("div"), newSpec, {
    actions: false,
  }).then((result) => result.view);
  return (await view.toCanvas()).toDataURL();
}

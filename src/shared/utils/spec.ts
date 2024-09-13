import type { TSupportedDataType } from "@shared/models";
import embed, { type VisualizationSpec } from "vega-embed";
import type { Field } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";

function getKey(spec: VisualizationSpec) {
  return `thumbnail@${JSON.stringify(spec)}`;
}

export async function getThumbnailFromSpec(spec: VisualizationSpec, data: TSupportedDataType) {
  const thumbnailFromCache = getThumbnailFromCache(spec);
  if (thumbnailFromCache) return thumbnailFromCache;
  const thumbnail = await generateThumbnailFromSpec(spec, data);
  if (thumbnail) sessionStorage.setItem(getKey(spec), thumbnail);
  return thumbnail;
}

function getThumbnailFromCache(spec: VisualizationSpec) {
  return sessionStorage.getItem(getKey(spec));
}

async function generateThumbnailFromSpec(
  spec: VisualizationSpec,
  data: TSupportedDataType,
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
    width: 100,
    height: 100,
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

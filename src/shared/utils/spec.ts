import { DATA_NAME } from "@shared/constants";
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
  const thumbnail = await _getThumbnailFromSpec(spec, data, size);
  if (thumbnail) sessionStorage.setItem(getKey(spec), thumbnail);
  return thumbnail;
}

function getThumbnailFromCache(spec: TopLevelSpec) {
  return sessionStorage.getItem(getKey(spec));
}

export function getMainSpec(spec: TopLevelSpec, width = 100, height = 100): TopLevelSpec {
  return {
    ...spec,
    width,
    height,
    data: { name: DATA_NAME },
    config: {
      ...spec.config,
      background: "transparent",
      title: {
        fontSize: 18,
        offset: 16,
      },
      axisX: {
        labelFontSize: 14,
        titleFontSize: 16,
        titlePadding: 16,
        labelLimit: 100,
        labelAngle: -45,
      },
      axisY: {
        labelFontSize: 14,
        titleFontSize: 16,
        titlePadding: 16,
        labelLimit: 70,
      },
      autosize: {
        type: "fit",
      },
      legend: {
        direction: "horizontal",
        columns: 2,
        orient: "bottom",
        labelFontSize: 14,
        titleFontSize: 16,
      },
      numberFormat: ".3~s",
    },
  };
}

function getThumbnailSpec(spec: TopLevelSpec, size: number): TopLevelSpec {
  return {
    ...spec,
    width: size,
    height: size,
    config: {
      ...spec.config,
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
    background: "transparent",
    title: undefined,
  };
}

async function _getThumbnailFromSpec(
  spec: TopLevelSpec,
  data: TSupportedDataType,
  size = 100,
): Promise<string | undefined> {
  if (!spec || !data) return undefined;

  const newSpec = getThumbnailSpec(spec, size);

  const view = await embed(
    document.createElement("div"),
    { ...newSpec, data: { values: data } },
    {
      actions: false,
    },
  ).then((result) => result.view);
  return (await view.toCanvas()).toDataURL();
}

import type { TSupportedDataType } from "@shared/models";
import embed, { type VisualizationSpec } from "vega-embed";
import type { Field } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";

export async function getThumbnailFromSpec(
  spec: VisualizationSpec,
  data: TSupportedDataType,
): Promise<string | null> {
  if (!("mark" in spec)) return null;
  if (!spec || !data) return null;

  const thumbnailAxis = { disable: true, title: "", grid: false, ticks: false, labels: false };
  const newSpec = {
    ...spec,
    width: 200,
    height: 200,
    config: {
      ...spec.config,
      mark: { strokeWidth: spec.mark === "line" ? 4 : 0 },
      legend: { disable: true },
    },
    data: { values: data },
    background: "transparent",
    title: undefined,
    encoding: Object.fromEntries(
      Object.entries(spec.encoding || {}).map(([key, value]: [string, Encoding<Field>]) => [
        key,
        {
          ...value,
          legend: null,
          axis: thumbnailAxis,
        },
      ]),
    ),
  };

  const view = await embed(document.createElement("div"), newSpec, { actions: false }).then(
    result => result.view,
  );
  return (await view.toCanvas()).toDataURL();
}

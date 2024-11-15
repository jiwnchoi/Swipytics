import type { VegaLiteProps } from "react-vega/lib/VegaLite";
import VegaLite from "react-vega/lib/VegaLite";

const cache = new Map<string, string>();

export default function CachedVegaLite(props: VegaLiteProps) {
  const key = JSON.stringify(props.spec);
  const cached = cache.get(key);

  if (cached) {
    return <img src={cached} alt="cached" />;
  }
  return (
    <VegaLite
      {...props}
      actions={false}
      renderer="canvas"
      onNewView={(view) => {
        view.toImageURL("svg").then((url) => {
          cache.set(key, url);
        });
      }}
    />
  );
}

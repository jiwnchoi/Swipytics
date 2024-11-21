import { useTranslation } from "react-i18next";
import type { VegaLiteProps } from "react-vega/lib/VegaLite";
import VegaLite from "react-vega/lib/VegaLite";

const cache = new Map<string, string>();

export default function CachedVegaLite({ spec, theme, ...props }: VegaLiteProps) {
  const { i18n } = useTranslation();
  const key = JSON.stringify({ spec, theme, locale: i18n.language });
  const cached = cache.get(key);

  if (cached) {
    return <img src={cached} alt="cached" />;
  }
  return (
    <VegaLite
      spec={spec}
      theme={theme}
      actions={false}
      renderer="canvas"
      onNewView={(view) => {
        view.toImageURL("svg").then((url) => {
          cache.set(key, url);
        });
      }}
      {...props}
    />
  );
}

import type { TDemo } from "./models";

export const DEMO_LIST: TDemo[] = [
  { name: "Barley", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/barley.json" },
  { name: "Cars", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/cars.json" },
  { name: "Crimea", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/crimea.json" },
  { name: "Jobs", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/jobs.json" },
  { name: "Population", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/population.json" },
  { name: "Movies", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/movies.json" },
  {
    name: "Birdstrikes",
    href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/birdstrikes.csv",
  },
  { name: "Burtin", href: "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/burtin.json" },
];
export const EXPANDING_THRESHOLD = 50;
export const DEBOUNCE_DELAY = 50;
export const CHART_PREFETCH_DELAY = 1;
export const PRIMARY_COLOR = "orange";
export const PRIMARY = {
  50: `${PRIMARY_COLOR}.50`,
  100: `${PRIMARY_COLOR}.100`,
  200: `${PRIMARY_COLOR}.200`,
  300: `${PRIMARY_COLOR}.300`,
  400: `${PRIMARY_COLOR}.400`,
  500: `${PRIMARY_COLOR}.500`,
  600: `${PRIMARY_COLOR}.600`,
  700: `${PRIMARY_COLOR}.700`,
  800: `${PRIMARY_COLOR}.800`,
  900: `${PRIMARY_COLOR}.900`,
};

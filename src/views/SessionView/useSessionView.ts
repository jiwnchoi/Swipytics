import { useLoggerClient } from "@logger/react";
import { DEBOUNCE_DELAY } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useEffect, useRef } from "react";

const getDimension = (container: HTMLDivElement | null, prop: "clientWidth" | "clientHeight") => {
  if (!container) return 0;
  const gap = parseFloat(window.getComputedStyle(container).gap);
  return container[prop] + gap;
};

export default function useSessionView({ orientation = "vertical" }) {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendNextChart = useSessionsStore((state) => state.appendNextChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);

  const ref = useRef<HTMLDivElement>(null);
  const logger = useLoggerClient();

  const scrollContainerCallback = debounce((container: HTMLDivElement) => {
    if (!container) return;
    const dimension = getDimension(
      container,
      orientation === "horizontal" ? "clientWidth" : "clientHeight",
    );
    const scroll = orientation === "horizontal" ? container.scrollLeft : container.scrollTop;
    const newIndex = Math.round(scroll / dimension) - 1;

    setCurrentChartIndex(newIndex);
    if (newIndex === charts.length - 1) appendNextChart();
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const dimension = getDimension(
      container,
      orientation === "horizontal" ? "clientWidth" : "clientHeight",
    );
    const scrollProps = {
      [orientation === "horizontal" ? "left" : "top"]: (currentChartIndex + 1) * dimension,
      behavior: "smooth" as const,
    };

    container.scrollTo(scrollProps);
  }, [currentChartIndex, orientation]);

  useEffect(() => {
    const keyActions = {
      ArrowUp: () => setCurrentChartIndex(currentChartIndex - 1),
      ArrowDown: () => setCurrentChartIndex(currentChartIndex + 1),
      Enter: () => setCurrentChartPreferred(!charts[currentChartIndex].preferred),
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const action = keyActions[event.key as keyof typeof keyActions];
      if (action) {
        event.preventDefault();
        logger.log("chart-container", "keydown", {
          key: event.key.toLowerCase().replace("arrow", ""),
        });
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChartIndex, charts, setCurrentChartIndex, setCurrentChartPreferred, logger]);

  return { charts, currentChartIndex, ref, scrollContainerCallback };
}

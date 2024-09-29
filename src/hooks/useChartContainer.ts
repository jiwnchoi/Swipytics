import { useLoggerClient } from "@logger/react";
import { DEBOUNCE_DELAY } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useEffect, useRef } from "react";

function getChartWidth(container: HTMLDivElement | null) {
  if (!container) return 0;

  const style = window.getComputedStyle(container);
  const gap = parseFloat(style.gap);
  return container.clientWidth + gap;
}

export default function useChartContainer() {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendNextChart = useSessionsStore((state) => state.appendNextChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);
  const ref = useRef<HTMLDivElement>(null);
  const logger = useLoggerClient();

  const scrollContainerCallback = debounce((container: HTMLDivElement) => {
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const chartWidth = getChartWidth(container);
    const newIndex = Math.round(scrollLeft / chartWidth) - 1;
    setCurrentChartIndex(newIndex);

    if (newIndex === charts.length - 1) {
      appendNextChart();
    }
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const chartWidth = getChartWidth(container);
    container.scrollTo({
      left: (currentChartIndex + 1) * chartWidth,
      behavior: "smooth",
    });
  }, [currentChartIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        logger.log("chart-container", "keydown", { key: "left" });
        setCurrentChartIndex(currentChartIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        logger.log("chart-container", "keydown", { key: "right" });
        setCurrentChartIndex(currentChartIndex + 1);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        logger.log("chart-container", "keydown", { key: "up" });
        setCurrentChartPreferred(!charts[currentChartIndex].preferred);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChartIndex, charts, setCurrentChartIndex, setCurrentChartPreferred, logger]);

  return {
    charts,
    currentChartIndex,
    ref,
    scrollContainerCallback,
  };
}

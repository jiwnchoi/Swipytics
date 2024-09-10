import { DEBOUNCE_DELAY } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useEffect, useRef } from "react";

function getChartHeight(container: HTMLDivElement | null) {
  if (!container) return 0;

  const style = window.getComputedStyle(container);
  const gap = parseFloat(style.gap);
  return container.clientHeight + gap;
}

export default function useChartContainer() {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const increaseCurrentChartIndex = useSessionsStore((state) => state.increaseCurrentChartIndex);
  const decreaseCurrentChartIndex = useSessionsStore((state) => state.decreaseCurrentChartIndex);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop;
      const chartHeight = getChartHeight(container);
      const newIndex = Math.floor(scrollTop / chartHeight);
      setCurrentChartIndex(newIndex - 1);
    }, DEBOUNCE_DELAY);

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [setCurrentChartIndex]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const chartHeight = getChartHeight(container);
    container.scrollTo({
      top: (currentChartIndex + 1) * chartHeight,
      behavior: "smooth",
    });
  }, [currentChartIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        decreaseCurrentChartIndex();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        increaseCurrentChartIndex();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [increaseCurrentChartIndex, decreaseCurrentChartIndex]);

  return {
    charts,
    currentChartIndex,
    ref,
  };
}

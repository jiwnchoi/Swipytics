import { useInteractionStore, useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useCallback, useEffect, useRef, useState } from "react";

const DEBOUNCE_DELAY = 100;
const CHART_PREFETCH_DELAY = 1;

export default function useSession() {
  const charts = useSessionsStore(state => state.charts);
  const appendChart = useSessionsStore(state => state.appendChart);
  const setExpanded = useInteractionStore(state => state.setDrawerExpanded);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const scrollEndCallback = useCallback(
    async (newIndex: number) => {
      setExpanded(false);
      setCurrentChartIndex(newIndex);
      if (newIndex < charts.length - CHART_PREFETCH_DELAY) return;
      await appendChart();
    },
    [charts, appendChart],
  );

  const renewCurrentChart = useCallback(() => {}, [currentChartIndex]);

  const scrollToChart = useCallback(
    (direction: "up" | "down") => {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollAmount = direction === "up" ? -container.clientHeight : container.clientHeight;
        container.scrollTo({
          top: container.scrollTop + scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [scrollContainerRef],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        scrollToChart(event.key === "ArrowUp" ? "up" : "down");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToChart]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop;
      const chartHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / chartHeight);
      scrollEndCallback(newIndex);
    }, DEBOUNCE_DELAY);

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollEndCallback, scrollContainerRef]);

  return {
    scrollContainerRef,
    charts,
    currentChartIndex,
    scrollToChart,
    renewCurrentChart,
  };
}

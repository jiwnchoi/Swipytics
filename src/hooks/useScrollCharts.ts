import { debounce } from "es-toolkit";
import { useCallback, useEffect, useRef, useState } from "react";
import type { VisualizationSpec } from "react-vega";
import MockChart from "../assets/MockChart.json";

const DEBOUNCE_DELAY = 100;
const DUMMY = [
  { ...MockChart, key: `chart-${Math.random()}` } as ObjectWithKey<VisualizationSpec>,
  { ...MockChart, key: `chart-${Math.random()}` } as ObjectWithKey<VisualizationSpec>,
  { ...MockChart, key: `chart-${Math.random()}` } as ObjectWithKey<VisualizationSpec>,
];

export default function useScrollCharts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [charts, setCharts] = useState<ObjectWithKey<VisualizationSpec>[]>(DUMMY);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const scrollEndCallback = useCallback(
    (newIndex: number) => {
      if (newIndex < charts.length - 2) return;
      setCharts(prevCharts => [
        ...prevCharts,
        { ...MockChart, key: `chart-${Math.random()}` } as ObjectWithKey<VisualizationSpec>,
      ]);
    },
    [charts.length],
  );

  const scrollToChart = (direction: "up" | "down") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = direction === "up" ? -container.clientHeight : container.clientHeight;
    container.scrollTo({
      top: container.scrollTop + scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToChart("up");
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollToChart("down");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop;
      const chartHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / chartHeight);
      setCurrentChartIndex(newIndex);
      scrollEndCallback(newIndex);
    }, DEBOUNCE_DELAY);

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrollContainerRef,
    charts,
    currentChartIndex,
    scrollToChart,
  };
}

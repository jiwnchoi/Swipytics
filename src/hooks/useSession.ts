import MockChart from "@assets/MockChart.json";
import { ChartModel } from "@shared/models";
import { useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VisualizationSpec } from "react-vega";

const DEBOUNCE_DELAY = 100;
const CHART_PREFETCH_DELAY = 1;

export default function useSession(sessionKey: string) {
  const session = useSessionsStore(state => state.getSession(sessionKey ?? "dummy-session"));
  if (!session) {
    throw new Error(`Session ${sessionKey} not found`);
  }

  const { appendChartToSession, renewChartInSession } = useSessionsStore(state => ({
    appendChartToSession: state.appendChartToSession(sessionKey),
    renewChartInSession: state.renewChartInSession(sessionKey),
  }));

  const [charts, sessionLength] = useMemo(
    () => [session.charts, session.charts.length],
    [session.charts],
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const scrollEndCallback = useCallback(
    (newIndex: number) => {
      setCurrentChartIndex(newIndex);
      if (newIndex < sessionLength - CHART_PREFETCH_DELAY) return;
      appendChartToSession(
        new ChartModel({
          spec: MockChart as VisualizationSpec,
          description: "This is a new chart",
        }),
      );
    },
    [sessionLength, currentChartIndex],
  );

  const renewCurrentChart = useCallback(() => {
    const currentChart = charts[currentChartIndex];
    if (!currentChart) return;
    renewChartInSession(currentChart.key);
  }, [currentChartIndex, charts]);

  const scrollToChart = useCallback((direction: "up" | "down") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "up" ? -container.clientHeight : container.clientHeight;
      container.scrollTo({
        top: container.scrollTop + scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

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
  }, [scrollEndCallback]);

  return {
    scrollContainerRef,
    charts,
    currentChartIndex,
    scrollToChart,
    renewCurrentChart,
  };
}

import { useLayout } from "@hooks";
import { useLoggerClient } from "@logger/react";
import { useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useCallback, useEffect, useRef } from "react";

export default function useSessionView() {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendNextChart = useSessionsStore((state) => state.appendNextChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);

  const ref = useRef<HTMLDivElement>(null);
  const logger = useLoggerClient();

  const { cardInnerHeight } = useLayout();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollContainerCallback = useCallback(
    debounce((container: HTMLDivElement) => {
      if (!container) return;
      const scroll = container.scrollTop;
      const newIndex = Math.floor((scroll + cardInnerHeight * 0.5) / cardInnerHeight) - 1;
      setCurrentChartIndex(newIndex);
      if (newIndex === charts.length - 1) {
        appendNextChart();
      }
    }, 50),
    [cardInnerHeight, charts, appendNextChart, setCurrentChartIndex],
  );

  const clickScrollCallback = useCallback(
    (scrollIndex: number) => {
      const container = ref.current;
      if (!container) return;
      container.scrollTo({
        top: (scrollIndex + 1) * cardInnerHeight,
        behavior: "smooth",
      });
    },
    [cardInnerHeight],
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.scrollTo({
      top: (currentChartIndex + 1) * cardInnerHeight,
      behavior: "instant",
    });
  }, [currentChartIndex, cardInnerHeight]);

  useEffect(() => {
    const keyActions = {
      ArrowUp: () => clickScrollCallback(currentChartIndex - 1),
      ArrowDown: () => clickScrollCallback(currentChartIndex + 1),
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
  }, [currentChartIndex, charts, setCurrentChartPreferred, logger, clickScrollCallback]);

  return {
    charts,
    currentChartIndex,
    ref,
    scrollContainerCallback,
  };
}

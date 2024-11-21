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
  const handleScroll = useCallback(
    debounce((container: HTMLDivElement) => {
      if (!container) return;
      const newIndex =
        Math.floor((container.scrollTop + cardInnerHeight * 0.5) / cardInnerHeight) - 1;
      setCurrentChartIndex(newIndex);
      if (newIndex === charts.length - 1) appendNextChart();
    }, 50),
    [cardInnerHeight, charts.length, appendNextChart, setCurrentChartIndex],
  );

  const scrollTo = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        top: (index + 1) * cardInnerHeight,
        behavior: "smooth",
      });
    },
    [cardInnerHeight],
  );

  useEffect(() => {
    const scroll = () => {
      if (ref.current?.clientHeight) scrollTo(currentChartIndex);
      else requestAnimationFrame(scroll);
    };
    requestAnimationFrame(scroll);
  }, [currentChartIndex, scrollTo]);

  useEffect(() => {
    const keyMap = {
      ArrowUp: () => scrollTo(currentChartIndex - 1),
      ArrowDown: () => scrollTo(currentChartIndex + 1),
      Enter: () => setCurrentChartPreferred(!charts[currentChartIndex].preferred),
    };

    const handleKey = (e: KeyboardEvent) => {
      const action = keyMap[e.key as keyof typeof keyMap];
      if (action) {
        e.preventDefault();
        logger.log("chart-container", "keydown", {
          key: e.key.toLowerCase().replace("arrow", ""),
        });
        action();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentChartIndex, charts, setCurrentChartPreferred, logger, scrollTo]);

  return { charts, currentChartIndex, ref, scrollContainerCallback: handleScroll };
}

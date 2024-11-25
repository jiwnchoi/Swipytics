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
  const scrolling = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateChartIndexByScroll = useCallback(
    debounce(() => {
      scrolling.current = false;
    }, 50),
    [currentChartIndex, charts, appendNextChart],
  );

  const handleScroll = useCallback(
    (container: HTMLDivElement) => {
      if (!container || scrolling.current) return;
      scrolling.current = true;
      const newIndex =
        Math.floor((container.scrollTop + cardInnerHeight * 0.5) / cardInnerHeight) - 1;
      setCurrentChartIndex(newIndex);
      if (currentChartIndex !== newIndex) {
        logger.log("chart_container", "scroll", { chartIndex: newIndex });
      }
      if (newIndex === charts.length - 1) appendNextChart();
      updateChartIndexByScroll();
    },
    [
      appendNextChart,
      cardInnerHeight,
      charts.length,
      currentChartIndex,
      logger,
      setCurrentChartIndex,
      updateChartIndexByScroll,
    ],
  );

  const scrollTo = useCallback(
    (index: number) => {
      if (scrolling.current) return;
      scrolling.current = true;
      ref.current?.scrollTo({
        top: (index + 1) * cardInnerHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        scrolling.current = false;
      }, 500);
    },
    [cardInnerHeight],
  );

  useEffect(() => {
    const scroll = () => {
      if (ref.current?.clientHeight || !scrolling.current) scrollTo(currentChartIndex);
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
        logger.log("chart_container", "keydown", {
          key: e.key.toLowerCase().replace("arrow", ""),
          chartIndex:
            e.key === "ArrowUp"
              ? currentChartIndex - 1
              : e.key === "ArrowDown"
                ? currentChartIndex + 1
                : currentChartIndex,
        });
        action();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentChartIndex, charts, setCurrentChartPreferred, logger, scrollTo]);

  return { charts, currentChartIndex, ref, scrollContainerCallback: handleScroll };
}

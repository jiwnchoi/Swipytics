import { useLayout } from "@hooks";
import { useLoggerClient } from "@logger/react";
import { useSessionsStore } from "@stores";
import { useCallback, useEffect, useRef } from "react";

export default function useSessionView() {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendNextChart = useSessionsStore((state) => state.appendNextChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);

  const ref = useRef<HTMLDivElement>(null);
  const logger = useLoggerClient();

  const programmaticScroll = useRef(false);
  const mouseDown = useRef(false);
  const { cardInnerHeight } = useLayout();

  const handleScroll = useCallback(
    (container: HTMLDivElement) => {
      if (!container || programmaticScroll.current) return;
      const newIndex =
        Math.floor((container.scrollTop + cardInnerHeight * 0.3) / cardInnerHeight) - 1;
      if (newIndex !== currentChartIndex) setCurrentChartIndex(newIndex);
    },
    [cardInnerHeight, currentChartIndex, setCurrentChartIndex],
  );

  const scrollTo = useCallback(
    (index: number) => {
      if (mouseDown.current) return;
      programmaticScroll.current = true;
      ref.current?.scrollTo({
        top: (index + 1) * cardInnerHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        programmaticScroll.current = false;
      }, 600);
    },
    [cardInnerHeight],
  );

  useEffect(() => {
    const scroll = () => {
      if (ref.current?.clientHeight && currentChartIndex > -1) {
        scrollTo(currentChartIndex);
        if (currentChartIndex === charts.length - 1) appendNextChart();
      } else requestAnimationFrame(scroll);
    };
    requestAnimationFrame(scroll);
  }, [appendNextChart, charts.length, currentChartIndex, scrollTo]);

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

  return { charts, currentChartIndex, ref, scrollContainerCallback: handleScroll, mouseDown };
}

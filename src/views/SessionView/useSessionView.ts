import { useLoggerClient } from "@logger/react";
import { DEBOUNCE_DELAY } from "@shared/constants";
import { useSessionsStore } from "@stores";
import { debounce } from "es-toolkit";
import { useEffect, useRef } from "react";

interface UseSessionViewProps {
  cardHeight: number;
}

export default function useSessionView({ cardHeight }: UseSessionViewProps) {
  const charts = useSessionsStore((state) => state.charts);
  const currentChartIndex = useSessionsStore((state) => state.currentChartIndex);
  const appendNextChart = useSessionsStore((state) => state.appendNextChart);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const setCurrentChartPreferred = useSessionsStore((state) => state.setCurrentChartPreferred);

  const ref = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const logger = useLoggerClient();

  const scrollContainerCallback = debounce((container: HTMLDivElement) => {
    if (!container) return;
    const scroll = container.scrollTop;
    const newIndex = Math.round(scroll / cardHeight) - 1;

    setCurrentChartIndex(newIndex);
    if (newIndex === charts.length - 1) appendNextChart();
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.scrollTo({
      top: (currentChartIndex + 1) * cardHeight,
      behavior: "smooth",
    });
    isInitialMount.current = false;
  }, [currentChartIndex, cardHeight]);

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

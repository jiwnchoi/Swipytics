import { useLoggerClient } from "@logger/react";
import { useCallback, useState } from "react";

interface DoubleTapOptions {
  latency?: number;
  onDoubleEvent?: (e: React.TouchEvent) => void;
}

interface DoubleTapHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onDoubleClick: (e: React.MouseEvent) => void;
}

const useDoubleTap = (
  callback: (e: React.TouchEvent) => void,
  options: DoubleTapOptions = {},
): DoubleTapHandlers => {
  const { latency = 200 } = options;
  const [lastTap, setLastTap] = useState<number>(0);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const logger = useLoggerClient();

  const handleTouchStart = useCallback((): void => {
    setTouchStartTime(Date.now());
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent): void => {
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration > latency) return;

      const now = Date.now();
      if (now - lastTap < latency) {
        e.preventDefault(); // 기본 동작 방지 (확대 등)
        logger.log("prefer_chart", "double_tap");
        callback(e);
      }
      setLastTap(now);
    },
    [callback, lastTap, latency, logger, touchStartTime],
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent): void => {
      callback(e as unknown as React.TouchEvent);
    },
    [callback],
  );

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onDoubleClick: handleDoubleClick,
  };
};

export default useDoubleTap;

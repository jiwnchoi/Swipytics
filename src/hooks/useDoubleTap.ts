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

  const handleTouchStart = useCallback((): void => {
    setTouchStartTime(Date.now());
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent): void => {
      // 터치 지속 시간이 길면 더블탭으로 처리하지 않음
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration > 500) return;

      const now = Date.now();
      if (now - lastTap < latency) {
        e.preventDefault(); // 기본 동작 방지 (확대 등)
        callback(e);
      }
      setLastTap(now);
    },
    [callback, lastTap, latency, touchStartTime],
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

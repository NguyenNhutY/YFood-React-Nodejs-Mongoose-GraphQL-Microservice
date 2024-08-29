// timeObservable.ts
import { useState, useEffect, useCallback } from "react";

export const useTimeObservable = (interval: number) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return currentTime;
};

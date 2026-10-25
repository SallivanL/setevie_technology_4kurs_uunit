import { useCallback, useEffect, useRef } from 'react';

export const useInterval = () => {
  const intervalRef = useRef(null);

  const removeInterval = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const createInterval = useCallback(
    (fn, delay = 5000) => {
      // очищаем старый интервал перед созданием нового
      removeInterval();

      intervalRef.current = setInterval(() => {
        fn();
      }, delay);

      return intervalRef.current;
    },
    [removeInterval]
  );

  useEffect(() => {
    return () => removeInterval();
  }, [removeInterval]);

  const getIntervalId = useCallback(() => intervalRef.current, []);

  return [createInterval, removeInterval, getIntervalId];
};

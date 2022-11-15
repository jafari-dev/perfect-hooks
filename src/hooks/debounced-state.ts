import { useState, useCallback, useRef } from "react";

type ReturnType<T> = [T, (newValue: T) => void];

function useDebouncedState<T>(
  initialValue: T,
  delay: number,
  equalityFunction?: (previousValue: T, newValue: T) => boolean
): ReturnType<T> {
  const [value, setValue] = useState<T>(initialValue);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const setter = useCallback(
    (newValue: T) => {
      if (timer.current) clearTimeout(timer.current);

      if (value !== newValue && equalityFunction?.(value, newValue) === false) {
        timer.current = setTimeout(() => {
          setValue(newValue);
          timer.current = null;
        }, delay);
      }
    },
    [delay, value, equalityFunction]
  );

  return [value, setter];
}

export default useDebouncedState;

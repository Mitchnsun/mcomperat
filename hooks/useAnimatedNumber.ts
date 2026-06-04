'use client';

import { useEffect, useState } from 'react';

export function useAnimatedNumber(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (duration <= 0) {
      setValue(target);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let start: number | null = null;
    let raf = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.floor(target * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
        return;
      }

      setValue(target);
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [duration, target]);

  return value;
}

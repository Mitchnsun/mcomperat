'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement>(
  threshold = 0.08,
  root?: RefObject<HTMLElement | null>
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node || revealed || typeof IntersectionObserver === 'undefined') return;

    const rootElement = root?.current ?? (node.closest('.cv-main') as HTMLElement | null);
    let willChangeTimeoutId = 0;
    const clearWillChange = () => {
      node.style.willChange = '';
      if (willChangeTimeoutId) window.clearTimeout(willChangeTimeoutId);
    };

    node.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setRevealed(true);
        observer.disconnect();
        node.addEventListener('transitionend', clearWillChange, { once: true });
        willChangeTimeoutId = window.setTimeout(clearWillChange, 700);
      },
      {
        threshold,
        root: rootElement,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearWillChange();
    };
  }, [revealed, threshold, root]);

  return [ref, revealed];
}

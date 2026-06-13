'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

// Tracks which experience card is currently the most visible inside the
// scrollable main container and returns its id. Used to highlight the active
// entry in the sidebar navigation.
export function useScrollTracking(mainRef: RefObject<HTMLElement | null>, expIds: string[]) {
  const [activeId, setActiveId] = useState<string>(expIds[0] ?? '');
  // Persistent map of id → current intersectionRatio for all observed elements.
  // The IntersectionObserver callback only delivers *changed* entries, not the
  // full visible set, so we must accumulate state ourselves to compare correctly.
  const ratioMap = useRef<Map<string, number>>(new Map());

  // Re-key the effect on the list contents rather than the array reference so
  // it does not re-run on every render when callers pass a new array.
  const expIdsKey = expIds.join('|');

  useEffect(() => {
    const container = mainRef.current;
    if (!container || expIds.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') return;

    ratioMap.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio > 0) {
            ratioMap.current.set(e.target.id, e.intersectionRatio);
          } else {
            ratioMap.current.delete(e.target.id);
          }
        });

        // Pick the card with the highest ratio; expIds is in document order so
        // the first match wins ties, preferring the topmost visible card.
        let bestId = '';
        let bestRatio = -1;
        expIds.forEach((id) => {
          const ratio = ratioMap.current.get(id) ?? -1;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        // Allow bestId to be '' so the highlight clears when no card is visible
        // (e.g. scrolled past the experiences section into Skills / Contact).
        setActiveId(bestId);
      },
      { root: container, rootMargin: '-15% 0px -50% 0px', threshold: [0, 0.1, 0.3, 0.5] }
    );

    expIds.forEach((id) => {
      const el = container.querySelector(`#${CSS.escape(id)}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      ratioMap.current.clear();
    };
  }, [mainRef, expIdsKey]);

  return activeId;
}

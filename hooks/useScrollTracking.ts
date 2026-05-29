'use client';

import { type RefObject, useEffect, useState } from 'react';

// Tracks which experience card is currently the most visible inside the
// scrollable main container and returns its id. Used to highlight the active
// entry in the sidebar navigation.
export function useScrollTracking(mainRef: RefObject<HTMLElement | null>, expIds: string[]) {
  const [activeId, setActiveId] = useState<string>(expIds[0] ?? '');

  // Re-key the effect on the list contents rather than the array reference so
  // it does not re-run on every render when callers pass a new array.
  const expIdsKey = expIds.join('|');

  useEffect(() => {
    const container = mainRef.current;
    if (!container || expIds.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.intersectionRatio > 0)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { root: container, rootMargin: '-15% 0px -50% 0px', threshold: [0, 0.1, 0.3, 0.5] }
    );

    expIds.forEach((id) => {
      const el = container.querySelector(`#${CSS.escape(id)}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mainRef, expIdsKey]);

  return activeId;
}

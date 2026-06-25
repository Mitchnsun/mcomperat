'use client';

import { useEffect, useRef } from 'react';

export const PAPER_PX = 210 * (96 / 25.4);
export const HORIZONTAL_PADDING = 64;
export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 1;

export function getFitZoom(stageWidth: number) {
  const availableWidth = stageWidth - HORIZONTAL_PADDING;

  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, availableWidth / PAPER_PX));
}

export function fit(stage: HTMLElement, paper: HTMLElement) {
  paper.style.zoom = String(getFitZoom(stage.clientWidth));
}

export function useFitToWidth() {
  const stageRef = useRef<HTMLElement>(null);
  const paperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const paper = paperRef.current;

    if (!stage || !paper) {
      return;
    }

    const update = () => {
      fit(stage, paper);
    };

    update();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(update);
    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { stageRef, paperRef };
}

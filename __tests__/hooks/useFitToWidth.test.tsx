import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { fit, HORIZONTAL_PADDING, PAPER_PX, useFitToWidth } from '@/hooks/useFitToWidth';

class ResizeObserverMock {
  public readonly callback: ResizeObserverCallback;
  public readonly disconnect = jest.fn();
  public readonly observe = jest.fn();

  public constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  public trigger() {
    this.callback([] as ResizeObserverEntry[], this as unknown as ResizeObserver);
  }
}

function TestComponent() {
  const { paperRef, stageRef } = useFitToWidth();

  return (
    <div ref={stageRef} data-testid="stage">
      <article ref={paperRef} data-testid="paper">
        Sheet
      </article>
    </div>
  );
}

describe('useFitToWidth', () => {
  let observer: ResizeObserverMock;
  let widths: WeakMap<Element, number>;

  beforeEach(() => {
    widths = new WeakMap<Element, number>();

    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return widths.get(this) ?? 0;
      },
    });

    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      writable: true,
      value: jest.fn((callback: ResizeObserverCallback) => {
        observer = new ResizeObserverMock(callback);
        return observer as unknown as ResizeObserver;
      }),
    });
  });

  it('sets zoom to 1 when the stage is wide enough', () => {
    const stage = document.createElement('div');
    const paper = document.createElement('article');

    Object.defineProperty(stage, 'clientWidth', {
      configurable: true,
      value: PAPER_PX + HORIZONTAL_PADDING + 120,
    });

    fit(stage, paper);

    expect(paper.style.zoom).toBe('1');
  });

  it('sets zoom below 1 when the stage is narrow', () => {
    const stage = document.createElement('div');
    const paper = document.createElement('article');

    Object.defineProperty(stage, 'clientWidth', {
      configurable: true,
      value: PAPER_PX * 0.75 + HORIZONTAL_PADDING,
    });

    fit(stage, paper);

    expect(Number(paper.style.zoom)).toBeCloseTo(0.75, 2);
  });

  it('never sets zoom below 0.3', () => {
    const stage = document.createElement('div');
    const paper = document.createElement('article');

    Object.defineProperty(stage, 'clientWidth', {
      configurable: true,
      value: 1,
    });

    fit(stage, paper);

    expect(paper.style.zoom).toBe('0.3');
  });

  it('recalculates the zoom when the stage resizes', async () => {
    render(<TestComponent />);

    const stage = screen.getByTestId('stage');
    const paper = screen.getByTestId('paper');

    widths.set(stage, PAPER_PX + HORIZONTAL_PADDING + 120);
    observer.trigger();

    await waitFor(() => {
      expect(paper.style.zoom).toBe('1');
    });

    widths.set(stage, PAPER_PX * 0.5 + HORIZONTAL_PADDING);
    observer.trigger();

    await waitFor(() => {
      expect(Number(paper.style.zoom)).toBeCloseTo(0.5, 2);
    });
  });
});

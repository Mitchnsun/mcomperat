import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import React, { useRef } from 'react';

import { useScrollTracking } from '@/hooks/useScrollTracking';

type IOEntry = {
  target: Element;
  intersectionRatio: number;
};

type IOCallback = (entries: IOEntry[]) => void;

class MockIntersectionObserver {
  static callback: IOCallback | null = null;
  static disconnect = jest.fn();

  constructor(callback: IOCallback) {
    MockIntersectionObserver.callback = callback;
  }

  observe() {
    return undefined;
  }

  disconnect() {
    MockIntersectionObserver.disconnect();
  }
}

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

function useTrackedActiveId(ids: string[]) {
  const ref = useRef<HTMLElement>(document.createElement('main'));

  ids.forEach((id) => {
    const section = document.createElement('section');
    section.id = id;
    ref.current.append(section);
  });

  return useScrollTracking(ref, ids);
}

describe('useScrollTracking', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    });
    MockIntersectionObserver.disconnect.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the first experience id on mount', () => {
    const { result } = renderHook(() => useTrackedActiveId(['exp-0', 'exp-1']), { wrapper });

    expect(result.current).toBe('exp-0');
  });

  it('updates active id when another experience intersects more', () => {
    const { result } = renderHook(() => useTrackedActiveId(['exp-0', 'exp-1']), { wrapper });

    const exp0 = document.createElement('section');
    exp0.id = 'exp-0';
    const exp1 = document.createElement('section');
    exp1.id = 'exp-1';

    act(() => {
      MockIntersectionObserver.callback?.([
        { target: exp0, intersectionRatio: 0.2 },
        { target: exp1, intersectionRatio: 0.8 },
      ]);
    });

    expect(result.current).toBe('exp-1');
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useTrackedActiveId(['exp-0', 'exp-1']), { wrapper });

    unmount();

    expect(MockIntersectionObserver.disconnect).toHaveBeenCalled();
  });
});

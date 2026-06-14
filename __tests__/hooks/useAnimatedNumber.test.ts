import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

describe('useAnimatedNumber', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should start at 0', () => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);

    const { result } = renderHook(() => useAnimatedNumber(50, 1000));

    expect(result.current).toBe(0);
  });

  it('should reach target after duration', () => {
    let timestamp = 0;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      timestamp += 500;
      callback(timestamp);
      return timestamp;
    });

    const { result } = renderHook(() => useAnimatedNumber(100, 1000));

    expect(result.current).toBe(100);
  });

  it('should jump to target if prefers-reduced-motion', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });

    const { result } = renderHook(() => useAnimatedNumber(77, 1000));

    expect(result.current).toBe(77);
  });
});

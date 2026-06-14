import { beforeEach, describe, expect, it } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';

import { DEFAULT_THEME, THEME_STORAGE_KEY, useTheme } from '@/hooks/useTheme';

const CLEAN_THEME = 'clean';
const DATA_THEME_ATTR = 'data-theme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(DATA_THEME_ATTR);
  });

  it('should return dark as default theme', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe(DEFAULT_THEME);
  });

  it('should persist theme to localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme(CLEAN_THEME);
    });

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(CLEAN_THEME);
  });

  it('should read theme from localStorage on mount', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'bold');

    const { result } = renderHook(() => useTheme());

    await waitFor(() => {
      expect(result.current.theme).toBe('bold');
    });
  });

  it('should apply data-theme attribute to documentElement', async () => {
    const { result } = renderHook(() => useTheme());

    await waitFor(() => {
      expect(document.documentElement.getAttribute(DATA_THEME_ATTR)).toBe(DEFAULT_THEME);
    });

    act(() => {
      result.current.setTheme(CLEAN_THEME);
    });

    expect(document.documentElement.getAttribute(DATA_THEME_ATTR)).toBe(CLEAN_THEME);
  });
});

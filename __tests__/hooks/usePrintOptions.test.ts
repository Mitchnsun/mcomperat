import { beforeEach, describe, expect, it } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
  DEFAULT_DESIGN,
  DEFAULT_MODE,
  defaultCustomConfig,
  PRINT_CUSTOM_STORAGE_KEY,
  PRINT_DESIGN_STORAGE_KEY,
  PRINT_MODE_STORAGE_KEY,
  usePrintOptions,
} from '@/hooks/usePrintOptions';

describe('usePrintOptions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should expose the documented defaults', () => {
    const { result } = renderHook(() => usePrintOptions('fr'));

    expect(result.current.design).toBe(DEFAULT_DESIGN);
    expect(result.current.mode).toBe(DEFAULT_MODE);
    expect(result.current.custom).toEqual(defaultCustomConfig());
    expect(result.current.lang).toBe('fr');
  });

  it('should default lang to the current locale', () => {
    const { result } = renderHook(() => usePrintOptions('en'));

    expect(result.current.lang).toBe('en');
  });

  it('should default custom to all sections enabled, full detail and full scope', () => {
    const { result } = renderHook(() => usePrintOptions('fr'));

    expect(Object.values(result.current.custom.sections).every(Boolean)).toBe(true);
    expect(result.current.custom.detail).toBe('full');
    expect(result.current.custom.scope).toBe('all');
  });

  it('should persist design, mode and custom to localStorage', () => {
    const { result } = renderHook(() => usePrintOptions('fr'));

    act(() => {
      result.current.setDesign('editorial');
      result.current.setMode('condensed');
      result.current.setCustom((current) => ({ ...current, detail: 'summary' }));
    });

    expect(localStorage.getItem(PRINT_DESIGN_STORAGE_KEY)).toBe('editorial');
    expect(localStorage.getItem(PRINT_MODE_STORAGE_KEY)).toBe('condensed');
    expect(JSON.parse(localStorage.getItem(PRINT_CUSTOM_STORAGE_KEY) ?? '{}').detail).toBe('summary');
  });

  it('should read persisted design, mode and custom from localStorage on mount', async () => {
    localStorage.setItem(PRINT_DESIGN_STORAGE_KEY, 'timeline');
    localStorage.setItem(PRINT_MODE_STORAGE_KEY, 'custom');
    localStorage.setItem(
      PRINT_CUSTOM_STORAGE_KEY,
      JSON.stringify({ ...defaultCustomConfig(), detail: 'summary', scope: 'recent' })
    );

    const { result } = renderHook(() => usePrintOptions('fr'));

    await waitFor(() => {
      expect(result.current.design).toBe('timeline');
    });
    expect(result.current.mode).toBe('custom');
    expect(result.current.lang).toBe('fr');
    expect(result.current.custom.detail).toBe('summary');
    expect(result.current.custom.scope).toBe('recent');
  });

  it('should always use initialLang regardless of any persisted lang value', async () => {
    const { result } = renderHook(() => usePrintOptions('fr'));

    act(() => {
      result.current.setLang('en');
    });

    // Re-mount with locale 'fr': lang must reset to initialLang, not the in-session switch.
    const { result: result2 } = renderHook(() => usePrintOptions('fr'));
    await waitFor(() => {
      expect(result2.current.lang).toBe('fr');
    });
  });

  it('should ignore invalid persisted values and fall back to defaults', async () => {
    localStorage.setItem(PRINT_DESIGN_STORAGE_KEY, 'not-a-design');
    localStorage.setItem(PRINT_CUSTOM_STORAGE_KEY, '{ broken json');

    const { result } = renderHook(() => usePrintOptions('fr'));

    await waitFor(() => {
      expect(result.current.design).toBe(DEFAULT_DESIGN);
    });
    expect(result.current.custom).toEqual(defaultCustomConfig());
  });

  it('should toggle a single custom section without touching the others', () => {
    const { result } = renderHook(() => usePrintOptions('fr'));

    act(() => {
      result.current.setCustom((current) => ({
        ...current,
        sections: { ...current.sections, sports: false },
      }));
    });

    expect(result.current.custom.sections.sports).toBe(false);
    expect(result.current.custom.sections.profile).toBe(true);
  });
});

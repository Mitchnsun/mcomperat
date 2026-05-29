'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'clean' | 'bold';

export const THEMES: Theme[] = ['dark', 'clean', 'bold'];
export const THEME_STORAGE_KEY = 'cv-theme';
export const DEFAULT_THEME: Theme = 'dark';

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value);
}

function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (isTheme(saved)) {
        applyTheme(saved);
        setThemeState(saved);
        return;
      }
    } catch {
      // localStorage may be unavailable (SSR, privacy mode). Fall back to default.
    }
    applyTheme(DEFAULT_THEME);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the attribute is still applied.
    }
    setThemeState(next);
  }, []);

  return { theme, setTheme };
}

'use client';

import { useCallback, useEffect, useState } from 'react';

import { type Lang } from '@/types';

export type Design = 'classic' | 'editorial' | 'timeline';
export type ContentMode = 'full' | 'condensed' | 'custom';
export type SectionKey =
  | 'profile'
  | 'techSkills'
  | 'funcSkills'
  | 'education'
  | 'languages'
  | 'interests'
  | 'sports'
  | 'contact';

export interface CustomConfig {
  sections: Record<SectionKey, boolean>;
  detail: 'full' | 'summary';
  scope: 'all' | 'recent';
}

export const DESIGNS: Design[] = ['classic', 'editorial', 'timeline'];
export const CONTENT_MODES: ContentMode[] = ['full', 'condensed', 'custom'];
export const SECTION_KEYS: SectionKey[] = [
  'profile',
  'techSkills',
  'funcSkills',
  'education',
  'languages',
  'interests',
  'sports',
  'contact',
];

export const PRINT_DESIGN_STORAGE_KEY = 'cv-print-design';
export const PRINT_MODE_STORAGE_KEY = 'cv-print-mode';
export const PRINT_CUSTOM_STORAGE_KEY = 'cv-print-custom';

export const DEFAULT_DESIGN: Design = 'classic';
export const DEFAULT_MODE: ContentMode = 'full';

// Defaults: every section enabled, full detail, full scope.
export function defaultCustomConfig(): CustomConfig {
  return {
    sections: SECTION_KEYS.reduce(
      (acc, key) => {
        // eslint-disable-next-line security/detect-object-injection -- key is a fixed SectionKey
        acc[key] = true;
        return acc;
      },
      {} as Record<SectionKey, boolean>
    ),
    detail: 'full',
    scope: 'all',
  };
}

function isDesign(value: unknown): value is Design {
  return typeof value === 'string' && (DESIGNS as readonly string[]).includes(value);
}

function isContentMode(value: unknown): value is ContentMode {
  return typeof value === 'string' && (CONTENT_MODES as readonly string[]).includes(value);
}

function isCustomConfig(value: unknown): value is CustomConfig {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Partial<CustomConfig>;
  return (
    typeof candidate.sections === 'object' &&
    candidate.sections !== null &&
    (candidate.detail === 'full' || candidate.detail === 'summary') &&
    (candidate.scope === 'all' || candidate.scope === 'recent')
  );
}

// Merge a stored config with the defaults so newly introduced sections keep a
// sensible (enabled) default even if the persisted object predates them.
function mergeCustomConfig(stored: CustomConfig): CustomConfig {
  const base = defaultCustomConfig();
  return {
    detail: stored.detail,
    scope: stored.scope,
    sections: SECTION_KEYS.reduce(
      (acc, key) => {
        // eslint-disable-next-line security/detect-object-injection -- key is a fixed SectionKey
        const persisted = stored.sections[key];
        // eslint-disable-next-line security/detect-object-injection -- key is a fixed SectionKey
        acc[key] = typeof persisted === 'boolean' ? persisted : base.sections[key];
        return acc;
      },
      {} as Record<SectionKey, boolean>
    ),
  };
}

function readStored<T>(key: string, parse: (raw: string) => T | null): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return null;
    }
    return parse(raw);
  } catch {
    // localStorage may be unavailable (SSR, privacy mode). Fall back to default.
    return null;
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures; the in-memory state is still updated.
  }
}

export function usePrintOptions(initialLang: Lang) {
  const [design, setDesignState] = useState<Design>(DEFAULT_DESIGN);
  const [mode, setModeState] = useState<ContentMode>(DEFAULT_MODE);
  const [custom, setCustomState] = useState<CustomConfig>(defaultCustomConfig);
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Hydrate from localStorage on mount (SSR-safe: defaults are used server-side
  // and until this effect runs on the client).
  useEffect(() => {
    const storedDesign = readStored(PRINT_DESIGN_STORAGE_KEY, (raw) => (isDesign(raw) ? raw : null));
    if (storedDesign) {
      setDesignState(storedDesign);
    }

    const storedMode = readStored(PRINT_MODE_STORAGE_KEY, (raw) => (isContentMode(raw) ? raw : null));
    if (storedMode) {
      setModeState(storedMode);
    }

    const storedCustom = readStored(PRINT_CUSTOM_STORAGE_KEY, (raw) => {
      const parsed: unknown = JSON.parse(raw);
      return isCustomConfig(parsed) ? parsed : null;
    });
    if (storedCustom) {
      setCustomState(mergeCustomConfig(storedCustom));
    }
  }, []);

  const setDesign = useCallback((next: Design) => {
    writeStored(PRINT_DESIGN_STORAGE_KEY, next);
    setDesignState(next);
  }, []);

  const setMode = useCallback((next: ContentMode) => {
    writeStored(PRINT_MODE_STORAGE_KEY, next);
    setModeState(next);
  }, []);

  const setCustom = useCallback((updater: (current: CustomConfig) => CustomConfig) => {
    setCustomState((current) => {
      const next = updater(current);
      writeStored(PRINT_CUSTOM_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  return { design, setDesign, mode, setMode, custom, setCustom, lang, setLang };
}

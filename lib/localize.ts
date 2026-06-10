import { type Lang, type Localized, type LocalizedDate, type LocalizedList } from '@/types';

// Resolve a bilingual value (or a plain string) to the active language.
export function pick(value: Localized | LocalizedDate, lang: Lang): string {
  // eslint-disable-next-line security/detect-object-injection -- lang is a 'fr' | 'en' literal
  return typeof value === 'string' ? value : value[lang];
}

// Resolve a bilingual list to the active language.
export function pickList(value: LocalizedList, lang: Lang): string[] {
  // eslint-disable-next-line security/detect-object-injection -- lang is a 'fr' | 'en' literal
  return value[lang];
}

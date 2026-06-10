// Tag category metadata: each technology tag is grouped under a reference
// (`TagRef`) that maps to a consistent background / foreground color pair.
// Colors are oklch() so they read well across the three themes.
export type TagRef = 'html' | 'css' | 'js' | 'back' | 'ios' | 'db' | 'test' | 'a11y' | 'cms';

export interface TagColor {
  bg: string;
  fg: string;
}

export const TAG_META: Record<TagRef, TagColor> = {
  html: { bg: 'oklch(0.48 0.12 145)', fg: '#fff' },
  css: { bg: 'oklch(0.48 0.12 232)', fg: '#fff' },
  js: { bg: 'oklch(0.72 0.15 82)', fg: '#1a1200' },
  back: { bg: 'oklch(0.38 0.06 260)', fg: '#fff' },
  ios: { bg: 'oklch(0.50 0.14 320)', fg: '#fff' },
  db: { bg: 'oklch(0.62 0.12 196)', fg: '#001a1a' },
  test: { bg: 'oklch(0.50 0.10 290)', fg: '#fff' },
  a11y: { bg: 'oklch(0.55 0.11 162)', fg: '#fff' },
  cms: { bg: 'oklch(0.55 0.08 42)', fg: '#fff' },
};

// Fallback color pair for unknown / unset tag references.
export const DEFAULT_TAG_COLOR: TagColor = { bg: 'oklch(0.55 0 0)', fg: '#fff' };

export function getTagColor(ref: string): TagColor {
  return Object.hasOwn(TAG_META, ref) ? TAG_META[ref as TagRef] : DEFAULT_TAG_COLOR;
}

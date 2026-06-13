// Tag category metadata: each technology tag is grouped under a reference
// (`TagRef`) that maps to a consistent background / foreground color pair.
export type TagRef = 'html' | 'css' | 'js' | 'back' | 'ios' | 'db' | 'test' | 'a11y' | 'cms';

export interface TagColor {
  bg: string;
  fg: string;
}

export const TAG_META: Record<TagRef, TagColor> = {
  html: { bg: '#286f2f', fg: '#fff' },
  css: { bg: '#00a6f4', fg: '#fff' },
  js: { bg: '#d39900', fg: '#1a1200' },
  back: { bg: '#9ca8ab', fg: '#fff' },
  ios: { bg: '#854494', fg: '#fff' },
  db: { bg: '#009c9e', fg: '#001a1a' },
  test: { bg: '#9810fa', fg: '#fff' },
  a11y: { bg: '#1f855d', fg: '#fff' },
  cms: { bg: '#99624c', fg: '#fff' },
};

// Fallback color pair for unknown / unset tag references.
export const DEFAULT_TAG_COLOR: TagColor = { bg: '#717171', fg: '#fff' };

export function getTagColor(ref: string): TagColor {
  return Object.hasOwn(TAG_META, ref) ? TAG_META[ref as TagRef] : DEFAULT_TAG_COLOR;
}

import { type Experience } from '@/types';

/**
 * Returns true if the experience matches the active filter (or if there is no filter).
 */
export function matchesFilter(exp: Experience, filter: string | null): boolean {
  if (!filter) return true;
  return exp.tags.some((tag) => tag.name === filter);
}

/**
 * Finds the TagRef string for a given tag name by searching through experiences.
 * Used to look up the color/category of a tag when only its display name is known
 * (e.g. when building the FilterBar from the active filter state).
 */
export function findTagRef(experiences: Experience[], tagName: string): string | undefined {
  for (const exp of experiences) {
    const found = exp.tags.find((t) => t.name === tagName);
    if (found) return found.ref;
  }
  return undefined;
}

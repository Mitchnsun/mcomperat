import { type TagRef } from '@/lib/tagMeta';
import { type Experience } from '@/types';

/**
 * Returns how many of the experience's tags are present in the active filters array.
 * A result of 0 means the experience doesn't match any selected filter.
 * Used to sort and dim experience cards when one or more filters are active.
 */
export function countMatchingTags(exp: Experience, filters: string[]): number {
  if (filters.length === 0) return 0;
  return exp.tags.filter((tag) => filters.includes(tag.name)).length;
}

/**
 * Finds the TagRef string for a given tag name by searching through experiences.
 * Used to look up the color/category of a tag when only its display name is known
 * (e.g. when building the FilterBar from the active filter state).
 */
export function findTagRef(experiences: Experience[], tagName: string): TagRef | undefined {
  for (const exp of experiences) {
    const found = exp.tags.find((t) => t.name === tagName);
    if (found) return found.ref;
  }
  return undefined;
}

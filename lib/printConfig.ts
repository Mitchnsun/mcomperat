import { type ContentMode, type CustomConfig, type Experience, type ResumeData, type SectionKey } from '@/types';

// All sections enabled — used by the 'full' preset.
export const ALL_ON: Record<SectionKey, boolean> = {
  profile: true,
  techSkills: true,
  funcSkills: true,
  education: true,
  languages: true,
  interests: true,
  sports: true,
  contact: true,
};

// Core sections only — used by the 'condensed' preset.
export const CONDENSED: Record<SectionKey, boolean> = {
  profile: true,
  techSkills: true,
  funcSkills: false,
  education: true,
  languages: true,
  interests: false,
  sports: false,
  contact: true,
};

// Number of experiences shown in the 'recent' scope.
const RECENT_COUNT = 5;

export type ResolvedConfig = {
  sections: Record<SectionKey, boolean>;
  detail: 'full' | 'summary';
  scope: 'all' | 'recent';
};

/**
 * Resolves a content mode + optional custom overrides into a concrete
 * `{ sections, detail, scope }` configuration consumed by the print designs.
 *
 * Flags are always strictly boolean values to avoid accidental `{flag && …}`
 * renders of `0` in JSX.
 */
export function resolveConfig(mode: ContentMode, custom: CustomConfig): ResolvedConfig {
  if (mode === 'full') return { sections: { ...ALL_ON }, detail: 'full', scope: 'all' };
  if (mode === 'condensed') return { sections: { ...CONDENSED }, detail: 'summary', scope: 'recent' };
  return { sections: custom.sections, detail: custom.detail, scope: custom.scope };
}

/**
 * Returns the experiences to render based on the resolved scope:
 * - `'recent'` → the 5 most recent experiences (already sorted
 *   antéchronologically by `getResumeData()`).
 * - `'all'`  → all experiences.
 */
export function getExperiences(data: ResumeData, cfg: Pick<ResolvedConfig, 'scope'>): Experience[] {
  if (cfg.scope === 'recent') return data.experiences.slice(0, RECENT_COUNT);
  return data.experiences;
}

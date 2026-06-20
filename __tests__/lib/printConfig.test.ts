import { describe, expect, it } from '@jest/globals';

import { ALL_ON, CONDENSED, getExperiences, resolveConfig } from '@/lib/printConfig';
import { type CustomConfig, type ResumeData, type SectionKey } from '@/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCustom(overrides: Partial<CustomConfig> = {}): CustomConfig {
  return {
    sections: { ...ALL_ON },
    detail: 'full',
    scope: 'all',
    ...overrides,
  };
}

function makeResumeData(count: number): Pick<ResumeData, 'experiences'> {
  return {
    experiences: Array.from({ length: count }, (_, i) => ({
      id: `exp-${i}`,
      company: `Company ${i}`,
      location: 'Paris, France',
      title: { fr: 'Dev', en: 'Dev' },
      start: `${2024 - i}`,
      end: { fr: "Aujourd'hui", en: 'Present' },
      tags: [],
      desc: { fr: '', en: '' },
      list: { fr: [], en: [] },
    })),
  };
}

// ---------------------------------------------------------------------------
// resolveConfig
// ---------------------------------------------------------------------------

describe('resolveConfig — full', () => {
  it('returns all sections set to true', () => {
    const cfg = resolveConfig('full', makeCustom());
    const allTrue = Object.values(cfg.sections).every((v) => v === true);
    expect(allTrue).toBe(true);
  });

  it('returns detail "full"', () => {
    expect(resolveConfig('full', makeCustom()).detail).toBe('full');
  });

  it('returns scope "all"', () => {
    expect(resolveConfig('full', makeCustom()).scope).toBe('all');
  });

  it('does not mutate ALL_ON', () => {
    const before = { ...ALL_ON };
    resolveConfig('full', makeCustom());
    expect(ALL_ON).toEqual(before);
  });
});

describe('resolveConfig — condensed', () => {
  it('sets funcSkills, interests, sports to false', () => {
    const { sections } = resolveConfig('condensed', makeCustom());
    expect(sections.funcSkills).toBe(false);
    expect(sections.interests).toBe(false);
    expect(sections.sports).toBe(false);
  });

  it('keeps profile, techSkills, education, languages, contact as true', () => {
    const { sections } = resolveConfig('condensed', makeCustom());
    const coreKeys: SectionKey[] = ['profile', 'techSkills', 'education', 'languages', 'contact'];
    coreKeys.forEach((key) => {
      // eslint-disable-next-line security/detect-object-injection -- SectionKey is a known literal union
      expect(sections[key]).toBe(true);
    });
  });

  it('returns detail "summary"', () => {
    expect(resolveConfig('condensed', makeCustom()).detail).toBe('summary');
  });

  it('returns scope "recent"', () => {
    expect(resolveConfig('condensed', makeCustom()).scope).toBe('recent');
  });

  it('does not mutate CONDENSED', () => {
    const before = { ...CONDENSED };
    resolveConfig('condensed', makeCustom());
    expect(CONDENSED).toEqual(before);
  });
});

describe('resolveConfig — custom', () => {
  it('returns the custom config as-is', () => {
    const custom: CustomConfig = {
      sections: { ...CONDENSED, funcSkills: true },
      detail: 'summary',
      scope: 'recent',
    };
    const cfg = resolveConfig('custom', custom);
    expect(cfg.sections).toEqual(custom.sections);
    expect(cfg.detail).toBe('summary');
    expect(cfg.scope).toBe('recent');
  });
});

describe('resolveConfig — boolean flags', () => {
  it('all section flags are strictly boolean for full preset', () => {
    const { sections } = resolveConfig('full', makeCustom());
    Object.values(sections).forEach((v) => {
      expect(typeof v).toBe('boolean');
    });
  });

  it('all section flags are strictly boolean for condensed preset', () => {
    const { sections } = resolveConfig('condensed', makeCustom());
    Object.values(sections).forEach((v) => {
      expect(typeof v).toBe('boolean');
    });
  });
});

// ---------------------------------------------------------------------------
// getExperiences
// ---------------------------------------------------------------------------

describe('getExperiences — scope "recent"', () => {
  it('returns exactly 5 experiences', () => {
    const data = makeResumeData(13) as ResumeData;
    const result = getExperiences(data, { scope: 'recent' });
    expect(result).toHaveLength(5);
  });

  it('returns the first 5 (most recent, antéchronological order)', () => {
    const data = makeResumeData(13) as ResumeData;
    const result = getExperiences(data, { scope: 'recent' });
    expect(result[0]?.id).toBe('exp-0');
    expect(result[4]?.id).toBe('exp-4');
  });

  it('returns all when fewer than 5 exist', () => {
    const data = makeResumeData(3) as ResumeData;
    expect(getExperiences(data, { scope: 'recent' })).toHaveLength(3);
  });
});

describe('getExperiences — scope "all"', () => {
  it('returns all experiences', () => {
    const data = makeResumeData(13) as ResumeData;
    expect(getExperiences(data, { scope: 'all' })).toHaveLength(13);
  });
});

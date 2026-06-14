import { describe, expect, it } from '@jest/globals';

import { SKILL_GROUPS } from '@/lib/skills';

describe('SKILL_GROUPS', () => {
  it('contains skill groups with localized titles', () => {
    expect(SKILL_GROUPS.length).toBeGreaterThan(0);
    expect(SKILL_GROUPS[0]?.title.fr).toBeTruthy();
    expect(SKILL_GROUPS[0]?.title.en).toBeTruthy();
  });

  it('contains tags with a name and reference', () => {
    const firstGroup = SKILL_GROUPS[0];
    const firstTag = firstGroup?.tags[0];

    expect(firstTag?.name).toBeTruthy();
    expect(firstTag?.ref).toBeTruthy();
  });
});

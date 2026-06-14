import { describe, expect, it } from '@jest/globals';

import { COMPANY_ACCENT, DEFAULT_COMPANY_ACCENT, getCompanyAccent } from '@/lib/companyColors';

describe('getCompanyAccent', () => {
  it('returns mapped accent for known company', () => {
    expect(getCompanyAccent('Rakuten')).toBe(COMPANY_ACCENT.Rakuten);
  });

  it('returns fallback accent for unknown company', () => {
    expect(getCompanyAccent('Unknown Co')).toBe(DEFAULT_COMPANY_ACCENT);
  });
});

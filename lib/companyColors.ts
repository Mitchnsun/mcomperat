// Accent color used for the sidebar dot of each company.
// Values are oklch() colors so they adapt nicely across themes.
export const COMPANY_ACCENT: Record<string, string> = {
  Greenweez: 'oklch(0.50 0.15 145)',
  'Club Med': 'oklch(0.50 0.14 232)',
  Rakuten: 'oklch(0.48 0.18 22)',
  ADSPL: 'oklch(0.50 0.16 285)',
  Verifone: 'oklch(0.52 0.14 52)',
  "L'Equipe": 'oklch(0.48 0.18 22)',
  Geoks: 'oklch(0.52 0.14 196)',
  CGI: 'oklch(0.45 0.13 250)',
  Logica: 'oklch(0.50 0.11 162)',
  'Daher-Socata': 'oklch(0.58 0.14 82)',
};

// Fallback to the theme accent token when a company is not mapped.
export const DEFAULT_COMPANY_ACCENT = 'var(--color-accent)';

export function getCompanyAccent(company: string): string {
  return Object.hasOwn(COMPANY_ACCENT, company)
    ? // eslint-disable-next-line security/detect-object-injection
      COMPANY_ACCENT[company]
    : DEFAULT_COMPANY_ACCENT;
}

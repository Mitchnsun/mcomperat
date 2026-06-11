export type HeroLocale = 'fr' | 'en';

export type HeroSkillCategory = 'js' | 'css' | 'test' | 'back';

export interface HeroSkill {
  label: string;
  sub: string;
  cat: HeroSkillCategory;
}

export interface HeroStat {
  label: string;
  value: number;
  suffix?: string;
}

export const HERO_SKILLS: Record<HeroLocale, HeroSkill[]> = {
  fr: [
    { label: 'React / Next.js', sub: '9+ ans', cat: 'js' },
    { label: 'TypeScript', sub: '5+ ans', cat: 'js' },
    { label: 'Tailwind CSS', sub: '4+ ans', cat: 'css' },
    { label: 'GraphQL', sub: 'Apollo · REST', cat: 'js' },
    { label: 'Tests', sub: 'Jest · Playwright · Cypress', cat: 'test' },
    { label: 'Node.js', sub: 'Backend · Firebase', cat: 'back' },
  ],
  en: [
    { label: 'React / Next.js', sub: '9+ years', cat: 'js' },
    { label: 'TypeScript', sub: '5+ years', cat: 'js' },
    { label: 'Tailwind CSS', sub: '4+ years', cat: 'css' },
    { label: 'GraphQL', sub: 'Apollo · REST', cat: 'js' },
    { label: 'Testing', sub: 'Jest · Playwright · Cypress', cat: 'test' },
    { label: 'Node.js', sub: 'Backend · Firebase', cat: 'back' },
  ],
};

export const HERO_STATS: Record<HeroLocale, HeroStat[]> = {
  fr: [
    { label: "ans d'exp.", value: 15 },
    { label: 'missions', value: 13 },
    { label: 'technos', value: 28, suffix: '+' },
  ],
  en: [
    { label: 'years exp.', value: 15 },
    { label: 'missions', value: 13 },
    { label: 'techs', value: 28, suffix: '+' },
  ],
};

export function getHeroSkills(locale: HeroLocale): HeroSkill[] {
  switch (locale) {
    case 'en':
      return HERO_SKILLS.en;
    default:
      return HERO_SKILLS.fr;
  }
}

export function getHeroStats(locale: HeroLocale): HeroStat[] {
  switch (locale) {
    case 'en':
      return HERO_STATS.en;
    default:
      return HERO_STATS.fr;
  }
}

export function getHeroSkillColor(category: HeroSkillCategory): string {
  switch (category) {
    case 'css':
      return '#38bdf8';
    case 'test':
      return '#f59e0b';
    case 'back':
      return '#22c55e';
    case 'js':
    default:
      return '#8b5cf6';
  }
}

export function getHeroSkillTint(category: HeroSkillCategory): string {
  switch (category) {
    case 'css':
      return 'rgba(56, 189, 248, 0.14)';
    case 'test':
      return 'rgba(245, 158, 11, 0.14)';
    case 'back':
      return 'rgba(34, 197, 94, 0.14)';
    case 'js':
    default:
      return 'rgba(139, 92, 246, 0.14)';
  }
}

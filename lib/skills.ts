import { type SkillGroup } from '@/types';

// Skill groups shown in the dedicated Skills section. Tags reuse the same
// category references (`TagRef`) as experience tags so colors stay consistent
// and clicking a skill can filter the experience timeline.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { fr: 'Frontend', en: 'Frontend' },
    tags: [
      { name: 'React', ref: 'js' },
      { name: 'Next.js', ref: 'js' },
      { name: 'TypeScript', ref: 'js' },
      { name: 'Redux', ref: 'js' },
      { name: 'React Query', ref: 'js' },
      { name: 'Tailwind CSS', ref: 'css' },
      { name: 'HTML', ref: 'html' },
      { name: 'Accessibilité', ref: 'a11y' },
    ],
  },
  {
    title: { fr: 'Backend & Données', en: 'Backend & Data' },
    tags: [
      { name: 'Node.js', ref: 'back' },
      { name: 'GraphQL', ref: 'back' },
      { name: 'Apollo', ref: 'back' },
      { name: 'Firebase', ref: 'back' },
      { name: 'SQL', ref: 'db' },
    ],
  },
  {
    title: { fr: 'Tests & Qualité', en: 'Testing & Quality' },
    tags: [
      { name: 'Jest', ref: 'test' },
      { name: 'React Testing Library', ref: 'test' },
      { name: 'Playwright', ref: 'test' },
      { name: 'Cypress', ref: 'test' },
    ],
  },
  {
    title: { fr: 'Mobile & CMS', en: 'Mobile & CMS' },
    tags: [
      { name: 'React Native', ref: 'ios' },
      { name: 'iOS', ref: 'ios' },
      { name: 'Storybook', ref: 'cms' },
    ],
  },
];

import React from 'react';

import { getHeroSkillColor, getHeroSkills, getHeroSkillTint, type HeroLocale } from '@/app/data/heroSkills';

// Skill card: dynamic border/background from CSS custom properties, per-theme shadow.
// hero-skill-item carries the keyframe entrance animation defined in globals.css — keep it.
const SKILL_CARD = [
  'hero-skill-item rounded-2xl p-4',
  'border border-[var(--skill-color)] bg-[var(--skill-tint)]',
  'theme-dark:shadow-[0_0_0_1px_color-mix(in_srgb,var(--skill-color)_25%,transparent),0_24px_48px_-32px_var(--skill-color)]',
  'theme-bold:shadow-[4px_4px_0_0_color-mix(in_srgb,var(--skill-color)_55%,transparent)]',
].join(' ');

interface SkillsGridProps {
  locale: HeroLocale;
  sectionTitle: string;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ locale, sectionTitle }) => {
  const skills = getHeroSkills(locale);

  return (
    <div>
      <p className="text-body-muted mb-4 text-xs font-medium tracking-[0.3em] uppercase">{sectionTitle}</p>
      <div className="hero-skills-grid grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <article
            key={`${skill.label}-${skill.sub}`}
            className={SKILL_CARD}
            style={
              {
                '--skill-color': getHeroSkillColor(skill.cat),
                '--skill-tint': getHeroSkillTint(skill.cat),
                animationDelay: `${360 + index * 90}ms`,
              } as React.CSSProperties
            }
          >
            <p className="text-heading text-lg font-semibold tracking-[-0.03em]">{skill.label}</p>
            <p className="text-body-muted mt-2 text-sm">{skill.sub}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;

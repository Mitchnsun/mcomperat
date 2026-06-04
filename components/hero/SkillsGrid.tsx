import React from 'react';

import { getHeroSkillColor, getHeroSkills, getHeroSkillTint, type HeroLocale } from '@/app/data/heroSkills';

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
            className="hero-skill-card hero-skill-item rounded-2xl p-4"
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

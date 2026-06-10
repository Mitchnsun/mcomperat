'use client';

import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

import ContactSection from '@/components/contact/ContactSection';
import EducationSection from '@/components/education/EducationSection';
import ExperiencesSection from '@/components/experience/ExperiencesSection';
import ExtrasSection from '@/components/extras/ExtrasSection';
import SkillsSection from '@/components/skills/SkillsSection';
import { type Lang, type ResumeData } from '@/types';

interface ResumeBodyProps {
  data: ResumeData;
  lang: Lang;
}

// Client container holding the cross-section filter state: clicking a tag (in a
// skill group or an experience card) filters the experience timeline.
const ResumeBody: React.FC<ResumeBodyProps> = ({ data, lang }) => {
  const tSections = useTranslations('sections');
  const tExperiences = useTranslations('experiences');
  const tContact = useTranslations('contact');

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleTagClick = useCallback((tagName: string) => {
    setActiveFilter((current) => (current === tagName ? null : tagName));
  }, []);

  return (
    <div className="flex flex-col gap-12 print:gap-4">
      <ExperiencesSection
        title={tSections('work')}
        experiences={data.experiences}
        lang={lang}
        activeFilter={activeFilter}
        onTagClick={handleTagClick}
        showMoreLabel={tExperiences('showMore')}
        showLessLabel={tExperiences('showLess')}
      />

      <SkillsSection
        title={tSections('skills')}
        groups={data.skills}
        lang={lang}
        activeFilter={activeFilter}
        onTagClick={handleTagClick}
      />

      <EducationSection title={tSections('education')} items={data.education} lang={lang} />

      <ExtrasSection title={tSections('extras')} items={data.extras} lang={lang} />

      <ContactSection
        title={tSections('contact')}
        person={data.person}
        labels={{ email: tContact('email'), linkedin: tContact('linkedin'), github: tContact('github') }}
      />
    </div>
  );
};

export default ResumeBody;

'use client';

import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import ContactSection from '@/components/contact/ContactSection';
import EducationSection from '@/components/education/EducationSection';
import ExperiencesSection from '@/components/experience/ExperiencesSection';
import ExtrasSection from '@/components/extras/ExtrasSection';
import SkillsSection from '@/components/skills/SkillsSection';
import { experienceReveal } from '@/lib/experienceReveal';
import { countMatchingTags } from '@/lib/tagUtils';
import { type Lang, type ResumeData } from '@/types';

interface ResumeBodyProps {
  data: ResumeData;
  lang: Lang;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

// Wrap a state update in a View Transition when the API is available, so card
// reordering is animated. Falls back to a plain setState on unsupported browsers.
function withViewTransition(apply: () => void): void {
  if (typeof document === 'undefined') {
    apply();
    return;
  }

  const startViewTransition = (document as ViewTransitionDocument).startViewTransition?.bind(document);

  if (startViewTransition) {
    startViewTransition(() => flushSync(apply));
    return;
  }

  apply();
}

// Client container holding the cross-section filter state: clicking a tag (in a
// skill group or an experience card) toggles it in the activeFilters array,
// which sorts and dims the experience timeline accordingly.
const ResumeBody: React.FC<ResumeBodyProps> = ({ data, lang }) => {
  const tSections = useTranslations('sections');
  const tExperiences = useTranslations('experiences');
  const tContact = useTranslations('contact');

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const prevFilterCountRef = useRef(0);

  const handleTagClick = useCallback((tagName: string) => {
    withViewTransition(() =>
      setActiveFilters((current) =>
        current.includes(tagName) ? current.filter((n) => n !== tagName) : [...current, tagName]
      )
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    withViewTransition(() => setActiveFilters([]));
  }, []);

  // Register a plain (no view-transition) clear so Layout can call it synchronously
  // via flushSync before scrolling to the target experience.
  useEffect(() => {
    experienceReveal.setClearFilters(() => setActiveFilters([]));
  }, []);

  // Keep the bridge's filtered-out set in sync so Layout can check before scrolling.
  useEffect(() => {
    const ids = new Set(
      data.experiences
        .filter((exp) => countMatchingTags(exp, activeFilters) === 0 && activeFilters.length > 0)
        .map((exp) => exp.id)
    );
    experienceReveal.setFilteredOutIds(ids);
  }, [data.experiences, activeFilters]);

  // Scroll to the experiences section only when the first filter is activated
  // (transition from 0 → ≥1). Subsequent tag additions do not re-scroll.
  useEffect(() => {
    const prev = prevFilterCountRef.current;
    prevFilterCountRef.current = activeFilters.length;
    if (prev === 0 && activeFilters.length > 0) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      document.getElementById('work')?.scrollIntoView({ behavior, block: 'start' });
    }
  }, [activeFilters]);

  return (
    <div className="flex flex-col gap-12 print:gap-4">
      <ExperiencesSection
        title={tSections('work')}
        experiences={data.experiences}
        lang={lang}
        activeFilters={activeFilters}
        onTagClick={handleTagClick}
        onClearFilters={handleClearFilters}
        showMoreLabel={tExperiences('showMore')}
        showLessLabel={tExperiences('showLess')}
      />

      <SkillsSection
        title={tSections('skills')}
        groups={data.skills}
        lang={lang}
        activeFilters={activeFilters}
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

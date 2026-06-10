'use client';

import React, { useMemo, useState } from 'react';

import ExperienceCard from '@/components/experience/ExperienceCard';
import { useActiveExperience } from '@/components/layout/ActiveExperienceContext';
import SectionTitle from '@/components/ui/SectionTitle';
import { type Experience, type Lang } from '@/types';

interface ExperiencesSectionProps {
  title: string;
  experiences: Experience[];
  lang: Lang;
  activeFilter: string | null;
  onTagClick: (tagName: string) => void;
  showMoreLabel: string;
  showLessLabel: string;
}

// Number of experiences shown before the "show more" toggle.
const INITIAL_VISIBLE = 6;
// The first experiences start expanded; the rest start collapsed.
const DEFAULT_EXPANDED_COUNT = 3;

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  title,
  experiences,
  lang,
  activeFilter,
  onTagClick,
  showMoreLabel,
  showLessLabel,
}) => {
  const activeExpId = useActiveExperience();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Experiences sharing a tag with the currently hovered card.
  const relatedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const hovered = experiences.find((exp) => exp.id === hoveredId);
    if (!hovered) return new Set<string>();
    const hoveredTags = new Set(hovered.tags.map((tag) => tag.name));
    return new Set(experiences.filter((exp) => exp.tags.some((tag) => hoveredTags.has(tag.name))).map((exp) => exp.id));
  }, [hoveredId, experiences]);

  const matchesFilter = (exp: Experience) => !activeFilter || exp.tags.some((tag) => tag.name === activeFilter);

  // When filtering, every match must be visible regardless of the show-more state.
  const expandList = showAll || Boolean(activeFilter);
  const hasOverflow = experiences.length > INITIAL_VISIBLE;

  return (
    <section id="work" className="scroll-mt-28 pb-4 print:pb-0">
      <SectionTitle>{title}</SectionTitle>

      <div className="flex flex-col gap-4 print:gap-2">
        {experiences.map((exp, index) => {
          const isFilterMatch = matchesFilter(exp);
          const isRelated = Boolean(hoveredId) && exp.id !== hoveredId && relatedIds.has(exp.id);
          const isDimmed =
            (Boolean(activeFilter) && !isFilterMatch) ||
            (Boolean(hoveredId) && exp.id !== hoveredId && !relatedIds.has(exp.id));
          const isOverflow = index >= INITIAL_VISIBLE && !expandList;

          return (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              lang={lang}
              isActive={exp.id === activeExpId}
              isRelated={isRelated}
              isDimmed={isDimmed}
              defaultExpanded={index < DEFAULT_EXPANDED_COUNT}
              activeFilter={activeFilter}
              onTagClick={onTagClick}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={isOverflow ? 'is-overflow-hidden' : undefined}
            />
          );
        })}
      </div>

      {hasOverflow && !activeFilter ? (
        <button
          type="button"
          onClick={() => setShowAll((open) => !open)}
          className="border-border text-body-muted hover:text-body focus-visible:ring-accent mt-4 rounded-full border px-4 py-2 text-sm focus:outline-none focus-visible:ring-2 print:hidden"
        >
          {showAll ? showLessLabel : showMoreLabel}
        </button>
      ) : null}
    </section>
  );
};

export default ExperiencesSection;

'use client';

import React, { useMemo, useRef, useState } from 'react';

import ExperienceCard from '@/components/experience/ExperienceCard';
import FilterBar from '@/components/experience/FilterBar';
import { useActiveExperience } from '@/components/layout/ActiveExperienceContext';
import SectionTitle from '@/components/ui/SectionTitle';
import { findTagRef } from '@/lib/tagUtils';
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
  // Tracks when the mouse last physically moved. mouseenter fires both on genuine
  // mouse movement and when scroll brings a card under a stationary cursor — only
  // the former should activate the hover state.
  const lastMouseMoveAt = useRef<number>(0);

  // Experiences sharing a tag with the currently hovered card.
  // Experiences from the same company are intentionally excluded: consecutive roles at
  // the same company share the same accent color, which makes the highlight indistinct
  // and confusing. Showing cross-company matches is also more informative.
  const relatedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const hovered = experiences.find((exp) => exp.id === hoveredId);
    if (!hovered) return new Set<string>();
    const hoveredTags = new Set(hovered.tags.map((tag) => tag.name));
    return new Set(
      experiences
        .filter((exp) => exp.company !== hovered.company && exp.tags.some((tag) => hoveredTags.has(tag.name)))
        .map((exp) => exp.id)
    );
  }, [hoveredId, experiences]);

  const matchesFilter = (exp: Experience) => !activeFilter || exp.tags.some((tag) => tag.name === activeFilter);

  // When filtering, every match must be visible regardless of the show-more state.
  const expandList = showAll || Boolean(activeFilter);
  const hasOverflow = experiences.length > INITIAL_VISIBLE;

  // Derived values for the FilterBar.
  const activeTagRef = useMemo(() => findTagRef(experiences, activeFilter ?? ''), [experiences, activeFilter]);
  const matchCount = useMemo(
    () => experiences.filter((exp) => exp.tags.some((tag) => tag.name === activeFilter)).length,
    [experiences, activeFilter]
  );

  return (
    <section id="work" className="scroll-mt-28 pb-4 print:pb-0">
      <SectionTitle>{title}</SectionTitle>

      {activeFilter && activeTagRef ? (
        <FilterBar
          tagName={activeFilter}
          tagRef={activeTagRef}
          count={matchCount}
          total={experiences.length}
          onClear={() => onTagClick(activeFilter)}
        />
      ) : null}

      <div
        className="flex flex-col print:gap-2"
        onMouseMove={() => {
          lastMouseMoveAt.current = performance.now();
        }}
      >
        {experiences.map((exp, index) => {
          const isFilterMatch = matchesFilter(exp);
          const isHovered = exp.id === hoveredId;
          const isRelated = Boolean(hoveredId) && !isHovered && relatedIds.has(exp.id);
          const isDimmed = Boolean(activeFilter) && !isFilterMatch;
          const isOverflow = index >= INITIAL_VISIBLE && !expandList;

          return (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              lang={lang}
              isActive={exp.id === activeExpId}
              isHovered={isHovered}
              isRelated={isRelated}
              isDimmed={isDimmed}
              defaultExpanded={index < DEFAULT_EXPANDED_COUNT}
              activeFilter={activeFilter}
              onTagClick={onTagClick}
              onMouseEnter={() => {
                if (performance.now() - lastMouseMoveAt.current > 50) return;
                setHoveredId(exp.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              className={isOverflow ? 'hidden print:block' : undefined}
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

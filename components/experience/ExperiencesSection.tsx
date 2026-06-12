'use client';

import React, { useMemo, useRef, useState } from 'react';

import ExperienceCard from '@/components/experience/ExperienceCard';
import FilterBar from '@/components/experience/FilterBar';
import { useActiveExperience } from '@/components/layout/ActiveExperienceContext';
import SectionTitle from '@/components/ui/SectionTitle';
import { countMatchingTags, findTagRef } from '@/lib/tagUtils';
import { type Experience, type Lang } from '@/types';

interface ExperiencesSectionProps {
  title: string;
  experiences: Experience[];
  lang: Lang;
  activeFilters: string[];
  onTagClick: (tagName: string) => void;
  onClearFilters: () => void;
  showMoreLabel: string;
  showLessLabel: string;
}

// Number of experiences shown before the "show more" toggle.
const INITIAL_VISIBLE = 6;
// The first experiences start expanded; the rest start collapsed.
const DEFAULT_EXPANDED_COUNT = 3;

// Build a sorted list of experiences: matches (by descending match-count, then
// original position) float to the top; non-matches fall to the bottom.
// When no filters are active every match-count is 0 and original order is preserved.
function buildOrderedList(experiences: Experience[], activeFilters: string[]) {
  return experiences
    .map((exp, index) => ({ exp, index, matchCount: countMatchingTags(exp, activeFilters) }))
    .sort((a, b) => b.matchCount - a.matchCount || a.index - b.index);
}

const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  title,
  experiences,
  lang,
  activeFilters,
  onTagClick,
  onClearFilters,
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

  const hasFilters = activeFilters.length > 0;

  // Sorted list: matching experiences rise to the top, non-matching fall below.
  const ordered = useMemo(() => buildOrderedList(experiences, activeFilters), [experiences, activeFilters]);

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

  // When filtering, every match must be visible regardless of the show-more state.
  const expandList = showAll || hasFilters;
  const hasOverflow = experiences.length > INITIAL_VISIBLE;

  // Tags to display in the FilterBar: only those with a known ref.
  const selectedTags = useMemo(
    () =>
      activeFilters.flatMap((name) => {
        const ref = findTagRef(experiences, name);
        return ref ? [{ name, ref }] : [];
      }),
    [activeFilters, experiences]
  );

  // Count of experiences with at least one matching filter tag.
  const matchCount = useMemo(() => ordered.filter((item) => item.matchCount > 0).length, [ordered]);

  return (
    <section id="work" className="scroll-mt-28 pb-4 print:pb-0">
      <SectionTitle>{title}</SectionTitle>

      {selectedTags.length > 0 ? (
        <FilterBar
          tags={selectedTags}
          count={matchCount}
          total={experiences.length}
          onRemove={onTagClick}
          onClearAll={onClearFilters}
        />
      ) : null}

      <div
        className="flex flex-col print:gap-2"
        style={{ viewTransitionName: 'experience-list' } as React.CSSProperties}
        onMouseMove={() => {
          lastMouseMoveAt.current = performance.now();
        }}
      >
        {ordered.map(({ exp, matchCount: mc }, listIndex) => {
          const isHovered = exp.id === hoveredId;
          const isRelated = Boolean(hoveredId) && !isHovered && relatedIds.has(exp.id);
          const isDimmed = hasFilters && mc === 0;
          const isOverflow = listIndex >= INITIAL_VISIBLE && !expandList;

          return (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              lang={lang}
              isActive={exp.id === activeExpId}
              isHovered={isHovered}
              isRelated={isRelated}
              isDimmed={isDimmed}
              defaultExpanded={listIndex < DEFAULT_EXPANDED_COUNT}
              activeFilters={activeFilters}
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

      {hasOverflow && !hasFilters ? (
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

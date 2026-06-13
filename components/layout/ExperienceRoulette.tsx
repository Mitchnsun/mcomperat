'use client';

import React, { useMemo, useState } from 'react';

import { cn } from '@/lib/cn';
import { getCompanyAccent } from '@/lib/companyColors';
import { type ExperienceNavItem } from '@/types';

// Height of each roulette item in rem (must match h-8 = 2rem).
const ITEM_HEIGHT_REM = 2;

// Clamp the centering offset to min(1, activeIndex):
//  – index=0: active at slot 0 (no empty slot above, no wasted space).
//  – index≥1: active at slot 1 (center), n-1 visible above, n+1 visible below.
const computeTranslateY = (activeIndex: number) => `${(Math.min(1, activeIndex) - activeIndex) * ITEM_HEIGHT_REM}rem`;

// index=0 — active at top edge, no need for a top fade; just fade n+1 gently below.
const MASK_FIRST = 'linear-gradient(to bottom, black 0%, black 50%, transparent 85%)';
// index≥1 — symmetric: fade n-1 in at the top, fade n+1 out at the bottom.
const MASK_CENTER = 'linear-gradient(to bottom, transparent 0%, black 20%, black 65%, transparent 90%)';

// ─── Shared button ────────────────────────────────────────────────────────────

interface NavButtonProps {
  exp: ExperienceNavItem;
  isActive: boolean;
  /** Slot distance from active. Omit for the expanded list (all items fully interactive). */
  distance?: number;
  showYear: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ exp, isActive, distance, showYear, onClick }) => {
  const accent = getCompanyAccent(exp.company);
  const isHidden = distance !== undefined && distance > 1;
  return (
    <button
      type="button"
      aria-current={isActive ? 'true' : undefined}
      tabIndex={isHidden ? -1 : 0}
      onClick={onClick}
      className={cn(
        'flex h-8 w-full cursor-pointer items-center gap-2 rounded px-2 text-left text-sm',
        'focus-visible:ring-accent focus:outline-none focus-visible:ring-2',
        'transition-opacity duration-300',
        {
          'text-heading bg-card-hover font-semibold': isActive,
          'text-body-muted': !isActive && (distance === undefined || distance === 1),
          'pointer-events-none opacity-0': isHidden,
        }
      )}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full border"
        style={
          isActive
            ? { backgroundColor: accent, borderColor: accent }
            : { backgroundColor: 'transparent', borderColor: 'currentColor' }
        }
      />
      <span className="flex-1 truncate">{exp.company}</span>
      {exp.year && showYear ? <span className="text-body-muted text-xs tabular-nums">{exp.year}</span> : null}
    </button>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface ExperienceRouletteProps {
  experiences: ExperienceNavItem[];
  activeExpId: string;
  /** Translated section label rendered in the header row. */
  label: string;
  /** Translated aria-label for the expand/collapse toggle button. */
  toggleLabel: string;
  onExpClick: (id: string) => void;
}

const ExperienceRoulette: React.FC<ExperienceRouletteProps> = ({
  experiences,
  activeExpId,
  label,
  toggleLabel,
  onExpClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  const activeIndex = useMemo(() => {
    const idx = experiences.findIndex((e) => e.id === activeExpId);
    return idx === -1 ? 0 : idx;
  }, [experiences, activeExpId]);

  const translateY = computeTranslateY(activeIndex);
  const maskImage = activeIndex === 0 ? MASK_FIRST : MASK_CENTER;

  return (
    <>
      {/* ── Screen view (roulette or expanded list). Hidden in print. ─────── */}
      <div className="print:hidden">
        {/* Header row: section label + expand/collapse chevron */}
        <div className="mb-0.5 flex items-center justify-between">
          <p className="text-body-muted text-[0.65rem] font-semibold tracking-widest uppercase">{label}</p>
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={toggleLabel}
            onClick={() => setExpanded((v) => !v)}
            className={cn(
              'text-body-muted hover:text-body focus-visible:ring-accent',
              '-mr-1 flex h-6 w-6 items-center justify-center rounded focus:outline-none focus-visible:ring-2',
              'transition-colors'
            )}
          >
            <span aria-hidden="true" className={cn('transition-transform duration-200', { 'rotate-180': expanded })}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
        </div>

        {!expanded ? (
          /* Compact roulette: 3-slot window. Active is centered (index≥1) or at top (index=0). */
          <div className="relative h-24 overflow-hidden" style={{ maskImage, WebkitMaskImage: maskImage }}>
            <ul
              style={{ transform: `translateY(${translateY})` }}
              className="transition-transform duration-300 ease-in-out"
            >
              {experiences.map((exp, index) => {
                const isActive = exp.id === activeExpId;
                const distance = Math.abs(index - activeIndex);
                return (
                  <li key={exp.id}>
                    <NavButton
                      exp={exp}
                      isActive={isActive}
                      distance={distance}
                      showYear={isActive}
                      onClick={() => onExpClick(exp.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          /* Expanded full list: all items visible and interactive. */
          <ul className="space-y-0.5">
            {experiences.map((exp) => {
              const isActive = exp.id === activeExpId;
              return (
                <li key={exp.id}>
                  <NavButton exp={exp} isActive={isActive} showYear={isActive} onClick={() => onExpClick(exp.id)} />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ── Print: full list — the roulette makes no sense on paper. ──────── */}
      <ul className="hidden space-y-0.5 print:block">
        {experiences.map((exp) => {
          const isActive = exp.id === activeExpId;
          return (
            <li key={exp.id}>
              <NavButton exp={exp} isActive={isActive} showYear onClick={() => onExpClick(exp.id)} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ExperienceRoulette;

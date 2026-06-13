'use client';

import React, { useMemo } from 'react';

import { cn } from '@/lib/cn';
import { getCompanyAccent } from '@/lib/companyColors';
import { type ExperienceNavItem } from '@/types';

// Height of each roulette item in rem (must match h-8 = 2rem).
const ITEM_HEIGHT_REM = 2;

interface ExperienceRouletteProps {
  experiences: ExperienceNavItem[];
  activeExpId: string;
  onExpClick: (id: string) => void;
}

// Gradient mask fades neighbors in/out while keeping the active item fully opaque.
// Each slot is exactly 1/3 of the container height (3 × h-8 = h-24).
const MASK = 'linear-gradient(to bottom, transparent 0%, black 33%, black 67%, transparent 100%)';

const ExperienceRoulette: React.FC<ExperienceRouletteProps> = ({ experiences, activeExpId, onExpClick }) => {
  const activeIndex = useMemo(() => {
    const idx = experiences.findIndex((e) => e.id === activeExpId);
    return idx === -1 ? 0 : idx;
  }, [experiences, activeExpId]);

  // Translate the inner list so the active item sits in the middle slot (slot 1 of 3).
  // Item at `activeIndex` is at `activeIndex × ITEM_HEIGHT_REM` from the ul top.
  // We want it at `1 × ITEM_HEIGHT_REM` from the container top → shift by (1 − activeIndex).
  const translateY = `${(1 - activeIndex) * ITEM_HEIGHT_REM}rem`;

  return (
    <>
      {/* Screen: roulette wheel — 3-slot fixed-height window. Hidden in print. */}
      <div className="relative h-24 overflow-hidden print:hidden" style={{ maskImage: MASK, WebkitMaskImage: MASK }}>
        <ul
          style={{ transform: `translateY(${translateY})` }}
          className="transition-transform duration-300 ease-in-out"
        >
          {experiences.map((exp, index) => {
            const isActive = exp.id === activeExpId;
            const distance = Math.abs(index - activeIndex);
            const accent = getCompanyAccent(exp.company);

            return (
              <li key={exp.id}>
                <button
                  type="button"
                  aria-current={isActive ? 'true' : undefined}
                  // Only active + immediate neighbours are keyboard-reachable.
                  tabIndex={distance > 1 ? -1 : 0}
                  onClick={() => onExpClick(exp.id)}
                  className={cn(
                    'flex h-8 w-full cursor-pointer items-center gap-2 rounded px-2 text-left text-sm',
                    'focus-visible:ring-accent focus:outline-none focus-visible:ring-2',
                    'transition-opacity duration-300',
                    {
                      'text-heading bg-card-hover font-semibold': isActive,
                      'text-body-muted': !isActive && distance === 1,
                      // Items outside the visible window are invisible and non-interactive.
                      'pointer-events-none opacity-0': distance > 1,
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
                  {/* Show year only on the active item to reduce visual noise. */}
                  {exp.year && isActive ? (
                    <span className="text-body-muted text-xs tabular-nums">{exp.year}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Print: full list — the roulette makes no sense on paper. Hidden on screen. */}
      <ul className="hidden space-y-0.5 print:block">
        {experiences.map((exp) => {
          const isActive = exp.id === activeExpId;
          const accent = getCompanyAccent(exp.company);
          return (
            <li key={exp.id}>
              <button
                type="button"
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onExpClick(exp.id)}
                className={cn('flex h-8 w-full cursor-pointer items-center gap-2 rounded px-2 text-left text-sm', {
                  'text-heading font-semibold': isActive,
                  'text-body-muted': !isActive,
                })}
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
                {exp.year ? <span className="text-body-muted text-xs tabular-nums">{exp.year}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ExperienceRoulette;

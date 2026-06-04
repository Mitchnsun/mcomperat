'use client';

import React, { useMemo } from 'react';

import { isCurrentPosition, parseYearMonth } from '@/lib/dateUtils';
import { assignRows, MAX_YEAR, MIN_YEAR, type TimelineItem, yearToPct } from '@/lib/timelineUtils';
import { type ExperienceTimelineData } from '@/types';

interface YearTimelineProps {
  experiences: ExperienceTimelineData[];
  activeId: string;
  onExpClick: (id: string) => void;
  lang: 'fr' | 'en';
}

const YearTimeline: React.FC<YearTimelineProps> = ({ experiences, activeId, onExpClick, lang }) => {
  const { packed, byId } = useMemo(() => {
    const rawItems: Omit<TimelineItem, 'row'>[] = experiences.map((exp) => {
      const start = parseYearMonth(exp.start) ?? MIN_YEAR;
      const end = isCurrentPosition(exp.end) ? MAX_YEAR : (parseYearMonth(exp.end) ?? MAX_YEAR);
      return { id: exp.id, company: exp.company, start, end };
    });

    const packedItems = assignRows(rawItems);
    const idMap = new Map<string, ExperienceTimelineData>(experiences.map((exp) => [exp.id, exp]));

    return { packed: packedItems, byId: idMap };
  }, [experiences]);

  const numRows = Math.max(1, ...packed.map((p) => p.row + 1));

  const evenYears: number[] = [];
  for (let y = 2010; y <= 2024; y += 2) {
    evenYears.push(y);
  }

  return (
    <div
      className="border-border bg-bg/88 sticky top-0 z-20 border-b pt-3 pr-7 pb-2 pl-7 backdrop-blur-md print:hidden"
      aria-label={lang === 'fr' ? 'Frise chronologique' : 'Career timeline'}
    >
      <div className="relative mb-[0.35rem] h-4">
        {evenYears.map((y) => (
          <span
            key={y}
            className="text-body-muted absolute -translate-x-1/2 text-[0.625rem] whitespace-nowrap tabular-nums"
            style={{ left: `${yearToPct(y)}%` }}
          >
            {y}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height: `calc(${numRows} * 22px + 4px)` }}>
        {packed.map((item) => {
          const exp = byId.get(item.id);
          if (!exp) return null;
          const leftPct = yearToPct(item.start);
          const widthPct = yearToPct(item.end) - yearToPct(item.start);
          const isActive = item.id === activeId;
          const dateLabel = isCurrentPosition(exp.end)
            ? `${exp.start} – ${lang === 'fr' ? 'présent' : 'present'}`
            : `${exp.start} – ${exp.end}`;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onExpClick(item.id)}
              title={`${exp.company} · ${dateLabel}`}
              aria-label={`${exp.company}, ${dateLabel}`}
              className={[
                'absolute flex h-4.5 cursor-pointer items-center overflow-hidden rounded-[3px] border-none px-1.75 text-[0.625rem] leading-none text-white',
                'bg-(--chip-accent)',
                'transition-[opacity,transform,box-shadow] duration-200 motion-reduce:transition-none',
                'hover:-translate-y-px hover:opacity-100',
                'focus-visible:opacity-100 focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--chip-accent)] focus-visible:outline-none',
                isActive ? 'opacity-100 shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--chip-accent)]' : 'opacity-55',
              ].join(' ')}
              style={
                {
                  left: `${leftPct}%`,
                  width: `max(${widthPct}%, 30px)`,
                  top: `${item.row * 22}px`,
                  '--chip-accent': exp.accent,
                } as React.CSSProperties
              }
            >
              <span className="truncate">{exp.company}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YearTimeline;

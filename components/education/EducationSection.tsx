import React from 'react';

import SectionTitle from '@/components/ui/SectionTitle';
import { pick } from '@/lib/localize';
import { type EducationItem, type Lang } from '@/types';

// Education card shell: 1px border all sides, 3px accent left border, rounded, padded.
const EDU_CARD = [
  'rounded-2xl border border-border border-l-[3px] border-l-accent px-5 py-4',
  'bg-[color-mix(in_srgb,var(--color-card-hover)_40%,transparent)]',
  'theme-bold:border-l-4 theme-bold:border-l-heading',
  'print:rounded-none print:border-0 print:bg-transparent print:p-0',
].join(' ');

interface EducationSectionProps {
  title: string;
  items: EducationItem[];
  lang: Lang;
}

const EducationSection: React.FC<EducationSectionProps> = ({ title, items, lang }) => (
  <section id="education" className="scroll-mt-28 pb-4 print:pb-0">
    <SectionTitle>{title}</SectionTitle>

    <div className="flex flex-col gap-4 print:gap-2">
      {items.map((item, index) => {
        const specialty = pick(item.specialty, lang);
        return (
          <article key={`edu-${index}`} className={EDU_CARD}>
            <h3 className="text-heading text-lg font-bold print:text-base">{pick(item.degree, lang)}</h3>
            <p className="text-body-muted text-sm">
              {pick(item.school, lang)}, {item.location}
              {specialty ? ` — ${specialty}` : ''}
            </p>
            <p className="text-body-muted text-xs tabular-nums">
              {item.start} – {item.end}
            </p>
            <p className="text-body mt-2 print:text-sm">{pick(item.desc, lang)}</p>
          </article>
        );
      })}
    </div>
  </section>
);

export default EducationSection;

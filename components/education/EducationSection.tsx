import React from 'react';

import SectionTitle from '@/components/ui/SectionTitle';
import { cn } from '@/lib/cn';
import { pick } from '@/lib/localize';
import { type EducationItem, type Lang } from '@/types';

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
          <article
            key={`edu-${index}`}
            className={cn(
              'border-l-accent border-l-2 px-5 py-4',
              'print:rounded-none print:border-0 print:bg-transparent print:p-0'
            )}
          >
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

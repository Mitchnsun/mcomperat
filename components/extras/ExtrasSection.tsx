import cn from 'clsx';
import React from 'react';

import SectionTitle from '@/components/ui/SectionTitle';
import { pick, pickList } from '@/lib/localize';
import { type ExtraItem, type Lang } from '@/types';

interface ExtrasSectionProps {
  title: string;
  items: ExtraItem[];
  lang: Lang;
}

const ExtrasSection: React.FC<ExtrasSectionProps> = ({ title, items, lang }) => (
  <section id="extras" className="scroll-mt-28 pb-4 print:pb-0">
    <SectionTitle>{title}</SectionTitle>

    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={`extra-${index}`}
          className={cn('border-border bg-card-hover/40 rounded-2xl border p-4', {
            'print:block': item.print,
            'print:hidden': !item.print,
          })}
        >
          <h3 className="text-heading mb-2 text-base font-bold">{pick(item.title, lang)}</h3>
          <ul className="text-body list-disc pl-5 print:text-sm">
            {pickList(item.list, lang).map((entry, entryIndex) => (
              <li key={`extra-${index}-${entryIndex}`}>{entry}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default ExtrasSection;

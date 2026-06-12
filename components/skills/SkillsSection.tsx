'use client';

import React from 'react';

import SectionTitle from '@/components/ui/SectionTitle';
import TagPill from '@/components/ui/TagPill';
import { pick } from '@/lib/localize';
import { type Lang, type SkillGroup } from '@/types';

interface SkillsSectionProps {
  title: string;
  groups: SkillGroup[];
  lang: Lang;
  activeFilters: string[];
  onTagClick: (tagName: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ title, groups, lang, activeFilters, onTagClick }) => (
  <section id="skills" className="scroll-mt-28 pb-4 print:pb-0">
    <SectionTitle>{title}</SectionTitle>

    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title.en} className="border-border bg-card-hover/40 rounded-2xl border p-4">
          <p className="text-body-muted mb-3 text-xs font-semibold tracking-widest uppercase">
            {pick(group.title, lang)}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag, index) => (
              <TagPill
                key={`${group.title.en}-${tag.ref}-${index}`}
                name={tag.name}
                tagRef={tag.ref}
                onClick={onTagClick}
                active={activeFilters.includes(tag.name)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;

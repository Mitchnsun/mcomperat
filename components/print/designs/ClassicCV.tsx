import React from 'react';

import { pick, pickList } from '@/lib/localize';
import { getExperiences, type ResolvedConfig } from '@/lib/printConfig';
import { type Lang, type Localized, type ResumeData } from '@/types';
import { type PrintData } from '@/types';

interface ClassicCVProps {
  data: ResumeData;
  print: PrintData;
  cfg: ResolvedConfig;
  lang: Lang;
}

const LABELS = {
  profile: { fr: 'Profil', en: 'Profile' },
  experiences: { fr: 'Expériences', en: 'Experience' },
} satisfies Record<string, Localized>;

function sectionTitle(value: Localized, lang: Lang) {
  return (
    <h2 className="mb-2 border-b border-[#d7d7de] pb-1 text-[10px] font-bold tracking-[0.16em] text-[#15151c] uppercase">
      {pick(value, lang)}
    </h2>
  );
}

function expDates(exp: ResumeData['experiences'][number], lang: Lang) {
  return `${pick(exp.start, lang)} – ${pick(exp.end, lang)}`;
}

const ClassicCV: React.FC<ClassicCVProps> = ({ data, print, cfg, lang }) => {
  const { person } = data;
  const experiences = getExperiences(data, cfg);
  const extras = data.extras;
  const languages = extras[0] ? pickList(extras[0].list, lang) : [];
  const interests = extras[1] ? pickList(extras[1].list, lang) : [];
  const sports = extras[3] ? pickList(extras[3].list, lang) : [];

  return (
    <article
      data-testid="print-sheet"
      className="paper paper-page cv-classic min-h-[297mm] w-[210mm] bg-white p-[15mm] font-[var(--font-dm-sans)] text-[#15151c] shadow-[0_16px_40px_rgba(15,23,42,0.18)] print:min-h-0 print:shadow-none print:[zoom:1]!"
    >
      <header className="border-b border-[#d7d7de] pb-4">
        <h1 className="text-[1.75rem] leading-tight font-bold">
          {person.firstname} {person.lastname}
        </h1>
        <p className="mt-1 text-base font-medium text-[#15151c]">{pick(print.headline, lang)}</p>
        <p className="mt-1 text-sm text-[#3a3a44]">{pick(print.tagline, lang)}</p>
        <p className="mt-1 text-xs tracking-[0.08em] text-[#70707c] uppercase">{pick(print.yearsLine, lang)}</p>
        {cfg.sections.contact ? (
          <p className="mt-3 text-xs text-[#3a3a44]">
            {pick(print.contact.location, lang)} · {print.contact.email} · {print.contact.linkedin} ·{' '}
            {print.contact.github} · {print.contact.site}
          </p>
        ) : null}
      </header>

      <div className="mt-5 grid grid-cols-[32%_1fr] gap-6">
        <aside className="space-y-4">
          {cfg.sections.techSkills ? (
            <section>
              {sectionTitle({ fr: 'Compétences techniques', en: 'Technical skills' }, lang)}
              <ul className="space-y-1">
                {/* eslint-disable-next-line security/detect-object-injection -- lang is a strict 'fr' | 'en' union */}
                {print.techSkills[lang].map(([label, value]) => (
                  <li key={label} className="text-[0.7rem] leading-4 text-[#3a3a44]">
                    <span className="font-semibold text-[#15151c]">{label}</span> — {value}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cfg.sections.funcSkills ? (
            <section>
              {sectionTitle({ fr: 'Compétences fonctionnelles', en: 'Functional skills' }, lang)}
              <ul className="space-y-1">
                {pickList(print.funcSkills, lang).map((item) => (
                  <li key={item} className="text-[0.7rem] leading-4 text-[#3a3a44]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cfg.sections.education ? (
            <section>
              {sectionTitle({ fr: 'Formation', en: 'Education' }, lang)}
              <ul className="space-y-2">
                {data.education.map((school) => (
                  <li
                    key={`${pick(school.school, lang)}-${school.start}`}
                    className="text-[0.7rem] leading-4 text-[#3a3a44]"
                  >
                    <p className="font-semibold text-[#15151c]">{pick(school.school, lang)}</p>
                    <p>{pick(school.degree, lang)}</p>
                    <p>
                      {school.start} – {school.end}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cfg.sections.languages ? (
            <section>
              {sectionTitle({ fr: 'Langues', en: 'Languages' }, lang)}
              <ul className="space-y-1">
                {languages.map((item) => (
                  <li key={item} className="text-[0.7rem] leading-4 text-[#3a3a44]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cfg.sections.interests ? (
            <section>
              {sectionTitle({ fr: 'Intérêts', en: 'Interests' }, lang)}
              <ul className="space-y-1">
                {interests.map((item) => (
                  <li key={item} className="text-[0.7rem] leading-4 text-[#3a3a44]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cfg.sections.sports ? (
            <section>
              {sectionTitle({ fr: 'Sports', en: 'Sports' }, lang)}
              <ul className="space-y-1">
                {sports.map((item) => (
                  <li key={item} className="text-[0.7rem] leading-4 text-[#3a3a44]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>

        <main className="space-y-4">
          {cfg.sections.profile ? (
            <section>
              {sectionTitle(LABELS.profile, lang)}
              <p className="text-sm leading-5 text-[#3a3a44]">{pick(print.profile, lang)}</p>
            </section>
          ) : null}

          <section>
            {sectionTitle(LABELS.experiences, lang)}
            <div className="space-y-4">
              {experiences.map((exp) => {
                const bullets = pickList(exp.list, lang);
                return (
                  <article key={exp.id} data-testid="classic-exp" className="[break-inside:avoid]">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-bold text-[#15151c]">{exp.company}</h3>
                      <p className="shrink-0 text-[0.72rem] text-[#70707c]">{expDates(exp, lang)}</p>
                    </div>
                    <p className="mt-0.5 text-[0.72rem] font-semibold text-[#3a3a44]">
                      {pick(exp.title, lang)} · {exp.location}
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-5 text-[#3a3a44]">{pick(exp.desc, lang)}</p>
                    {cfg.detail === 'full' && bullets.length ? (
                      <ul className="c-bullets mt-1.5 list-disc space-y-1 pl-4 text-[0.74rem] leading-4 text-[#3a3a44]">
                        {bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </article>
  );
};

export default ClassicCV;

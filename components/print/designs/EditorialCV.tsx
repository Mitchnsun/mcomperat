import React from 'react';

import { pick, pickList } from '@/lib/localize';
import { getExperiences } from '@/lib/printConfig';
import { type ResolvedConfig } from '@/lib/printConfig';
import { type Lang, type PrintData, type ResumeData } from '@/types';

interface EditorialCVProps {
  data: ResumeData;
  print: PrintData;
  cfg: ResolvedConfig;
  lang: Lang;
}

// Utility: centred section title + thin rule below it.
function EdSec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h2 className="e-sec-title mb-1 text-center text-[9.5pt] font-semibold tracking-[0.14em] text-black/80 uppercase">
        {title}
      </h2>
      <div className="e-sec-rule mb-4 border-t border-black/20" />
      {children}
    </section>
  );
}

// Editorial CV design — single centred column, serif headings, generous air.
// Rendered inside the A4 paper shell provided by PreviewStage.
const EditorialCV: React.FC<EditorialCVProps> = ({ data, print, cfg, lang }) => {
  const { person } = data;
  const { sections, detail } = cfg;
  const isFull = detail === 'full';

  const headline = pick(print.headline, lang);
  const profile = pick(print.profile, lang);
  const location = pick(print.contact.location, lang);
  // eslint-disable-next-line security/detect-object-injection -- lang is 'fr'|'en' literal
  const techSkills = print.techSkills[lang];
  const funcSkills = pickList(print.funcSkills, lang);

  const experiences = getExperiences(data, cfg);

  // ── Extras for languages / interests / sports ────────────────────────────
  // Filter extras that have the 'print' flag; their bilingual titles are used
  // to match the section keys loosely.
  const extrasByTitle = (keyword: string) =>
    data.extras
      .filter((e) => e.print !== false)
      .filter((e) => pick(e.title, lang).toLowerCase().includes(keyword.toLowerCase()));

  const langExtras = extrasByTitle(lang === 'fr' ? 'langue' : 'language');
  const interestExtras = extrasByTitle(lang === 'fr' ? 'intérêt' : 'interest');
  const sportsExtras = extrasByTitle(lang === 'fr' ? 'sport' : 'sport');

  return (
    <div className="cv-editorial font-[family-name:var(--font-dm-sans)] text-[9.5pt] text-black">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="mb-6 text-center">
        <h1 className="font-[family-name:var(--font-source-serif-4)] text-[22pt] leading-tight font-bold text-black">
          {person.firstname} {person.lastname}
        </h1>
        <p className="mt-1 text-[8pt] font-semibold tracking-[0.18em] text-black/60 uppercase">{headline}</p>
        {sections.contact && (
          <p className="mt-2 text-[8pt] text-black/70">
            {print.contact.email}
            <span className="mx-1.5 text-black/30">·</span>
            {print.contact.site}
            <span className="mx-1.5 text-black/30">·</span>
            {location}
          </p>
        )}
        <div className="mt-4 border-t border-black/20" />
      </header>

      {/* ── Profile ────────────────────────────────────────────────────── */}
      {sections.profile && (
        <div className="mb-6 text-center">
          <p className="mx-auto max-w-[130mm] font-[family-name:var(--font-source-serif-4)] text-[10.5pt] leading-[1.7] text-black/85">
            {profile}
          </p>
        </div>
      )}

      {/* ── Technical skills ───────────────────────────────────────────── */}
      {sections.techSkills && (
        <EdSec title={lang === 'fr' ? 'Compétences techniques' : 'Technical Skills'}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {techSkills.map(([category, values]) => (
              <div key={category} className="flex gap-1.5">
                <span className="shrink-0 font-semibold text-black/80">{category} :</span>
                <span className="text-black/70">{values}</span>
              </div>
            ))}
          </div>
          {sections.funcSkills && funcSkills.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-[8.5pt] text-black/60">
              {funcSkills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          )}
        </EdSec>
      )}

      {/* ── Experiences ────────────────────────────────────────────────── */}
      <EdSec title={lang === 'fr' ? 'Expériences professionnelles' : 'Work Experience'}>
        <div className="space-y-4">
          {experiences.map((exp) => {
            const title = pick(exp.title, lang);
            const start = pick(exp.start, lang);
            const end = pick(exp.end, lang);
            const desc = pick(exp.desc, lang);
            const bullets = pickList(exp.list, lang);

            return (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-source-serif-4)] font-semibold text-black">
                    {title}
                    {exp.freelance && (
                      <span className="ml-1.5 text-[7.5pt] font-normal tracking-wider text-black/50 uppercase">
                        Freelance
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-[8pt] text-black/50">
                    {start} – {end}
                  </span>
                </div>
                <p className="text-[8.5pt] font-semibold text-black/60">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
                {desc && <p className="mt-1 leading-[1.55] text-black/80">{desc}</p>}
                {isFull && bullets.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-black/75">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-1.5">
                        <span aria-hidden="true" className="shrink-0 select-none">
                          —
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </EdSec>

      {/* ── Education ──────────────────────────────────────────────────── */}
      {sections.education && data.education.length > 0 && (
        <EdSec title={lang === 'fr' ? 'Formation' : 'Education'}>
          <div className="space-y-2">
            {data.education.map((edu, i) => {
              const school = pick(edu.school, lang);
              const degree = pick(edu.degree, lang);
              const specialty = pick(edu.specialty, lang);

              return (
                <div key={i} className="flex items-baseline justify-between">
                  <div>
                    <span className="font-[family-name:var(--font-source-serif-4)] font-semibold text-black">
                      {degree}
                    </span>
                    {specialty && <span className="text-black/60"> · {specialty}</span>}
                    <p className="text-[8.5pt] text-black/60">
                      {school} · {edu.location}
                    </p>
                  </div>
                  <span className="shrink-0 text-[8pt] text-black/50">
                    {edu.start} – {edu.end}
                  </span>
                </div>
              );
            })}
          </div>
        </EdSec>
      )}

      {/* ── Languages / Interests / Sports ─────────────────────────────── */}
      {(sections.languages || sections.interests || sections.sports) &&
        (langExtras.length > 0 || interestExtras.length > 0 || sportsExtras.length > 0) && (
          <EdSec title={lang === 'fr' ? 'Divers' : 'Miscellaneous'}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-center text-[8.5pt]">
              {sections.languages &&
                langExtras.map((extra) => (
                  <div key={pick(extra.title, lang)}>
                    <p className="font-semibold text-black/80">{pick(extra.title, lang)}</p>
                    <p className="text-black/60">{pickList(extra.list, lang).join(', ')}</p>
                  </div>
                ))}
              {sections.interests &&
                interestExtras.map((extra) => (
                  <div key={pick(extra.title, lang)}>
                    <p className="font-semibold text-black/80">{pick(extra.title, lang)}</p>
                    <p className="text-black/60">{pickList(extra.list, lang).join(', ')}</p>
                  </div>
                ))}
              {sections.sports &&
                sportsExtras.map((extra) => (
                  <div key={pick(extra.title, lang)}>
                    <p className="font-semibold text-black/80">{pick(extra.title, lang)}</p>
                    <p className="text-black/60">{pickList(extra.list, lang).join(', ')}</p>
                  </div>
                ))}
            </div>
          </EdSec>
        )}
    </div>
  );
};

export default EditorialCV;

import React from 'react';

import { cn } from '@/lib/cn';
import { getCompanyAccent } from '@/lib/companyColors';
import { pick, pickList } from '@/lib/localize';
import { getExperiences, type ResolvedConfig } from '@/lib/printConfig';
import { getTagColor } from '@/lib/tagMeta';
import { type Experience, type Lang, type PrintData, type ResumeData } from '@/types';

export interface TimelineCVProps {
  data: ResumeData;
  print: PrintData;
  cfg: ResolvedConfig;
  lang: Lang;
}

// Timeline accent — tech violet, theme-independent.
const ACCENT = '#6f6fc8';

// Repeated Tailwind class strings extracted to satisfy sonarjs/no-duplicate-string.
// Exception per CLAUDE.md: module-level consts acceptable when the linter requires it.
const MUTED_SM = 'text-[7pt] text-[#5a5a8a]';
const MUTED_MONO = 'font-mono text-[7pt] text-[#5a5a8a]';

// Indices into data.extras for the named mini-sections shown at the bottom.
// 0 = Languages, 1 = Interests, 3 = Sports (positional, matching resume.ts zipping).
const EXTRAS = { languages: 0, interests: 1, sports: 3 } as const;

// ─── Shared micro-components ──────────────────────────────────────────────────

interface TPillProps {
  children: React.ReactNode;
  color: string;
}

// Renders a monospace pill with colour injected via --pill-fg CSS custom property.
function TPill({ children, color }: TPillProps) {
  return (
    <span className="t-pill" style={{ '--pill-fg': color } as React.CSSProperties}>
      {children}
    </span>
  );
}

// Section heading: mono, uppercase, spaced, with a trailing rule (::after in CSS).
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="t-section-title mb-1.5 flex items-center gap-2 font-mono text-[6.5pt] font-semibold tracking-[0.08em] text-[#3a3a6a] uppercase">
      {children}
    </h2>
  );
}

// ─── Experience entry ─────────────────────────────────────────────────────────

interface EntryProps {
  exp: Experience;
  cfg: ResolvedConfig;
  lang: Lang;
}

function ExperienceEntry({ exp, cfg, lang }: EntryProps) {
  const accent = getCompanyAccent(exp.company);
  const bullets = pickList(exp.list, lang);

  return (
    <div className="t-entry relative" style={{ '--exp-accent': accent } as React.CSSProperties}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <h3 className="text-[8.5pt] font-semibold">{pick(exp.title, lang)}</h3>
            <span className={MUTED_SM}>
              {exp.company} · {exp.location}
            </span>
            {exp.freelance && <TPill color={ACCENT}>Freelance</TPill>}
          </div>
          {exp.context && <p className={cn(MUTED_SM, 'italic')}>{pick(exp.context, lang)}</p>}
          {cfg.detail === 'full' && bullets.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex gap-1.5 text-[7.5pt]">
                  <span className="shrink-0" style={{ color: accent }}>
                    →
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {cfg.detail === 'full' && exp.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {exp.tags.map((tag, ti) => {
                const meta = getTagColor(tag.ref);
                return (
                  <TPill key={ti} color={meta.bg}>
                    {tag.name}
                  </TPill>
                );
              })}
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className={MUTED_MONO}>{pick(exp.start, lang)}</p>
          <p className={MUTED_MONO}>{pick(exp.end, lang)}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const TimelineCV: React.FC<TimelineCVProps> = ({ data, print, cfg, lang }) => {
  const experiences = getExperiences(data, cfg);

  // Positional access into data.extras for the bottom mini-sections.

  const langExtra = data.extras[EXTRAS.languages];

  const interestsExtra = data.extras[EXTRAS.interests];

  const sportsExtra = data.extras[EXTRAS.sports];

  return (
    <div className="cv-timeline text-[9pt] leading-snug text-[#1a1a2e]">
      {/* ── Header ── */}
      <header className="mb-4 flex items-start justify-between border-b border-[#d0d0e8] pb-3">
        <div>
          <h1 className="text-[16pt] leading-tight font-bold">
            {data.person.firstname} {data.person.lastname}
          </h1>
          <p className="mt-0.5 text-[10pt] font-semibold" style={{ color: ACCENT }}>
            {pick(print.headline, lang)}
          </p>
          <p className="mt-0.5 font-mono text-[7.5pt] text-[#5a5a8a]">{pick(print.tagline, lang)}</p>
        </div>
        {cfg.sections.contact && (
          <div className="space-y-0.5 text-right">
            <p className={MUTED_MONO}>{print.contact.email}</p>
            <p className={MUTED_MONO}>{print.contact.linkedin}</p>
            <p className={MUTED_MONO}>{print.contact.github}</p>
            <p className={MUTED_MONO}>{print.contact.site}</p>
            <p className={MUTED_MONO}>{pick(print.contact.location, lang)}</p>
          </div>
        )}
      </header>

      {/* ── Profile ── */}
      {cfg.sections.profile && (
        <section className="mb-3">
          <SectionTitle>{lang === 'fr' ? 'Profil' : 'Profile'}</SectionTitle>
          <p className="text-[8pt] leading-relaxed">{pick(print.profile, lang)}</p>
        </section>
      )}

      {/* ── Technical skills — pills grouped by category ── */}
      {cfg.sections.techSkills && (
        <section className="mb-3">
          <SectionTitle>{lang === 'fr' ? 'Compétences techniques' : 'Technical Skills'}</SectionTitle>
          <div className="flex flex-col gap-1.5">
            {data.skills.map((group, gi) => (
              <div key={gi} className="flex flex-wrap items-baseline gap-1">
                <span className="mr-1 font-mono text-[6.5pt] text-[#5a5a8a]">{pick(group.title, lang)}</span>
                {group.tags.map((tag, ti) => {
                  const color = getTagColor(tag.ref);
                  return (
                    <TPill key={ti} color={color.bg}>
                      {tag.name}
                    </TPill>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Functional skills ── */}
      {cfg.sections.funcSkills && (
        <section className="mb-3">
          <SectionTitle>{lang === 'fr' ? 'Compétences fonctionnelles' : 'Functional Skills'}</SectionTitle>
          <div className="flex flex-wrap gap-1">
            {pickList(print.funcSkills, lang).map((skill, i) => (
              <TPill key={i} color={ACCENT}>
                {skill}
              </TPill>
            ))}
          </div>
        </section>
      )}

      {/* ── Experience timeline rail ── */}
      <section className="mb-3">
        <SectionTitle>{lang === 'fr' ? 'Expériences' : 'Experience'}</SectionTitle>
        <div className="t-rail ml-1.5 flex flex-col gap-2.5 border-l-2 border-[#6f6fc8] pl-4">
          {experiences.map((exp) => (
            <ExperienceEntry key={exp.id} exp={exp} cfg={cfg} lang={lang} />
          ))}
        </div>
      </section>

      {/* ── Bottom grid: Education + Languages / Interests / Sports ── */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {cfg.sections.education && data.education.length > 0 && (
          <section>
            <SectionTitle>{lang === 'fr' ? 'Formation' : 'Education'}</SectionTitle>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="text-[8pt] font-semibold">{pick(edu.degree, lang)}</p>
                {edu.specialty && pick(edu.specialty, lang) && <p className={MUTED_SM}>{pick(edu.specialty, lang)}</p>}
                <p className={MUTED_SM}>
                  {pick(edu.school, lang)} · {edu.location}
                </p>
                <p className="font-mono text-[6.5pt] text-[#5a5a8a]">
                  {edu.start} – {edu.end}
                </p>
              </div>
            ))}
          </section>
        )}

        <div className="space-y-3">
          {cfg.sections.languages && langExtra && (
            <section>
              <SectionTitle>{pick(langExtra.title, lang)}</SectionTitle>
              <ul className="space-y-0.5 text-[7.5pt]">
                {pickList(langExtra.list, lang).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {cfg.sections.interests && interestsExtra && (
            <section>
              <SectionTitle>{pick(interestsExtra.title, lang)}</SectionTitle>
              <div className="flex flex-wrap gap-1">
                {pickList(interestsExtra.list, lang).map((item, i) => (
                  <span key={i} className={MUTED_MONO}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )}

          {cfg.sections.sports && sportsExtra && (
            <section>
              <SectionTitle>{pick(sportsExtra.title, lang)}</SectionTitle>
              <ul className="space-y-0.5 text-[7.5pt]">
                {pickList(sportsExtra.list, lang).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineCV;

'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { type HeroLocale } from '@/app/data/heroSkills';
import { type Person } from '@/types';

import HeroStats from './HeroStats';
import SkillsGrid from './SkillsGrid';

interface HeroProps {
  person: Person;
  locale?: string;
}

const Hero: React.FC<HeroProps> = ({ person, locale = 'fr' }) => {
  const t = useTranslations('hero');
  const heroLocale: HeroLocale = locale === 'en' ? 'en' : 'fr';
  const fullName = `${person.firstname} ${person.lastname}`;

  return (
    <section className="hero-surface border-border bg-sidebar relative isolate mb-12 overflow-hidden rounded-4xl border px-3 py-4 md:px-6 md:py-8 xl:px-10 xl:py-10">
      <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] lg:items-start lg:gap-10">
        <div className="space-y-4 lg:space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-bg/70 text-heading border-border inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] font-medium tracking-[0.24em] uppercase backdrop-blur-sm">
              <span aria-hidden="true" className="hero-status-dot" />
              {t('availability')}
            </span>
            <a
              href={`mailto:${person.email}`}
              className="text-body-muted hover:text-body text-sm transition-colors hover:underline"
            >
              {person.email}
            </a>
          </div>

          <div>
            <h1 className="theme-dark:font-light theme-bold:font-extrabold text-heading text-4xl leading-none font-bold tracking-[-0.08em] sm:text-6xl lg:text-7xl">
              {(() => {
                let charIndex = 0;
                const words = fullName.split(' ');
                return words.map((word, wordIndex) => (
                  <React.Fragment key={`word-${wordIndex}`}>
                    <span className="inline-block whitespace-nowrap">
                      {Array.from(word).map((character) => {
                        const delayIndex = charIndex++;
                        return (
                          <span
                            key={`${character}-${delayIndex}`}
                            className="hero-char"
                            style={{ animationDelay: `${120 + delayIndex * 45}ms` }}
                          >
                            {character}
                          </span>
                        );
                      })}
                    </span>
                    {wordIndex < words.length - 1 ? ' ' : null}
                  </React.Fragment>
                ));
              })()}
            </h1>
            <p className="text-body mt-5 text-lg sm:text-xl lg:text-2xl">
              {person.title}
              <span aria-hidden="true" className="hero-cursor text-brand ml-2 inline-block font-mono">
                ▌
              </span>
            </p>
          </div>

          <HeroStats locale={heroLocale} />
        </div>

        <SkillsGrid locale={heroLocale} sectionTitle={t('skillsTitle')} />
      </div>
    </section>
  );
};

export default Hero;

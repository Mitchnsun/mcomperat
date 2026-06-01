'use client';

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
  const heroLocale: HeroLocale = locale === 'en' ? 'en' : 'fr';
  const fullName = `${person.firstname} ${person.lastname}`;
  const availability = heroLocale === 'fr' ? 'Disponible · Freelance' : 'Available · Freelance';

  return (
    <section className="hero-surface border-border bg-sidebar relative isolate mb-12 overflow-hidden rounded-[2rem] border px-6 py-8 md:px-10 md:py-10">
      <div className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] md:items-start">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-bg/70 text-heading border-border inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] font-medium tracking-[0.24em] uppercase backdrop-blur-sm">
              <span aria-hidden="true" className="hero-status-dot" />
              {availability}
            </span>
            <a
              href={`mailto:${person.email}`}
              className="text-body-muted hover:text-body text-sm transition-colors hover:underline"
            >
              {person.email}
            </a>
          </div>

          <div>
            <h1 className="hero-name text-heading text-5xl leading-none tracking-[-0.08em] sm:text-6xl lg:text-7xl">
              {Array.from(fullName).map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="hero-char"
                  style={{ animationDelay: `${120 + index * 45}ms` }}
                >
                  {character === ' ' ? '\u00A0' : character}
                </span>
              ))}
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

        <SkillsGrid locale={heroLocale} />
      </div>
    </section>
  );
};

export default Hero;

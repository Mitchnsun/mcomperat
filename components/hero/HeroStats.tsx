'use client';

import React from 'react';

import { getHeroStats, type HeroLocale } from '@/app/data/heroSkills';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';

interface HeroStatsProps {
  locale: HeroLocale;
}

interface HeroStatItemProps {
  label: string;
  value: number;
  suffix?: string;
}

const HeroStatItem: React.FC<HeroStatItemProps> = ({ label, value, suffix }) => {
  const animatedValue = useAnimatedNumber(value);

  return (
    <div className="border-border bg-bg/50 rounded-2xl border px-4 py-4 backdrop-blur-sm">
      <dt className="text-body-muted text-xs font-medium tracking-[0.24em] uppercase">{label}</dt>
      <dd className="text-heading mt-3 text-3xl font-semibold tracking-[-0.05em] tabular-nums sm:text-4xl">
        {animatedValue}
        {suffix}
      </dd>
    </div>
  );
};

const HeroStats: React.FC<HeroStatsProps> = ({ locale }) => {
  const stats = getHeroStats(locale);

  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <HeroStatItem key={stat.label} {...stat} />
      ))}
    </dl>
  );
};

export default HeroStats;

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
    <div className="border-border bg-bg/50 rounded-2xl border p-2 backdrop-blur-sm lg:p-4">
      <dt className="text-body-muted text-[10px] font-medium tracking-[0.24em] uppercase lg:text-xs">{label}</dt>
      <dd className="text-heading mt-3 text-2xl font-semibold tracking-[-0.05em] tabular-nums sm:text-3xl lg:text-4xl">
        {animatedValue}
        {suffix}
      </dd>
    </div>
  );
};

const HeroStats: React.FC<HeroStatsProps> = ({ locale }) => {
  const stats = getHeroStats(locale);

  return (
    <dl className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <HeroStatItem key={stat.label} {...stat} />
      ))}
    </dl>
  );
};

export default HeroStats;

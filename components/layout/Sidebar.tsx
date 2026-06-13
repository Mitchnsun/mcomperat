'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import GithubLogo from '@/components/assets/icons/github-logo';
import LinkedinLogo from '@/components/assets/icons/linkedin-logo';
import SidebarIdentity from '@/components/layout/SidebarIdentity';
import LangToggle from '@/components/ui/LangToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';
import { getCompanyAccent } from '@/lib/companyColors';
import { type ExperienceNavItem, type Person, type SectionNavItem } from '@/types';

interface SidebarProps {
  person: Person;
  experiences: ExperienceNavItem[];
  sections: SectionNavItem[];
  activeExpId: string;
  onExpClick: (id: string) => void;
  onSectionClick: (href: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  person,
  experiences,
  sections,
  activeExpId,
  onExpClick,
  onSectionClick,
}) => {
  const t = useTranslations('sidebar');

  return (
    <div className="flex h-full flex-col gap-6 px-5 py-6">
      {/* Identity (hidden on mobile where it lives in the top bar) */}
      <SidebarIdentity person={person} className="hidden md:flex" />

      {/* Experiences navigation */}
      {experiences.length > 0 ? (
        <nav aria-label={t('experiences')}>
          <p className="text-body-muted mb-2 text-[0.65rem] font-semibold tracking-widest uppercase">
            {t('experiences')}
          </p>
          <ul className="space-y-0.5">
            {experiences.map((exp) => {
              const isActive = exp.id === activeExpId;
              return (
                <li key={exp.id}>
                  <button
                    type="button"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => onExpClick(exp.id)}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm',
                      'focus-visible:ring-accent focus:outline-none focus-visible:ring-2',
                      {
                        'text-heading bg-card-hover font-semibold': isActive,
                        'text-body-muted hover:text-body': !isActive,
                      }
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full border"
                      style={
                        isActive
                          ? {
                              backgroundColor: getCompanyAccent(exp.company),
                              borderColor: getCompanyAccent(exp.company),
                            }
                          : { backgroundColor: 'transparent', borderColor: 'currentColor' }
                      }
                    />
                    <span className="flex-1 truncate">{exp.company}</span>
                    {exp.year ? <span className="text-body-muted text-xs tabular-nums">{exp.year}</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {/* Section links */}
      {sections.length > 0 ? (
        <nav aria-label={t('sections')} className="border-border border-t pt-4">
          <ul className="space-y-0.5">
            {sections.map((section) => (
              <li key={section.href}>
                {section.external ? (
                  <a
                    href={section.href}
                    className="text-body-muted hover:text-body focus-visible:ring-accent block rounded px-2 py-1.5 text-sm focus:outline-none focus-visible:ring-2"
                  >
                    {section.label}
                  </a>
                ) : (
                  <a
                    href={section.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onSectionClick(section.href);
                    }}
                    className="text-body-muted hover:text-body focus-visible:ring-accent block rounded px-2 py-1.5 text-sm focus:outline-none focus-visible:ring-2"
                  >
                    {section.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {/* Social links */}
      {person.link?.github || person.link?.linkedin ? (
        <div className="flex items-center gap-4">
          {person.link?.github ? (
            <a
              id="Github"
              href={person.link.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${person.firstname ?? ''} ${person.lastname ?? ''}'s GitHub profile`}
              className="text-body-muted hover:text-body transition-colors"
            >
              <GithubLogo />
            </a>
          ) : null}
          {person.link?.linkedin ? (
            <a
              href={person.link.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${person.firstname ?? ''} ${person.lastname ?? ''}'s LinkedIn profile`}
              className="text-body-muted hover:text-body transition-colors"
            >
              <LinkedinLogo />
            </a>
          ) : null}
        </div>
      ) : null}

      {/* Toggles */}
      <div className="border-border mt-auto flex flex-col gap-3 border-t py-4 print:hidden">
        <LangToggle className="w-fit" />
        <ThemeToggle className="w-fit" />
      </div>
    </div>
  );
};

export default Sidebar;

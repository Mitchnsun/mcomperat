import '@testing-library/jest-dom';

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';

import TimelineCV from '@/components/print/designs/TimelineCV';
import { COMPANY_ACCENT } from '@/lib/companyColors';
import { type ResolvedConfig } from '@/lib/printConfig';
import { TAG_META } from '@/lib/tagMeta';
import { type Lang, type PrintData, type ResumeData } from '@/types';

// ─── Test fixtures ────────────────────────────────────────────────────────────

const TEST_EMAIL = 'jean@example.com';

const MOCK_RESUME: ResumeData = {
  person: {
    firstname: 'Jean',
    lastname: 'Dupont',
    title: { fr: 'Développeur', en: 'Developer' },
    email: TEST_EMAIL,
  },
  experiences: [
    {
      id: 'exp-0',
      company: 'Greenweez',
      location: 'Paris, France',
      title: { fr: 'Lead Dev', en: 'Lead Dev' },
      start: 'Oct. 2023',
      end: { fr: "Aujourd'hui", en: 'Present' },
      freelance: true,
      tags: [
        { name: 'React', ref: 'js' },
        { name: 'Tailwind CSS', ref: 'css' },
      ],
      desc: { fr: 'Description FR', en: 'Description EN' },
      list: { fr: ['Pilotage technique', 'Revue de code'], en: ['Technical leadership', 'Code review'] },
    },
    {
      id: 'exp-1',
      company: 'Rakuten',
      location: 'Lyon, France',
      title: { fr: 'Dev Frontend', en: 'Frontend Dev' },
      start: { fr: 'Janv. 2021', en: 'Jan. 2021' },
      end: { fr: 'Sept. 2023', en: 'Sep. 2023' },
      tags: [{ name: 'TypeScript', ref: 'js' }],
      desc: { fr: '', en: '' },
      list: { fr: ['Développement React'], en: ['React development'] },
    },
  ],
  skills: [
    {
      title: { fr: 'Frontend', en: 'Frontend' },
      tags: [
        { name: 'React', ref: 'js' },
        { name: 'CSS', ref: 'css' },
      ],
    },
  ],
  education: [
    {
      school: { fr: 'Université de Paris', en: 'University of Paris' },
      degree: { fr: 'Master Informatique', en: 'Master Computer Science' },
      specialty: { fr: 'Génie Logiciel', en: 'Software Engineering' },
      location: 'Paris, France',
      start: '2005',
      end: '2008',
      desc: { fr: '', en: '' },
    },
  ],
  extras: [
    {
      title: { fr: 'Langues', en: 'Languages' },
      list: { fr: ['Français : natif', 'Anglais : B2'], en: ['French: native', 'English: B2'] },
      print: true,
    },
    {
      title: { fr: 'Intérêts', en: 'Interests' },
      list: { fr: ['Next.js', 'TypeScript'], en: ['Next.js', 'TypeScript'] },
      print: true,
    },
    {
      title: { fr: 'Projets perso', en: 'Personal projects' },
      list: { fr: ['Mon CV'], en: ['My CV'] },
      print: false,
    },
    {
      title: { fr: 'Sports', en: 'Sports' },
      list: { fr: ['Triathlon', 'Surf'], en: ['Triathlon', 'Surf'] },
      print: false,
    },
  ],
};

const MOCK_PRINT: PrintData = {
  headline: { fr: 'Développeur Frontend Senior', en: 'Senior Frontend Developer' },
  tagline: { fr: 'Freelance · Disponible', en: 'Freelance · Available' },
  yearsLine: { fr: "15 ans d'expérience", en: '15 years of experience' },
  profile: { fr: 'Profil FR', en: 'Profile EN' },
  techSkills: { fr: [['Langages', 'TypeScript']], en: [['Languages', 'TypeScript']] },
  funcSkills: { fr: ['Développement'], en: ['Development'] },
  contact: {
    email: TEST_EMAIL,
    linkedin: 'https://linkedin.com/in/jean',
    github: 'https://github.com/jean',
    site: 'https://jean.dev',
    location: { fr: 'Paris', en: 'Paris' },
  },
};

const FULL_CFG: ResolvedConfig = {
  sections: {
    profile: true,
    techSkills: true,
    funcSkills: true,
    education: true,
    languages: true,
    interests: true,
    sports: true,
    contact: true,
  },
  detail: 'full',
  scope: 'all',
};

const SUMMARY_CFG: ResolvedConfig = {
  ...FULL_CFG,
  detail: 'summary',
};

function renderCV(lang: Lang = 'fr', cfg: ResolvedConfig = FULL_CFG) {
  return render(<TimelineCV data={MOCK_RESUME} print={MOCK_PRINT} cfg={cfg} lang={lang} />);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('TimelineCV — experience dot color', () => {
  it('sets --exp-accent to the company accent from companyColors', () => {
    const { container } = renderCV();

    const entry = container.querySelector('[style*="--exp-accent"]') as HTMLElement | null;
    expect(entry).not.toBeNull();
    const accent = entry!.style.getPropertyValue('--exp-accent');
    expect(accent).toBe(COMPANY_ACCENT['Greenweez']);
  });
});

describe('TimelineCV — tech pill colors', () => {
  it('sets --pill-fg to the tagMeta bg color for the matching ref', () => {
    const { container } = renderCV();

    // Find the pill for "React" (ref = 'js') inside an experience entry
    const pills = Array.from(container.querySelectorAll('.t-pill')) as HTMLElement[];
    const reactPill = pills.find((p) => p.textContent === 'React');
    expect(reactPill).toBeDefined();

    const pillFg = reactPill!.style.getPropertyValue('--pill-fg');
    expect(pillFg).toBe(TAG_META.js.bg);
  });

  it('sets --pill-fg to the css tagMeta bg for css-ref tags', () => {
    const { container } = renderCV();

    const pills = Array.from(container.querySelectorAll('.t-pill')) as HTMLElement[];
    const cssPill = pills.find((p) => p.textContent === 'CSS');
    expect(cssPill).toBeDefined();

    const pillFg = cssPill!.style.getPropertyValue('--pill-fg');
    expect(pillFg).toBe(TAG_META.css.bg);
  });
});

describe('TimelineCV — detail="summary" hides bullets and tech pills', () => {
  it('does not render bullet list items', () => {
    renderCV('fr', SUMMARY_CFG);

    // Bullets contain '→' arrows
    const arrows = screen.queryAllByText('→');
    expect(arrows).toHaveLength(0);
  });

  it('does not render experience tag pills', () => {
    const { container } = renderCV('fr', SUMMARY_CFG);

    // Experience tag pills have --pill-fg; skills pills (in techSkills section) still show.
    // With summary mode, no experience bullets or tags should appear.
    // Check by ensuring no pill with "React" text appears in experience entry.
    const expSection = container.querySelector('.t-rail');
    expect(expSection).not.toBeNull();
    const pillsInRail = Array.from(expSection!.querySelectorAll('.t-pill'));
    // Only the "Freelance" badge pill should remain (no tech tag pills)
    const tagPills = pillsInRail.filter((p) => ['React', 'Tailwind CSS', 'TypeScript'].includes(p.textContent ?? ''));
    expect(tagPills).toHaveLength(0);
  });
});

describe('TimelineCV — conditional section rendering', () => {
  it('hides contact block when cfg.sections.contact is false', () => {
    const cfg: ResolvedConfig = { ...FULL_CFG, sections: { ...FULL_CFG.sections, contact: false } };
    renderCV('fr', cfg);

    expect(screen.queryByText(TEST_EMAIL)).toBeNull();
  });

  it('shows contact block when cfg.sections.contact is true', () => {
    renderCV('fr', FULL_CFG);

    expect(screen.getByText(TEST_EMAIL)).toBeTruthy();
  });

  it('hides education section when cfg.sections.education is false', () => {
    const cfg: ResolvedConfig = { ...FULL_CFG, sections: { ...FULL_CFG.sections, education: false } };
    renderCV('fr', cfg);

    expect(screen.queryByText('Master Informatique')).toBeNull();
  });

  it('hides sports section when cfg.sections.sports is false', () => {
    const cfg: ResolvedConfig = { ...FULL_CFG, sections: { ...FULL_CFG.sections, sports: false } };
    renderCV('fr', cfg);

    expect(screen.queryByText('Triathlon')).toBeNull();
  });

  it('shows sports section when cfg.sections.sports is true', () => {
    renderCV('fr', FULL_CFG);

    expect(screen.getByText('Triathlon')).toBeTruthy();
  });
});

describe('TimelineCV — FR snapshot', () => {
  it('renders a stable snapshot in French', () => {
    const { container } = renderCV('fr', FULL_CFG);
    expect(container.firstChild).toMatchSnapshot('fr-full');
  });

  it('renders a stable snapshot in condensed (summary) mode', () => {
    const { container } = renderCV('fr', SUMMARY_CFG);
    expect(container.firstChild).toMatchSnapshot('fr-summary');
  });
});

describe('TimelineCV — EN snapshot', () => {
  it('renders a stable snapshot in English', () => {
    const { container } = renderCV('en', FULL_CFG);
    expect(container.firstChild).toMatchSnapshot('en-full');
  });
});

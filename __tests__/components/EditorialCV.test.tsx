import '@testing-library/jest-dom';

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';

import EditorialCV from '@/components/print/designs/EditorialCV';
import { ALL_ON, CONDENSED } from '@/lib/printConfig';
import { type PrintData, type ResumeData } from '@/types';

// Minimal fixtures ─────────────────────────────────────────────────────────

const data: ResumeData = {
  person: {
    firstname: 'Jane',
    lastname: 'Doe',
    title: { fr: 'Développeuse', en: 'Developer' },
    email: 'jane@example.com',
  },
  experiences: [
    {
      id: 'exp-0',
      company: 'Acme Corp',
      location: 'Paris, France',
      title: { fr: 'Lead Dev', en: 'Lead Dev' },
      start: '2022',
      end: { fr: "Aujourd'hui", en: 'Present' },
      tags: [],
      desc: { fr: 'Description FR', en: 'Description EN' },
      list: { fr: ['Tâche A', 'Tâche B'], en: ['Task A', 'Task B'] },
    },
  ],
  skills: [],
  education: [
    {
      school: { fr: 'INSA Lyon', en: 'INSA Lyon' },
      degree: { fr: 'Ingénieur', en: 'Engineer' },
      specialty: { fr: 'Informatique', en: 'Computer Science' },
      location: 'Lyon, France',
      start: '2007',
      end: '2012',
      desc: { fr: '', en: '' },
    },
  ],
  extras: [
    {
      title: { fr: 'Langues', en: 'Languages' },
      list: { fr: ['Français', 'Anglais'], en: ['French', 'English'] },
      print: true,
    },
    {
      title: { fr: 'Sports', en: 'Sports' },
      list: { fr: ['Ski', 'Trail'], en: ['Ski', 'Trail running'] },
      print: true,
    },
  ],
};

// Strings used across multiple test assertions — extracted to satisfy sonarjs/no-duplicate-string.
const PROFILE_FR = 'Profil FR long.';
const FUNC_SKILL_FR = 'Compétence fonctionnelle';

const print: PrintData = {
  headline: { fr: 'Titre FR', en: 'Title EN' },
  tagline: { fr: 'Tagline FR', en: 'Tagline EN' },
  yearsLine: { fr: '10 ans', en: '10 years' },
  profile: { fr: PROFILE_FR, en: 'Profile EN long.' },
  techSkills: {
    fr: [['Langages', 'TypeScript, JavaScript']],
    en: [['Languages', 'TypeScript, JavaScript']],
  },
  funcSkills: { fr: [FUNC_SKILL_FR], en: ['Functional skill'] },
  contact: {
    email: 'jane@example.com',
    linkedin: 'https://linkedin.com/in/jane',
    github: 'https://github.com/jane',
    site: 'https://jane.dev',
    location: { fr: 'Lyon', en: 'Lyon' },
  },
};

const fullCfg = {
  sections: { ...ALL_ON },
  detail: 'full' as const,
  scope: 'all' as const,
};

const condensedCfg = {
  sections: { ...CONDENSED },
  detail: 'summary' as const,
  scope: 'recent' as const,
};

// ──────────────────────────────────────────────────────────────────────────

describe('EditorialCV', () => {
  it('renders the person name with serif font class', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="fr" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Jane');
    expect(heading.textContent).toContain('Doe');
    expect(heading.className).toContain('source-serif');
  });

  it('renders headline in FR', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="fr" />);
    expect(screen.queryByText('Titre FR')).not.toBeNull();
  });

  it('renders headline in EN', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="en" />);
    expect(screen.queryByText('Title EN')).not.toBeNull();
  });

  it('renders profile when cfg.sections.profile is true', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="fr" />);
    expect(screen.queryByText(PROFILE_FR)).not.toBeNull();
  });

  it('hides profile when cfg.sections.profile is false', () => {
    const cfg = { ...fullCfg, sections: { ...fullCfg.sections, profile: false } };
    render(<EditorialCV data={data} print={print} cfg={cfg} lang="fr" />);
    expect(screen.queryByText(PROFILE_FR)).toBeNull();
  });

  it('shows em-dash bullets when detail is full', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="fr" />);
    const bullets = screen.getAllByRole('listitem');
    expect(bullets.length).toBeGreaterThan(0);
    expect(bullets[0].textContent).toContain('—');
  });

  it('hides bullets when detail is summary', () => {
    render(<EditorialCV data={data} print={print} cfg={condensedCfg} lang="fr" />);
    expect(screen.queryByRole('listitem')).toBeNull();
  });

  it('shows funcSkills when cfg.sections.funcSkills is true', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="fr" />);
    expect(screen.queryByText(FUNC_SKILL_FR)).not.toBeNull();
  });

  it('hides funcSkills when cfg.sections.funcSkills is false', () => {
    const cfg = { ...fullCfg, sections: { ...fullCfg.sections, funcSkills: false } };
    render(<EditorialCV data={data} print={print} cfg={cfg} lang="fr" />);
    expect(screen.queryByText(FUNC_SKILL_FR)).toBeNull();
  });

  it('renders experience title and company', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="en" />);
    expect(screen.queryByText('Lead Dev')).not.toBeNull();
    expect(screen.queryByText(/Acme Corp/)).not.toBeNull();
  });

  it('renders education when cfg.sections.education is true', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="en" />);
    expect(screen.queryByText('Engineer')).not.toBeNull();
    expect(screen.queryByText(/INSA Lyon/)).not.toBeNull();
  });

  it('hides education when cfg.sections.education is false', () => {
    const cfg = { ...fullCfg, sections: { ...fullCfg.sections, education: false } };
    render(<EditorialCV data={data} print={print} cfg={cfg} lang="en" />);
    expect(screen.queryByText('Engineer')).toBeNull();
  });

  it('renders extras section when cfg.sections.languages is true', () => {
    render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="en" />);
    expect(screen.queryByText('Languages')).not.toBeNull();
  });

  it('renders matching FR and EN snapshots', () => {
    const { container: fr } = render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="fr" />);
    expect(fr.firstChild).toMatchSnapshot('editorial-fr');

    const { container: en } = render(<EditorialCV data={data} print={print} cfg={fullCfg} lang="en" />);
    expect(en.firstChild).toMatchSnapshot('editorial-en');
  });
});

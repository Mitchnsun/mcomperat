import '@testing-library/jest-dom';

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { getPrintData } from '@/app/data/printContent';
import ClassicCV from '@/components/print/designs/ClassicCV';
import { type ResumeData } from '@/types';

function makeData(): ResumeData {
  return {
    person: {
      firstname: 'Matthieu',
      lastname: 'Compérat',
      title: { fr: 'Développeur', en: 'Developer' },
      email: 'matthieu@example.com',
    },
    experiences: Array.from({ length: 6 }, (_, index) => ({
      id: `exp-${index}`,
      company: `Company ${index}`,
      location: 'Annecy, France',
      title: { fr: `Titre ${index}`, en: `Title ${index}` },
      start: `20${10 + index}`,
      end: { fr: "Aujourd'hui", en: 'Present' },
      tags: [],
      desc: { fr: `Résumé ${index}`, en: `Summary ${index}` },
      list: {
        fr: [`Bullet FR ${index}`],
        en: [`Bullet EN ${index}`],
      },
    })),
    skills: [],
    education: [
      {
        school: { fr: 'École A', en: 'School A' },
        degree: { fr: 'Master', en: 'Master' },
        specialty: { fr: 'Informatique', en: 'Computer Science' },
        location: 'Lyon, France',
        start: '2008',
        end: '2010',
        desc: { fr: '', en: '' },
      },
    ],
    extras: [
      {
        title: { fr: 'Langues', en: 'Languages' },
        list: { fr: ['Français'], en: ['French'] },
        print: true,
      },
      {
        title: { fr: 'Intérêts', en: 'Interests' },
        list: { fr: ['React'], en: ['React'] },
        print: true,
      },
      {
        title: { fr: 'Projets personnels', en: 'Personal projects' },
        list: { fr: [], en: [] },
        print: false,
      },
      {
        title: { fr: 'Sports', en: 'Sports' },
        list: { fr: ['Surf'], en: ['Surf'] },
        print: false,
      },
    ],
  };
}

function fullConfig() {
  return {
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
    detail: 'full' as const,
    scope: 'all' as const,
  };
}

describe('ClassicCV', () => {
  const data = makeData();
  const print = getPrintData();

  it('hides a toggled section from the DOM', () => {
    const cfg = fullConfig();
    cfg.sections.profile = false;

    render(<ClassicCV data={data} print={print} cfg={cfg} lang="fr" />);

    expect(screen.queryByRole('heading', { name: 'Profil' })).toBeNull();
  });

  it('does not render bullets when detail is summary', () => {
    const cfg = { ...fullConfig(), detail: 'summary' as const };
    const { container } = render(<ClassicCV data={data} print={print} cfg={cfg} lang="en" />);

    expect(container.querySelector('ul.c-bullets')).toBeNull();
  });

  it('renders only 5 experiences when scope is recent', () => {
    const cfg = { ...fullConfig(), scope: 'recent' as const };
    render(<ClassicCV data={data} print={print} cfg={cfg} lang="fr" />);

    expect(screen.getAllByTestId('classic-exp')).toHaveLength(5);
  });

  it('matches FR and EN snapshots', () => {
    const cfg = fullConfig();
    const fr = render(<ClassicCV data={data} print={print} cfg={cfg} lang="fr" />);
    expect(fr.container.firstChild).toMatchSnapshot('fr');

    const en = render(<ClassicCV data={data} print={print} cfg={cfg} lang="en" />);
    expect(en.container.firstChild).toMatchSnapshot('en');
  });
});

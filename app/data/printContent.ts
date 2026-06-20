import { type Localized, type PrintData } from '@/types';

// ---------------------------------------------------------------------------
// Print-specific bilingual content
// ---------------------------------------------------------------------------
// This module holds static content that only appears in the print CV and is
// absent from the interactive resume (profile paragraph, print-oriented skill
// groups, functional skills, formatted contact block).
//
// Experience, education, and extras are NOT duplicated here — they come from
// `getResumeData()` in `app/data/resume.ts`.
// ---------------------------------------------------------------------------

function localized(fr: string, en: string): Localized {
  return { fr, en };
}

export function getPrintData(): PrintData {
  return {
    // ── Identity ──────────────────────────────────────────────────────────
    headline: localized(
      'Développeur Frontend Senior & Lead Tech React · Next.js',
      'Senior Frontend Engineer & Tech Lead React · Next.js'
    ),
    tagline: localized('Freelance · Disponible', 'Freelance · Available'),
    yearsLine: localized("15 ans d'expérience", '15 years of experience'),

    // ── Profile paragraph (verbatim from PDF source) ──────────────────────
    profile: localized(
      "Développeur Frontend Senior et Lead Tech avec 15 ans d'expérience, spécialisé en React, Next.js et TypeScript. J'accompagne les équipes produit dans la définition de l'architecture front, la mise en place de bonnes pratiques et la montée en compétence. Intervenant en freelance depuis 2017, j'ai travaillé sur des projets à forte audience (Club Med, Rakuten, Greenweez) en apportant performance, accessibilité et qualité.",
      'Senior Frontend Engineer and Tech Lead with 15 years of experience, specializing in React, Next.js, and TypeScript. I support product teams in defining front-end architecture, establishing best practices, and upskilling developers. Freelance since 2017, I have worked on high-traffic projects (Club Med, Rakuten, Greenweez), delivering performance, accessibility, and quality.'
    ),

    // ── Technical skills — print groups (from PDF) ────────────────────────
    // Each tuple: [category label, comma-separated values]
    techSkills: {
      fr: [
        ['Langages', 'TypeScript, JavaScript (ES2022+), HTML5, CSS3'],
        ['Frontend', 'React 19, Next.js 16, Redux, React Query, Tailwind CSS, Storybook'],
        ['Tests & Qualité', 'Jest, React Testing Library, Playwright, Cypress'],
        ['Outillage', 'Git, GitHub Actions, Webpack, Vite, Turborepo, Docker'],
        ['Méthodes', 'Agile / Scrum, Architecture composants, Design System, A11y'],
      ],
      en: [
        ['Languages', 'TypeScript, JavaScript (ES2022+), HTML5, CSS3'],
        ['Frontend', 'React 19, Next.js 16, Redux, React Query, Tailwind CSS, Storybook'],
        ['Testing & Quality', 'Jest, React Testing Library, Playwright, Cypress'],
        ['Tooling', 'Git, GitHub Actions, Webpack, Vite, Turborepo, Docker'],
        ['Methodologies', 'Agile / Scrum, Component Architecture, Design System, A11y'],
      ],
    },

    // ── Functional skills ─────────────────────────────────────────────────
    funcSkills: {
      fr: ['Développement · Écriture de STD', 'Atelier de cadrage · Relecture de SFD'],
      en: ['Development · Writing STDs', 'Scoping Workshop · SFD Review'],
    },

    // ── Contact ───────────────────────────────────────────────────────────
    contact: {
      email: 'matthieu.comperat@gmail.com',
      linkedin: 'https://www.linkedin.com/in/matthieucomperat/',
      github: 'https://github.com/Mitchnsun',
      site: 'https://mcomper.at',
      location: localized('Paris, France', 'Paris, France'),
    },
  };
}

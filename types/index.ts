import React from 'react';

import { type TagRef } from '@/lib/tagMeta';

// Supported content languages.
export type Lang = 'fr' | 'en';

// Bilingual value used across the resume content.
export interface Localized {
  fr: string;
  en: string;
}

// Bilingual list of strings.
export interface LocalizedList {
  fr: string[];
  en: string[];
}

// A date may be language-neutral (a plain string) or localized when month
// names differ between languages (e.g. "Juil." vs "Jul.").
export type LocalizedDate = string | Localized;

// Application data types
export interface Person {
  firstname: string;
  lastname: string;
  title: Localized;
  email: string;
  link?: {
    linkedin?: Localized;
    github?: string;
  };
}

export interface Tag {
  name: string;
  ref: TagRef;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  title: Localized;
  start: LocalizedDate;
  end: LocalizedDate;
  context?: Localized;
  freelance?: boolean;
  tags: Tag[];
  desc: Localized;
  list: LocalizedList;
}

export interface EducationItem {
  school: Localized;
  degree: Localized;
  specialty: Localized;
  location: string;
  start: string;
  end: string;
  desc: Localized;
}

export interface ExtraItem {
  title: Localized;
  list: LocalizedList;
  print?: boolean;
}

export interface SkillGroup {
  title: Localized;
  tags: Tag[];
}

export interface ResumeData {
  person: Person;
  experiences: Experience[];
  skills: SkillGroup[];
  education: EducationItem[];
  extras: ExtraItem[];
}

// --- Print CV types ---

// Keys for each section that can be toggled in the print CV.
export type SectionKey =
  | 'profile'
  | 'techSkills'
  | 'funcSkills'
  | 'education'
  | 'languages'
  | 'interests'
  | 'sports'
  | 'contact';

// Content preset mode for the print CV.
export type ContentMode = 'full' | 'condensed' | 'custom';

// User-supplied overrides when mode is 'custom'.
export interface CustomConfig {
  sections: Record<SectionKey, boolean>;
  detail: 'full' | 'summary';
  scope: 'all' | 'recent';
}

// Static content specific to the print CV (not part of the interactive resume).
export interface PrintData {
  headline: Localized;
  tagline: Localized;
  yearsLine: Localized;
  profile: Localized;
  // Each tuple is [category label, comma-separated values].
  techSkills: { fr: [string, string][]; en: [string, string][] };
  funcSkills: LocalizedList;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    site: string;
    location: Localized;
  };
}

// Component props types
export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: Array<{ name?: string; property?: string; content?: string; [key: string]: string | undefined }>;
  title?: string;
}

// Sidebar navigation metadata
export interface ExperienceNavItem {
  id: string;
  company: string;
  year: string;
}

export interface SectionNavItem {
  // Either an in-page anchor target (href like `#education`) or an external
  // link (e.g. a mailto). `external` links open without smooth scroll.
  label: string;
  href: string;
  external?: boolean;
}

export interface LayoutProps {
  person: Person;
  experiences?: ExperienceNavItem[];
  sections?: SectionNavItem[];
  children: React.ReactNode;
}

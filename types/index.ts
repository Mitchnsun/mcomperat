import React from 'react';

// Application data types
export interface Person {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  link?: {
    linkedin?: string;
    github?: string;
  };
}

export interface Tag {
  name: string;
  ref: string;
}

export interface DescriptionItem {
  id?: string;
  text: string;
  list?: string[];
}

export interface Experience {
  title: string;
  city: string;
  country: string;
  company: string;
  context?: string;
  start: string;
  end: string;
  tags?: Tag[];
  description: DescriptionItem[];
}

export interface WorkSection {
  title: string;
  experiences: Experience[];
}

export interface EducationItem {
  title: string;
  city: string;
  country: string;
  company: string;
  start: string;
  end: string;
  description: DescriptionItem[];
}

export interface EducationSection {
  title: string;
  schools: EducationItem[];
}

export interface ExtraItem {
  title: string;
  text?: string;
  list: string[];
  print?: boolean;
}

export interface ExtraSection {
  title: string;
  items: ExtraItem[];
}

export interface ResumeData {
  person: Person;
  work: WorkSection;
  education: EducationSection;
  extra: ExtraSection;
}

// Component props types
export interface HeadingProps {
  person: Person;
}

export interface CardProps {
  firstname?: string;
  lastname?: string;
  title?: string;
  email?: string;
}

export interface PostProps extends Experience {
  id?: string;
}

export interface PostHeaderProps {
  title?: string;
  company?: string;
  city?: string;
  country?: string;
  context?: string;
  start?: string;
  end?: string;
  tags?: Tag[];
}

export interface PostDescriptionProps {
  description: DescriptionItem[];
}

export interface PostListProps {
  title: string;
  list?: (Experience | EducationItem)[];
  children?: React.ReactNode;
  // Optional id set on the section wrapper so it can be targeted by anchors.
  sectionId?: string;
  // When set, each rendered Post gets an `${idPrefix}-${index}` id used for
  // sidebar scroll-tracking and navigation.
  idPrefix?: string;
}

export interface TagProps {
  name: string;
  tag: string;
}

export interface PostExtraProps {
  print?: boolean;
  title: string;
  text?: string;
  list: string[];
}

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

export interface PageProps {
  data: ResumeData;
}

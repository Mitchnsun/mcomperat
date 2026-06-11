import { SKILL_GROUPS } from '@/lib/skills';
import {
  type EducationItem,
  type Experience,
  type ExtraItem,
  type Localized,
  type Person,
  type ResumeData,
  type Tag,
} from '@/types';

import enData from './en.json';
import frData from './fr.json';

// Raw (per-locale) JSON shapes. The published JSON files keep one document per
// language; this module zips them into the bilingual structures consumed by the
// new components.
interface RawDescription {
  id?: string;
  text: string;
  list?: string[];
}

interface RawTag {
  name: string;
  ref: string;
}

interface RawExperience {
  title: string;
  city: string;
  country: string;
  company: string;
  context?: string;
  freelance?: boolean;
  start: string;
  end: string;
  tags?: RawTag[];
  description: RawDescription[];
}

interface RawEducation {
  title: string;
  city: string;
  country: string;
  company: string;
  context?: string;
  specialty?: string;
  start: string;
  end: string;
  description: RawDescription[];
}

interface RawExtra {
  title: string;
  text?: string;
  list: string[];
  print?: boolean;
}

interface RawResume {
  person: Person;
  work: { title: string; experiences: RawExperience[] };
  education: { title: string; schools: RawEducation[] };
  extra: { title: string; items: RawExtra[] };
}

const fr = frData as unknown as RawResume;
const en = enData as unknown as RawResume;

function localized(frValue: string, enValue: string): Localized {
  return { fr: frValue, en: enValue };
}

// A date is kept as a plain string when both languages agree, otherwise it is
// stored as a bilingual value (month names differ, e.g. "Juil." vs "Jul.").
function localizedDate(frValue: string, enValue: string) {
  return frValue === enValue ? frValue : localized(frValue, enValue);
}

const PRESENT: Localized = { fr: "Aujourd'hui", en: 'Present' };

function combineText(items: RawDescription[]): string {
  return items
    .map((item) => item.text)
    .filter(Boolean)
    .join('\n\n');
}

function combineList(items: RawDescription[]): string[] {
  return items.flatMap((item) => item.list ?? []);
}

function buildExperiences(): Experience[] {
  return fr.work.experiences.map((frExp, index) => {
    // eslint-disable-next-line security/detect-object-injection -- index is the array map index
    const enExp = en.work.experiences[index] ?? frExp;
    const hasEnd = Boolean(frExp.end) || Boolean(enExp.end);

    return {
      id: `exp-${index}`,
      company: frExp.company,
      location: `${frExp.city}, ${frExp.country}`,
      title: localized(frExp.title, enExp.title),
      start: localizedDate(frExp.start, enExp.start),
      end: hasEnd ? localizedDate(frExp.end, enExp.end) : PRESENT,
      ...(frExp.context || enExp.context ? { context: localized(frExp.context ?? '', enExp.context ?? '') } : {}),
      ...(frExp.freelance ? { freelance: true } : {}),
      tags: (frExp.tags ?? []).map((tag) => ({ name: tag.name, ref: tag.ref as Tag['ref'] })),
      desc: localized(combineText(frExp.description), combineText(enExp.description)),
      list: {
        fr: combineList(frExp.description),
        en: combineList(enExp.description),
      },
    };
  });
}

function buildEducation(): EducationItem[] {
  return fr.education.schools.map((frSchool, index) => {
    // eslint-disable-next-line security/detect-object-injection -- index is the array map index
    const enSchool = en.education.schools[index] ?? frSchool;

    return {
      school: localized(frSchool.company, enSchool.company),
      degree: localized(frSchool.title, enSchool.title),
      specialty: localized(frSchool.specialty || frSchool.context || '', enSchool.specialty || enSchool.context || ''),
      location: `${frSchool.city}, ${frSchool.country}`,
      start: frSchool.start,
      end: frSchool.end,
      desc: localized(combineText(frSchool.description), combineText(enSchool.description)),
    };
  });
}

function buildExtras(): ExtraItem[] {
  return fr.extra.items.map((frItem, index) => {
    // eslint-disable-next-line security/detect-object-injection -- index is the array map index
    const enItem = en.extra.items[index] ?? frItem;

    return {
      title: localized(frItem.title, enItem.title),
      list: { fr: frItem.list, en: enItem.list },
      print: frItem.print,
    };
  });
}

export function getResumeData(): ResumeData {
  return {
    person: fr.person,
    experiences: buildExperiences(),
    skills: SKILL_GROUPS,
    education: buildEducation(),
    extras: buildExtras(),
  };
}

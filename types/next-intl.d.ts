// This file declares the global IntlMessages type for next-intl type safety.
// The structure mirrors messages/en.json.
interface IntlMessages {
  sections: {
    work: string;
    skills: string;
    education: string;
    extras: string;
    contact: string;
  };
  sidebar: {
    experiences: string;
    toggleExpandExperiences: string;
    toggleCollapseExperiences: string;
    sections: string;
    contact: string;
  };
  experiences: {
    showMore: string;
    showLess: string;
  };
  filter: {
    filteredBy: string;
    clear: string;
    missions: string;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  hero: {
    availability: string;
    skillsTitle: string;
  };
  meta: {
    title: string;
  };
  post: {
    badge: {
      freelance: string;
    };
  };
  locale: {
    fr: string;
    en: string;
  };
}

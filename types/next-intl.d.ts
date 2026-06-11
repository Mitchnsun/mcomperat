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
    sections: string;
    contact: string;
  };
  experiences: {
    showMore: string;
    showLess: string;
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
}

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
    description: string;
    print: {
      title: string;
      description: string;
    };
  };
  print: {
    title: string;
    identity: {
      printable: string;
    };
    back: string;
    drawer: {
      toggle: string;
      close: string;
    };
    design: {
      label: string;
      classic: string;
      editorial: string;
      timeline: string;
    };
    content: {
      label: string;
      full: string;
      condensed: string;
      custom: string;
      help: {
        full: string;
        condensed: string;
        custom: string;
      };
      detail: {
        label: string;
        full: string;
        summary: string;
      };
      scope: {
        label: string;
        all: string;
        recent: string;
      };
    };
    sections: {
      label: string;
      lockedHelp: string;
      items: {
        profile: string;
        techSkills: string;
        funcSkills: string;
        education: string;
        languages: string;
        interests: string;
        sports: string;
        contact: string;
      };
    };
    print: string;
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
  tagFilter: {
    filterBy: string;
    removeFilter: string;
  };
}

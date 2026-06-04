// This file declares the global IntlMessages type for next-intl type safety.
// The structure mirrors messages/en.json.
interface IntlMessages {
  sections: {
    work: string;
    education: string;
    extras: string;
  };
  hero: {
    availability: string;
    skillsTitle: string;
  };
  meta: {
    title: string;
  };
}

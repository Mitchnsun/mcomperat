// This file declares the global IntlMessages type for next-intl type safety.
// The structure mirrors messages/en.json.
interface IntlMessages {
  sections: {
    work: string;
    education: string;
    extras: string;
  };
  meta: {
    title: string;
  };
}

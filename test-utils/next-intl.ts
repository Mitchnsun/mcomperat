export const useLocale = () => 'fr';
export const useTranslations = () => (key: string, values?: Record<string, string>) =>
  values && values.name ? `${key}:${values.name}` : key;

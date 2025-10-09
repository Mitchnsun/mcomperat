import { Metadata } from 'next';

export const siteMetadata = {
  title: 'Matthieu Compérat',
  description: 'Matthieu Compérat Frontend developer ReactJS NextJS HTML5 CSS3',
  author: '@Mitchnsun',
};

export function generateMetadata(title?: string, description?: string): Metadata {
  const metaDescription = description || siteMetadata.description;

  return {
    title: title ? `${title} | ${siteMetadata.title}` : siteMetadata.title,
    description: metaDescription,
    openGraph: {
      title: title || siteMetadata.title,
      description: metaDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      creator: siteMetadata.author,
      title: title || siteMetadata.title,
      description: metaDescription,
    },
    alternates: {
      canonical: 'https://mcomper.at/',
      languages: {
        fr: 'https://mcomper.at/fr',
        en: 'https://mcomper.at/en',
      },
    },
  };
}

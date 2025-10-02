import React from 'react';
import Head from 'next/head';
import { SEOProps } from '../types';

const siteMetadata = {
  title: 'Matthieu Compérat',
  description: 'Matthieu Compérat Frontend developper ReactJS NextJS HTML5 CSS3',
  author: '@Mitchnsun',
};

const SEO: React.FC<SEOProps> = ({ description, meta = [], title }) => {
  const metaDescription = description || siteMetadata.description;

  return (
    <Head>
      <title>{title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title || siteMetadata.title} />
      <meta name="twitter:title" content={title || siteMetadata.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={title || ''} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="canonical" href="https://mcomper.at/" />
      {meta && meta.map((item, index) => (
        <meta key={index} {...item} />
      ))}
    </Head>
  );
};

export default SEO;
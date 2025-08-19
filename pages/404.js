import React from 'react';
import Link from 'next/link';
import SEO from '../components/seo';

function Custom404() {
  return (
    <>
      <SEO title="404: Not found" />
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link href="/fr">Go home</Link>
      </div>
    </>
  );
}

export default Custom404;
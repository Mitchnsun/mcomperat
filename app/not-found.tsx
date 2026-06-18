import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="p-12 text-center">
      <h2>Page non trouvée</h2>
      <p>Impossible de trouver la ressource demandée.</p>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  );
}

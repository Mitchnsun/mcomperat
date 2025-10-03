import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Page non trouvée</h2>
      <p>Impossible de trouver la ressource demandée.</p>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  );
}

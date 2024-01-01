import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matthieu Compérat',
  description: 'Matthieu Compérat Frontend developper ReactJS NextJS HTML5 CSS3',
  authors: { name: '@Mitchnsun', url: 'https://github.com/Mitchnsun/'},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

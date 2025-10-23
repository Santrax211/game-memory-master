import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Game Memory Master',
  description: 'Es un juego de memoria interactivo y completamente responsive construido con Next.js y Tailwind CSS. Combina mecánicas clásicas de juegos de memoria con un diseño moderno, animaciones suaves y un sistema de puntuación progresivo que mantiene a los jugadores enganchados.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

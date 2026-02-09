import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const calSans = localFont({
  src: './fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  weight: '600',
})

export const metadata: Metadata = {
  title: {
    default: 'KashPages - Professional Landing Page Builder',
    template: '%s | KashPages',
  },
  description: 'Build beautiful landing pages with drag-and-drop, real-time collaboration, and professional templates.',
  keywords: ['landing page builder', 'website builder', 'drag and drop', 'web design', 'no code'],
  authors: [{ name: 'Burhan Sheikh' }],
  creator: 'Burhan Sheikh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kashpages.com',
    siteName: 'KashPages',
    title: 'KashPages - Professional Landing Page Builder',
    description: 'Build beautiful landing pages with drag-and-drop functionality',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KashPages - Professional Landing Page Builder',
    description: 'Build beautiful landing pages with drag-and-drop functionality',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
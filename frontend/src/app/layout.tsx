import type { Metadata, Viewport } from 'next';
import { Libre_Caslon_Text, Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { DisclaimerGate } from '@/components/common/DisclaimerGate';
import { firm } from '@/data/firm';
import './globals.css';

const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || firm.website),
  title: {
    default: `${firm.name} — ${firm.tagline}`,
    template: `%s | ${firm.name}`,
  },
  description: firm.description,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: firm.name,
    title: `${firm.name} — ${firm.tagline}`,
    description: firm.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${firm.name} — ${firm.tagline}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${firm.name} — ${firm.tagline}`,
    description: firm.description,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/images/logo/firm-monogram.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreCaslon.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col font-body antialiased">
        <DisclaimerGate>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar />
          <div id="main-content" className="flex-1">{children}</div>
          <Footer />
          <FloatingButtons />
        </DisclaimerGate>
      </body>
    </html>
  );
}

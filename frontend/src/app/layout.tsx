import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { TopBar } from '@/components/layout/TopBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { DisclaimerCopy } from '@/components/common/DisclaimerCopy';
import { HomeDisclaimerGate } from '@/components/common/HomeDisclaimerGate';
import { firm } from '@/data/firm';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col font-body antialiased">
        <HomeDisclaimerGate disclaimer={<DisclaimerCopy />}>
          <TopBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </HomeDisclaimerGate>
      </body>
    </html>
  );
}

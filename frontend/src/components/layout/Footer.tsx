import Link from 'next/link';
import Image from 'next/image';
import { firm } from '@/data/firm';
import { practiceAreas } from '@/data/practiceAreas';
import { ArrowRight, ChevronDown, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { officeHubs } from '@/data/offices';
import { BackToTop } from '@/components/layout/BackToTop';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Experience', href: '/experience' },
  { label: 'Insights', href: '/insights' },
  { label: 'Publications', href: '/publications' },
  { label: 'Careers', href: '/careers' },
];

const footerLinkClass = 'inline-flex min-h-11 min-w-0 items-center gap-2 break-words text-sm text-ivory-300 transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinkList = (
    <ul className="space-y-1">
      {quickLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={footerLinkClass}>
            <span aria-hidden="true" className="text-xs text-gold-500/80">›</span>
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
  const practiceAreaList = (
    <ul className="space-y-1">
      {practiceAreas.slice(0, 6).map((area) => (
        <li key={area.id}>
          <Link href={`/practice-areas/${area.slug}`} className={footerLinkClass}>
            <span aria-hidden="true" className="text-xs text-gold-500/80">›</span>
            <span>{area.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="border-t border-navy-800 bg-navy-950 pt-16 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pb-10 md:grid-cols-2 md:gap-x-10 md:gap-y-8 md:px-6 lg:grid-cols-3 lg:gap-10 lg:px-8">
        <nav aria-label="Footer" className="grid grid-cols-1 gap-8 md:contents">
          <div className="min-w-0">
            <details className="group md:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between border-b border-navy-800 py-3 text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-xs font-semibold uppercase tracking-wider">Quick Links</h2>
                <ChevronDown aria-hidden="true" size={16} className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="pt-3">{quickLinkList}</div>
            </details>
            <div className="hidden md:block">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold-400">Quick Links</h2>
              {quickLinkList}
            </div>
          </div>

          <div className="min-w-0">
            <details className="group md:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between border-b border-navy-800 py-3 text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-xs font-semibold uppercase tracking-wider">Practice Areas</h2>
                <ChevronDown aria-hidden="true" size={16} className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="pt-3">{practiceAreaList}</div>
            </details>
            <div className="hidden md:block">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold-400">Practice Areas</h2>
              {practiceAreaList}
            </div>
          </div>
        </nav>

        <div className="min-w-0 md:col-span-2 lg:col-span-1">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold-400">
            Central Hub & Reach
          </h2>
          <div className="space-y-2 text-sm text-ivory-300">
            <a
              href="tel:+917985933594"
              className="flex min-h-11 items-center gap-3 break-words transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
            >
              <Phone aria-hidden="true" size={16} className="shrink-0 text-gold-400" />
              <span>{firm.phone}</span>
            </a>
            <a
              href={`mailto:${firm.email}`}
              className="flex min-h-11 min-w-0 items-center gap-3 break-all transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
            >
              <Mail aria-hidden="true" size={16} className="shrink-0 text-gold-400" />
              <span className="min-w-0 break-all">{firm.email}</span>
            </a>
            {officeHubs.map((hub) => (
              <a
                key={hub.name}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 min-w-0 items-start gap-3 break-words py-1 transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
              >
                <MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span className="min-w-0 break-words">
                  <span className="block font-medium text-ivory-100">{hub.name}</span>
                  <span className="block text-ivory-300">{hub.designation}</span>
                  <span className="block">{hub.address}</span>
                  <span className="block text-xs text-ivory-300">{hub.regionTag}</span>
                </span>
              </a>
            ))}
          </div>
          <a
            href={`https://wa.me/${firm.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-gold-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2 md:w-auto"
          >
            <MessageCircle aria-hidden="true" size={16} />
            <span>Connect on WhatsApp</span>
            <ArrowRight aria-hidden="true" size={14} />
          </a>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-8 md:flex-row md:items-center md:gap-10 md:px-6 lg:px-8">
          <div className="max-w-[260px] shrink-0">
            <Image
              src="/images/logo/firm-logo-full-nowhite.png"
              alt="Maurya & Co. Advocates and Legal Consultants"
              width={1073}
              height={210}
              style={{ width: 'auto', height: 'auto', maxWidth: '260px' }}
            />
          </div>
          <p className="max-w-3xl break-words text-sm leading-relaxed text-ivory-300">
            Maurya &amp; Co., anchored at the Noida Hub (Delhi NCR), provides high-stakes legal counsel, banking recovery litigation, debt restructuring, commercial arbitration, and dispute resolution across premier Indian and cross-border jurisdictions.
          </p>
        </div>
      </div>

      <div className="border-t border-navy-800 bg-navy-950/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 text-center text-xs text-ivory-300 md:flex-row md:justify-between md:px-6 md:text-left lg:px-8">
          <p>&copy; {currentYear} {firm.name}. All rights reserved.</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6 md:pr-20">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
              <Link href="/privacy-policy" className="min-h-11 inline-flex items-center transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2">Privacy Policy</Link>
              <Link href="/terms" className="min-h-11 inline-flex items-center transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2">Terms of Engagement</Link>
            </div>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

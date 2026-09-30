import Link from 'next/link';
import { firm } from '@/data/firm';
import { practiceAreas } from '@/data/practiceAreas';
import { FirmLogo } from '@/components/common/FirmLogo';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { officeHubs } from '@/data/offices';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white pt-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12 lg:pb-16">
        {/* Column 1: Brand & Info */}
        <div className="order-last flex flex-col lg:order-first">
          <div className="mb-4">
            <FirmLogo theme="dark" />
          </div>
          <div className="w-12 h-[2px] bg-gold-500 mb-5"></div>
          <p className="text-sm text-ivory-300 mb-6 leading-relaxed">
            {firm.description}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <details className="footer-group">
            <summary className="cursor-pointer border-b border-navy-800 pb-4 text-xs font-semibold uppercase tracking-wider text-gold-400">
              Quick Links
            </summary>
            <h3 className="mb-6 hidden text-xs font-semibold uppercase tracking-wider text-gold-400 md:block">Quick Links</h3>
            <ul className="footer-links space-y-3 pt-4 md:pt-0">
              {['About Us', 'Our Team', 'Experience', 'Insights', 'Publications', 'Careers', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-ivory-300 hover:text-gold-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-gold-500/60 text-xs">›</span>
                    <span>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Column 3: Practice Areas */}
        <div>
          <details className="footer-group">
            <summary className="cursor-pointer border-b border-navy-800 pb-4 text-xs font-semibold uppercase tracking-wider text-gold-400">
              Practice Areas
            </summary>
            <h3 className="mb-6 hidden text-xs font-semibold uppercase tracking-wider text-gold-400 md:block">Practice Areas</h3>
            <ul className="footer-links space-y-3 pt-4 md:pt-0">
              {practiceAreas.slice(0, 6).map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-sm text-ivory-300 hover:text-gold-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-gold-500/60 text-xs">›</span>
                    <span>{area.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Column 4: Office & Regional Network */}
        <div className="order-first min-w-0 lg:order-last">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-6">
            Central Hub & Reach
          </h3>
          <div className="mb-6 space-y-3 break-words text-sm text-ivory-300">
            <a href={`tel:${firm.phone}`} className="flex items-center gap-2 break-words hover:text-gold-400 transition-colors">
              <Phone size={14} className="text-gold-400 shrink-0" />
              <span>{firm.phone}</span>
            </a>
            <a href={`mailto:${firm.email}`} className="flex min-w-0 items-start gap-2 break-all hover:text-gold-400 transition-colors">
              <Mail size={14} className="mt-0.5 shrink-0 text-gold-400" />
              <span className="break-all">{firm.email}</span>
            </a>
            {officeHubs.map((hub) => (
              <div key={hub.name} className="flex items-start gap-2">
                <MapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-ivory-100">{hub.name} · {hub.designation}</p>
                  <p className="break-words">{hub.address}</p>
                  <p className="text-xs text-ivory-400">{hub.regionTag}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-2 pt-2 border-t border-navy-800">
              <Clock size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-ivory-100">Consultation Hours</p>
                <p>{firm.officeHours}</p>
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${firm.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-4 py-2.5 rounded-sm transition-colors"
          >
            <span>Connect on WhatsApp</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800 bg-navy-950/80">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 py-5 text-center text-xs text-ivory-400 md:flex-row md:px-6 md:text-left lg:px-8">
          <p>&copy; {currentYear} {firm.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-end">
            <Link href="/disclaimer" className="hover:text-gold-400 transition-colors">BCI Disclaimer</Link>
            <span>&middot;</span>
            <Link href="/privacy-policy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Engagement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { firm } from '@/data/firm';
import { practiceAreas } from '@/data/practiceAreas';
import { FirmLogo } from '@/components/common/FirmLogo';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white pt-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16">
        {/* Column 1: Brand & Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <FirmLogo theme="dark" />
          </div>
          <div className="w-12 h-[2px] bg-gold-500 mb-5"></div>
          <p className="text-sm text-ivory-300 mb-6 leading-relaxed">
            {firm.description}
          </p>
          <div className="space-y-3 mt-auto text-sm text-ivory-300">
            <a href={`tel:${firm.phone}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone size={14} className="text-gold-400 shrink-0" />
              <span>{firm.phone}</span>
            </a>
            <a href={`mailto:${firm.email}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail size={14} className="text-gold-400 shrink-0" />
              <span>{firm.email}</span>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3">
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
        </div>

        {/* Column 3: Practice Areas */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-6">
            Practice Areas
          </h3>
          <ul className="space-y-3">
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
        </div>

        {/* Column 4: Office & Regional Network */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-6">
            Central Hub & Reach
          </h3>
          <div className="space-y-3 text-sm text-ivory-300 mb-6">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-ivory-100">Noida Central Hub</p>
                <p>{firm.address}</p>
                <p>{firm.city}, {firm.state}, {firm.country}</p>
              </div>
            </div>
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory-400">
          <p>&copy; {currentYear} {firm.name} (Advocates &amp; Legal Consultants). All rights reserved.</p>
          <div className="flex items-center gap-4">
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

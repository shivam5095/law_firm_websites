'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { firm } from '@/data/firm';
import { FirmLogo } from '@/components/common/FirmLogo';
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'Our Team', href: '/team' },
  { label: 'Experience', href: '/experience' },
  { label: 'Insights', href: '/insights' },
  { label: 'Publications', href: '/publications' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-charcoal-200/80 shadow-md py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-charcoal-100 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Prominent Firm Logo & Identity */}
        <FirmLogo theme="light" />

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-[13.5px] font-medium tracking-tight transition-colors hover:text-gold-600',
                pathname === item.href ? 'text-gold-600 font-semibold' : 'text-navy-900'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/consultation"
            className="bg-navy-900 text-gold-400 border border-gold-500/50 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-gold-500 hover:text-navy-950 transition-all shadow-sm"
          >
            Request Consultation
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex xl:hidden items-center gap-3">
          <a
            href={getPhoneUrl(firm.phone)}
            className="text-navy-900 hover:text-gold-600 transition-colors p-2"
            aria-label="Call Us"
          >
            <Phone size={18} />
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="text-navy-900 hover:text-gold-600 transition-colors p-2 border border-charcoal-200 rounded-sm"
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100 bg-ivory-50">
            <FirmLogo theme="light" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-navy-900 hover:text-gold-600 transition-colors p-2 rounded-sm"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-base font-medium transition-colors py-1.5 border-b border-charcoal-50',
                  pathname === item.href ? 'text-gold-600 font-semibold' : 'text-navy-900'
                )}
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-navy-900 text-gold-400 border border-gold-500 px-6 py-3 text-center text-xs uppercase tracking-wider font-semibold hover:bg-gold-500 hover:text-navy-900 transition-colors"
            >
              Request a Consultation
            </Link>

            <div className="mt-auto pt-6 border-t border-charcoal-100 flex flex-col gap-3">
              <a
                href={getPhoneUrl(firm.phone)}
                className="flex items-center gap-3 text-navy-900"
              >
                <div className="bg-navy-50 p-2.5 rounded-full">
                  <Phone size={18} className="text-navy-900" />
                </div>
                <span className="font-medium text-sm">Call {firm.phone}</span>
              </a>
              <a
                href={getWhatsAppUrl(firm.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-navy-900"
              >
                <div className="bg-green-50 p-2.5 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="font-medium text-sm">WhatsApp Direct</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

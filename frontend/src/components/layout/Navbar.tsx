'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { firm } from '@/data/firm';
import { getWhatsAppUrl } from '@/lib/utils';
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
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isHomeAtTop = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        const hero = document.querySelector('main > section');
        const headerHeight = headerRef.current?.offsetHeight ?? 0;
        setIsScrolled(hero ? hero.getBoundingClientRect().bottom <= headerHeight : window.scrollY > 20);
      } else {
        setIsScrolled(window.scrollY > 20);
      }
    };
    const frameId = window.requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsOpen(false));
    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a, button, summary')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        isAbout
          ? 'about-navbar absolute inset-x-0 top-0 z-50 h-[calc(4rem+env(safe-area-inset-top))] lg:h-[calc(4.5rem+env(safe-area-inset-top))] transition-colors duration-300'
          : 'sticky top-0 z-50 h-16 lg:h-18 transition-colors duration-300',
        isHomeAtTop && '-mb-16 lg:-mb-[4.5rem]',
        isHomeAtTop
          ? 'isolate border-0 bg-transparent shadow-none before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-0 before:h-[150px] before:bg-[linear-gradient(to_bottom,rgba(0,26,48,0.94),transparent)]'
          : isAbout
            ? 'isolate border-0 bg-transparent shadow-none before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-0 before:h-[150px] before:bg-[linear-gradient(to_bottom,rgba(10,22,40,0.75),transparent)]'
          : isScrolled
            ? isHome
              ? 'bg-white border-b border-charcoal-200/80 shadow-md'
              : 'bg-white/95 backdrop-blur-md border-b border-charcoal-200/80 shadow-md'
            : 'bg-white/90 backdrop-blur-sm border-b border-charcoal-100'
      )}
    >
      <div className={cn(
        'relative z-10 mx-auto flex h-full flex-nowrap items-center justify-between gap-2',
        isAbout ? 'max-w-[1800px] px-5 sm:px-8 lg:px-14' : 'max-w-[1800px] px-12'
      )}>
        {!isHome && (
          <Link href="/" aria-label="Maurya & Co." className="inline-flex h-full items-center">
            <Image
              src="/images/logo/firm-logo-white.png"
              alt="Maurya & Co. Advocates and Legal Consultants"
              width={2170}
              height={725}
              priority
              className={cn('h-auto max-h-full object-contain', isAbout ? 'w-[min(230px,55vw)]' : 'w-[230px]')}
            />
          </Link>
        )}

        <div className={cn(
          'hidden ml-auto flex-nowrap items-center min-[1280px]:flex'
        )}>
          <nav aria-label="Primary navigation" className={cn(
            'desktop-nav hidden flex-nowrap items-center gap-4 min-[1280px]:flex max-[1279px]:!hidden'
          )}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'min-h-11 whitespace-nowrap transition-colors',
                  isHomeAtTop || isAbout
                    ? pathname === item.href
                      ? 'text-[17px] font-semibold text-white underline decoration-[#E5C158] decoration-2 underline-offset-4 [text-shadow:0_1px_8px_rgba(0,26,48,0.6)]'
                      : 'text-[17px] font-medium text-white hover:text-white [text-shadow:0_1px_8px_rgba(0,26,48,0.6)]'
                    : pathname === item.href
                      ? 'text-[17px] font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600'
                      : 'text-[17px] font-medium text-navy-900 hover:text-gold-600'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className={cn(
                'min-h-11 whitespace-nowrap transition-colors',
                  isHomeAtTop || isAbout
                  ? 'text-[17px] font-medium text-white hover:text-white [text-shadow:0_1px_8px_rgba(0,26,48,0.6)]'
                  : pathname === '/consultation'
                    ? 'text-[17px] font-semibold text-navy-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600'
                    : 'text-[17px] font-medium text-navy-900 hover:text-gold-600'
              )}
            >
              Request Consultation
            </Link>
          </nav>
        </div>

        <nav aria-label="Primary navigation" className="tablet-nav !hidden items-center gap-2">
          {[
            { label: 'Practice Areas', href: '/practice-areas' },
            { label: 'Experience', href: '/experience' },
            { label: 'Team', href: '/team' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={cn('min-h-11 whitespace-nowrap px-1 text-xs font-medium hover:text-gold-600', isAbout ? 'text-white' : 'text-navy-900')}>
              {item.label}
            </Link>
          ))}
          <details className="relative">
            <summary className={cn('flex min-h-11 cursor-pointer items-center whitespace-nowrap px-1 text-xs font-medium hover:text-gold-600', isAbout ? 'text-white' : 'text-navy-900')}>
              More
            </summary>
            <div className="absolute right-0 top-full z-20 min-w-48 border border-charcoal-200 bg-white p-2 shadow-lg">
              {navItems.filter((item) => !['/practice-areas', '/experience', '/team'].includes(item.href)).map((item) => (
                <Link key={item.href} href={item.href} className={cn('flex min-h-11 items-center px-3 text-sm text-navy-900 hover:bg-ivory-50 hover:text-gold-700', isAbout && pathname === item.href && 'underline decoration-gold-500 underline-offset-4')}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <Link
          href="/consultation"
          className={cn('tablet-consultation !hidden min-h-11 items-center whitespace-nowrap border border-gold-500/50 bg-navy-900 px-3 text-[10px] font-semibold uppercase text-gold-400 shadow-sm hover:bg-gold-500 hover:text-navy-950', isAbout && 'border-white/50 bg-transparent text-white')}
        >
          Request Consultation
        </Link>

        <div className="mobile-nav-actions !flex items-center gap-2 min-[1280px]:!hidden">
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(true)}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-sm border border-charcoal-200 text-navy-900 hover:text-gold-600',
              (isHomeAtTop || isAbout) && 'border-white/40 text-white hover:text-[#E5C158]'
            )}
            aria-label="Open Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-panel"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-60 flex h-svh flex-col bg-white"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-charcoal-100 bg-ivory-50 px-4 md:px-6">
            <Link href="/" aria-label="Maurya & Co.">
              <Image
                src="/images/logo/firm-logo-full-nowhite.png"
                alt="Maurya & Co. Advocates and Legal Consultants"
                width={1073}
                height={210}
                priority
                className="h-auto w-[230px] max-w-[55vw]"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-sm text-navy-900 hover:text-gold-600"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-5">
            {[
              { label: 'Practice Areas', href: '/practice-areas' },
              { label: 'Experience', href: '/experience' },
              { label: 'Our Team', href: '/team' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex min-h-12 items-center border-b border-charcoal-100 text-lg font-medium transition-colors',
                  pathname === item.href ? 'text-gold-600 font-semibold' : 'text-navy-900'
                )}
              >
                {item.label}
              </Link>
            ))}
            <details className="border-b border-charcoal-100">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between text-lg font-medium text-navy-900">
                More
                <span aria-hidden="true" className="text-gold-600">+</span>
              </summary>
              <div className="pb-2 pl-4">
                {navItems.filter((item) => !['/practice-areas', '/experience', '/team'].includes(item.href)).map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={cn('flex min-h-12 items-center border-t border-charcoal-50 text-base text-navy-800', isAbout && pathname === item.href && 'text-gold-600 underline decoration-gold-500 underline-offset-4')}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex min-h-12 items-center border-b border-charcoal-100 text-lg font-medium transition-colors',
                pathname === '/consultation' ? 'text-gold-600 font-semibold' : 'text-navy-900'
              )}
            >
              Request Consultation
            </Link>
          </nav>
          <div className="shrink-0 border-t border-charcoal-100 bg-white p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
            <div className="mt-2 flex justify-center gap-6 text-xs text-charcoal-600">
              <a href={getWhatsAppUrl(firm.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

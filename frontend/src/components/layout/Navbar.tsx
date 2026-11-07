'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'Our Team', href: '/team' },
  { label: 'Experience', href: '/experience' },
  { label: 'Insights', href: '/insights' },
  { label: 'Publications', href: '/publications' },
  { label: 'Careers', href: '/careers' },
  { label: 'Request Consultation', href: '/consultation' },
];

function isActivePath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isHeroPage = pathname === '/' || pathname === '/about';
  const isTransparent = isHeroPage && !isScrolled;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 50);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    window.setTimeout(() => menuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus(), 50);
  }, []);

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width: 767px)');

    const updateScrollState = () => setIsScrolled(window.scrollY > 80);
    const updateViewportState = () => {
      if (isHeroPage && mobileViewport.matches) {
        setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', updateScrollState, { passive: true });
      } else {
        setIsScrolled(true);
        window.removeEventListener('scroll', updateScrollState);
        setIsOpen(false);
      }
    };

    updateViewportState();
    mobileViewport.addEventListener('change', updateViewportState);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      mobileViewport.removeEventListener('change', updateViewportState);
    };
  }, [isHeroPage, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]');
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
  }, [closeMenu, isOpen]);

  return (
    <header
      className={[
        styles.header,
        isHeroPage ? styles.heroPage : '',
        isTransparent ? styles.transparent : '',
        isTransparent ? styles.heroTransparent : '',
      ].filter(Boolean).join(' ')}
    >
      <div className={styles.inner}>
        <Link href="/" aria-label="Maurya & Co." className={styles.logoLink}>
          <Image
            src="/images/logo/firm-logo-gold.png"
            alt="Maurya & Co. Advocates and Legal Consultants"
            width={1536}
            height={1024}
            sizes="(min-width: 1280px) 84px, (min-width: 768px) 60px, 78px"
            priority
            className={styles.logo}
          />
        </Link>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`${styles.desktopLink} ${active ? styles.desktopLinkActive : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => isOpen ? closeMenu() : openMenu()}
          className={styles.menuButton}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-panel"
        >
          {isOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closeMenu}
        />
      )}

      <div
        ref={menuRef}
        id="mobile-navigation-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ''}`}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const consultation = item.href === '/consultation';
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={closeMenu}
                className={[
                  styles.mobileLink,
                  active ? styles.mobileLinkActive : '',
                  consultation ? styles.consultationLink : '',
                ].filter(Boolean).join(' ')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

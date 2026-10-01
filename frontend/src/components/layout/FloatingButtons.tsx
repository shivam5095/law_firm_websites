'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { firm } from '@/data/firm';
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/utils';

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const pathname = usePathname();
  const hidePhoneBar = pathname === '/contact' || pathname === '/consultation';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const updateKeyboardState = () => {
      setIsKeyboardOpen(Boolean(viewport && window.innerHeight - viewport.height > 160));
    };

    updateKeyboardState();
    viewport?.addEventListener('resize', updateKeyboardState);
    window.addEventListener('resize', updateKeyboardState);

    return () => {
      viewport?.removeEventListener('resize', updateKeyboardState);
      window.removeEventListener('resize', updateKeyboardState);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[88px] right-6 z-40 hidden md:flex"
          >
            <a
              href={getWhatsAppUrl(firm.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex size-12 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-lg transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
              aria-label="Message on WhatsApp"
            >
              <MessageCircle aria-hidden="true" size={24} className="transition-transform group-hover:scale-110" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {!hidePhoneBar && (
        <div
          aria-hidden="true"
          className="md:hidden"
          style={{ height: 'calc(61px + env(safe-area-inset-bottom))' }}
        />
      )}

      {!hidePhoneBar && !isKeyboardOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-gold-500 bg-navy-950 p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_-8px_24px_rgba(10,22,40,0.12)] md:hidden">
          <a
            href={getPhoneUrl(firm.phone)}
            className="flex min-h-11 items-center justify-center gap-2 bg-navy-900 px-3 text-xs font-semibold uppercase text-white focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
          >
            <Phone size={16} aria-hidden="true" />
            Call
          </a>
          <Link
            href="/consultation"
            className="flex min-h-11 items-center justify-center gap-2 bg-gold-500 px-3 text-xs font-semibold uppercase text-navy-950 focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2"
          >
            Request Consultation
          </Link>
        </div>
      )}
    </>
  );
}

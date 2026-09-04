'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { firm } from '@/data/firm';
import { getWhatsAppUrl, getPhoneUrl } from '@/lib/utils';

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 flex flex-col gap-3 z-40"
        >
          <a
            href={getPhoneUrl(firm.phone)}
            className="bg-navy-800 hover:bg-navy-700 text-white rounded-full p-3 shadow-lg transition-colors flex items-center justify-center group"
            aria-label="Call us"
          >
            <Phone size={24} className="group-hover:scale-110 transition-transform" />
          </a>
          
          <a
            href={getWhatsAppUrl(firm.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white rounded-full p-3 shadow-lg transition-colors flex items-center justify-center group"
            aria-label="Message on WhatsApp"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

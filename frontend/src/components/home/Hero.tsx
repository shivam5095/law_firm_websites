'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { firm } from '@/data/firm';
import { ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Navy Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/law-office.jpg"
          alt="Law Chambers Office"
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-900/75" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Eyebrow / Chamber Identity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-navy-900/90 border border-gold-500/40 px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-widest text-gold-400 mb-6 backdrop-blur-xs"
          >
            <MapPin size={13} className="text-gold-400" />
            <span>{firm.name} • Noida Central Hub (Delhi NCR)</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ivory-100 font-bold leading-[1.15] tracking-tight"
          >
            Strategic Legal Counsel.<br />
            <span className="text-gold-400 font-medium">Focused Dispute Resolution.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-ivory-200 max-w-2xl leading-relaxed"
          >
            {firm.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/consultation"
              className="inline-flex justify-center items-center px-8 py-4 bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-lg rounded-xs gap-2"
            >
              <span>Request a Consultation</span>
              <ArrowRight size={14} />
            </Link>
            <Link 
              href="/practice-areas"
              className="inline-flex justify-center items-center px-8 py-4 border border-gold-500/50 bg-navy-950/50 text-ivory-100 font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 rounded-xs"
            >
              Explore Practice Areas
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Sub-tagline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-0 right-0 z-10"
      >
        <div className="container mx-auto px-6 max-w-7xl flex flex-wrap items-center justify-between text-xs text-ivory-400 border-t border-navy-800/80 pt-4">
          <p className="tracking-[0.2em] uppercase font-medium">
            Supreme Court • High Courts • NCLT • DRT • Commercial Arbitration
          </p>
          <p className="text-gold-400/80 font-medium">
            Global Network Across USA, Middle East &amp; ASEAN
          </p>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { firm } from '@/data/firm';
import { ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden pt-8 pb-24 sm:min-h-[90vh] sm:py-20">
      {/* Background Image with Dark Navy Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/law-office.jpg"
          alt="Law Chambers Office"
          fill
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-[68%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/90 to-navy-900/80" />
      </div>

      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-4 md:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow / Chamber Identity Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden items-center gap-2 rounded-xs border border-gold-500/40 bg-navy-900/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400 backdrop-blur-xs sm:inline-flex sm:mb-5 lg:mb-6"
          >
            <MapPin size={13} className="text-gold-400" />
            <span>{firm.name} • Noida Central Hub (Delhi NCR)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-[clamp(2.25rem,1.45rem+3.2vw,4rem)] text-balance font-bold leading-[1.12] text-ivory-100"
          >
            Where Law Meets Strategy.<br />
            <span className="text-gold-400 font-medium">Focused Dispute Resolution.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 max-w-xl line-clamp-4 text-base leading-relaxed text-ivory-200 sm:mt-5 sm:text-lg md:line-clamp-none"
          >
            {firm.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
          >
            <Link
              href="/consultation"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xs bg-gold-500 px-5 py-3 text-xs font-bold uppercase text-navy-950 shadow-lg hover:bg-gold-400 sm:w-auto sm:px-8 sm:py-4"
            >
              <span>Request a Consultation</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/practice-areas"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xs border border-gold-500/50 bg-navy-950/50 px-5 py-3 text-xs font-semibold uppercase text-ivory-100 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4"
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
        className="absolute bottom-3 left-0 right-0 z-10 sm:bottom-6"
      >
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 border-t border-navy-800/80 px-4 pt-3 text-center text-[10px] text-ivory-300 sm:flex-row sm:justify-between sm:px-6 sm:pt-4 sm:text-left sm:text-xs lg:px-8">
          <p className="font-medium uppercase tracking-[0.12em] sm:tracking-[0.2em]">
            Supreme Court • High Courts • NCLT • DRT • Commercial Arbitration
          </p>
          <p className="hidden font-medium text-gold-300 sm:block">
            Global Network Across USA, Middle East &amp; ASEAN
          </p>
        </div>
      </motion.div>
    </section>
  );
}

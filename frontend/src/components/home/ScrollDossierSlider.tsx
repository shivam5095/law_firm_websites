'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

interface DossierSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  statLabel: string;
  statValue: string;
  statDetail: string;
  proceduralCode: string;
  instruments: string[];
  link: string;
  tagline: string;
}

const DOSSIERS: DossierSlide[] = [
  {
    id: 'dossier-01',
    number: '01',
    category: 'BANKING LITIGATION',
    title: 'Banking Default & Asset Recovery',
    subtitle: 'Section 13/14 SARFAESI & DRT Multi-Lender Proceedings',
    image: '/images/practice/banking-finance.jpeg',
    imageWidth: 1600,
    imageHeight: 900,
    statLabel: 'Portfolio Value',
    statValue: '\u20B9100\u2013130 Cr',
    statDetail: 'Stressed-asset credit portfolios audited & enforced across banking consortiums',
    proceduralCode: 'ACT: SARFAESI 2002 \u2022 RDDBFI 1993',
    instruments: [
      'Demand Notices u/s 13(2) SARFAESI',
      'DRT Section 19 Original Applications',
      'Mortgage & Hypothecation Security Audits',
      'Consortium Priority Searches (CERSAI/ROC)'
    ],
    link: '/practice-areas/banking-finance',
    tagline: 'Defending lender priority and neutralizing borrower asset-stripping maneuvers before tribunals.'
  },
  {
    id: 'dossier-02',
    number: '02',
    category: 'DEBT RESTRUCTURING',
    title: 'Stressed Assets & Consortium Restructuring',
    subtitle: 'Inter-Creditor Agreements (ICA) & One-Time Settlements (OTS)',
    image: '/images/practice/debt-restructuring.jpeg',
    imageWidth: 1600,
    imageHeight: 900,
    statLabel: 'Single Exposure Resolved',
    statValue: '\u20B985 Cr',
    statDetail: 'Consortium loan resolution for stressed infrastructure borrower without liquidation',
    proceduralCode: 'REG: RBI PRUDENTIAL FRAMEWORK 2019',
    instruments: [
      'Inter-Creditor Agreement (ICA) Structuring',
      'One-Time Settlement (OTS) Terms & Sanctions',
      'Moratorium & Refinancing Deeds',
      'NPA Classification Reversal Petitions'
    ],
    link: '/practice-areas/debt-restructuring',
    tagline: 'Structuring commercially viable workout terms to mitigate protracted judicial write-downs.'
  },
  {
    id: 'dossier-03',
    number: '03',
    category: 'INFRASTRUCTURE DISPUTES',
    title: 'Highway & EPC Concession Arbitrations',
    subtitle: 'NHAI, Road Development & EPC Construction Claims',
    image: '/images/practice/infrastructure-project-finance.jpeg',
    imageWidth: 1600,
    imageHeight: 900,
    statLabel: 'Matters Handled',
    statValue: 'Multi-Crore',
    statDetail: 'Claims involving delay damages, material escalation, and contractual termination',
    proceduralCode: 'FORUM: COMMERCIAL DIVISION / HIGH COURTS',
    instruments: [
      'EPC Delay & Force Majeure Briefs',
      'Defect Liability Period Claims',
      'Bank Guarantee Restraining Applications',
      'Dispute Resolution Board (DRB) Hearings'
    ],
    link: '/practice-areas/project-infrastructure-disputes',
    tagline: 'Vigorous advocacy in concession agreements, delay forensic analysis, and performance securities.'
  },
  {
    id: 'dossier-04',
    number: '04',
    category: 'INSOLVENCY & NCLT',
    title: 'Insolvency Defense & CIRP Mitigation',
    subtitle: 'Corporate Debtor & Operational Creditor Proceedings',
    image: '/images/practice/insolvency.jpeg',
    imageWidth: 1600,
    imageHeight: 900,
    statLabel: 'Statutory Arena',
    statValue: 'NCLT & NCLAT',
    statDetail: 'Section 7, 9 & 10 applications, Committee of Creditors advisory, Section 12A settlements',
    proceduralCode: 'ACT: INSOLVENCY & BANKRUPTCY CODE 2016',
    instruments: [
      'Demand Notices u/s 8 IBC 2016',
      'Section 7 & 9 CIRP Petitions',
      'Section 12A Withdrawal & Settlement Petitions',
      'Resolution Plan Legality & Priority Audits'
    ],
    link: '/practice-areas/insolvency-financial-distress',
    tagline: 'Strategic positioning under the IBC to protect corporate solvent viability and prevent hostile takeovers.'
  },
  {
    id: 'dossier-05',
    number: '05',
    category: 'CROSS-BORDER MATTERS',
    title: 'Cross-Border Judgment Enforcement',
    subtitle: 'Foreign Awards & Multijurisdictional Demands',
    image: '/images/practice/dispute-resolution.jpeg',
    imageWidth: 1600,
    imageHeight: 901,
    statLabel: 'International Training',
    statValue: '9 Institutions',
    statDetail: 'Trained at Baker McKenzie (Chicago), CIArb (London), and Leiden University (Netherlands)',
    proceduralCode: 'CODE: NEW YORK CONVENTION \u2022 RECIPROCATING TERRITORIES',
    instruments: [
      'Letters of Demand for Foreign Entities',
      'Part II Arbitration Act Enforcement Actions',
      'WTO Procedural Dispute Research',
      'Asset Tracing across Cross-Border Entities'
    ],
    link: '/experience',
    tagline: 'Applying global standards of legal drafting to cross-border financial and judgment recovery.'
  },
  {
    id: 'dossier-06',
    number: '06',
    category: 'CAPITAL MARKETS',
    title: 'Capital Markets',
    subtitle: 'Placeholder: overview to be provided.',
    image: '/images/practice/capital.jpeg',
    imageWidth: 1600,
    imageHeight: 900,
    statLabel: 'Practice Details',
    statValue: 'TBD',
    statDetail: 'Placeholder: details to be provided.',
    proceduralCode: 'PLACEHOLDER: DETAILS TO BE PROVIDED',
    instruments: [
      'Placeholder: instrument details to be provided.',
      'Placeholder: instrument details to be provided.',
      'Placeholder: instrument details to be provided.',
      'Placeholder: instrument details to be provided.'
    ],
    link: '/practice-areas/capital-markets',
    tagline: 'Placeholder: practice overview to be provided.'
  },
  {
    id: 'dossier-07',
    number: '07',
    category: 'FINANCIAL & REGULATORY',
    title: 'Financial & Regulatory',
    subtitle: 'Placeholder: overview to be provided.',
    image: '/images/practice/financial-regulatory.jpeg',
    imageWidth: 1600,
    imageHeight: 900,
    statLabel: 'Practice Details',
    statValue: 'TBD',
    statDetail: 'Placeholder: details to be provided.',
    proceduralCode: 'PLACEHOLDER: DETAILS TO BE PROVIDED',
    instruments: [
      'Placeholder: instrument details to be provided.',
      'Placeholder: instrument details to be provided.',
      'Placeholder: instrument details to be provided.',
      'Placeholder: instrument details to be provided.'
    ],
    link: '/practice-areas/financial-regulatory',
    tagline: 'Placeholder: practice overview to be provided.'
  }
];

export function ScrollDossierSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const activeSlideRef = useRef(0);

  const isLockedRef = useRef(false);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((targetIndex: number, force = false) => {
    if (targetIndex < 0 || targetIndex >= DOSSIERS.length) return;
    if (isLockedRef.current && targetIndex !== activeSlideRef.current && !force) return;

    setIsDetailsOpen(false);
    if (targetIndex === activeSlideRef.current) return;

    isLockedRef.current = true;
    activeSlideRef.current = targetIndex;
    setActiveSlideIndex(targetIndex);

    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false;
    }, 450);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      if (e.target instanceof Element && e.target.closest('[data-dossier-details]')) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, windowHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const isDominant = visibleHeight > windowHeight * 0.65;

      if (!isDominant) return;
      if (Math.abs(e.deltaY) < 16) return;

      const currentIndex = activeSlideRef.current;

      if (e.deltaY > 0) {
        if (currentIndex < DOSSIERS.length - 1) {
          e.preventDefault();
          if (!isLockedRef.current) {
            goToSlide(currentIndex + 1);
          }
        }
      } else if (e.deltaY < 0) {
        if (currentIndex > 0) {
          e.preventDefault();
          if (!isLockedRef.current) {
            goToSlide(currentIndex - 1);
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      if (e.target instanceof Element && e.target.closest('[data-dossier-details]')) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeSlideRef.current < DOSSIERS.length - 1) {
          goToSlide(activeSlideRef.current + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeSlideRef.current > 0) {
          goToSlide(activeSlideRef.current - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [goToSlide]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.target instanceof Element && e.target.closest('[data-dossier-details]')) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0 && activeSlideRef.current < DOSSIERS.length - 1) {
        goToSlide(activeSlideRef.current + 1);
      } else if (deltaX > 0 && activeSlideRef.current > 0) {
        goToSlide(activeSlideRef.current - 1);
      }
    }
  };

  return (
    <section
      id="dossier-slider"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[calc(100dvh-5rem)] min-h-[calc(620px-5rem)] bg-[#070E1A] text-white flex flex-col overflow-hidden select-none"
    >
      <header className="w-full shrink-0 px-4 sm:px-8 lg:px-14 pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
          Our Expertise
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
          Areas of Practice
        </h2>
        <div className="w-24 h-px bg-gold-500 mx-auto my-4" />
        <p className="text-sm sm:text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
          Banking, debt, commercial, infrastructure, insolvency and cross-border disputes, handled with procedural precision.
        </p>
      </header>

      {/* MIDDLE SLIDE TRACK */}
      <div className="w-full flex-1 min-h-0 relative overflow-hidden flex items-center justify-center">

        <button
          onClick={() => goToSlide(activeSlideIndex - 1, true)}
          disabled={activeSlideIndex === 0}
          className="hidden md:flex absolute left-4 z-20 w-11 h-11 rounded-full items-center justify-center bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 transition-all disabled:opacity-20 disabled:pointer-events-none shadow-xl backdrop-blur-sm"
          aria-label="Previous Dossier"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => goToSlide(activeSlideIndex + 1, true)}
          disabled={activeSlideIndex === DOSSIERS.length - 1}
          className="hidden md:flex absolute right-4 z-20 w-11 h-11 rounded-full items-center justify-center bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 transition-all disabled:opacity-20 disabled:pointer-events-none shadow-xl backdrop-blur-sm"
          aria-label="Next Dossier"
        >
          <ChevronRight size={20} />
        </button>

        <motion.div
          animate={{ x: `-${activeSlideIndex * 100}%` }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 26,
            mass: 0.85
          }}
          className="flex h-full w-full"
        >
          {DOSSIERS.map((dossier, i) => {
            const isActive = activeSlideIndex === i;
            return (
              <div
                key={dossier.id}
                className="w-full shrink-0 h-full flex items-center justify-center px-4 sm:px-8 lg:px-14 py-2 select-none"
              >
                <motion.div
                  layout
                  animate={{
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.4 }}
                  style={
                    isDetailsOpen && isActive
                      ? undefined
                      : { width: 'min(100%, calc((100dvh - 27rem - 3rem) * 1.7778))' }
                  }
                  className={`w-full max-w-6xl bg-[#0c182b] border border-white/15 rounded-sm shadow-2xl overflow-hidden ${
                    isDetailsOpen && isActive
                      ? 'h-full max-h-[540px] grid grid-cols-1 grid-rows-[minmax(0,40%)_minmax(0,1fr)] lg:grid-cols-12 lg:grid-rows-1'
                      : 'h-auto flex flex-col'
                  }`}
                >
                  {/* Left Column: Photography */}
                  <div
                    className={`relative bg-[#08101E] overflow-hidden group transition-[grid-column] duration-500 ${
                      isDetailsOpen && isActive ? 'h-full min-h-0 flex items-center justify-center lg:col-span-5' : 'w-full'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (!isActive) goToSlide(i, true);
                        setIsDetailsOpen(true);
                      }}
                      aria-label={`View details for ${dossier.title}`}
                      aria-expanded={isActive && isDetailsOpen}
                      className={`z-10 w-full text-left focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-[-4px] ${
                        isDetailsOpen && isActive
                          ? 'absolute inset-0 flex h-full items-center justify-center'
                          : 'relative block'
                      }`}
                    >
                      <Image
                        src={dossier.image}
                        alt=""
                        width={dossier.imageWidth}
                        height={dossier.imageHeight}
                        sizes={isDetailsOpen ? '(max-width: 1024px) 100vw, 42vw' : '(max-width: 1024px) 100vw, 80vw'}
                        quality={90}
                        priority={i === 0 || i === 1}
                        className={
                          isDetailsOpen && isActive
                            ? 'h-auto w-auto max-h-full max-w-full object-contain'
                            : 'block h-auto w-full'
                        }
                      />
                      {isDetailsOpen && isActive && (
                        <>
                          <span className="absolute inset-0 bg-gradient-to-t from-[#0c182b]/85 via-transparent to-[#0c182b]/10" />
                          <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-gold-500/40 px-3 py-1 font-mono text-[10px] text-gold-300 tracking-wider uppercase font-semibold">
                            DOSSIER &sect; {dossier.number}
                          </span>
                          <span className="absolute bottom-4 left-4 right-4 bg-[#08101E]/85 backdrop-blur-md border border-white/10 p-3 rounded-xs">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 block mb-0.5">
                              {dossier.proceduralCode}
                            </span>
                            <span className="block text-xs text-ivory-200/90 italic font-light line-clamp-2">
                              &quot;{dossier.tagline}&quot;
                            </span>
                          </span>
                        </>
                      )}
                    </button>
                    {!isDetailsOpen && (
                      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#0c182b] px-3 py-2">
                        <span className="font-mono text-[10px] text-gold-300 uppercase tracking-widest">
                          {dossier.title}
                        </span>
                        <span className="shrink-0 font-mono text-[9px] text-white/50 tracking-wider">
                          Click to view details
                        </span>
                      </div>
                    )}
                  </div>

                  <AnimatePresence initial={false}>
                    {isDetailsOpen && isActive && (
                      <motion.div
                        key={`details-${dossier.id}`}
                        data-dossier-details
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.25 }}
                        className="min-h-0 lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-y-auto"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3 pb-3 mb-2.5 border-b border-white/10">
                            <span className="font-mono text-[11px] text-gold-400 font-bold uppercase tracking-widest">
                              {dossier.category}
                            </span>
                            <span className="font-mono text-[10px] text-white/40 tracking-wider">
                              REF: AKM/DISP/{dossier.number}/2026
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsDetailsOpen(false)}
                            className="mb-3 inline-flex min-h-9 items-center gap-2 rounded-xs border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/80 transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-gold-400"
                            aria-label="Close details and view image"
                          >
                            <X size={14} />
                            <span>View Image</span>
                          </button>

                          <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl text-white font-normal mb-1.5 leading-snug">
                            {dossier.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gold-300/80 font-mono mb-3.5">
                            {dossier.subtitle}
                          </p>

                          <div className="p-3.5 sm:p-4 rounded-xs bg-white/[0.03] border border-gold-500/20 mb-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <span className="font-mono text-[9px] text-gold-400 uppercase tracking-widest block font-semibold mb-0.5">
                                {dossier.statLabel}
                              </span>
                              <p className="text-xs text-white/70 max-w-sm line-clamp-2">
                                {dossier.statDetail}
                              </p>
                            </div>
                            <div className="shrink-0 text-left sm:text-right">
                              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight text-gradient">
                                {dossier.statValue}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-2 font-semibold">
                              Representative Procedural Instruments
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {dossier.instruments.map((ins, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-xs text-white/80 font-sans"
                                >
                                  <span className="text-gold-400 font-mono text-xs">&sect;</span>
                                  <span className="truncate">{ins}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                          <Link
                            href={dossier.link}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors group"
                          >
                            <span>Examine Practice Methodology</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </Link>
                          <Link
                            href="/consultation"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all rounded-xs"
                          >
                            <span>Initiate Inquiry</span>
                            <ExternalLink size={12} className="text-gold-400" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* BOTTOM SCRUBBER BAR */}
      <div className="relative z-30 border-t border-white/10 bg-[#070E1A]/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-2.5 sm:py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1 flex items-center gap-1.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none whitespace-nowrap">
            {DOSSIERS.map((d, index) => {
              const isActive = activeSlideIndex === index;
              return (
                <button
                  key={d.id}
                  onClick={() => goToSlide(index, true)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xs font-mono text-[11px] tracking-wider uppercase transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-md shadow-gold-500/20'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-navy-950' : 'text-gold-400'}>{d.number}</span>
                  <span className="hidden sm:inline">{d.category.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => goToSlide(activeSlideIndex - 1, true)}
              disabled={activeSlideIndex === 0}
              className="w-8 h-8 rounded-xs border border-white/20 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-300 disabled:opacity-20 disabled:hover:border-white/20 disabled:hover:text-white transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goToSlide(activeSlideIndex + 1, true)}
              disabled={activeSlideIndex === DOSSIERS.length - 1}
              className="w-8 h-8 rounded-xs border border-white/20 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-300 disabled:opacity-20 disabled:hover:border-white/20 disabled:hover:text-white transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

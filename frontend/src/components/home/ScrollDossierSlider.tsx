'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface DossierSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
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
    image: '/images/practice/banking-finance.jpg',
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
    image: '/images/practice/debt-restructuring.jpg',
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
    category: 'COMMERCIAL ARBITRATION',
    title: 'Institutional & Ad-Hoc Arbitration',
    subtitle: 'Domestic & Cross-Border Dispute Adjudication',
    image: '/images/practice/arbitration.jpg',
    statLabel: 'Commercial Settlement Rate',
    statValue: '40\u201350%',
    statDetail: 'Matters settled through structured negotiations prior to tribunal award pronouncement',
    proceduralCode: 'ACT: ARBITRATION & CONCILIATION ACT 1996',
    instruments: [
      'Section 21 Formal Invocation Notices',
      'Section 9 / 17 Urgent Interim Relief Petitions',
      'Section 11 Chief Justice Appointments',
      'Section 34 & 37 Award Challenge Petitions'
    ],
    link: '/practice-areas/arbitration-dispute-resolution',
    tagline: 'From forensic statement of claims to post-award enforcement under Order XXI of the CPC.'
  },
  {
    id: 'dossier-04',
    number: '04',
    category: 'INFRASTRUCTURE DISPUTES',
    title: 'Highway & EPC Concession Arbitrations',
    subtitle: 'NHAI, Road Development & EPC Construction Claims',
    image: '/images/practice/infrastructure-disputes.jpg',
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
    link: '/practice-areas/infrastructure-disputes',
    tagline: 'Vigorous advocacy in concession agreements, delay forensic analysis, and performance securities.'
  },
  {
    id: 'dossier-05',
    number: '05',
    category: 'INSOLVENCY & NCLT',
    title: 'Insolvency Defense & CIRP Mitigation',
    subtitle: 'Corporate Debtor & Operational Creditor Proceedings',
    image: '/images/practice/insolvency.jpg',
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
    link: '/practice-areas/insolvency',
    tagline: 'Strategic positioning under the IBC to protect corporate solvent viability and prevent hostile takeovers.'
  },
  {
    id: 'dossier-06',
    number: '06',
    category: 'CROSS-BORDER MATTERS',
    title: 'Cross-Border Judgment Enforcement',
    subtitle: 'Foreign Awards & Multijurisdictional Demands',
    image: '/images/practice/commercial-disputes.jpg',
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
  }
];

export function ScrollDossierSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlideRef = useRef(0);
  activeSlideRef.current = activeSlideIndex;

  const isLockedRef = useRef(false);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= DOSSIERS.length) return;
    if (isLockedRef.current) return;

    isLockedRef.current = true;
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

  const progressPercent = ((activeSlideIndex + 1) / DOSSIERS.length) * 100;

  return (
    <section
      id="dossier-slider"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] min-h-[620px] max-h-[920px] bg-[#070E1A] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* TOP HEADER BAR */}
      <div className="relative z-30 border-b border-white/10 bg-[#070E1A]/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-400 font-semibold block leading-none mb-1">
                Interactive Practice Registry
              </span>
              <span className="font-heading text-base sm:text-lg text-white font-medium leading-none">
                Chambers Case Dossiers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline-block font-mono text-[11px] text-white/40 tracking-wider">
              [SCROLL OR CLICK TABS TO GLIDE]
            </span>
            <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3 py-1 rounded-xs font-mono text-xs">
              <span className="text-gold-400 font-bold">
                {String(activeSlideIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/30">/</span>
              <span className="text-white/60">
                {String(DOSSIERS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-300 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MIDDLE SLIDE TRACK */}
      <div className="w-full flex-1 min-h-0 relative overflow-hidden flex items-center justify-center">

        <button
          onClick={() => goToSlide(activeSlideIndex - 1)}
          disabled={activeSlideIndex === 0}
          className="hidden md:flex absolute left-4 z-20 w-11 h-11 rounded-full items-center justify-center bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 transition-all disabled:opacity-20 disabled:pointer-events-none shadow-xl backdrop-blur-sm"
          aria-label="Previous Dossier"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => goToSlide(activeSlideIndex + 1)}
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
                  animate={{
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-6xl h-full max-h-[540px] bg-[#0c182b] border border-white/15 rounded-sm shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 flex-1"
                >
                  {/* Left Column: Photography */}
                  <div className="relative lg:col-span-5 min-h-[200px] lg:min-h-full bg-[#08101E] overflow-hidden group">
                    <Image
                      src={dossier.image}
                      alt={dossier.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      quality={90}
                      priority={i === 0 || i === 1}
                      className="object-cover object-center scale-102 transition-transform duration-1000 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c182b] via-[#0c182b]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0c182b]/30 lg:to-[#0c182b]" />
                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-gold-500/40 px-3 py-1 font-mono text-[10px] text-gold-300 tracking-wider uppercase font-semibold">
                      DOSSIER \u00A7 {dossier.number}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-[#08101E]/85 backdrop-blur-md border border-white/10 p-3 rounded-xs">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 block mb-0.5">
                        {dossier.proceduralCode}
                      </span>
                      <p className="text-xs text-ivory-200/90 italic font-light line-clamp-2">
                        &quot;{dossier.tagline}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Case Analysis */}
                  <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-white/10">
                        <span className="font-mono text-[11px] text-gold-400 font-bold uppercase tracking-widest">
                          {dossier.category}
                        </span>
                        <span className="font-mono text-[10px] text-white/40 tracking-wider">
                          REF: AKM/DISP/{dossier.number}/2026
                        </span>
                      </div>

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
                              <span className="text-gold-400 font-mono text-xs">\u00A7</span>
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
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* BOTTOM SCRUBBER BAR */}
      <div className="relative z-30 border-t border-white/10 bg-[#070E1A]/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-2.5 sm:py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
            {DOSSIERS.map((d, index) => {
              const isActive = activeSlideIndex === index;
              return (
                <button
                  key={d.id}
                  onClick={() => goToSlide(index)}
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
              onClick={() => goToSlide(activeSlideIndex - 1)}
              disabled={activeSlideIndex === 0}
              className="w-8 h-8 rounded-xs border border-white/20 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-300 disabled:opacity-20 disabled:hover:border-white/20 disabled:hover:text-white transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goToSlide(activeSlideIndex + 1)}
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

'use client';

import { useEffect, useRef, useState } from 'react';
import { createTimeline, animate, Timeline } from 'animejs';
import { ArrowRight, Play, Pause, RotateCcw, ShieldCheck, Scale, FileCheck, CheckCircle2 } from 'lucide-react';

interface Stage {
  n: string;
  code: string;
  title: string;
  statutoryBasis: string;
  duration: string;
  summary: string;
  deliverables: string[];
  exposureMetric: string;
}

const STAGES: Stage[] = [
  {
    n: '01',
    code: 'DKT-PHASE-I',
    title: 'Security Audit & Notice of Default',
    statutoryBasis: 'Section 13(2) SARFAESI Act • Section 21 Arbitration Act',
    duration: 'Week 1 – 3',
    summary: 'Exhaustive forensic review of facility covenants, hypothecation schedules, and personal guarantees. Acceleration triggers are verified before taking any public position.',
    deliverables: [
      'Facility Documentation Perfection Audit',
      'CERSAI Registry Priority Verification',
      'Formal Demand & Default Acceleration Notice',
      'Corporate Solvency Risk Assessment'
    ],
    exposureMetric: 'Covers ₹100–130 Cr debt portfolios'
  },
  {
    n: '02',
    code: 'DKT-PHASE-II',
    title: 'Commercial Negotiation & Workout (OTS)',
    statutoryBasis: 'RBI Prudential Stressed Asset Framework 2019',
    duration: 'Week 4 – 8',
    summary: 'Where commercially prudent, structured settlement terms (One-Time Settlement or Moratorium) are negotiated to avoid protracted tribunal delays and asset impairment.',
    deliverables: [
      'Binding One-Time Settlement (OTS) Sanctions',
      'Consortium Inter-Creditor Agreement (ICA) Review',
      'Refinancing & Security Subordination Deeds',
      'Escrow & Waterfall Mechanism Settlement'
    ],
    exposureMetric: 'Resolved ₹85 Cr single infrastructure debt'
  },
  {
    n: '03',
    code: 'DKT-PHASE-III',
    title: 'Arbitration & Section 9/17 Interim Relief',
    statutoryBasis: 'Sections 9, 11, 17, 21 & 30 of the 1996 Act',
    duration: 'Month 2 – 8',
    summary: 'Immediate filing of interim measures to prevent asset alienation. Meticulous pleadings settling claims, defenses, and counter-claims before institutional or ad-hoc tribunals.',
    deliverables: [
      'Section 9 Court Injunction Petitions',
      'Section 21 Formal Invocation & Tribunal Formation',
      'Comprehensive Statement of Claim & Evidentiary Index',
      'Section 17 Tribunal Restraining Orders'
    ],
    exposureMetric: '40–50% settled commercially pre-award'
  },
  {
    n: '04',
    code: 'DKT-PHASE-IV',
    title: 'Award Execution & Section 34 Defense',
    statutoryBasis: 'Section 34 / 36 Arbitration Act • Order XXI CPC',
    duration: 'Post-Award Execution',
    summary: 'Defending arbitral awards against set-aside petitions under Section 34 limitation. Rapid filing of execution petitions in Commercial Courts for decree satisfaction.',
    deliverables: [
      'Section 34 Award Sustenance Pleadings',
      'Commercial Court Execution Petitions (Order XXI)',
      'Attachment of Debtor Bank Accounts & Receivables',
      'Recovery Certificate Issuance & Asset Liquidation'
    ],
    exposureMetric: 'Enforced across 9 national/global jurisdictions'
  }
];

export function AnimeDossierTimeline() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<Timeline | null>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create an Anime.js v4 timeline instance
    const tl = createTimeline({
      autoplay: false,
      duration: 8000,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentIdx = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1);
        setActiveStage(currentIdx);
      },
      onComplete: () => {
        setIsPlaying(false);
      }
    });

    if (progressLineRef.current) {
      tl.add(progressLineRef.current, {
        scaleX: [0, 1],
        duration: 8000,
        ease: 'linear',
      }, 0);
    }

    timelineRef.current = tl;

    return () => {
      tl.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!timelineRef.current) return;
    if (isPlaying) {
      timelineRef.current.pause();
      setIsPlaying(false);
    } else {
      if (timelineRef.current.progress >= 0.99) {
        timelineRef.current.restart();
      } else {
        timelineRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const handleSelectStage = (index: number) => {
    if (timelineRef.current) {
      timelineRef.current.pause();
      setIsPlaying(false);
      const targetProgress = index / (STAGES.length - 1);
      timelineRef.current.seek(timelineRef.current.duration * targetProgress);
    }
    setActiveStage(index);

    // Micro-animation on stage cards
    if (cardsRef.current) {
      const fields = cardsRef.current.querySelectorAll('.animate-field');
      animate(fields, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 400,
        ease: 'outQuad',
      });
    }
  };

  const active = STAGES[activeStage];

  return (
    <section className="bg-[#0A1628] text-white py-24 md:py-32 border-b border-white/10 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 font-mono text-[11px] tracking-widest uppercase mb-3 font-semibold">
              <Scale size={15} />
              <span>Procedural Trajectory Engine</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-normal tracking-tight">
              From Notice of Default to Award Enforcement
            </h2>
          </div>

          {/* Timeline Animation Controller */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 p-2 rounded-xs backdrop-blur-md">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xs transition-colors"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? 'Pause' : 'Autoplay'}</span>
            </button>
            <button
              onClick={() => {
                if (timelineRef.current) {
                  timelineRef.current.restart();
                  timelineRef.current.pause();
                  setIsPlaying(false);
                  setActiveStage(0);
                }
              }}
              className="p-1.5 text-white/60 hover:text-white transition-colors"
              title="Reset Timeline"
              aria-label="Reset Timeline"
            >
              <RotateCcw size={15} />
            </button>
            <span className="font-mono text-[10px] text-white/40 tracking-wider pl-2 border-l border-white/10">
              ANIME.JS TIMELINE
            </span>
          </div>
        </div>

        {/* 4-Stage Horizontal Stepper */}
        <div className="relative mb-12">
          {/* Base hairline */}
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/10 z-0" />
          
          {/* Animated progress bar */}
          <div 
            ref={progressLineRef}
            className="absolute top-5 left-0 right-0 h-[2px] bg-gold-400 z-0 origin-left"
            style={{ transform: `scaleX(${activeStage / (STAGES.length - 1)})` }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {STAGES.map((s, idx) => (
              <button
                key={s.n}
                onClick={() => handleSelectStage(idx)}
                className={`text-left p-4 rounded-xs transition-all duration-300 border ${
                  activeStage === idx 
                    ? 'bg-[#0f1f38] border-gold-400 shadow-xl shadow-gold-500/10'
                    : 'bg-[#0A1628]/80 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    activeStage >= idx 
                      ? 'bg-gold-500 text-navy-950'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {s.n}
                  </span>
                  <span className="font-mono text-[10px] text-gold-400/80 uppercase tracking-widest font-semibold">
                    {s.duration}
                  </span>
                </div>
                <h3 className="font-heading text-sm md:text-base text-white font-medium line-clamp-1 mb-1">
                  {s.title}
                </h3>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider truncate">
                  {s.code}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Detailed Dossier Panel */}
        <div 
          ref={cardsRef}
          className="bg-[#0f1e36] border border-white/15 p-8 lg:p-12 rounded-sm shadow-2xl relative"
        >
          {/* Gold header accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-amber-300 to-gold-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Procedural Narrative (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="animate-field flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 font-mono text-[10px] uppercase tracking-wider text-gold-400 font-bold rounded-xs">
                  {active.code}
                </span>
                <span className="font-mono text-xs text-white/40 tracking-wider">
                  STATUTORY MATRIX: {active.statutoryBasis}
                </span>
              </div>

              <h3 className="animate-field font-heading text-2xl sm:text-3xl lg:text-4xl text-white font-normal mb-4">
                {active.title}
              </h3>

              <p className="animate-field text-ivory-200/90 text-sm sm:text-base leading-relaxed mb-8">
                {active.summary}
              </p>

              {/* Verified Deliverables */}
              <div className="animate-field">
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-gold-400 font-semibold mb-4">
                  Standard Case Filings &amp; Procedural Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {active.deliverables.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xs bg-white/[0.02] border border-white/5 text-xs text-ivory-200"
                    >
                      <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Case Outcome Metric & Consultation Box (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              
              {/* Financial Metric Box */}
              <div className="animate-field p-6 bg-black/40 border border-gold-500/30 rounded-xs">
                <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest block font-bold mb-1">
                  HISTORICAL BENCHMARK RESULT
                </span>
                <p className="font-mono text-2xl sm:text-3xl text-white font-bold tracking-tight mb-2">
                  {active.exposureMetric}
                </p>
                <p className="text-xs text-ivory-400 leading-relaxed">
                  Based on institutional creditor litigation against scheduled commercial banks, infrastructure borrowers, and international tribunals.
                </p>
              </div>

              {/* Direct Procedural Call */}
              <div className="animate-field p-6 bg-white/[0.03] border border-white/10 rounded-xs">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={20} className="text-gold-400" />
                  <span className="font-heading text-lg text-white font-medium">
                    Facing a default or tribunal notice?
                  </span>
                </div>
                <p className="text-xs text-ivory-300 leading-relaxed mb-5">
                  Initial case documentation review is completed under strict confidentiality and Bar Council of India guidelines.
                </p>
                <a
                  href="/consultation"
                  className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xs transition-colors shadow-md shadow-gold-500/20"
                >
                  <span>Request Procedural Evaluation</span>
                  <ArrowRight size={14} />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

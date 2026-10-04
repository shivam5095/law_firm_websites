'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ClientEntity {
  name: string;
  shortName: string;
  category: 'bank' | 'nbfc';
  badge: string;
  accentColor: string;
  bgLight: string;
  tagline: string;
  matters: string[];
  logo?: string;
}

const clientsData: ClientEntity[] = [
  // Commercial & Multinational Banks
  {
    name: 'State Bank of India',
    shortName: 'SBI',
    category: 'bank',
    badge: 'Public Sector Banking Giant',
    accentColor: '#1E40AF',
    bgLight: 'bg-blue-50/70 border-blue-200/60',
    tagline: 'Largest Public Sector Bank in India',
    matters: ['DRT & SARFAESI Actions', 'NPA Recovery Proceedings', 'Consortium Security Review'],
    logo: '/logos/sbi.png',
  },
  {
    name: 'HDFC Bank',
    shortName: 'HDFC',
    category: 'bank',
    badge: 'Leading Private Sector Bank',
    accentColor: '#1E3A8A',
    bgLight: 'bg-slate-50 border-slate-200',
    tagline: 'Premier Banking & Financial Conglomerate',
    matters: ['Commercial Litigation', 'Facility Documentation', 'Corporate Debt Recovery'],
    logo: '/logos/hdfc-bank.png',
  },
  {
    name: 'ICICI Bank',
    shortName: 'ICICI',
    category: 'bank',
    badge: 'Multinational Banking Flagship',
    accentColor: '#C2410C',
    bgLight: 'bg-amber-50/70 border-amber-200/60',
    tagline: 'Major Private Financial Institution',
    matters: ['Insolvency & Bankruptcy (IBC)', 'High-Value Summary Suits', 'Commercial Contracts'],
    logo: '/logos/icici-bank.png',
  },
  {
    name: 'Axis Bank',
    shortName: 'AXIS',
    category: 'bank',
    badge: 'Premier Commercial Bank',
    accentColor: '#9D174D',
    bgLight: 'bg-rose-50/70 border-rose-200/60',
    tagline: 'Leading Private Commercial Bank',
    matters: ['Stressed Asset Resolution', 'Debt Restructuring', 'Secured Asset Realization'],
    logo: '/logos/axis-bank.png',
  },
  {
    name: 'Kotak Mahindra Bank',
    shortName: 'KOTAK',
    category: 'bank',
    badge: 'Leading Financial Conglomerate',
    accentColor: '#DC2626',
    bgLight: 'bg-red-50/60 border-red-200/60',
    tagline: 'Premier Commercial & Retail Banking',
    matters: ['Section 9 Interim Relief', 'Commercial Arbitration', 'Asset Recovery Strategy'],
  },
  {
    name: 'IndusInd Bank',
    shortName: 'INDUSIND',
    category: 'bank',
    badge: 'New-Generation Commercial Bank',
    accentColor: '#9A3412',
    bgLight: 'bg-orange-50/70 border-orange-200/60',
    tagline: 'Universal Banking Institution',
    matters: ['Vehicle & Equipment Finance Disputes', 'Contract Enforcement', 'Commercial Arbitration'],
    logo: '/logos/indusind-bank.png',
  },
  {
    name: 'IDFC FIRST Bank',
    shortName: 'IDFC FIRST',
    category: 'bank',
    badge: 'Universal Commercial Bank',
    accentColor: '#881337',
    bgLight: 'bg-pink-50/60 border-pink-200/60',
    tagline: 'Infrastructure & Retail Banking',
    matters: ['Infrastructure Lending Disputes', 'Summary Claims', 'Negotiable Instruments Act (NI 138)'],
    logo: '/logos/idfc-first-bank.png',
  },
  {
    name: 'American Express',
    shortName: 'AMEX',
    category: 'bank',
    badge: 'Global Financial Services Giant',
    accentColor: '#0284C7',
    bgLight: 'bg-sky-50/70 border-sky-200/60',
    tagline: 'Multinational Financial Corporation',
    matters: ['Cross-Border Claims', 'Consumer Credit Enforcement', 'Commercial Arbitration'],
    logo: '/logos/american-express.png',
  },
  {
    name: 'HSBC Bank',
    shortName: 'HSBC',
    category: 'bank',
    badge: 'Multinational Banking Corporation',
    accentColor: '#B91C1C',
    bgLight: 'bg-stone-50 border-stone-200',
    tagline: 'Global Banking & Financial Services',
    matters: ['Trade Finance Disputes', 'International Commercial Recovery', 'Cross-Border Jurisdiction'],
    logo: '/logos/hsbc.png',
  },

  // Premier NBFCs & Financial Conglomerates
  {
    name: 'Aditya Birla Capital',
    shortName: 'ABC',
    category: 'nbfc',
    badge: 'Premier NBFC Conglomerate',
    accentColor: '#B45309',
    bgLight: 'bg-amber-50/60 border-amber-200/60',
    tagline: 'Universal Financial Solutions Group',
    matters: ['Structured Corporate Lending', 'Debt Restructuring & OTS', 'Security Enforcement'],
    logo: '/logos/aditya-birla-capital.png',
  },
  {
    name: 'Bajaj Finance',
    shortName: 'BAJAJ',
    category: 'nbfc',
    badge: 'Leading Retail & Corporate NBFC',
    accentColor: '#1E3A8A',
    bgLight: 'bg-blue-50/60 border-blue-200/60',
    tagline: 'India\'s Largest Diversified NBFC',
    matters: ['High-Volume Debt Recovery', 'Arbitration Awards Execution', 'Commercial Tribunal Advocacy'],
    logo: '/logos/bajaj-finance.png',
  },
  {
    name: 'Tata Capital',
    shortName: 'TATA',
    category: 'nbfc',
    badge: 'Flagship Financial Services',
    accentColor: '#1D4ED8',
    bgLight: 'bg-indigo-50/60 border-indigo-200/60',
    tagline: 'Tata Group Financial Enterprise',
    matters: ['Commercial Facility Disputes', 'Secured Asset Recovery', 'Pre-Litigation Settlement'],
    logo: '/logos/tata-capital.png',
  },
  {
    name: 'Poonawalla Fincorp',
    shortName: 'POONAWALLA',
    category: 'nbfc',
    badge: 'Specialized Enterprise NBFC',
    accentColor: '#047857',
    bgLight: 'bg-emerald-50/60 border-emerald-200/60',
    tagline: 'Innovative Retail & MSME Financing',
    matters: ['MSME Credit Enforcement', 'Tribunal Representation', 'Arbitral Award Enforcement'],
  },
  {
    name: 'MoneyView',
    shortName: 'MONEYVIEW',
    category: 'nbfc',
    badge: 'Digital Lending & FinTech Leader',
    accentColor: '#059669',
    bgLight: 'bg-teal-50/60 border-teal-200/60',
    tagline: 'FinTech Credit & Lending Platform',
    matters: ['Digital Lending Compliance', 'Default Recovery Mechanisms', 'Dispute Resolution'],
    logo: '/logos/moneyview.png',
  },
];

const featuredClientNames = [
  'HDFC Bank',
  'Axis Bank',
  'State Bank of India',
  'ICICI Bank',
  'IndusInd Bank',
  'IDFC FIRST Bank',
  'American Express',
  'HSBC Bank',
  'Aditya Birla Capital',
  'Bajaj Finance',
  'MoneyView',
  'Tata Capital',
  'Kotak Mahindra Bank',
];

const featuredClients = featuredClientNames
  .map((name) => clientsData.find((client) => client.name === name))
  .filter((client): client is ClientEntity => client !== undefined);

const CLIENT_CARD_GAP = 16;
const CLIENT_GROUP_COUNT = 7;
const CLIENT_CENTER_GROUP = 3;

function ClientLogo({ client }: { client: ClientEntity }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (client.logo && !imageFailed) {
    return (
      <Image
        src={client.logo}
        alt={client.name}
        width={160}
        height={64}
        className="h-16 w-full object-contain"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return client.shortName === 'KOTAK' ? (
    <span className="font-heading text-sm font-bold text-red-700">KOTAK</span>
  ) : null;
}

interface ManualMovement {
  startedAt: number;
  duration: number;
  distance: number;
  appliedDistance: number;
}

function normalizeCarouselPosition(viewport: HTMLDivElement | null, group: HTMLDivElement | null) {
  if (!viewport || !group) return;

  const period = group.offsetWidth + CLIENT_CARD_GAP;
  if (period === CLIENT_CARD_GAP) return;

  const lowerBound = period * CLIENT_CENTER_GROUP;
  const upperBound = period * (CLIENT_CENTER_GROUP + 1);

  while (viewport.scrollLeft < lowerBound) viewport.scrollLeft += period;
  while (viewport.scrollLeft >= upperBound) viewport.scrollLeft -= period;
}

export function ClientsRepresentedSection() {
  const [filter, setFilter] = useState<'all' | 'bank' | 'nbfc'>('all');
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const pauseReasonsRef = useRef({ hovered: false, touching: false, focused: false });
  const reducedMotionRef = useRef(false);
  const manualMovementRef = useRef<ManualMovement | null>(null);

  const filteredClients = featuredClients.filter((client) => {
    if (filter === 'all') return true;
    return client.category === filter;
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionPreference.matches;

    const centerCarousel = () => {
      viewport.scrollLeft = (firstGroup.offsetWidth + CLIENT_CARD_GAP) * CLIENT_CENTER_GROUP;
    };
    centerCarousel();

    const resizeObserver = new ResizeObserver(centerCarousel);
    resizeObserver.observe(firstGroup);

    let frameId = 0;
    let previousTime = 0;

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;

      const currentViewport = viewportRef.current;
      const currentGroup = firstGroupRef.current;
      if (!currentViewport || !currentGroup) return;

      let movement = 0;
      if (!reducedMotionRef.current && !isPausedRef.current) {
        movement += elapsed * 0.024;
      }

      const manualMovement = manualMovementRef.current;
      if (manualMovement) {
        const progress = Math.min((time - manualMovement.startedAt) / manualMovement.duration, 1);
        const easedProgress = progress * progress * (3 - 2 * progress);
        const appliedDistance = manualMovement.distance * easedProgress;
        movement += appliedDistance - manualMovement.appliedDistance;
        manualMovement.appliedDistance = appliedDistance;
        if (progress >= 1) manualMovementRef.current = null;
      }

      currentViewport.scrollLeft += movement;
      normalizeCarouselPosition(currentViewport, currentGroup);
      frameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!frameId) {
        previousTime = 0;
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        manualMovementRef.current = null;
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    if (!motionPreference.matches) startAnimation();
    motionPreference.addEventListener('change', handleMotionPreference);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      motionPreference.removeEventListener('change', handleMotionPreference);
    };
  }, [filter]);

  const updatePauseState = () => {
    const reasons = pauseReasonsRef.current;
    isPausedRef.current = reasons.hovered || reasons.touching || reasons.focused;
  };

  const moveLogos = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    const firstLogo = firstGroup?.firstElementChild;
    if (!viewport || !(firstLogo instanceof HTMLElement)) return;

    const logosToMove = Math.min(2, filteredClients.length);
    const distance = logosToMove * (firstLogo.getBoundingClientRect().width + CLIENT_CARD_GAP) * direction;

    if (reducedMotionRef.current) {
      viewport.scrollLeft += distance;
      normalizeCarouselPosition(viewport, firstGroup);
      return;
    }

    manualMovementRef.current = {
      startedAt: performance.now(),
      duration: 450,
      distance,
      appliedDistance: 0,
    };
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-charcoal-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-charcoal-100 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 mb-2">
              <ShieldCheck size={16} className="text-gold-500" />
              <span>Institutional Casework &amp; Client Representation</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-950 font-bold tracking-tight">
              Banks &amp; Financial Institutions Represented
            </h2>
            <p className="text-charcoal-600 text-sm md:text-base max-w-3xl mt-3 leading-relaxed">
              Strategic counsel, debt recovery, and dispute resolution for premier scheduled commercial banks,
              multinational banking giants, and leading non-banking financial corporations (NBFCs) across India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-ivory-100 rounded-sm border border-charcoal-200 shrink-0 self-start md:self-auto">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors',
                filter === 'all'
                  ? 'bg-navy-900 text-gold-400 shadow-xs'
                  : 'text-charcoal-600 hover:text-navy-900'
              )}
            >
              All Entities ({featuredClients.length})
            </button>
            <button
              type="button"
              aria-pressed={filter === 'bank'}
              onClick={() => setFilter('bank')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors',
                filter === 'bank'
                  ? 'bg-navy-900 text-gold-400 shadow-xs'
                  : 'text-charcoal-600 hover:text-navy-900'
              )}
            >
              Banks ({featuredClients.filter((c) => c.category === 'bank').length})
            </button>
            <button
              type="button"
              aria-pressed={filter === 'nbfc'}
              onClick={() => setFilter('nbfc')}
              className={cn(
                'px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors',
                filter === 'nbfc'
                  ? 'bg-navy-900 text-gold-400 shadow-xs'
                  : 'text-charcoal-600 hover:text-navy-900'
              )}
            >
              NBFCs &amp; FinTech ({featuredClients.filter((c) => c.category === 'nbfc').length})
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-ivory-50 border border-charcoal-200/80 rounded-sm">
          <div className="border-r last:border-0 border-charcoal-200/80 pr-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">₹500+ Cr.</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Handled in Claims &amp; Restructuring
            </div>
          </div>
          <div className="border-r last:border-0 border-charcoal-200/80 px-2 md:px-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">14+ Entities</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Leading Banks &amp; Premier NBFCs
            </div>
          </div>
          <div className="border-r last:border-0 border-charcoal-200/80 px-2 md:px-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">DRT &amp; NCLT</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Tribunal &amp; High Court Advocacy
            </div>
          </div>
          <div className="pl-2 md:pl-4">
            <div className="text-2xl md:text-3xl font-heading font-bold text-navy-950">Pan-India</div>
            <div className="text-xs text-charcoal-600 uppercase tracking-wider font-medium mt-1">
              Multi-Jurisdiction Recovery Network
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => moveLogos(-1)}
            aria-label="Previous banks"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold-500/60 bg-navy-900 text-gold-400 transition-colors hover:bg-navy-800 hover:text-gold-300 focus-visible:outline-gold-500"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div
            ref={viewportRef}
            className="client-marquee-viewport min-w-0 flex-1 [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Represented banks and financial institutions"
            tabIndex={0}
            style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}
            onMouseEnter={() => {
              pauseReasonsRef.current.hovered = true;
              updatePauseState();
            }}
            onMouseLeave={() => {
              pauseReasonsRef.current.hovered = false;
              updatePauseState();
            }}
            onTouchStart={() => {
              pauseReasonsRef.current.touching = true;
              updatePauseState();
            }}
            onTouchEnd={() => {
              pauseReasonsRef.current.touching = false;
              updatePauseState();
            }}
            onTouchCancel={() => {
              pauseReasonsRef.current.touching = false;
              updatePauseState();
            }}
            onFocusCapture={() => {
              pauseReasonsRef.current.focused = true;
              updatePauseState();
            }}
            onBlurCapture={(event) => {
              pauseReasonsRef.current.focused = event.currentTarget.contains(event.relatedTarget as Node | null);
              updatePauseState();
            }}
          >
            <div className="flex w-max gap-4">
              {Array.from({ length: CLIENT_GROUP_COUNT }, (_, groupIndex) => (
                <div
                  key={groupIndex}
                  ref={groupIndex === 0 ? firstGroupRef : undefined}
                  className="flex w-max shrink-0 gap-4"
                  role={groupIndex === 0 ? 'list' : undefined}
                  aria-hidden={groupIndex === 0 ? undefined : true}
                >
                  {filteredClients.map((client) => (
                    <div
                      key={`${groupIndex}-${client.name}`}
                      role={groupIndex === 0 ? 'listitem' : undefined}
                      aria-label={groupIndex === 0 ? client.name : undefined}
                      className={cn(
                        'flex h-24 w-36 shrink-0 items-center justify-center rounded-sm border p-3 shadow-sm md:h-28 md:w-44',
                        client.shortName === 'IDFC FIRST' && 'border-red-900 bg-red-900',
                        client.shortName === 'MONEYVIEW' && 'border-emerald-950 bg-emerald-950',
                        client.shortName === 'BAJAJ' && 'border-gray-200 bg-gray-100',
                        !['IDFC FIRST', 'MONEYVIEW', 'BAJAJ'].includes(client.shortName) && 'border-charcoal-200 bg-white'
                      )}
                    >
                      <ClientLogo client={client} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => moveLogos(1)}
            aria-label="Next banks"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold-500/60 bg-navy-900 text-gold-400 transition-colors hover:bg-navy-800 hover:text-gold-300 focus-visible:outline-gold-500"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}

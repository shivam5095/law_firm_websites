'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Globe, MapPin, Compass, CheckCircle2, Maximize2, ExternalLink, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LocationNode {
  name: string;
  region: 'International' | 'India' | 'Hub';
  countryOrState: string;
  forum: string;
  focus: string;
  highlight: boolean;
}

const locationsList: LocationNode[] = [
  // Central Hub
  {
    name: 'Noida Hub (Delhi NCR)',
    region: 'Hub',
    countryOrState: 'Uttar Pradesh, India',
    forum: 'Lead Chambers & Supreme Court / Tribunals',
    focus: 'Central command, high-stakes arbitration, NCLT, DRT, and banking litigation.',
    highlight: true,
  },
  // International Outward Reach
  {
    name: 'Atlanta (USA)',
    region: 'International',
    countryOrState: 'Georgia, USA',
    forum: 'US Federal & State Commercial Courts',
    focus: 'Cross-border commercial dispute advisory, contractual breaches & international litigation coordination.',
    highlight: false,
  },
  {
    name: 'Georgia (USA)',
    region: 'International',
    countryOrState: 'United States',
    forum: 'Commercial Courts & Arbitration',
    focus: 'Transatlantic debt enforcement, discovery facilitation & corporate compliance advisory.',
    highlight: false,
  },
  {
    name: 'Florida (USA)',
    region: 'International',
    countryOrState: 'United States',
    forum: 'Commercial Arbitration & State Courts',
    focus: 'Asset recovery across jurisdictions, maritime & commercial dispute notices.',
    highlight: false,
  },
  {
    name: 'Dubai (UAE)',
    region: 'International',
    countryOrState: 'United Arab Emirates',
    forum: 'DIAC & DIFC Courts Representation',
    focus: 'Middle-East trade arbitrations, enforcement of foreign decrees, cross-border banking recovery.',
    highlight: false,
  },
  {
    name: 'Kuwait City (Kuwait)',
    region: 'International',
    countryOrState: 'State of Kuwait',
    forum: 'GCC Regional Arbitration & Legal Advisory',
    focus: 'Gulf region corporate representations, expatriate asset claims & cross-border contracts.',
    highlight: false,
  },
  {
    name: 'Malaysia',
    region: 'International',
    countryOrState: 'Southeast Asia',
    forum: 'AIAC / Kuala Lumpur Commercial Arbitration',
    focus: 'South-East Asia bilateral dispute resolution, infrastructure contracts & maritime trade.',
    highlight: false,
  },
  {
    name: 'Indonesia',
    region: 'International',
    countryOrState: 'Southeast Asia',
    forum: 'BANI & Regional Commercial Forums',
    focus: 'Natural resources, energy contracts & international trade dispute strategy.',
    highlight: false,
  },

  // Indian States & Metros
  {
    name: 'Delhi NCR',
    region: 'India',
    countryOrState: 'National Capital Territory',
    forum: 'Supreme Court, Delhi High Court, NCLAT, DIAC',
    focus: 'Appellate advocacy, commercial division suits, institutional arbitration & tribunal enforcement.',
    highlight: true,
  },
  {
    name: 'Uttar Pradesh',
    region: 'India',
    countryOrState: 'UP State Jurisdictions',
    forum: 'Allahabad High Court, Lucknow Bench & Commercial Courts',
    focus: 'Statewide recovery proceedings, civil revisions, writ petitions & government contract disputes.',
    highlight: true,
  },
  {
    name: 'Mumbai',
    region: 'India',
    countryOrState: 'Maharashtra',
    forum: 'Bombay High Court, NCLT Principal Benches, DRT',
    focus: 'Financial capital banking recovery, consortium debt restructuring & securities litigation.',
    highlight: true,
  },
  {
    name: 'Bangalore (Bengaluru)',
    region: 'India',
    countryOrState: 'Karnataka',
    forum: 'Karnataka High Court & City Civil Courts',
    focus: 'Tech commercial contracts, venture debt enforcement & software IP arbitrations.',
    highlight: false,
  },
  {
    name: 'Hyderabad',
    region: 'India',
    countryOrState: 'Telangana',
    forum: 'Telangana High Court & IAMC Hyderabad',
    focus: 'Pharma & infrastructure arbitrations, corporate recovery suits & commercial injunctions.',
    highlight: false,
  },
  {
    name: 'Gujarat',
    region: 'India',
    countryOrState: 'Gujarat State Jurisdictions',
    forum: 'Gujarat High Court, GIFT City Arbitration',
    focus: 'International financial services centre (GIFT City) disputes, ports & industrial debt resolution.',
    highlight: false,
  },
  {
    name: 'Kolkata',
    region: 'India',
    countryOrState: 'West Bengal',
    forum: 'Calcutta High Court & Commercial Divisions',
    focus: 'Heavy engineering, mining & eastern region banking debt enforcement matters.',
    highlight: false,
  },
];

export function GlobalPresenceMap() {
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'international' | 'india'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLocations = locationsList.filter((loc) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'international') return loc.region === 'International';
    if (selectedFilter === 'india') return loc.region === 'India' || loc.region === 'Hub';
    return true;
  });

  return (
    <section className="py-24 bg-navy-950 text-white relative overflow-hidden border-b border-navy-800">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Globe size={14} className="text-gold-400" />
            <span>Pan-India Outward to Global Jurisdictions</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-ivory-100">
            Regional Office Network &amp; Jurisdictional Reach
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-ivory-300 text-sm md:text-base leading-relaxed">
            Headquartered at the <strong className="text-gold-400 font-semibold">Noida Central Hub (Delhi NCR)</strong>, 
            our dispute resolution, arbitration, and recovery capabilities bridge premier Indian state high courts with 
            key cross-border hubs across the United States, Middle East, and Southeast Asia.
          </p>
        </div>

        {/* Map Container Card */}
        <div className="bg-navy-900/90 border border-navy-700/80 rounded-sm p-4 md:p-8 shadow-2xl mb-14">
          {/* Map Controls Top Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-navy-800 mb-6">
            <div className="flex items-center gap-2 text-xs text-ivory-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold text-ivory-100">Central Hub: Noida, India</span>
              <span className="text-navy-600">•</span>
              <span className="text-gold-400 font-medium">14 Regional Connection Points</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <div className="flex items-center p-1 bg-navy-950 rounded-sm border border-navy-800 text-xs">
                <button
                  onClick={() => setActiveTheme('dark')}
                  className={cn(
                    'px-3 py-1 rounded-xs font-medium transition-colors',
                    activeTheme === 'dark'
                      ? 'bg-gold-500 text-navy-950 shadow-xs'
                      : 'text-ivory-400 hover:text-ivory-200'
                  )}
                >
                  High-Tech View
                </button>
                <button
                  onClick={() => setActiveTheme('light')}
                  className={cn(
                    'px-3 py-1 rounded-xs font-medium transition-colors',
                    activeTheme === 'light'
                      ? 'bg-gold-500 text-navy-950 shadow-xs'
                      : 'text-ivory-400 hover:text-ivory-200'
                  )}
                >
                  Atlas View
                </button>
              </div>

              {/* Fullscreen Modal trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-1.5 text-ivory-400 hover:text-gold-400 bg-navy-950 border border-navy-800 rounded-sm transition-colors"
                title="View Fullscreen High-Res Map"
                aria-label="View Fullscreen Map"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Graphic Frame */}
          <div className="relative w-full aspect-[16/9] max-h-[620px] rounded-sm overflow-hidden bg-navy-950 border border-navy-800 group">
            <Image
              src={
                activeTheme === 'dark'
                  ? '/images/map/world-map-dark.jpg'
                  : '/images/map/world-map-light.jpg'
              }
              alt="Regional Office Network - Noida Hub Connecting Global and Indian Offices"
              fill
              priority
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />

            {/* Click to expand overlay hint */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-4 right-4 bg-navy-950/80 hover:bg-navy-900 border border-gold-500/40 text-gold-400 px-3 py-1.5 rounded-sm text-xs flex items-center gap-1.5 backdrop-blur-sm transition-all"
            >
              <Maximize2 size={13} />
              <span>Expand Map</span>
            </button>
          </div>

          {/* Map Sub-features banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-6 border-t border-navy-800 text-center text-xs text-ivory-300">
            <div className="p-3 bg-navy-950/50 rounded-sm border border-navy-800/80">
              <span className="text-gold-400 font-semibold block mb-1">Global Reach</span>
              <span>USA • UAE • Kuwait • ASEAN</span>
            </div>
            <div className="p-3 bg-navy-950/50 rounded-sm border border-navy-800/80">
              <span className="text-gold-400 font-semibold block mb-1">Pan-India Forum</span>
              <span>Supreme Court &amp; 7 State Metros</span>
            </div>
            <div className="p-3 bg-navy-950/50 rounded-sm border border-navy-800/80">
              <span className="text-gold-400 font-semibold block mb-1">Central Hub</span>
              <span>Noida Command &amp; Delhi NCR</span>
            </div>
            <div className="p-3 bg-navy-950/50 rounded-sm border border-navy-800/80">
              <span className="text-gold-400 font-semibold block mb-1">Cross-Border Scope</span>
              <span>Arbitration &amp; Award Enforcement</span>
            </div>
          </div>
        </div>

        {/* Interactive Jurisdictional Directory & Focus Areas */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-ivory-100">
                Jurisdictional Breakdown &amp; Practice Forums
              </h3>
              <p className="text-xs text-ivory-400 mt-1">
                Explore dispute resolution, court appearance, and advisory coverage for each territory.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-navy-900 rounded-sm border border-navy-800 text-xs shrink-0">
              <button
                onClick={() => setSelectedFilter('all')}
                className={cn(
                  'px-3 py-1 rounded-xs transition-colors',
                  selectedFilter === 'all'
                    ? 'bg-gold-500 text-navy-950 font-semibold'
                    : 'text-ivory-400 hover:text-white'
                )}
              >
                All Jurisdictions ({locationsList.length})
              </button>
              <button
                onClick={() => setSelectedFilter('international')}
                className={cn(
                  'px-3 py-1 rounded-xs transition-colors',
                  selectedFilter === 'international'
                    ? 'bg-gold-500 text-navy-950 font-semibold'
                    : 'text-ivory-400 hover:text-white'
                )}
              >
                Global Outreach (7)
              </button>
              <button
                onClick={() => setSelectedFilter('india')}
                className={cn(
                  'px-3 py-1 rounded-xs transition-colors',
                  selectedFilter === 'india'
                    ? 'bg-gold-500 text-navy-950 font-semibold'
                    : 'text-ivory-400 hover:text-white'
                )}
              >
                Indian Jurisdictions (8)
              </button>
            </div>
          </div>

          {/* Locations Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLocations.map((loc) => (
              <div
                key={loc.name}
                className={cn(
                  'p-6 rounded-sm border transition-all duration-300 hover:border-gold-500/60 bg-navy-900/70 relative flex flex-col justify-between',
                  loc.region === 'Hub'
                    ? 'border-gold-500 bg-navy-900 shadow-lg ring-1 ring-gold-500/30'
                    : 'border-navy-800'
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={16}
                        className={
                          loc.region === 'Hub'
                            ? 'text-red-400 fill-red-400'
                            : loc.region === 'International'
                            ? 'text-gold-400'
                            : 'text-blue-400'
                        }
                      />
                      <span className="font-heading font-bold text-lg text-ivory-100">
                        {loc.name}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-xs shrink-0',
                        loc.region === 'Hub'
                          ? 'bg-gold-500 text-navy-950'
                          : loc.region === 'International'
                          ? 'bg-navy-800 text-gold-300 border border-gold-500/30'
                          : 'bg-navy-800 text-blue-300 border border-blue-500/30'
                      )}
                    >
                      {loc.region === 'Hub'
                        ? 'Central Hub'
                        : loc.region === 'International'
                        ? 'Global'
                        : 'India'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-gold-400 mb-2">
                    {loc.forum}
                  </p>

                  <p className="text-xs text-ivory-300 leading-relaxed">
                    {loc.focus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-ivory-400">
                  <span>{loc.countryOrState}</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-medium transition-colors"
                  >
                    <span>Matter Inquiry</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto w-full text-white">
            <div className="flex items-center gap-3">
              <Globe className="text-gold-400" size={20} />
              <span className="font-heading font-bold text-lg">
                Regional Office Network — High-Resolution Map
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-navy-900 border border-gold-500/40 text-gold-400 px-4 py-1.5 rounded-sm text-sm hover:bg-gold-500 hover:text-navy-950 transition-all font-medium"
            >
              Close ✕
            </button>
          </div>
          <div className="relative flex-1 max-w-7xl mx-auto w-full rounded-sm overflow-hidden bg-navy-950 border border-navy-800 flex items-center justify-center">
            <Image
              src={
                activeTheme === 'dark'
                  ? '/images/map/world-map-dark.jpg'
                  : '/images/map/world-map-light.jpg'
              }
              alt="High Resolution World Map Regional Office Network"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}

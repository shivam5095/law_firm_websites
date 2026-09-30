'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { officeHubs } from '@/data/offices';

const regionalConnectionPointCount = 14;
const networkLocations = [
  'Noida', 'Varanasi', 'Atlanta', 'Georgia (USA)', 'Florida (USA)', 'Dubai', 'Kuwait City', 'Malaysia',
  'Indonesia', 'Delhi NCR', 'Uttar Pradesh', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Gujarat', 'Kolkata',
];

export function GlobalPresenceMap() {
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            Operating from our <strong className="text-gold-400 font-semibold">Noida Principal HQ and Varanasi Additional HQ</strong>,
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
              <span className="font-semibold text-ivory-100">HQ Network: Noida &amp; Varanasi, India</span>
              <span className="text-navy-600">•</span>
              <span className="text-gold-400 font-medium">
                {regionalConnectionPointCount} Regional Connection Points
              </span>
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
              alt="Regional Office Network connecting Noida and Varanasi hubs with global and Indian jurisdictions"
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />

            <div aria-label="Headquarters shown on the map" className="absolute left-3 right-3 top-3 z-10 flex flex-wrap gap-2 md:left-4 md:right-auto md:top-4">
              {officeHubs.map((hub) => (
                <span key={hub.name} className="border border-gold-500/50 bg-navy-950/90 px-2.5 py-1.5 text-[10px] font-semibold text-ivory-100 backdrop-blur-sm md:text-xs">
                  <span className="text-gold-400">{hub.name}</span> · {hub.designation}
                </span>
              ))}
            </div>

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
          <div className="mt-6 border-t border-navy-800 pt-6">
            <h3 className="font-heading text-lg text-ivory-100">Network Locations</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-ivory-300 sm:grid-cols-4 lg:grid-cols-8">
              {networkLocations.map((location) => (
                <li key={location} className="border border-navy-800 bg-navy-950/50 px-3 py-2">
                  {location}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-navy-800 pt-6 text-center text-xs text-ivory-300 sm:grid-cols-2 lg:grid-cols-4">
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
              <span>Noida &amp; Varanasi · Delhi NCR &amp; Eastern UP</span>
            </div>
            <div className="p-3 bg-navy-950/50 rounded-sm border border-navy-800/80">
              <span className="text-gold-400 font-semibold block mb-1">Cross-Border Scope</span>
              <span>Arbitration &amp; Award Enforcement</span>
            </div>
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

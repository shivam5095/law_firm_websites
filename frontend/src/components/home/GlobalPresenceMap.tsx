'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { officeHubs } from '@/data/offices';

export function GlobalPresenceMap() {
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-navy-800 bg-navy-950 py-12 text-white md:py-16">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Map Container Card */}
        <div className="rounded-sm border border-navy-700/80 bg-navy-900/90 p-3 shadow-2xl md:p-6">
          {/* Map Controls Top Bar */}
          <div className="mb-4 flex justify-end gap-3">
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

          {/* Interactive Graphic Frame */}
          <div className="group relative aspect-[16/9] max-h-[620px] w-full overflow-hidden rounded-sm border border-navy-800 bg-navy-950">
            <Image
              src={
                activeTheme === 'dark'
                  ? '/images/map/world-map-dark.jpg'
                  : '/images/map/world-map-light.jpg'
              }
              alt="World map showing the firm's office locations"
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
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto w-full text-white">
            <div className="flex items-center gap-3">
              <Globe className="text-gold-400" size={20} />
              <span className="font-heading font-bold text-lg">
                High-Resolution World Map
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

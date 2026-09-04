'use client';

import Link from 'next/link';
import Image from 'next/image';
import { practiceAreas } from '@/data/practiceAreas';
import { ArrowRight, Shield, Scale } from 'lucide-react';

export function PracticeAreasSection() {
  return (
    <section className="bg-ivory-50 py-24 md:py-32 border-b border-charcoal-100">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-600 uppercase tracking-widest text-xs font-semibold mb-3">
              <Scale size={16} />
              <span>Core Practice Disciplines</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy-950 font-bold tracking-wide">
              Areas of Practice &amp; Case Strategy
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mt-4"></div>
          </div>
          <p className="text-charcoal-600 text-sm md:text-base max-w-md leading-relaxed">
            Every practice area is backed by hands-on litigation methodology, proactive risk mitigation, 
            forensic evidentiary audits, and decisive courtroom advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {practiceAreas.map((area) => (
            <div
              key={area.id}
              className="group flex flex-col h-full bg-white border border-charcoal-200/80 shadow-xs hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-navy-950">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-ivory-100">
                  <span className="bg-navy-950/90 text-gold-400 border border-gold-500/40 text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-xs backdrop-blur-xs">
                    {area.services.length} Practice Verticals
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="font-heading text-xl md:text-2xl text-navy-950 font-bold mb-3 group-hover:text-gold-700 transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-charcoal-600 text-xs md:text-sm leading-relaxed mb-5">
                  {area.shortDescription}
                </p>

                {/* Case Handling Highlight */}
                <div className="p-3.5 bg-ivory-100/70 border-l-2 border-gold-500 text-xs text-charcoal-700 mb-6 mt-auto">
                  <span className="font-semibold text-navy-900 block mb-1">
                    How We Handle Cases:
                  </span>
                  <p className="line-clamp-2 text-charcoal-600">
                    {area.approach}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="inline-flex items-center text-xs font-bold tracking-wider uppercase text-navy-900 hover:text-gold-600 transition-colors gap-2"
                  >
                    <span>Read Case Methodology</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

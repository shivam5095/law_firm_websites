'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, GraduationCap, Building2, BookOpen, ChevronRight } from 'lucide-react';
import { firm } from '@/data/firm';

const PEDIGREE = [
  {
    institution: 'NALSAR University of Law, Hyderabad',
    qualification: 'Advanced Diploma in Alternative Dispute Resolution (ADR)',
    code: 'ACAD-01',
  },
  {
    institution: 'Leiden University, Netherlands',
    qualification: 'International Commercial Arbitration Studies',
    code: 'ACAD-02',
  },
  {
    institution: 'Chandigarh University',
    qualification: 'B.B.A. LL.B. (Corporate Law Hons.) • 8.43/10 CGPA',
    code: 'ACAD-03',
  },
  {
    institution: 'Baker McKenzie (Chicago, USA)',
    qualification: 'International Litigation & Cross-Border Demand Research',
    code: 'TRAIN-01',
  },
];

export function FirmIntroduction() {
  return (
    <section className="bg-[#FAF8F5] py-24 md:py-32 border-b border-charcoal-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Chamber Credentials Seal (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-xs overflow-hidden shadow-2xl border border-charcoal-200 bg-navy-950">
              <Image
                src="/images/team/anand-kumar-maurya.jpg"
                alt="Anand Kumar Maurya — Advocate & Principal Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={90}
                className="object-cover object-top filter grayscale contrast-115 transition-transform duration-700 hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
              
              {/* Monogram Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#08101E]/90 backdrop-blur-md border border-gold-500/30 text-white rounded-xs">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 block font-semibold mb-1">
                  COUNSEL OF RECORD
                </span>
                <h3 className="font-heading text-xl text-ivory-50 font-medium">
                  Anand Kumar Maurya
                </h3>
                <p className="text-xs text-ivory-300/80 font-sans mt-0.5">
                  Legal Consultant • Banking, Debt Restructuring &amp; Commercial Arbitration
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gold-400">
                  <span>DELHI NCR • HIGH COURTS</span>
                  <span>EST. CHAMBERS</span>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="hidden sm:block absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold-500 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Narrative & Institutional Pedigree (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-gold-600 font-mono text-[11px] uppercase tracking-widest font-semibold mb-4">
              <span>Chambers Doctrine &amp; Pedigree</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-normal leading-tight tracking-tight mb-6">
              Restrained, factual precision in high-stakes corporate disputes.
            </h2>

            <div className="w-16 h-0.5 bg-gold-500 mb-8" />

            <div className="prose prose-slate text-charcoal-700 text-sm md:text-base leading-relaxed space-y-4 mb-10 max-w-none">
              <p>
                The Chambers of Anand Kumar Maurya operates with an acute recognition of commercial reality: 
                litigation and credit distress are not abstract legal puzzles, but high-impact balance sheet events. 
                Our counsel bridges rigorous statutory drafting with decisive forum strategy across the Delhi High Court, 
                the Debt Recovery Tribunals (DRT), the National Company Law Appellate Tribunal (NCLAT), and institutional arbitration chambers.
              </p>
              <p>
                Having represented creditors and corporate debtors across matters against top scheduled banks—including 
                SBI, HDFC Bank, Axis Bank, American Express, and Standard Chartered—we prioritize early factual audits to dismantle 
                procedural bottlenecks before irreversible default positions are triggered.
              </p>
            </div>

            {/* Institutional Credentials Grid */}
            <div className="border-t border-charcoal-200/80 pt-8 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal-500 font-bold block mb-4">
                ACADEMIC ACCREDITATIONS &amp; GLOBAL TRAINING
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PEDIGREE.map((item, i) => (
                  <div 
                    key={i}
                    className="p-4 bg-white border border-charcoal-200/70 rounded-xs shadow-xs hover:border-gold-400 transition-colors"
                  >
                    <span className="font-mono text-[9px] text-gold-600 uppercase tracking-widest font-bold block mb-1">
                      {item.code}
                    </span>
                    <h4 className="font-heading text-sm text-navy-950 font-bold line-clamp-1 mb-0.5">
                      {item.institution}
                    </h4>
                    <p className="text-xs text-charcoal-600 line-clamp-2">
                      {item.qualification}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to Full Profile */}
            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-navy-950 hover:bg-navy-900 text-ivory-50 font-mono text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors group"
              >
                <span>Read Full Chambers Profile</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-gold-400" />
              </Link>

              <Link
                href="/team/anand-kumar-maurya"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-700 hover:text-gold-600 font-semibold tracking-wider uppercase transition-colors"
              >
                <span>Curriculum Vitae</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

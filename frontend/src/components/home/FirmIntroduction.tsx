'use client';

import Image from 'next/image';

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
                <h3 className="font-heading text-xl text-ivory-50 font-medium">
                  Anand Kumar Maurya
                </h3>
                <p className="text-xs text-ivory-300/80 font-sans mt-0.5">
                  Founder and Managing Partner of Maurya &amp; Co
                </p>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="hidden sm:block absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold-500 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Narrative (7 Cols) */}
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-normal leading-tight tracking-tight mb-6">
              Restrained, factual precision in high-stakes corporate disputes.
            </h2>

            <div className="w-16 h-0.5 bg-gold-500 mb-8" />

            <div className="prose prose-slate text-charcoal-700 text-sm md:text-base leading-relaxed space-y-4 max-w-none">
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

          </div>

        </div>

      </div>
    </section>
  );
}

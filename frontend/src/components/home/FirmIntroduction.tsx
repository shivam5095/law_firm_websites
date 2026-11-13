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
              The best disputes are the ones that never begin.
            </h2>

            <div className="w-16 h-0.5 bg-gold-500 mb-8" />

            <div className="prose prose-slate text-charcoal-700 text-sm md:text-base leading-relaxed space-y-4 max-w-none">
              <p>
                Most legal problems are decided long before they reach a courtroom. They are decided in the clause that was never negotiated, the advice that came too late, the risk nobody priced in. That earlier point is where we do our best work. We study the business behind the matter, the numbers behind the business and the people behind the numbers, so that our advice protects not only what a client owns today but everything they are building for tomorrow.
              </p>
              <p>
                When a dispute cannot be avoided, we meet it with the same discipline. Our practice brings banking and finance, restructuring and insolvency, arbitration, regulatory law and cross-border work under one roof. No client has to choose between a lawyer who understands the law and one who understands the money. We begin with the outcome the client needs, and the forum, the timing and the tone follow from it. A family protecting a single home and a group structuring a portfolio worth hundreds of crores receive exactly the same seriousness.
              </p>
            </div>

            <blockquote className="mt-8 border-t border-gold-500/60 pt-5">
              <p className="font-heading text-[clamp(1.5rem,2.1vw,2.25rem)] italic leading-[1.35] text-navy-950">
                “Early advice almost always costs less than a late defence.”
              </p>
              <footer className="mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-gold-600">
                Anand Kumar Maurya, Founder
              </footer>
            </blockquote>

          </div>

        </div>

      </div>
    </section>
  );
}

import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import Link from 'next/link';
import Image from 'next/image';
import { practiceAreas } from '@/data/practiceAreas';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle2, Scale, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Practice Areas & Case Handling Methodology | Maurya Law Chambers',
  description: 'Explore our specialized legal practice disciplines across Banking & Finance, Debt Restructuring, Commercial Arbitration, and Insolvency, complete with our strategic case-handling methodology.',
};

export default function PracticeAreasPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-24">
      <PageHero 
        title="Areas of Practice" 
        description="Comprehensive legal counsel and focused dispute resolution across high-stakes financial, corporate, and infrastructure matters." 
      />

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          {practiceAreas.map((area, index) => {
            // @ts-ignore - Dynamic icon rendering
            const Icon = LucideIcons[area.icon] || LucideIcons.Scale;
            
            return (
              <div 
                key={area.slug} 
                className="bg-white border border-charcoal-200/80 rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Practice Area Image Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-navy-950">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/40" />
                  
                  {/* Badge & Icon on Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-navy-950/90 text-gold-400 border border-gold-500/40 px-3 py-1.5 rounded-xs backdrop-blur-xs text-xs font-semibold uppercase tracking-wider">
                    <Icon size={16} />
                    <span>Practice Discipline 0{index + 1}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                    <span className="text-gold-400 font-semibold block mb-0.5">Primary Forums:</span>
                    <span className="text-ivory-200 text-[11px]">Commercial Courts, High Courts, NCLT, DRT &amp; Arbitral Tribunals</span>
                  </div>
                </div>

                {/* Practice Content Column */}
                <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-navy-950 mb-3 hover:text-gold-700 transition-colors">
                      <Link href={`/practice-areas/${area.slug}`}>
                        {area.title}
                      </Link>
                    </h2>
                    
                    <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
                      {area.description}
                    </p>

                    {/* How I Handle Cases in this Area */}
                    <div className="p-5 bg-ivory-100/70 border-l-4 border-gold-500 rounded-xs mb-6">
                      <h3 className="font-heading text-sm font-bold text-navy-950 mb-1.5 flex items-center gap-2">
                        <Scale size={16} className="text-gold-600 shrink-0" />
                        <span>How I Handle Cases In This Area:</span>
                      </h3>
                      <p className="text-xs text-charcoal-700 leading-relaxed">
                        {area.approach}
                      </p>
                    </div>

                    {/* Key Services & Strategic Focus */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-2.5">
                        Core Services &amp; Representation Scope:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {area.services.slice(0, 4).map((service, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-charcoal-700">
                            <span className="text-gold-600 mt-0.5">•</span>
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-charcoal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-charcoal-500 font-medium">
                      <span>Representative scale: </span>
                      <strong className="text-navy-900 font-semibold">₹10 Lakh to ₹130+ Crore</strong>
                    </div>

                    <Link 
                      href={`/practice-areas/${area.slug}`}
                      className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 border border-gold-500/50 hover:bg-gold-500 hover:text-navy-950 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xs transition-all shadow-xs"
                    >
                      <span>Explore Full Strategy &amp; Casework</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

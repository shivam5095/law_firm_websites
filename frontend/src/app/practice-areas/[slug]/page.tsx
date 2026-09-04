import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { practiceAreas } from '@/data/practiceAreas';
import { experienceItems } from '@/data/experience';
import * as LucideIcons from 'lucide-react';
import { Shield, CheckCircle2, ArrowRight, Scale, Briefcase, FileCheck } from 'lucide-react';

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas.find((p) => p.slug === slug);
  
  if (!area) {
    return { title: 'Practice Area Not Found' };
  }
  
  return {
    title: `${area.title} — Strategy & Case Handling | Maurya Law Chambers`,
    description: area.shortDescription,
  };
}

export default async function PracticeAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = practiceAreas.find((p) => p.slug === slug);
  
  if (!area) {
    notFound();
  }

  // @ts-ignore
  const Icon = LucideIcons[area.icon] || LucideIcons.Scale;
  
  const relatedExperience = experienceItems.filter(item => 
    item.practiceAreas.includes(area.slug)
  );

  return (
    <main className="min-h-screen bg-ivory-50 pb-24">
      {/* Top Banner with Background Image */}
      <div className="bg-navy-950 text-white pt-24 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={area.image}
            alt={area.title}
            fill
            priority
            className="object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs text-gold-400 mb-4 uppercase tracking-widest font-semibold">
            <Link href="/practice-areas" className="hover:text-white transition-colors">Practice Areas</Link>
            <span>/</span>
            <span className="text-ivory-200">{area.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-navy-900/90 border border-gold-500/40 text-gold-400 px-3 py-1 rounded-xs text-xs font-semibold uppercase tracking-wider mb-4">
                <Icon size={16} />
                <span>Specialized Legal Practice</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-ivory-100">
                {area.title}
              </h1>
              <p className="text-ivory-200 text-base md:text-lg leading-relaxed">
                {area.shortDescription}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/consultation"
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3.5 text-xs uppercase tracking-wider rounded-xs transition-all shadow-lg inline-flex items-center gap-2"
              >
                <span>Consult on this Area</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-16">
          {/* Practice Image Showcase */}
          <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden border border-charcoal-200 shadow-md bg-navy-950">
            <Image
              src={area.image}
              alt={area.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-ivory-200">
              <span className="font-semibold text-gold-400">{area.title} Practice Portfolio</span>
              <span className="bg-navy-950/80 px-2.5 py-1 rounded-xs border border-navy-800">High-Stakes Dispute Resolution</span>
            </div>
          </div>

          {/* Section 1: Overview */}
          <section>
            <div className="flex items-center gap-2 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase size={15} />
              <span>Practice Overview</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-navy-950 mb-4">
              Strategic Practice Overview
            </h2>
            <div className="w-12 h-0.5 bg-gold-500 mb-6" />
            <div className="prose prose-lg text-charcoal-700 max-w-none leading-relaxed text-base">
              <p className="whitespace-pre-wrap">{area.description}</p>
            </div>
          </section>

          {/* Section 2: Detailed "How I Handle Cases In This Area" */}
          <section className="p-8 md:p-10 bg-white border border-gold-500/40 rounded-sm shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-500"></div>
            
            <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-widest mb-2">
              <Scale size={18} className="text-gold-600" />
              <span>Practitioner Case Handling Protocol</span>
            </div>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-950 mb-4">
              How I Handle Cases in {area.title}
            </h2>
            <div className="w-12 h-0.5 bg-gold-500 mb-6" />

            <div className="text-charcoal-800 text-sm md:text-base leading-relaxed space-y-4 mb-10">
              {area.caseHandlingStrategy.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 5-Step Procedural Methodology Roadmap */}
            <div className="mt-8 pt-8 border-t border-charcoal-200">
              <h3 className="font-heading text-lg font-bold text-navy-950 mb-6 flex items-center gap-2">
                <FileCheck size={18} className="text-gold-600" />
                <span>Procedural Case-Handling Roadmap</span>
              </h3>

              <div className="space-y-4">
                {area.handlingMethodology.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-ivory-50 border border-charcoal-200/80 rounded-sm flex items-start gap-4 hover:border-gold-400 transition-colors"
                  >
                    <span className="font-heading font-bold text-xl text-gold-600 shrink-0 mt-0.5">
                      {item.stepNumber}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-base text-navy-950 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-charcoal-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Tactics Box */}
            {area.strategicTactics && area.strategicTactics.length > 0 && (
              <div className="mt-8 p-5 bg-navy-950 text-white rounded-sm border border-navy-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3 flex items-center gap-2">
                  <Shield size={14} />
                  <span>Key Litigation &amp; Tactical Safeguards</span>
                </h4>
                <ul className="space-y-2">
                  {area.strategicTactics.map((tactic, tIdx) => (
                    <li key={tIdx} className="text-xs text-ivory-200 flex items-start gap-2">
                      <span className="text-gold-400 font-bold">•</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Section 3: Key Matters */}
          <section>
            <h2 className="font-heading text-3xl font-bold text-navy-950 mb-4">
              Representative Casework &amp; Involvements
            </h2>
            <div className="w-12 h-0.5 bg-gold-500 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.keyMatters.map((matter, idx) => (
                <div key={idx} className="p-5 bg-white border border-charcoal-200 rounded-sm shadow-xs flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-500 mt-2 shrink-0"></span>
                  <p className="text-xs md:text-sm text-charcoal-800 leading-relaxed">
                    {matter}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Relevant Experience Track Record */}
          {relatedExperience.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl font-bold text-navy-950 mb-4">
                Track Record &amp; Financial Claims Scale
              </h2>
              <div className="w-12 h-0.5 bg-gold-500 mb-6" />
              <div className="space-y-4">
                {relatedExperience.map((exp, idx) => (
                  <div key={idx} className="p-5 bg-white border border-charcoal-200 rounded-sm shadow-xs">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">{exp.category}</span>
                      {exp.scale && (
                        <span className="text-xs font-semibold text-gold-700 bg-gold-50 px-2.5 py-1 rounded-xs border border-gold-200">
                          Scale: {exp.scale}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-charcoal-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: FAQs */}
          {area.faqs && area.faqs.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl font-bold text-navy-950 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-0.5 bg-gold-500 mb-6" />
              <div className="space-y-3">
                {area.faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white border border-charcoal-200 p-5 rounded-sm shadow-xs [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer font-heading font-semibold text-navy-950 text-base">
                      {faq.question}
                      <span className="ml-4 flex-shrink-0 text-gold-600 group-open:rotate-180 transition-transform">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-xs md:text-sm text-charcoal-600 leading-relaxed border-t border-charcoal-100 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Key Services Box */}
          <div className="bg-navy-950 text-white p-7 rounded-sm border border-navy-800 sticky top-24 shadow-xl">
            <h3 className="font-heading text-xl font-bold mb-4 text-ivory-100 pb-3 border-b border-navy-800">
              Key Practice Verticals
            </h3>
            <ul className="space-y-3 mb-8">
              {area.services.map((service, idx) => (
                <li key={idx} className="flex items-start text-xs md:text-sm text-ivory-200">
                  <span className="text-gold-400 mr-2.5 mt-0.5 font-bold">✦</span>
                  <span className="leading-relaxed">{service}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-navy-800 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
                Initiate Matter Review
              </h4>
              <p className="text-xs text-ivory-300 mb-5 leading-relaxed">
                Schedule an in-depth preliminary case audit to discuss specific facts, forum options, and strategic timeline.
              </p>
              <Link 
                href="/consultation"
                className="block w-full text-center bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-5 py-3 text-xs uppercase tracking-wider rounded-xs transition-colors shadow-md"
              >
                Request Confidential Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

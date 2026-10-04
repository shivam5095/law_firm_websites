import { Metadata } from 'next';
import { CareerForm } from '@/components/forms/CareerForm';
import { firm } from '@/data/firm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Careers & Legal Internships | ${firm.name}`,
  description: `Explore internship and career opportunities with ${firm.name}. Law students and young legal professionals may submit their applications for consideration.`,
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-24">
      <section className="relative isolate flex min-h-[40svh] items-end overflow-hidden bg-navy-950 lg:min-h-[50vh]">
        <Image
          src="/images/hero/careers/indian-legal-interns.jpg"
          alt="Law students working together on legal research"
          fill
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/25" />
        <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:pb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-400">Careers at {firm.name}</p>
          <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-ivory-100 md:text-5xl">Build Your Legal Career With Us</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory-200 md:text-lg">We welcome motivated law students and young legal professionals interested in practical exposure to commercial legal work.</p>
        </div>
      </section>

      {/* Grid Introduction with Photo */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold block">
              Internship Opportunities
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 leading-tight">
              A Structured Exposure to Commercial Practice
            </h2>
            <div className="w-12 h-0.5 bg-gold-500"></div>

            <p className="text-charcoal-700 leading-relaxed text-base md:text-lg">
              Our internship programme is designed to offer law students and recent graduates hands-on experience in research, drafting, and case preparation. Interns work closely with senior advocates on live client matters across our focus practice areas.
            </p>

            <div className="space-y-3 text-sm text-charcoal-600 pt-2">
              <p className="flex items-start">
                <span className="text-gold-600 mr-3 font-bold">✓</span>
                <span>Active mentoring and guidance from experienced legal practitioners.</span>
              </p>
              <p className="flex items-start">
                <span className="text-gold-600 mr-3 font-bold">✓</span>
                <span>In-depth research on arbitration, insolvencies, infrastructure and banking regulations.</span>
              </p>
              <p className="flex items-start">
                <span className="text-gold-600 mr-3 font-bold">✓</span>
                <span>Exposure to drafting pleadings, petitions, legal opinions and contracts.</span>
              </p>
            </div>

            <p className="text-xs text-charcoal-500 italic pt-4">
              * Applications are reviewed based on the firm's requirements and the applicant's profile. Submission of an application does not guarantee an internship slot.
            </p>
          </div>

          <div className="lg:col-span-5 relative aspect-[3/2] lg:aspect-[4/5] overflow-hidden border border-charcoal-100 shadow-sm bg-charcoal-100">
            <Image
              src="/images/hero/careers/indian-legal-interns.jpg"
              alt="Indian law interns working in our library"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/5" />
          </div>
        </div>

        {/* Form Container */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl text-navy-900 mb-4">
              Submit Application
            </h2>
            <p className="text-charcoal-600 text-sm">
              Share a brief introduction and attach your resume. Our team will contact you if there is a suitable opportunity.
            </p>
          </div>

          <CareerForm />
        </div>
      </section>
    </main>
  );
}

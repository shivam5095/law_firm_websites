import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
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
      <PageHero
        title="Build Your Legal Career With Us"
        description="We welcome applications from motivated law students and young legal professionals interested in gaining practical exposure to legal research, arbitration, banking and finance, commercial disputes and related areas of practice."
      />

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
              src="/images/careers/indian-legal-interns.jpg"
              alt="Indian law interns working in our library"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
              className="object-cover"
              quality={80}
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
              Please fill out the form below accurately and upload your documents. All fields marked with * are mandatory.
            </p>
          </div>

          <CareerForm />
        </div>
      </section>
    </main>
  );
}

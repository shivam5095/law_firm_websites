import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { lawyers } from '@/data/lawyers';
import { publications } from '@/data/publications';
import { practiceAreas } from '@/data/practiceAreas';

export async function generateStaticParams() {
  return lawyers.map((lawyer) => ({
    slug: lawyer.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lawyer = lawyers.find((l) => l.slug === slug);

  if (!lawyer) {
    return { title: 'Advocate Not Found' };
  }

  return {
    title: `${lawyer.name}, ${lawyer.designation}`,
    description: lawyer.shortBio,
  };
}

export default async function LawyerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lawyer = lawyers.find((l) => l.slug === slug);

  if (!lawyer) {
    notFound();
  }

  const lawyerPracticeAreas = practiceAreas.filter(pa =>
    lawyer.practiceAreaSlugs.includes(pa.slug)
  );

  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      {/* Profile Hero */}
      <section className="bg-navy-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-end">
          <div className="w-full md:w-1/3 max-w-sm relative aspect-[3/4] bg-navy-800 shrink-0 border-4 border-white/10 shadow-xl">
            {lawyer.image ? (
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gold-500 font-heading text-8xl opacity-20">
                {lawyer.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3 pb-8">
            <div className="flex items-center gap-2 text-sm text-ivory-300 mb-4 uppercase tracking-wider">
              <Link href="/team" className="hover:text-white transition-colors">Our Team</Link>
              <span>/</span>
              <span className="text-gold-400">{lawyer.name}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              {lawyer.name}
            </h1>
            <p className="text-gold-400 text-xl tracking-wide uppercase font-semibold mb-6">
              {lawyer.designation}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-ivory-200">
              <a href={`mailto:${lawyer.email}`} className="flex items-center hover:text-white transition-colors">
                <span className="mr-2">✉</span> {lawyer.email}
              </a>
              {lawyer.phone && (
                <a href={`tel:${lawyer.phone}`} className="flex items-center hover:text-white transition-colors">
                  <span className="mr-2">☎</span> {lawyer.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Biography */}
          <section>
            <h2 className="font-heading text-3xl text-navy-900 mb-6">Biography</h2>
            <div className="w-8 h-[2px] bg-gold-500 mb-6" />
            <div className="prose prose-lg text-charcoal-700 max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">{lawyer.fullBio}</p>
            </div>
          </section>

          {/* Education */}
          {lawyer.education && lawyer.education.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Education</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <div className="space-y-6">
                {lawyer.education.map((edu, idx: number) => (
                  <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gold-500 before:rounded-full after:absolute after:left-[3px] after:top-4 after:bottom-[-24px] after:w-[2px] after:bg-charcoal-100 last:after:hidden">
                    <h3 className="font-semibold text-navy-900 text-lg">{edu.degree}</h3>
                    <p className="text-charcoal-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                    <p className="text-sm text-charcoal-500">{edu.period}</p>
                    {edu.details && <p className="text-sm text-gold-600 mt-1 italic">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Professional Experience */}
          {lawyer.experience && lawyer.experience.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Professional Experience</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <div className="space-y-8">
                {lawyer.experience.map((exp, idx: number) => (
                  <div key={idx} className="bg-white p-6 border border-charcoal-100 shadow-sm">
                    <h3 className="font-semibold text-navy-900 text-lg">{exp.role}</h3>
                    <p className="text-charcoal-500 text-sm mb-3">{exp.organization}, {exp.location} | {exp.period}</p>
                    {exp.description && <p className="text-charcoal-700 mb-3">{exp.description}</p>}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-charcoal-600 text-sm space-y-1">
                        {exp.highlights.map((h: string, i: number) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prior Professional Exposure */}
          {lawyer.priorExposure && lawyer.priorExposure.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Prior Professional Exposure</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <div className="space-y-4">
                {lawyer.priorExposure.map((exp, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 py-4 border-b border-charcoal-100 last:border-0">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 shrink-0" />
                    <div>
                      <h3 className="font-medium text-navy-900">{exp.organization}</h3>
                      <p className="text-sm text-charcoal-500">{exp.location} · {exp.period}</p>
                      {exp.description && <p className="text-sm text-charcoal-600 mt-1">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Academic & Institutional Engagement */}
          {lawyer.academicEngagement && lawyer.academicEngagement.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Academic & Institutional Engagement</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <div className="space-y-6">
                {lawyer.academicEngagement.map((engagement, idx: number) => (
                  <div key={idx} className="bg-white p-6 border border-charcoal-100">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-navy-900">{engagement.role}</h3>
                      <span className="text-sm text-charcoal-500 shrink-0 ml-4">{engagement.period}</span>
                    </div>
                    <p className="text-sm text-gold-600 font-medium mb-2">{engagement.organization}</p>
                    <p className="text-charcoal-600 text-sm">{engagement.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recognition */}
          {lawyer.recognition && lawyer.recognition.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Recognition & Academic Distinctions</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <ul className="space-y-4">
                {lawyer.recognition.map((item, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gold-500 mr-3 mt-1">✦</span>
                    <div>
                      <p className="font-medium text-navy-900">{item.title}</p>
                      <p className="text-sm text-charcoal-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Moot Courts */}
          {lawyer.mootCourts && lawyer.mootCourts.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Moot Court Experience</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <ul className="space-y-4">
                {lawyer.mootCourts.map((moot, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gold-500 mr-3 mt-1">✦</span>
                    <div>
                      <p className="font-medium text-navy-900">{moot.name}</p>
                      <p className="text-sm text-charcoal-500">{moot.institution}, {moot.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <section>
              <h2 className="font-heading text-3xl text-navy-900 mb-6">Publications</h2>
              <div className="w-8 h-[2px] bg-gold-500 mb-6" />
              <div className="space-y-4">
                {publications.map((pub, idx: number) => (
                  <Link href={`/insights/${pub.slug}`} key={idx} className="block group">
                    <div className="border border-charcoal-100 p-5 hover:border-gold-300 transition-colors bg-white">
                      <p className="text-xs text-charcoal-500 mb-2">
                        {pub.publication} · {pub.date}
                        {pub.coAuthor && <span> · Co-authored with {pub.coAuthor}</span>}
                      </p>
                      <h3 className="font-medium text-navy-800 group-hover:text-gold-600 transition-colors">
                        {pub.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/publications" className="text-sm font-medium text-navy-600 uppercase tracking-wider hover:text-gold-600 transition-colors">
                  View All Publications →
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 border border-charcoal-100 shadow-sm sticky top-24">
            <h3 className="font-heading text-2xl text-navy-900 mb-6">Areas of Practice</h3>
            <ul className="space-y-3 mb-8">
              {lawyerPracticeAreas.map((area, idx: number) => (
                <li key={idx} className="pb-3 border-b border-charcoal-100 last:border-0 last:pb-0">
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-sm text-charcoal-700 hover:text-gold-600 transition-colors"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-charcoal-200">
              <Link
                href="/consultation"
                className="block w-full text-center bg-navy-900 hover:bg-navy-800 text-white font-medium px-6 py-3 transition-colors"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

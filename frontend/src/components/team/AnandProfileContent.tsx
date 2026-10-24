import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import profile from '@/data/anand-profile-content.json';

const sectionLinks = [
  ['profile', 'Profile'],
  ['practice-areas', 'Areas of Practice'],
  ['mandates', 'Representative Mandates'],
  ['current-practice', 'Current Practice'],
  ['regulatory', 'Regulatory Expertise'],
  ['international', 'International Engagement'],
  ['experience', 'Prior Experience'],
  ['publications', 'Publications'],
  ['writing', 'Writing & Recognition'],
  ['education', 'Education'],
  ['jurisdictions', 'Jurisdictions & Languages'],
] as const;

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="scroll-mt-28 font-heading text-2xl text-navy-900 sm:text-3xl">
        {children}
      </h2>
      <div className="mt-4 h-0.5 w-12 bg-gold-500" />
    </div>
  );
}

function ExternalText({
  url,
  children,
  className = '',
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  if (!url.trim()) return <>{children}</>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-baseline gap-1 text-gold-700 underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ExternalLink aria-hidden="true" className="relative top-0.5 inline size-3.5 shrink-0" />
    </a>
  );
}

export function AnandProfileContent() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <header className="bg-navy-900 py-10 text-white sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14 lg:px-8">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem] overflow-hidden border-4 border-white/10 bg-navy-800 shadow-xl md:mx-0">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 767px) 15rem, 15rem"
              className="object-cover object-top"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-400">
              Attorney Profile
            </p>
            <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg font-semibold uppercase tracking-wide text-gold-400 sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory-200 sm:text-base">
              {profile.subtitle}
            </p>
            <p className="mt-5 border-l-2 border-gold-500 pl-4 font-mono text-xs leading-relaxed text-gold-200 sm:text-sm">
              {profile.focusLine}
            </p>
            <blockquote className="mt-6 max-w-3xl text-base leading-relaxed text-ivory-100 sm:text-lg">
              {profile.intro}
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ivory-200">
              <span className="font-semibold text-white">Offices</span>
              {profile.offices.map((office, index) => (
                <span key={office}>
                  {index > 0 && <span className="mr-3 text-gold-500">·</span>}
                  {office}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-16">
        <aside className="hidden lg:block">
          <nav aria-label="Jump to profile section" className="sticky top-24 border-l border-charcoal-200 pl-4">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-700">
              On this page
            </p>
            <ul className="space-y-3">
              {sectionLinks.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm leading-snug text-charcoal-600 transition-colors hover:text-gold-700"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 space-y-14 sm:space-y-16">
          <section aria-labelledby="profile">
            <SectionHeading id="profile">Profile</SectionHeading>
            <div className="space-y-5 text-base leading-8 text-charcoal-700">
              {profile.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-8 border-l-4 border-gold-500 bg-white px-5 py-4 font-heading text-lg italic leading-relaxed text-navy-900 shadow-sm sm:px-7 sm:text-xl">
              {profile.motto}
            </p>
          </section>

          <section aria-labelledby="practice-areas">
            <SectionHeading id="practice-areas">Areas of Practice</SectionHeading>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {profile.areasOfPractice.map((area, index) => (
                <li key={area} className="flex min-h-16 items-start gap-3 border border-charcoal-100 bg-white p-4 shadow-sm">
                  <span className="font-mono text-xs text-gold-700">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium leading-relaxed text-navy-900">{area}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="mandates">
            <SectionHeading id="mandates">Representative Mandates and Values</SectionHeading>
            <p className="mb-5 border border-gold-200 bg-white p-4 text-sm leading-relaxed text-charcoal-600">
              {profile.mandatesNote}
            </p>

            <div className="hidden overflow-x-auto border border-charcoal-200 bg-white lg:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead className="bg-navy-900 text-xs uppercase tracking-wider text-white">
                  <tr>
                    <th className="w-[19%] p-3 font-semibold">Mandate</th>
                    <th className="w-[13%] p-3 font-semibold">Engagement</th>
                    <th className="w-[38%] p-3 font-semibold">Description</th>
                    <th className="w-[17%] p-3 font-semibold">Institutions</th>
                    <th className="w-[13%] p-3 font-semibold">Value / scale</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.mandates.map((mandate) => (
                    <tr key={mandate.title} className="border-t border-charcoal-100 align-top even:bg-ivory-50/60">
                      <th scope="row" className="p-3 text-sm font-semibold leading-relaxed text-navy-900">{mandate.title}</th>
                      <td className="p-3 text-sm leading-relaxed text-charcoal-600">{mandate.firm}</td>
                      <td className="p-3 text-sm leading-relaxed text-charcoal-700">{mandate.description}</td>
                      <td className="p-3 text-sm leading-relaxed text-charcoal-600">{mandate.institutions}</td>
                      <td className="p-3 text-sm leading-relaxed text-charcoal-700">{mandate.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4 lg:hidden">
              {profile.mandates.map((mandate) => (
                <article key={mandate.title} className="border border-charcoal-200 bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-lg leading-snug text-navy-900">{mandate.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-gold-700">{mandate.firm}</p>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-700">{mandate.description}</p>
                  <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-charcoal-100 pt-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-navy-900">Institutions</dt>
                      <dd className="mt-1 leading-relaxed text-charcoal-600">{mandate.institutions}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-navy-900">Value / scale</dt>
                      <dd className="mt-1 leading-relaxed text-charcoal-600">{mandate.value}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="current-practice">
            <SectionHeading id="current-practice">Current Practice</SectionHeading>
            <div className="border border-charcoal-100 bg-white p-5 shadow-sm sm:p-7">
              <h3 className="font-heading text-xl text-navy-900">{profile.currentPractice.organisation}</h3>
              <p className="mt-2 text-sm font-semibold text-gold-700">
                {profile.currentPractice.role} · {profile.currentPractice.period}
              </p>
              <p className="mt-1 text-sm text-charcoal-500">{profile.currentPractice.location}</p>
              <p className="mt-5 leading-relaxed text-charcoal-700">{profile.currentPractice.summary}</p>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {profile.currentPractice.focus.map((item) => (
                  <li key={item.label} className="border-l-2 border-gold-400 bg-ivory-50 p-4">
                    <h4 className="font-semibold text-navy-900">{item.label}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="regulatory">
            <SectionHeading id="regulatory">Regulatory and Statutory Expertise</SectionHeading>
            <div className="divide-y divide-charcoal-100 border-y border-charcoal-100 bg-white">
              {profile.regulatoryExpertise.map((item) => (
                <article key={item.area} className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
                  <h3 className="font-semibold leading-relaxed text-navy-900">{item.area}</h3>
                  <p className="text-sm leading-relaxed text-charcoal-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="international">
            <SectionHeading id="international">International Engagement</SectionHeading>
            <article className="border border-charcoal-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="max-w-3xl font-heading text-xl leading-snug text-navy-900">
                  <ExternalText url={profile.internationalEngagement.url}>
                    {profile.internationalEngagement.title}
                  </ExternalText>
                </h3>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-gold-700">
                  {profile.internationalEngagement.date}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-charcoal-700">{profile.internationalEngagement.text}</p>
            </article>
          </section>

          <section aria-labelledby="experience">
            <SectionHeading id="experience">Prior Experience and Internships</SectionHeading>
            <article className="border-l-2 border-gold-500 bg-white p-5 shadow-sm sm:p-7">
              <h3 className="font-semibold leading-relaxed text-navy-900">{profile.priorExperience.organisation}</h3>
              <p className="mt-1 text-sm font-medium text-gold-700">{profile.priorExperience.role}</p>
              <p className="mt-1 text-sm text-charcoal-500">{profile.priorExperience.period}</p>
              <ul className="mt-5 space-y-3">
                {profile.priorExperience.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-charcoal-700">
                    <span aria-hidden="true" className="mt-1 text-gold-600">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
            <div className="mt-6 space-y-4">
              {profile.internships.map((internship) => (
                <article key={internship.organisation} className="border-b border-charcoal-200 py-4 last:border-0">
                  <h3 className="font-semibold text-navy-900">
                    <ExternalText url={internship.url}>{internship.organisation}</ExternalText>
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-charcoal-500">{internship.location}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{internship.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="publications">
            <SectionHeading id="publications">Publications</SectionHeading>
            <p className="mb-5 leading-relaxed text-charcoal-700">{profile.publicationsIntro}</p>
            <div className="hidden overflow-x-auto border border-charcoal-200 bg-white lg:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-navy-900 text-xs uppercase tracking-wider text-white">
                  <tr>
                    <th className="p-4 font-semibold">Title</th>
                    <th className="w-[34%] p-4 font-semibold">Publication</th>
                    <th className="w-[18%] p-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.publications.map((item) => (
                    <tr key={item.title} className="border-t border-charcoal-100 align-top even:bg-ivory-50/60">
                      <td className="p-4 text-sm leading-relaxed text-navy-900">
                        <ExternalText url={item.url}>{item.title}</ExternalText>
                      </td>
                      <td className="p-4 text-sm leading-relaxed text-charcoal-600">{item.publication}</td>
                      <td className="p-4 text-sm text-charcoal-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-3 lg:hidden">
              {profile.publications.map((item) => (
                <article key={item.title} className="border border-charcoal-100 bg-white p-4">
                  <h3 className="font-medium leading-relaxed text-navy-900">
                    <ExternalText url={item.url}>{item.title}</ExternalText>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.publication}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-gold-700">{item.date}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="writing">
            <SectionHeading id="writing">Writing, Teaching and Recognition</SectionHeading>
            <ul className="space-y-4">
              {profile.writingTeachingRecognition.map((item) => (
                <li key={item.text} className="flex items-start gap-3 border-b border-charcoal-100 pb-4 last:border-0">
                  <span aria-hidden="true" className="mt-1 text-gold-600">✦</span>
                  <p className="leading-relaxed text-charcoal-700">
                    <ExternalText url={item.url}>{item.text}</ExternalText>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="education">
            <SectionHeading id="education">Education and Qualifications</SectionHeading>
            <ul className="space-y-3">
              {profile.education.map((item) => (
                <li key={item.text} className="border-l-2 border-gold-400 bg-white p-4 leading-relaxed text-charcoal-700">
                  <ExternalText url={item.url}>{item.text}</ExternalText>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="jurisdictions">
            <SectionHeading id="jurisdictions">Jurisdictions and Languages</SectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profile.jurisdictionsAndLanguages.map((item) => (
                <article key={item.label} className="border border-charcoal-100 bg-white p-5">
                  <h3 className="font-heading text-lg text-navy-900">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

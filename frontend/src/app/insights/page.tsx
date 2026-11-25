import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { insights } from '@/data/insights';

const insight = insights[0];

export const metadata: Metadata = {
  title: 'Legal Insights & Publications | Premium Indian Law Firm',
  description: insight.summary,
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero
        title="Legal Insights"
        description="Perspectives on emerging legal trends, regulatory developments, and complex jurisprudence."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        <article className="w-full max-w-[760px]">
          <p className="mb-4 text-charcoal-500" style={{ fontSize: 'var(--text-small, var(--text-sm))' }}>
            By {insight.author}<span className="mx-2">·</span>{insight.date}
          </p>
          <h2 className="mb-5 font-heading font-medium leading-tight text-navy-900" style={{ fontSize: 'var(--text-h2, var(--text-2xl))' }}>
            {insight.title}
          </h2>
          <div className="mb-8 h-1 w-12 rounded-full bg-gold-500" aria-hidden="true" />
          <div className="space-y-5 text-charcoal-700" style={{ fontSize: 'var(--text-body, var(--text-base))', lineHeight: 1.75 }}>
            {insight.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </section>
    </main>
  );
}

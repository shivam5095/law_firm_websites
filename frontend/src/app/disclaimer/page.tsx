import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { DisclaimerCopy } from '@/components/common/DisclaimerCopy';

export const metadata: Metadata = {
  title: 'Disclaimer | Premium Indian Law Firm',
  description: 'Legal disclaimer conforming to the Bar Council of India rules.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Disclaimer" />

      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 border border-charcoal-200 shadow-sm prose prose-lg prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 max-w-none">
          <DisclaimerCopy />
        </div>
      </section>
    </main>
  );
}

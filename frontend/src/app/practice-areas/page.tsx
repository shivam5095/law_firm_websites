import type { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { PracticeAreasCatalogue } from '@/components/practice-areas/PracticeAreasCatalogue';

export const metadata: Metadata = {
  title: 'Practice Areas & Case Handling Methodology',
  description: 'Explore our legal practice areas across banking, debt restructuring, arbitration, infrastructure, commercial disputes, insolvency, capital markets, and financial regulation.',
};

export default function PracticeAreasPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-24">
      <PageHero
        title="Areas of Practice"
        description="Depth in every discipline. Judgement across all of them."
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory-200 md:text-lg md:text-justify">
          Our practice areas are defined by the problems clients bring to us, from a family protecting its home to a group restructuring its debt across several lenders. Real matters rarely stay within one area of law. A loan dispute may carry a regulatory question, a project delay may trigger a default under the financing, and a recovery may meet an insolvency deadline. That is why no matter here is handled in isolation. Whatever its size, every matter is led by the same counsel and held to the same standard of preparation.
        </p>
        <blockquote className="mt-6 max-w-2xl text-left font-heading text-[clamp(1.5rem,2.1vw,2.25rem)] italic leading-[1.35] text-ivory-100">
          {'\u201cEvery matter is different. The care we bring to it is not.\u201d'}
        </blockquote>
      </PageHero>
      <PracticeAreasCatalogue />
    </main>
  );
}

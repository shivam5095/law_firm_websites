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
        description="Comprehensive legal counsel and focused dispute resolution across high-stakes financial, corporate, and infrastructure matters."
      />
      <PracticeAreasCatalogue />
    </main>
  );
}

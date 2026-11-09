import { Hero } from '@/components/home/Hero';
import { FirmOverview } from '@/components/FirmOverview';
import { FirmIntroduction } from '@/components/home/FirmIntroduction';
import { PracticeAreasSlider } from '@/components/home/PracticeAreasSlider';
import { ClientsRepresentedSection } from '@/components/home/ClientsRepresentedSection';
import dynamic from 'next/dynamic';
import { PublicationsPreview } from '@/components/home/PublicationsPreview';
import { CareersCTA } from '@/components/home/CareersCTA';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';

const WorldMap = dynamic(() => import('@/components/home/WorldMap'));

export default function HomePage() {
  return (
    <main className="relative w-full">
      {/* 1. Architectural Editorial Hero with Live Ledger Stats */}
      <Hero />

      <FirmOverview surface="home" />

      {/* 2. Chambers Doctrine & Counsel Pedigree */}
      <FirmIntroduction />

      {/* 3. Flagship Slide-by-Slide Scroll-Driven Case Dossier Showcase */}
      <PracticeAreasSlider />

      {/* 5. Institutional Banking & NBFC Counterparty Register */}
      <ClientsRepresentedSection />

      <WorldMap />

      {/* 8. Scholarly Briefs & Legal Publications */}
      <PublicationsPreview />

      {/* 9. Dual Intake & Career CTAs */}
      <div className="lg:grid lg:grid-cols-2">
        <CareersCTA />
        <ConsultationCTA />
      </div>
    </main>
  );
}

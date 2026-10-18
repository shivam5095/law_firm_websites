import { Hero } from '@/components/home/Hero';
import { FirmIntroduction } from '@/components/home/FirmIntroduction';
import { ScrollDossierSlider } from '@/components/home/ScrollDossierSlider';
import { AnimeDossierTimeline } from '@/components/home/AnimeDossierTimeline';
import { ClientsRepresentedSection } from '@/components/home/ClientsRepresentedSection';
import { PracticeAreasSection } from '@/components/home/PracticeAreasSection';
import { GlobalPresenceMap } from '@/components/home/GlobalPresenceMap';
import { PublicationsPreview } from '@/components/home/PublicationsPreview';
import { CareersCTA } from '@/components/home/CareersCTA';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';

export default function HomePage() {
  return (
    <main className="relative w-full">
      {/* 1. Architectural Editorial Hero with Live Ledger Stats */}
      <Hero />

      {/* 2. Chambers Doctrine & Counsel Pedigree */}
      <FirmIntroduction />

      {/* 3. Flagship Slide-by-Slide Scroll-Driven Case Dossier Showcase */}
      <ScrollDossierSlider />

      {/* 4. Anime.js Timeline Trajectory Engine (Notice -> OTS -> Arbitration -> Award) */}
      <AnimeDossierTimeline />

      {/* 5. Institutional Banking & NBFC Counterparty Register */}
      <ClientsRepresentedSection />

      {/* 6. Comprehensive Practice Verticals Grid */}
      <PracticeAreasSection />

      {/* 7. Strategic Jurisdictions & High Court Footprint */}
      <GlobalPresenceMap />

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

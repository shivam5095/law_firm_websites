import { Hero } from '@/components/home/Hero';
import { FirmIntroduction } from '@/components/home/FirmIntroduction';
import { ClientsRepresentedSection } from '@/components/home/ClientsRepresentedSection';
import { PracticeAreasSection } from '@/components/home/PracticeAreasSection';
import { GlobalPresenceMap } from '@/components/home/GlobalPresenceMap';
import { PublicationsPreview } from '@/components/home/PublicationsPreview';
import { CareersCTA } from '@/components/home/CareersCTA';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FirmIntroduction />
      <ClientsRepresentedSection />
      <PracticeAreasSection />
      <GlobalPresenceMap />
      <PublicationsPreview />
      <div className="lg:grid lg:grid-cols-2">
        <CareersCTA />
        <ConsultationCTA />
      </div>
    </main>
  );
}

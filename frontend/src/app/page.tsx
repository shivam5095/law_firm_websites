import { Hero } from '@/components/home/Hero';
import { FirmIntroduction } from '@/components/home/FirmIntroduction';
import { ClientsRepresentedSection } from '@/components/home/ClientsRepresentedSection';
import { PracticeAreasSection } from '@/components/home/PracticeAreasSection';
import { GlobalPresenceMap } from '@/components/home/GlobalPresenceMap';
import { ExperiencePreview } from '@/components/home/ExperiencePreview';
import { ApproachSection } from '@/components/home/ApproachSection';
import { TeamPreview } from '@/components/home/TeamPreview';
import { PublicationsPreview } from '@/components/home/PublicationsPreview';
import { CareersCTA } from '@/components/home/CareersCTA';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';
import { ContactPreview } from '@/components/home/ContactPreview';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FirmIntroduction />
      <ClientsRepresentedSection />
      <PracticeAreasSection />
      <GlobalPresenceMap />
      <ExperiencePreview />
      <ApproachSection />
      <TeamPreview />
      <PublicationsPreview />
      <CareersCTA />
      <ConsultationCTA />
      <ContactPreview />
    </main>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { PublicationCard } from '@/components/publications/PublicationCard';
import { publications } from '@/data/publications';

export const metadata: Metadata = {
  title: 'Publications | Premium Indian Law Firm',
  description: 'Comprehensive list of legal publications, academic articles, and research papers authored by our team.',
};

export default function PublicationsPage() {
  const sortedPublications = [...publications].sort((a, b) => Date.parse(b.sortDate) - Date.parse(a.sortDate));

  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Publications" description="A complete academic and professional bibliography of works authored by our legal team." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPublications.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}
        </div>
      </section>
    </main>
  );
}

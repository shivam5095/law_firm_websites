import Link from 'next/link';
import { getLatestPublications } from '@/data/publications';
import { PublicationCard } from '@/components/publications/PublicationCard';

export function PublicationsPreview() {
  const recentPubs = getLatestPublications(3);

  return (
    <section className="bg-ivory-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-6 font-heading text-3xl text-navy-900 md:text-4xl">Legal Insights &amp; Publications</h2>
            <div className="h-0.5 w-12 bg-gold-500" />
          </div>
          <Link href="/publications" className="inline-flex items-center text-sm font-medium text-navy-800 transition-colors hover:text-gold-600">
            View All Publications <span className="ml-2">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPubs.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}
        </div>
      </div>
    </section>
  );
}

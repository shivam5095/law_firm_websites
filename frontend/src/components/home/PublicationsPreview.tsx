import Link from 'next/link';
import { publications } from '@/data/publications';
import { PublicationLink } from '@/components/publications/PublicationLink';

export function PublicationsPreview() {
  const recentPubs = publications.slice(0, 3);

  return (
    <section className="bg-ivory-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-6">Legal Insights & Publications</h2>
            <div className="w-12 h-0.5 bg-gold-500"></div>
          </div>
          <Link
            href="/publications"
            className="inline-flex items-center text-sm font-medium text-navy-800 hover:text-gold-600 transition-colors"
          >
            View All Publications <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPubs.map((pub, index) => (
            <article
              key={pub.id || index}
              className="group flex h-full flex-col border border-charcoal-100 bg-white p-8 transition-colors hover:border-gold-300"
            >
              <div className="text-sm text-charcoal-500 mb-4 flex items-center justify-between">
                <span className="font-medium text-gold-600">{pub.publication}</span>
                <span>{pub.date}</span>
              </div>
              <h3 className="font-heading text-xl text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                <PublicationLink publication={pub} className="focus:outline-none">
                  {pub.title}
                </PublicationLink>
              </h3>
              <p className="text-charcoal-600 line-clamp-3 mb-6 mt-auto">
                {pub.excerpt}
              </p>
              <PublicationLink
                publication={pub}
                className="mt-auto flex items-center text-sm font-medium text-navy-900 transition-colors group-hover:text-gold-600"
              >
                {pub.externalUrl ? `Read on ${pub.publication}` : 'Read Article'}
                {!pub.externalUrl && <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>}
              </PublicationLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

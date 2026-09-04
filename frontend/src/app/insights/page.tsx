import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import Link from 'next/link';
import { publications } from '@/data/publications';
import { lawyers } from '@/data/lawyers';

export const metadata: Metadata = {
  title: 'Legal Insights & Publications | Premium Indian Law Firm',
  description: 'Latest legal updates, academic articles, and professional insights from our team.',
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero 
        title="Legal Insights" 
        description="Perspectives on emerging legal trends, regulatory developments, and complex jurisprudence." 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 mb-12 border-b border-charcoal-200 pb-4">
          <button className="text-sm font-medium text-navy-900 border-b-2 border-gold-500 pb-2 px-1">All Publications</button>
          <button className="text-sm font-medium text-charcoal-500 hover:text-navy-900 pb-2 px-1 transition-colors">Corporate Law</button>
          <button className="text-sm font-medium text-charcoal-500 hover:text-navy-900 pb-2 px-1 transition-colors">Dispute Resolution</button>
          <button className="text-sm font-medium text-charcoal-500 hover:text-navy-900 pb-2 px-1 transition-colors">Intellectual Property</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub) => (
            <article key={pub.slug} className="bg-white border border-charcoal-100 shadow-sm flex flex-col h-full group hover:shadow-md transition-shadow">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">{pub.category}</span>
                  <span className="text-xs text-charcoal-400">{pub.date}</span>
                </div>
                
                <h2 className="font-heading text-xl text-navy-900 mb-4 group-hover:text-gold-600 transition-colors line-clamp-3">
                  <Link href={`/insights/${pub.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {pub.title}
                  </Link>
                </h2>
                
                <p className="text-sm text-charcoal-600 mb-6 flex-grow line-clamp-4">
                  {pub.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-charcoal-100 flex justify-between items-center">
                  <span className="text-xs text-charcoal-500 font-medium">By {lawyers[0].name}</span>
                  <span className="text-xs text-charcoal-400 italic">{pub.publication}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

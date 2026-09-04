import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { publications } from '@/data/publications';
import { lawyers } from '@/data/lawyers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Publications | Premium Indian Law Firm',
  description: 'Comprehensive list of legal publications, academic articles, and research papers authored by our team.',
};

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero 
        title="Publications" 
        description="A complete academic and professional bibliography of works authored by our legal team." 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-white border border-charcoal-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white text-sm uppercase tracking-wider font-medium">
                  <th className="p-6 font-semibold">Title</th>
                  <th className="p-6 font-semibold hidden md:table-cell">Publication</th>
                  <th className="p-6 font-semibold hidden sm:table-cell">Author</th>
                  <th className="p-6 font-semibold whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-200">
                {publications.map((pub, idx) => (
                  <tr key={idx} className="hover:bg-ivory-50 transition-colors group">
                    <td className="p-6">
                      <Link href={`/insights/${pub.slug}`} className="font-heading text-lg text-navy-800 group-hover:text-gold-600 transition-colors block mb-1">
                        {pub.title}
                      </Link>
                      <div className="md:hidden text-sm text-charcoal-500 italic mb-1">{pub.publication}</div>
                      <div className="sm:hidden text-sm text-charcoal-600">{lawyers[0].name}</div>
                      <span className="inline-block mt-2 text-xs bg-charcoal-100 text-charcoal-600 px-2 py-1 rounded-sm">
                        {pub.category}
                      </span>
                    </td>
                    <td className="p-6 text-charcoal-700 italic hidden md:table-cell align-top pt-7">
                      {pub.publication}
                    </td>
                    <td className="p-6 text-charcoal-800 hidden sm:table-cell align-top pt-7">
                      {lawyers[0].name}
                      {pub.coAuthor && <span className="block text-xs text-charcoal-500 mt-1">with {pub.coAuthor}</span>}
                    </td>
                    <td className="p-6 text-charcoal-600 whitespace-nowrap align-top pt-7">
                      {pub.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

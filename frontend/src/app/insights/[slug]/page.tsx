import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publications } from '@/data/publications';
import { lawyers } from '@/data/lawyers';

export async function generateStaticParams() {
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  
  if (!pub) {
    return { title: 'Publication Not Found' };
  }
  
  return {
    title: `${pub.title} | Insights | Premium Indian Law Firm`,
    description: pub.excerpt,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  
  if (!pub) {
    notFound();
  }

  const relatedPubs = publications.filter(p => p.slug !== slug && p.category === pub.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <article>
        {/* Article Header */}
        <header className="bg-navy-900 text-white pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-ivory-300 mb-6 uppercase tracking-wider">
              <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
              <span>/</span>
              <span className="text-gold-400">{pub.category}</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
              {pub.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ivory-200">
              <div className="flex items-center">
                <span className="text-gold-500 mr-2">By</span>
                <span className="font-medium text-white">{lawyers[0].name}</span>
              </div>
              <div className="w-1 h-1 bg-gold-500 rounded-full"></div>
              <span>Published in {pub.publication}</span>
              <div className="w-1 h-1 bg-gold-500 rounded-full"></div>
              <span>{pub.date}</span>
              {pub.coAuthor && (
                <>
                  <div className="w-1 h-1 bg-gold-500 rounded-full"></div>
                  <span>Co-authored with {pub.coAuthor}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="prose prose-lg prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 prose-p:leading-relaxed prose-a:text-navy-600 prose-a:no-underline hover:prose-a:text-gold-600 max-w-none">
            <p className="lead text-xl text-navy-800 font-medium mb-8 pb-8 border-b border-charcoal-200">
              {pub.excerpt}
            </p>
            
            <div className="bg-ivory-100 p-8 border-l-4 border-gold-500 my-12 italic text-charcoal-700">
              This insight is currently available as an abstract. The full text of this publication can be found in <strong>{pub.publication}</strong>, {pub.date}.
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-charcoal-200 flex justify-between items-center">
            <Link href="/insights" className="text-navy-600 font-medium hover:text-gold-600 transition-colors flex items-center">
              <span className="mr-2">←</span> Back to Insights
            </Link>
          </div>
        </div>
      </article>

      {/* Related Insights */}
      {relatedPubs.length > 0 && (
        <section className="py-20 bg-white border-t border-charcoal-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-3xl text-navy-900 mb-12 text-center">Related Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPubs.map((relatedPub) => (
                <div key={relatedPub.slug} className="group">
                  <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-2 block">{relatedPub.category}</span>
                  <h3 className="font-heading text-xl text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                    <Link href={`/insights/${relatedPub.slug}`}>
                      {relatedPub.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-charcoal-500">{relatedPub.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

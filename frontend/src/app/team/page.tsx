import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import Link from 'next/link';
import Image from 'next/image';
import { lawyers } from '@/data/lawyers';

export const metadata: Metadata = {
  title: 'Our Team | Premium Indian Law Firm',
  description: 'Meet our team of distinguished legal professionals.',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero 
        title="Our Team" 
        description="Distinguished practitioners committed to legal excellence and strategic advocacy." 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {lawyers.map((lawyer) => (
            <div key={lawyer.slug} className="group flex flex-col h-full bg-white border border-charcoal-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-charcoal-50">
                {lawyer.image ? (
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-900 text-gold-500 font-heading text-6xl opacity-10">
                    {lawyer.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="font-heading text-2xl text-navy-900 mb-1 group-hover:text-gold-600 transition-colors">
                  {lawyer.name}
                </h2>
                <p className="text-sm font-semibold uppercase tracking-wider text-charcoal-500 mb-4">
                  {lawyer.designation}
                </p>
                
                <p className="text-charcoal-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {lawyer.shortBio}
                </p>
                
                <Link 
                  href={`/team/${lawyer.slug}`}
                  className="mt-auto inline-flex items-center text-sm font-medium text-navy-600 uppercase tracking-wider group-hover:text-gold-600 transition-colors border-t border-charcoal-100 pt-4"
                >
                  View Full Profile <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

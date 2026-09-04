import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { faqs } from '@/data/faqs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Premium Indian Law Firm',
  description: 'Answers to common questions regarding our legal services, consultation process, and practice areas.',
};

export default function FAQPage() {
  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero 
        title="Frequently Asked Questions" 
        description="Information regarding our practice, consultation process, and general legal inquiries." 
      />

      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category}>
              <h2 className="font-heading text-3xl text-navy-900 mb-8 border-b border-charcoal-200 pb-4">
                {category}
              </h2>
              <div className="space-y-4">
                {categoryFaqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white border border-charcoal-200 p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden hover:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer font-medium text-navy-900 text-lg">
                      {faq.question}
                      <span className="ml-4 flex-shrink-0 text-gold-500 group-open:rotate-180 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-charcoal-100 text-charcoal-700 leading-relaxed pr-6 whitespace-pre-wrap">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-navy-900 text-center border-t-4 border-gold-500">
          <h3 className="font-heading text-2xl text-white mb-4">Have a different question?</h3>
          <p className="text-ivory-200 mb-8 max-w-xl mx-auto">
            If you need information specific to your legal matter, please reach out to schedule a consultation with our team.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium px-8 py-3 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}

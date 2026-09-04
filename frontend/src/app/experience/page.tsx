import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';
import { experienceItems } from '@/data/experience';

export const metadata: Metadata = {
  title: 'Selected Experience | Premium Indian Law Firm',
  description: 'A selection of our representative matters across various practice areas.',
};

export default function ExperiencePage() {
  // Group experience items by category
  const groupedExperience = experienceItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof experienceItems>);

  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero 
        title="Selected Experience" 
        description="A representative selection of complex matters and successful outcomes achieved for our clients." 
      />

      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="mb-12 bg-white p-6 border border-charcoal-200 text-charcoal-600 text-sm italic">
          Disclaimer: The descriptions below are illustrative of the types of matters handled by our firm and its members. To protect confidentiality, specific client identities and certain identifying details have been withheld.
        </div>

        <div className="space-y-16">
          {Object.entries(groupedExperience).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-heading text-3xl text-navy-900 mb-6 pb-4 border-b border-charcoal-200">
                {category}
              </h2>
              <div className="space-y-8">
                {items.map((item, idx) => (
                  <div key={idx} className="group pl-6 border-l-2 border-gold-300 hover:border-gold-500 transition-colors">
                    {item.scale && (
                      <span className="inline-block text-xs font-semibold text-navy-600 bg-navy-50 px-3 py-1 mb-3 rounded-sm uppercase tracking-wider">
                        {item.scale}
                      </span>
                    )}
                    <p className="text-charcoal-800 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.practiceAreas.map((pa, paIdx) => (
                        <span key={paIdx} className="text-xs text-charcoal-500 bg-white border border-charcoal-200 px-2 py-1">
                          {pa}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

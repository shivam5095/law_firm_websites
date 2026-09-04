import React from 'react';

interface PageHeroProps {
  title: string;
  description?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="bg-navy-900 text-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-4">
          {title}
        </h1>
        <div className="w-12 h-1 bg-gold-500 mb-6 rounded-full" />
        {description && (
          <p className="text-ivory-200 text-lg md:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

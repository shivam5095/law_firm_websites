import React from 'react';

interface PageHeroProps {
  title: string;
  description?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="flex min-h-[40svh] items-center bg-navy-900 text-white py-12 md:py-16 lg:min-h-[50vh] relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <h1 className="page-heading max-w-4xl font-medium text-ivory-100 mb-4">
          {title}
        </h1>
        <div className="w-12 h-1 bg-gold-500 mb-6 rounded-full" />
        {description && (
          <p className="text-ivory-200 text-base md:text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

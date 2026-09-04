import Link from 'next/link';

export function CareersCTA() {
  return (
    <section className="bg-navy-900 py-24 text-white relative overflow-hidden">
      {/* Decorative subtle texture/overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-4xl text-center">
        <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold mb-4 block">
          Join Our Chambers
        </span>
        
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 tracking-wide leading-tight">
          Interested in Building Your Legal Career?
        </h2>
        
        <p className="text-charcoal-200 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          We welcome applications from motivated law students and young legal professionals interested in gaining practical exposure to legal research, litigation, arbitration, and corporate practice.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/careers"
            className="inline-block bg-gold-600 hover:bg-gold-500 text-navy-950 font-semibold px-8 py-4 transition-all duration-300 tracking-wider text-sm uppercase shadow-sm"
          >
            Explore Careers
          </Link>
        </div>
      </div>
    </section>
  );
}

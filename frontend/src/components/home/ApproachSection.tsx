export function ApproachSection() {
  return (
    <section className="bg-ivory-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-6">Our Approach</h2>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative">
          <div className="md:pr-12 pb-8 md:pb-0">
            <div className="text-gold-500 text-sm font-semibold tracking-wider uppercase mb-4">01.</div>
            <h3 className="font-heading text-2xl text-navy-900 mb-4">Understanding</h3>
            <p className="text-charcoal-600 leading-relaxed">
              We begin by carefully understanding the legal, commercial and factual dimensions of each matter.
            </p>
          </div>
          
          <div className="md:px-12 py-8 md:py-0 md:border-l md:border-charcoal-200">
            <div className="text-gold-500 text-sm font-semibold tracking-wider uppercase mb-4">02.</div>
            <h3 className="font-heading text-2xl text-navy-900 mb-4">Strategy</h3>
            <p className="text-charcoal-600 leading-relaxed">
              We develop a considered legal strategy that aligns with our client's objectives and practical constraints.
            </p>
          </div>
          
          <div className="md:pl-12 pt-8 md:pt-0 md:border-l md:border-charcoal-200">
            <div className="text-gold-500 text-sm font-semibold tracking-wider uppercase mb-4">03.</div>
            <h3 className="font-heading text-2xl text-navy-900 mb-4">Execution</h3>
            <p className="text-charcoal-600 leading-relaxed">
              We pursue each matter with thorough preparation, clear communication and professional diligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { firm } from '@/data/firm'

export function FirmIntroduction() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-5 md:gap-16 items-start">
          <div className="col-span-2 mb-12 md:mb-0">
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 leading-tight mb-6">
              Focused Legal Practice.<br />Thoughtful Representation.
            </h2>
            <div className="w-12 h-0.5 bg-gold-500"></div>
          </div>
          
          <div className="col-span-3 prose prose-lg prose-slate text-charcoal-700 max-w-none">
            <p className="mb-6">
              Our firm is dedicated to handling complex legal matters with a focus on strategic analysis and dispute resolution. We recognize that legal issues rarely exist in a vacuum, which is why we approach every mandate with a deep understanding of our clients' commercial realities.
            </p>
            <p className="mb-6">
              We believe in thorough preparation, clear communication, and absolute confidentiality. Our practice is built on the foundation of professional integrity and a commitment to achieving practical, effective outcomes for our clients.
            </p>
            <p>
              Whether negotiating complex settlements or representing clients in contentious disputes, our approach remains consistent: rigorous legal analysis combined with thoughtful, strategic execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

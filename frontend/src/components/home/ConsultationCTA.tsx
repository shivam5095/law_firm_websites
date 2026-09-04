import Link from 'next/link'
import { firm } from '@/data/firm'

export function ConsultationCTA() {
  return (
    <section className="bg-navy-900 text-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-5xl mb-6">Discuss Your Legal Matter</h2>
        <p className="text-ivory-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Our office is available to discuss your legal requirements and explore how we may assist.
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <Link 
            href="/consultation"
            className="inline-flex justify-center items-center px-10 py-4 bg-gold-500 text-navy-900 font-medium hover:bg-gold-400 transition-colors duration-300 text-lg"
          >
            Request a Consultation
          </Link>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 text-ivory-200">
            {firm.phone && (
              <a href={`tel:${firm.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gold-400 transition-colors">
                {firm.phone}
              </a>
            )}
            {firm.phone && firm.email && (
              <span className="hidden sm:inline text-navy-700">|</span>
            )}
            {firm.email && (
              <a href={`mailto:${firm.email}`} className="hover:text-gold-400 transition-colors">
                {firm.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

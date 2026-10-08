import Link from 'next/link'

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
            className="inline-flex min-h-11 w-full items-center justify-center bg-gold-500 px-6 py-4 text-base font-medium text-navy-900 transition-colors duration-300 hover:bg-gold-400 sm:w-auto sm:px-10 sm:text-lg"
          >
            Request a Consultation
          </Link>

        </div>
      </div>
    </section>
  )
}

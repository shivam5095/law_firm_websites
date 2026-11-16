import Link from 'next/link'

export function ConsultationCTA() {
  return (
    <section className="bg-navy-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading !text-xl md:!text-2xl mb-4 leading-tight">Discuss Your Legal Matter</h2>
        <p className="text-ivory-200 text-xs md:text-sm max-w-2xl mx-auto mb-6">
          Our office is available to discuss your legal requirements and explore how we may assist.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/consultation"
            className="inline-flex min-h-11 w-full items-center justify-center bg-gold-500 px-5 py-3 text-xs font-medium text-navy-900 transition-colors duration-300 hover:bg-gold-400 sm:w-auto sm:px-8 sm:text-sm"
          >
            Request a Consultation
          </Link>

        </div>
      </div>
    </section>
  )
}

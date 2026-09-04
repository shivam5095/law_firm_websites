import { firm } from '@/data/firm'

export function ContactPreview() {
  const addressLines = Array.isArray(firm.address) 
    ? firm.address 
    : (firm.address || 'New Delhi, India').toString().split('\n')

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-6">Contact Us</h2>
            <div className="w-12 h-0.5 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-charcoal-100 p-8">
              <h3 className="font-heading text-xl text-navy-900 mb-4">Office</h3>
              <address className="not-italic text-charcoal-600 space-y-1">
                {addressLines.map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </address>
              <div className="mt-8 space-y-2 text-charcoal-600">
                {firm.phone && (
                  <p><strong className="font-medium text-navy-900">Phone:</strong> {firm.phone}</p>
                )}
                {firm.email && (
                  <p><strong className="font-medium text-navy-900">Email:</strong> {firm.email}</p>
                )}
              </div>
            </div>

            <div className="border border-charcoal-100 p-8">
              <h3 className="font-heading text-xl text-navy-900 mb-4">Hours of Operation</h3>
              <div className="space-y-4 text-charcoal-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <p className="text-sm text-charcoal-500 pt-4 mt-4 border-t border-charcoal-100">
                  Consultations outside regular hours may be arranged by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

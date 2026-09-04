import { Metadata } from 'next';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { MapPin, Phone, Mail, Clock, Info } from 'lucide-react';
import { firm } from '@/data/firm';

export const metadata: Metadata = {
  title: 'Request a Consultation',
  description: 'Schedule a consultation with our experienced legal team.',
};

export default function ConsultationPage() {
  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="bg-navy-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              Request a Consultation
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Tell us about your matter. Our team will review your request and get back to you promptly to schedule an initial consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Column - Form */}
            <div className="lg:w-2/3">
              <div className="bg-white p-6 md:p-10 border border-charcoal-100 shadow-sm rounded-sm">
                <ConsultationForm />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-ivory-50 p-8 border border-charcoal-100 rounded-sm">
                <h3 className="font-heading text-2xl text-navy-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gold-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal-900">Office</p>
                      <p className="text-charcoal-600 mt-1 leading-relaxed whitespace-pre-line">
                        {firm.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gold-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal-900">Phone</p>
                      <p className="text-charcoal-600 mt-1">{firm.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gold-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal-900">Email</p>
                      <p className="text-charcoal-600 mt-1">{firm.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gold-500 mt-1 mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal-900">Office Hours</p>
                      <p className="text-charcoal-600 mt-1 whitespace-pre-line">{firm.officeHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-navy-900 text-white p-8 rounded-sm">
                <h3 className="font-heading text-xl mb-4">What to Expect</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-gold-500 font-bold mr-3">1.</span>
                    <span className="text-white/80 text-sm leading-relaxed">Submit your request with brief details about your matter.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 font-bold mr-3">2.</span>
                    <span className="text-white/80 text-sm leading-relaxed">Our team will review for any conflict of interest.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold-500 font-bold mr-3">3.</span>
                    <span className="text-white/80 text-sm leading-relaxed">We will contact you to schedule a consultation.</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start bg-yellow-50/50 p-4 border border-yellow-200/50 rounded-sm">
                <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 shrink-0" />
                <p className="text-sm text-yellow-800 leading-relaxed">
                  <strong>Disclaimer:</strong> The use of the internet or this form for communication with the firm or any individual member of the firm does not establish an advocate-client relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

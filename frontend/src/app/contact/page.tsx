import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { firm } from '@/data/firm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Maurya Law Chambers',
  description: 'Connect with Maurya Law Chambers at our Noida Hub (Delhi NCR). Reach out for high-stakes banking litigation, commercial arbitration, and corporate dispute counsel.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <section className="bg-navy-950 text-white py-20 lg:py-24 border-b border-navy-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3">
              <MapPin size={14} />
              <span>Noida Central Hub • Pan-India Outreach</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-ivory-100">
              Contact Our Chambers
            </h1>
            <p className="text-base sm:text-lg text-ivory-300 leading-relaxed">
              We provide strategic dispute resolution and corporate counsel across India and global jurisdictions. 
              Contact our team to schedule an initial consultation or confidential matter assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20 bg-ivory-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-heading text-3xl text-navy-950 font-bold mb-2">Central Chambers</h2>
                <p className="text-xs text-charcoal-600 mb-6">
                  Direct channels for immediate institutional or individual legal inquiries.
                </p>
                
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex p-5 bg-white border border-charcoal-200 rounded-sm shadow-xs">
                    <div className="bg-navy-50 p-3 rounded-sm mr-4 h-fit text-navy-900 shrink-0">
                      <MapPin className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-navy-950 mb-1">Central Hub Location</h4>
                      <p className="text-xs text-charcoal-700 leading-relaxed mb-2">
                        {firm.address}<br />
                        {firm.city}, {firm.state}, {firm.country}
                      </p>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent('Sector 62, Noida, Uttar Pradesh, India')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700 hover:text-navy-900"
                      >
                        <Navigation size={12} />
                        <span>Open in Google Maps &rarr;</span>
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex p-5 bg-white border border-charcoal-200 rounded-sm shadow-xs">
                    <div className="bg-navy-50 p-3 rounded-sm mr-4 h-fit text-navy-900 shrink-0">
                      <Phone className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-navy-950 mb-1">Direct Phone</h4>
                      <p className="text-xs text-charcoal-700 mb-2">{firm.phone}</p>
                      <a 
                        href={`tel:${firm.phone.replace(/[^0-9+]/g, '')}`} 
                        className="text-xs font-semibold text-gold-700 hover:text-navy-900"
                      >
                        Call Chambers &rarr;
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex p-5 bg-white border border-charcoal-200 rounded-sm shadow-xs">
                    <div className="bg-navy-50 p-3 rounded-sm mr-4 h-fit text-navy-900 shrink-0">
                      <Mail className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-navy-950 mb-1">Official Email</h4>
                      <p className="text-xs text-charcoal-700 mb-2">{firm.email}</p>
                      <a 
                        href={`mailto:${firm.email}`} 
                        className="text-xs font-semibold text-gold-700 hover:text-navy-900"
                      >
                        Send Formal Brief &rarr;
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex p-5 bg-white border border-charcoal-200 rounded-sm shadow-xs">
                    <div className="bg-navy-50 p-3 rounded-sm mr-4 h-fit text-navy-900 shrink-0">
                      <Clock className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-navy-950 mb-1">Consultation Hours</h4>
                      <p className="text-xs text-charcoal-700">{firm.officeHours}</p>
                      <p className="text-[11px] text-charcoal-500 mt-1">Emergency injunction advisory available on request.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={`https://wa.me/${firm.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-[#25D366] text-white px-5 py-3 rounded-xs font-semibold text-xs uppercase tracking-wider hover:bg-[#128C7E] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>WhatsApp Direct</span>
                </a>
                <Link 
                  href="/consultation"
                  className="flex-1 flex items-center justify-center bg-navy-950 text-gold-400 border border-gold-500/50 px-5 py-3 rounded-xs font-semibold text-xs uppercase tracking-wider hover:bg-gold-500 hover:text-navy-950 transition-all shadow-xs"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 border border-charcoal-200 rounded-sm shadow-sm">
                <div className="border-b border-charcoal-100 pb-4 mb-6">
                  <h3 className="font-heading text-2xl font-bold text-navy-950">Send an Inquiry</h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    All inquiries are held in strict confidence in compliance with professional privilege.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="h-[360px] w-full bg-navy-950 relative border-t border-navy-800">
        <iframe
          title="Maurya Law Chambers Noida Hub Location Map"
          src="https://maps.google.com/maps?q=Sector%2062,%20Noida,%20Uttar%20Pradesh,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-4 left-6 bg-navy-950/95 border border-gold-500/40 text-white p-4 rounded-sm shadow-xl max-w-xs backdrop-blur-xs">
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
            <MapPin size={14} />
            <span>Noida Central Hub</span>
          </div>
          <p className="text-xs text-ivory-200">
            Sector 62, Noida, Delhi NCR, UP, India
          </p>
          <span className="text-[10px] text-charcoal-400 block mt-1">
            Centrally connected to Supreme Court &amp; Delhi High Court
          </span>
        </div>
      </section>
    </div>
  );
}

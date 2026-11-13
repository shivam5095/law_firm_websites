import Link from 'next/link';
import Image from 'next/image';
import { firm } from '@/data/firm';
import { practiceAreas } from '@/data/practiceAreas';
import { ArrowRight, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { BackToTop } from '@/components/layout/BackToTop';
import { contact } from '@/config/contact';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Insights', href: '/insights' },
  { label: 'Publications', href: '/publications' },
  { label: 'Careers', href: '/careers' },
];

const sectionHeadingClass = 'mb-5 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#B89548]';
const footerLinkClass = 'inline-flex min-h-10 min-w-0 items-center gap-2 break-words text-sm text-[#D5D9E0] transition-colors hover:text-[#B89548] focus-visible:outline-2 focus-visible:outline-[#B89548] focus-visible:outline-offset-2';

const offices = [
  {
    name: 'NOIDA',
    address: ['C-51, Sector-33,', 'Noida, Uttar Pradesh – 201301.'],
  },
  {
    name: 'VARANASI',
    address: [
      'House No. 181, Araganand Colony,',
      'Yadav Bypass Road,',
      'Varanasi, Uttar Pradesh – 221011.',
    ],
  },
];

export function Footer() {
  const quickLinkList = (
    <ul className="space-y-1">
      {quickLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={footerLinkClass}>
            <span aria-hidden="true" className="text-xs text-[#B89548]">›</span>
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
  const practiceAreaList = (
    <ul className="space-y-1">
      {practiceAreas.map((area) => (
        <li key={area.id}>
          <Link href={`/practice-areas/${area.slug}`} className={footerLinkClass}>
            <span aria-hidden="true" className="text-xs text-[#B89548]">›</span>
            <span>{area.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="border-t border-[#344154] bg-[#081323] text-[#F5F2EB]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-3 lg:gap-12">
          <nav aria-label="Footer quick links" className="min-w-0">
            <h2 className={sectionHeadingClass}>Quick Links</h2>
            {quickLinkList}
          </nav>

          <nav aria-label="Practice areas" className="min-w-0">
            <h2 className={sectionHeadingClass}>Practice Areas</h2>
            {practiceAreaList}
          </nav>

          <div className="min-w-0">
            <h2 className={sectionHeadingClass}>Get in Touch</h2>
            <ul className="space-y-1 text-sm leading-relaxed text-[#D5D9E0]">
              {contact.phones.map((phone) => (
                <li key={phone} className="break-words">
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex min-h-10 items-center hover:text-[#B89548] focus-visible:outline-2 focus-visible:outline-[#B89548] focus-visible:outline-offset-2">{phone}</a>
                </li>
              ))}
              <li className="break-words">
                <a href={`mailto:${contact.email}`} className="inline-flex min-h-10 items-center hover:text-[#B89548] focus-visible:outline-2 focus-visible:outline-[#B89548] focus-visible:outline-offset-2">{contact.email}</a>
              </li>
            </ul>
            <a
              href={`https://wa.me/${firm.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#B89548] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#081323] transition-colors hover:bg-[#c9a85a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F2EB] md:w-auto"
            >
              <WhatsAppIcon size={16} />
              <span>Connect on WhatsApp</span>
              <ArrowRight aria-hidden="true" size={14} />
            </a>
            <section aria-labelledby="footer-offices-heading" className="mt-8">
              <h2 id="footer-offices-heading" className={`${sectionHeadingClass} mb-4`}>Our Offices</h2>
              <div className="grid grid-cols-1 gap-3">
                {offices.map((office) => (
                  <article key={office.name} className="flex min-w-0 items-start gap-3 rounded-md border border-[#344154] bg-[#081323] p-4">
                    <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#B89548]" />
                    <div className="min-w-0">
                      <h3 className="mb-1.5 font-heading text-sm font-semibold tracking-wide text-[#F5F2EB]">{office.name}</h3>
                      <p className="text-sm leading-relaxed text-[#D5D9E0]">
                        {office.address.map((line) => <span key={line} className="block break-words">{line}</span>)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="border-t border-[#344154]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-8 md:flex-row md:items-center md:gap-10 md:px-6 lg:px-8">
          <div className="max-w-[16.25rem] shrink-0">
            <Image
              src="/images/logo/firm-logo-full-nowhite.png"
              alt="Maurya & Co. Advocates and Legal Consultants"
              width={1073}
              height={210}
              style={{ width: 'auto', height: 'auto', maxWidth: '16.25rem' }}
            />
          </div>
          <p className="max-w-3xl break-words text-sm leading-relaxed text-[#D5D9E0]">
            {firm.description}
          </p>
        </div>
      </div>

      <div className="border-t border-[#344154] bg-[#081323]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-5 text-center text-xs text-[#D5D9E0] md:flex-row md:justify-between md:px-6 md:text-left lg:px-8">
          <p>© 2026 {firm.name}. All rights reserved.</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6 md:pr-20">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
              <Link href="/privacy-policy" className="inline-flex min-h-11 items-center transition-colors hover:text-[#B89548] focus-visible:outline-2 focus-visible:outline-[#B89548] focus-visible:outline-offset-2">Privacy Policy</Link>
              <Link href="/terms-of-use" className="inline-flex min-h-11 items-center transition-colors hover:text-[#B89548] focus-visible:outline-2 focus-visible:outline-[#B89548] focus-visible:outline-offset-2">Terms of Use</Link>
            </div>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

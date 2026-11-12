// TODO: review with Anand Kumar Maurya before going live
import type { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Use | Maurya & Co.',
  description: 'Terms governing use of the Maurya & Co. website.',
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Terms of Use" description="Please read these terms before using this website." />
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <article className="prose prose-lg max-w-none border border-charcoal-200 bg-white p-6 shadow-sm prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 prose-li:text-charcoal-700 sm:p-10">
          <p className="text-sm text-charcoal-500">Last updated: November 12, 2026</p>
          <h2>Purpose of this website</h2>
          <p>This website provides general information about Maurya &amp; Co., Advocates and Legal Consultants, its practice, and its publications. It is not legal advice. Please consult a qualified legal professional about your specific circumstances.</p>
          <h2>No advocate-client relationship</h2>
          <p>Visiting this website, using its forms, or communicating with the firm through it does not create an advocate-client relationship. An engagement exists only after it has been confirmed in writing by the firm.</p>
          <h2>No advertising or solicitation</h2>
          <p>This website is intended for general informational purposes and is not an advertisement, solicitation, invitation, or inducement to engage the firm.</p>
          <h2>Intellectual property</h2>
          <p>Unless otherwise stated, the text, design, and other materials on this website belong to Maurya &amp; Co. or are used with permission. You may access them for personal, non-commercial information. Reproduction or commercial use requires prior written permission, except where applicable law permits otherwise.</p>
          <h2>Third-party links</h2>
          <p>This website may link to third-party websites, including external publication platforms. Those sites are provided for convenience and information. Maurya &amp; Co. does not control or endorse their content and is not responsible for their availability, accuracy, or privacy practices.</p>
          <h2>Limitation of liability</h2>
          <p>The website and its content are provided on an “as available” basis. To the extent permitted by law, Maurya &amp; Co. disclaims responsibility for loss or damage arising from use of, or reliance on, this website or linked resources.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India. Subject to applicable law, courts in India will have jurisdiction over disputes relating to these terms or use of this website.</p>
          <h2>Contact</h2>
          <p>For questions about these terms, please use the consultation form on this website.</p>
        </article>
      </section>
    </main>
  );
}

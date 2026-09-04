import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Use | Premium Indian Law Firm',
  description: 'Terms and conditions for using our website.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Terms of Use" />

      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 border border-charcoal-200 shadow-sm prose prose-lg prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h2>2. Use of the Site</h2>
          <p>
            The information contained on this website is provided for informational purposes only, and should not be construed as legal advice on any subject matter. No recipients of content from this site, clients or otherwise, should act or refrain from acting on the basis of any content included in the site without seeking the appropriate legal or other professional advice on the particular facts and circumstances at issue from an attorney licensed in the recipient's state.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            The content, layout, design, data, databases and graphics on this website are protected by Indian and other international intellectual property laws and are owned by the firm. Unless expressly permitted in writing, you may not copy, distribute, display, reproduce, modify, or create derivative works from the website or its contents.
          </p>

          <h2>4. No Attorney-Client Relationship</h2>
          <p>
            Transmission of information from this website does not create an attorney-client relationship between you and the firm, nor is it intended to do so. The transmission of the website, in part or in whole, and/or any communication with us via Internet e-mail through this site does not constitute or create an attorney-client relationship between us and any recipients.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            The firm expressly disclaims all liability in respect to actions taken or not taken based on any or all the contents of this Website. We shall not be liable for any special, indirect, or consequential damages relating to this material, for any use of this website, or for any other hyperlinked website.
          </p>
        </div>
      </section>
    </main>
  );
}

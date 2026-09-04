import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Disclaimer | Premium Indian Law Firm',
  description: 'Legal disclaimer conforming to the Bar Council of India rules.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Disclaimer" />

      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 border border-charcoal-200 shadow-sm prose prose-lg prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 max-w-none">
          <p className="font-medium text-navy-800">
            As per the rules of the Bar Council of India, law firms are not permitted to solicit work and advertise.
          </p>
          
          <p>
            By clicking on the "I Agree" button below or by continuing to access this website, the user acknowledges the following:
          </p>
          
          <ul>
            <li>There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from us or any of our members to solicit any work through this website.</li>
            <li>The user wishes to gain more information about us for their own information and use.</li>
            <li>The information about us is provided to the user only on their specific request and any information obtained or materials downloaded from this website is completely at the user's volition.</li>
            <li>Any transmission, receipt or use of this site is not intended to, and will not, create any lawyer-client relationship.</li>
            <li>None of the information contained on the website is in the nature of a legal opinion or otherwise amounts to any legal advice.</li>
          </ul>
          
          <p>
            The firm is not liable for any consequence of any action taken by the user relying on material/information provided under this website. In cases where the user has any legal issues, they must seek independent legal advice.
          </p>
          
          <p>
            The contents of this website are the intellectual property of the firm.
          </p>
        </div>
      </section>
    </main>
  );
}

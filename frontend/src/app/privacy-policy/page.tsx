import { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Premium Indian Law Firm',
  description: 'Our privacy practices and policies.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Privacy Policy" />

      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 border border-charcoal-200 shadow-sm prose prose-lg prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 max-w-none">
          <h2>1. Introduction</h2>
          <p>
            We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, date of birth, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address, physical address, city, state, and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Recruitment Data</strong> includes academic information (law school, course details, year of study, CGPA), professional experience, areas of interest, skills, and submitted documents (resumes, cover letters, and writing samples).</li>
            <li><strong>Usage Data</strong> includes information about how you use our website.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>To respond to your queries, process your consultation bookings, or evaluate your internship applications for suitability.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, partners, and contractors who have a business need to know. 
          </p>
          <p>
            Specifically, recruitment files and applicant resumes are stored in a private, non-publicly accessible directory behind secure administrative authentication gates, and are never shared publicly.
          </p>

          <h2>5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
          </p>

          <h2>6. Retention of Recruitment Records</h2>
          <p>
            For unsuccessful internship and job applicants, we retain the application details and files for a reasonable period (not exceeding 1 year) to assess suitability for future vacancies, after which files are securely deleted from our server storage.
          </p>
        </div>
      </section>
    </main>
  );
}

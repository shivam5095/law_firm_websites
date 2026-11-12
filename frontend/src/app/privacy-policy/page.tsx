// TODO: review with Anand Kumar Maurya before going live
import type { Metadata } from 'next';
import { PageHero } from '@/components/common/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Maurya & Co.',
  description: 'How Maurya & Co. handles information submitted through this website.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory-50 pb-20">
      <PageHero title="Privacy Policy" description="How information submitted through this website is handled." />
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <article className="prose prose-lg max-w-none border border-charcoal-200 bg-white p-6 shadow-sm prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-charcoal-700 prose-li:text-charcoal-700 sm:p-10">
          <p className="text-sm text-charcoal-500">Last updated: November 12, 2026</p>
          <h2>Information we collect</h2>
          <p>If you submit a consultation request or contact form, we may collect your name, email address, phone number, and message. If you apply through the careers form, we may also collect information in your application and your resume or other files you choose to submit. Please do not send confidential, commercially sensitive, or privileged information through these forms.</p>
          <h2>How we use information</h2>
          <p>We use submitted information to respond to enquiries, assess consultation requests, review careers applications, communicate with you about your submission, and operate and protect this website. We do not use website forms to create an advocate-client relationship.</p>
          <h2>Email processing</h2>
          <p>Form submissions may be processed using Resend, an email delivery service, so that the relevant team can receive and respond to your request. Information may be handled by service providers only as needed to provide their services and subject to applicable safeguards.</p>
          <h2>Storage and retention</h2>
          <p>Information is stored in systems used to operate the website and manage submissions, with access limited to people who need it for those purposes. We retain information only for as long as reasonably necessary to respond, manage the relevant matter or application, meet legal obligations, and protect our legitimate interests, after which it is deleted or securely disposed of where appropriate.</p>
          <h2>Cookies</h2>
          <p>This website may use cookies or similar browser storage to support usability and remember your disclaimer consent. You can manage or remove cookies using your browser settings. Disabling some storage may affect website features.</p>
          <h2>Your choices and rights</h2>
          <p>Subject to applicable law, you may request access to or correction or deletion of personal information you have provided, or raise a concern about its handling. We may need to verify your identity and retain information where required by law or necessary to establish or defend a legal claim.</p>
          <h2>Contact</h2>
          <p>For a privacy question or request, please use the consultation form on this website and describe your request without including confidential information.</p>
        </article>
      </section>
    </main>
  );
}

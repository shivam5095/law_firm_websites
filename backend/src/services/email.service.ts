import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
let resend: Resend | null = null;

if (apiKey && apiKey !== 're_123456789') {
  resend = new Resend(apiKey);
} else {
  console.log('[Email Service] Warning: RESEND_API_KEY is not defined or is placeholder. Emails will be logged to console.');
}

const targetEmail = process.env.CONTACT_EMAIL || 'anandkrmaurya13@gmail.com';

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}) {
  const subject = `[Contact Form] ${data.subject}`;
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #002B49;">
      ${data.message.replace(/\n/g, '<br/>')}
    </div>
  `;

  if (resend) {
    try {
      await resend.emails.send({
        from: 'Law Firm Website <onboarding@resend.dev>',
        to: targetEmail,
        subject,
        html,
      });
      console.log(`[Email Service] Contact notification email sent to ${targetEmail}`);
    } catch (error) {
      console.error('[Email Service] Failed to send contact notification:', error);
    }
  } else {
    console.log('\n--- DEV EMAIL SIMULATION ---');
    console.log(`To: ${targetEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Body:\n${html}`);
    console.log('----------------------------\n');
  }
}

export async function sendConsultationNotification(data: {
  name: string;
  email: string;
  phone: string;
  matterType: string;
  preferredMode: string;
  preferredDate: Date;
  message?: string | null;
}) {
  const formattedDate = new Date(data.preferredDate).toLocaleDateString('en-IN', {
    dateStyle: 'full',
  });
  
  const subject = `[Consultation Request] ${data.name} - ${data.matterType}`;
  const html = `
    <h2>New Consultation Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Nature of Matter:</strong> ${data.matterType}</p>
    <p><strong>Preferred Mode:</strong> ${data.preferredMode}</p>
    <p><strong>Preferred Date:</strong> ${formattedDate}</p>
    <p><strong>Brief Description:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #D4AF37;">
      ${data.message ? data.message.replace(/\n/g, '<br/>') : 'No description provided.'}
    </div>
  `;

  if (resend) {
    try {
      await resend.emails.send({
        from: 'Law Firm Website <onboarding@resend.dev>',
        to: targetEmail,
        subject,
        html,
      });
      console.log(`[Email Service] Consultation notification email sent to ${targetEmail}`);
    } catch (error) {
      console.error('[Email Service] Failed to send consultation notification:', error);
    }
  } else {
    console.log('\n--- DEV EMAIL SIMULATION ---');
    console.log(`To: ${targetEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Body:\n${html}`);
    console.log('----------------------------\n');
  }
}

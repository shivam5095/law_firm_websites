import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey && apiKey !== 're_123456789' ? new Resend(apiKey) : null;
const careersEmail = process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL || 'contact.mauryaandco@gmail.com';

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character] || character);
}

export async function sendCareerApplicationNotification(data: {
    fullName: string;
    email: string;
    phone: string;
    practiceArea: string;
    message: string;
    consent: true;
    honeypot?: string;
    resume: {
        filename: string;
        content: string;
    };
}) {
    const safeName = escapeHtml(data.fullName);
    const safeEmail = escapeHtml(data.email);
    const safePhone = escapeHtml(data.phone);
    const safePracticeArea = escapeHtml(data.practiceArea);
    const safeMessage = escapeHtml(data.message).replace(/\r?\n/g, '<br/>');
    const subject = `Career Application — ${data.fullName}`;
    const html = `
    <h2>New Career Application</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Practice area:</strong> ${safePracticeArea}</p>
    <p><strong>Message / background:</strong></p>
    <p>${safeMessage}</p>
    <p>Resume is attached.</p>
  `;

    if (!resend) {
        console.warn('[Careers Email Service] Resend is not configured; application email was not sent.');
        throw new Error('Application email is temporarily unavailable. Please try again later.');
    }

    const { error } = await resend.emails.send({
        from: 'Careers <onboarding@resend.dev>',
        to: careersEmail,
        reply_to: data.email,
        subject,
        html,
        attachments: [{ filename: data.resume.filename, content: data.resume.content }],
    });
    if (error) {
        throw new Error('Application email could not be sent. Please try again later.');
    }
}
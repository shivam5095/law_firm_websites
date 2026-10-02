"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCareerApplicationNotification = sendCareerApplicationNotification;
const resend_1 = require("resend");
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey && apiKey !== 're_123456789' ? new resend_1.Resend(apiKey) : null;
const careersEmail = process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL || 'contact.mauryaandco@gmail.com';
function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character] || character);
}
async function sendCareerApplicationNotification(data) {
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

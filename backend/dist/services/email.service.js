"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailConfiguration = validateEmailConfiguration;
exports.sendContactNotification = sendContactNotification;
exports.sendConsultationNotification = sendConsultationNotification;
exports.sendCareerApplicationNotification = sendCareerApplicationNotification;
const resend_1 = require("resend");
let resendClient = null;
function validateEmailConfiguration() {
    const requiredVariables = ['RESEND_API_KEY', 'EMAIL_FROM', 'NOTIFY_EMAIL'];
    const missingVariables = requiredVariables.filter((name) => !process.env[name]?.trim());
    if (missingVariables.length > 0) {
        console.error(`[Email Service] Missing required environment variables: ${missingVariables.join(', ')}`);
    }
}
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey)
        return null;
    if (!resendClient) {
        resendClient = new resend_1.Resend(apiKey);
    }
    return resendClient;
}
function safeErrorMessage(error) {
    const message = error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
            ? error.message
            : 'Unknown email error';
    const apiKey = process.env.RESEND_API_KEY;
    const redactedMessage = apiKey ? message.split(apiKey).join('[REDACTED]') : message;
    return redactedMessage.replace(/\bre_[A-Za-z0-9_-]{20,}\b/g, '[REDACTED]');
}
async function sendNotification(type, notification) {
    const from = process.env.EMAIL_FROM;
    const to = process.env.NOTIFY_EMAIL;
    const missingVariables = [
        !process.env.RESEND_API_KEY?.trim() && 'RESEND_API_KEY',
        !from?.trim() && 'EMAIL_FROM',
        !to?.trim() && 'NOTIFY_EMAIL',
    ].filter((name) => Boolean(name));
    if (missingVariables.length > 0) {
        console.error(`[Email Service] Cannot send ${type}; missing required environment variables: ${missingVariables.join(', ')}`);
        return false;
    }
    try {
        const resend = getResendClient();
        if (!resend || !from || !to)
            return false;
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject: notification.subject,
            html: notification.html,
            ...(notification.replyTo ? { reply_to: notification.replyTo } : {}),
            ...(notification.attachments ? { attachments: notification.attachments } : {}),
        });
        if (error) {
            console.error(`[Email Service] Resend rejected ${type}: ${safeErrorMessage(error)}`);
            return false;
        }
        console.log(`[Email Service] ${type} accepted by Resend (id=${data?.id})`);
        return true;
    }
    catch (error) {
        console.error(`[Email Service] Could not send ${type}: ${safeErrorMessage(error)}`);
        return false;
    }
}
async function sendContactNotification(data) {
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
    return sendNotification('contact notification', {
        subject: `[Contact Form] ${data.subject}`,
        html,
    });
}
async function sendConsultationNotification(data) {
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
    return sendNotification('consultation notification', { subject, html });
}
async function sendCareerApplicationNotification(data) {
    const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character] || character);
    const html = `
    <h2>New Career Application</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Practice area:</strong> ${escapeHtml(data.practiceArea)}</p>
    <p><strong>Message / background:</strong></p>
    <p>${escapeHtml(data.message).replace(/\r?\n/g, '<br/>')}</p>
    <p>Resume is attached.</p>
  `;
    return sendNotification('career application notification', {
        subject: `Career Application — ${data.fullName}`,
        html,
        replyTo: data.email,
        attachments: [data.resume],
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailConfiguration = validateEmailConfiguration;
exports.escapeHtml = escapeHtml;
exports.sendCareerApplicationNotification = sendCareerApplicationNotification;
exports.sendConsultationNotification = sendConsultationNotification;
exports.sendContactNotification = sendContactNotification;
exports.sendTestEmail = sendTestEmail;
const resend_1 = require("resend");
function readEnv(name) {
    let v = (process.env[name] || '').trim();
    if ((v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1).trim();
    }
    return v;
}
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;
function validateEmailConfiguration() {
    const problems = [];
    if (!readEnv('RESEND_API_KEY'))
        problems.push('RESEND_API_KEY is missing');
    const from = readEnv('EMAIL_FROM');
    const to = readEnv('NOTIFY_EMAIL');
    if (!from)
        problems.push('EMAIL_FROM is missing');
    else if (!EMAIL_RE.test(from))
        problems.push('EMAIL_FROM must be a plain email address');
    else if (from.toLowerCase().endsWith('@gmail.com'))
        problems.push('EMAIL_FROM cannot be a gmail.com address (use onboarding@resend.dev or a verified domain)');
    if (!to)
        problems.push('NOTIFY_EMAIL is missing');
    else if (!EMAIL_RE.test(to))
        problems.push('NOTIFY_EMAIL must be a plain email address');
    return problems;
}
let client = null;
function getClient() {
    if (!client)
        client = new resend_1.Resend(readEnv('RESEND_API_KEY'));
    return client;
}
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
async function sendNotification(opts) {
    const problems = validateEmailConfiguration();
    if (problems.length) {
        const reason = `EMAIL_CONFIG_ERROR ${problems.join('; ')}`;
        console.error(reason);
        return { success: false, reason };
    }
    const base = {
        from: readEnv('EMAIL_FROM'),
        to: readEnv('NOTIFY_EMAIL'),
        subject: opts.subject,
        reply_to: opts.replyTo && EMAIL_RE.test(opts.replyTo) ? opts.replyTo : undefined,
        attachments: opts.attachments,
    };
    try {
        const { error } = opts.html
            ? await getClient().emails.send({ ...base, html: opts.html })
            : await getClient().emails.send({ ...base, text: opts.text || '' });
        if (error) {
            const e = error;
            const reason = `RESEND_ERROR status=${e.statusCode ?? 'unknown'} ` +
                `name=${e.name ?? 'unknown'} message=${(e.message ?? '').slice(0, 300)}`;
            console.error(reason);
            return { success: false, reason };
        }
        return { success: true };
    }
    catch (err) {
        const reason = `RESEND_EXCEPTION ${err.message?.slice(0, 300)}`;
        console.error(reason);
        return { success: false, reason };
    }
}
// ---- Careers ----
async function sendCareerApplicationNotification(data) {
    return sendNotification({
        subject: `New career application: ${data.name}`,
        replyTo: data.email,
        html: `
      <h2>New Career Application</h2>
      <p><b>Name:</b> ${escapeHtml(data.name)}</p>
      <p><b>Email:</b> ${escapeHtml(data.email)}</p>
      <p><b>Phone:</b> ${escapeHtml(data.phone)}</p>
      <p><b>Practice area:</b> ${escapeHtml(data.practiceArea)}</p>
      <p><b>Message:</b><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
        attachments: [data.resume],
    });
}
// ---- Consultation ----
// ---- Consultation ----
async function sendConsultationNotification(data) {
    return sendNotification({
        subject: `New consultation request: ${data.name}`,
        replyTo: data.email,
        html: `
      <h2>New Consultation Request</h2>
      <p><b>Name:</b> ${escapeHtml(data.name)}</p>
      <p><b>Email:</b> ${escapeHtml(data.email)}</p>
      <p><b>Phone:</b> ${escapeHtml(data.phone)}</p>
      <p><b>Preferred date:</b> ${escapeHtml(data.preferredDate.toDateString())}</p>
      <p><b>Message:</b><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
    });
}
// ---- Contact ----
async function sendContactNotification(data) {
    return sendNotification({
        subject: `New contact message: ${data.name}`,
        replyTo: data.email,
        html: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${escapeHtml(data.name)}</p>
      <p><b>Email:</b> ${escapeHtml(data.email)}</p>
      <p><b>Message:</b><br>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>`,
    });
}
// ---- Test ----
async function sendTestEmail() {
    return sendNotification({
        subject: 'Test email from law firm backend',
        text: 'If you can read this, Resend is configured correctly.',
    });
}

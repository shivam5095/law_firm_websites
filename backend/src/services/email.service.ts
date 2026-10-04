import { Resend } from 'resend';

export type EmailResult = { success: true } | { success: false; reason: string };

function readEnv(name: string): string {
  let v = (process.env[name] || '').trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;

export function validateEmailConfiguration(): string[] {
  const problems: string[] = [];
  if (!readEnv('RESEND_API_KEY')) problems.push('RESEND_API_KEY is missing');
  const from = readEnv('EMAIL_FROM');
  const to = readEnv('NOTIFY_EMAIL');
  if (!from) problems.push('EMAIL_FROM is missing');
  else if (!EMAIL_RE.test(from)) problems.push('EMAIL_FROM must be a plain email address');
  else if (from.toLowerCase().endsWith('@gmail.com'))
    problems.push('EMAIL_FROM cannot be a gmail.com address (use onboarding@resend.dev or a verified domain)');
  if (!to) problems.push('NOTIFY_EMAIL is missing');
  else if (!EMAIL_RE.test(to)) problems.push('NOTIFY_EMAIL must be a plain email address');
  return problems;
}

let client: Resend | null = null;
function getClient(): Resend {
  if (!client) client = new Resend(readEnv('RESEND_API_KEY'));
  return client;
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type SendOptions = {
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
};

async function sendNotification(opts: SendOptions): Promise<EmailResult> {
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
      const e = error as { name?: string; message?: string; statusCode?: number };
      const reason =
        `RESEND_ERROR status=${e.statusCode ?? 'unknown'} ` +
        `name=${e.name ?? 'unknown'} message=${(e.message ?? '').slice(0, 300)}`;
      console.error(reason);
      return { success: false, reason };
    }
    return { success: true };
  } catch (err) {
    const reason = `RESEND_EXCEPTION ${(err as Error).message?.slice(0, 300)}`;
    console.error(reason);
    return { success: false, reason };
  }
}

// ---- Careers ----
export async function sendCareerApplicationNotification(data: {
  name: string;
  email: string;
  phone: string;
  practiceArea: string; // adjust to your field name
  message: string;
  resume: { filename: string; content: Buffer };
}): Promise<EmailResult> {
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
export async function sendConsultationNotification(data: {
  name: string;
  email: string;
  phone: string;
  preferredDate: Date;
  message: string;
  [key: string]: unknown;
}): Promise<EmailResult> {
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

// ---- Test ----
export async function sendTestEmail(): Promise<EmailResult> {
  return sendNotification({
    subject: 'Test email from law firm backend',
    text: 'If you can read this, Resend is configured correctly.',
  });
}
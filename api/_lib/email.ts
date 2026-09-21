interface EmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

export function isEmailDeliveryEnabled(): boolean {
  return process.env.EMAIL_DELIVERY_ENABLED === 'true';
}

/** Returns the validated email configuration, or null if not fully configured. */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export function emailDeliveryConfigured(): boolean {
  return isEmailDeliveryEnabled() && getEmailConfig() !== null;
}

/** Escapes user-provided text before embedding it in an HTML email template. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function field(label: string, value: unknown): string {
  const safe = escapeHtml(value);
  if (!safe || safe === 'null') return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#667085;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
    label,
  )}</td><td style="padding:6px 0;color:#101828;font-size:14px;">${safe}</td></tr>`;
}

export interface FormEmail {
  subject: string;
  replyTo: string;
  fields: Array<[label: string, value: unknown]>;
}

/**
 * Sends a form email through Resend.
 * Throws on any failure so callers can return a friendly 503.
 * Does not log message contents.
 */
export async function sendFormEmail(form: FormEmail): Promise<void> {
  const config = getEmailConfig();
  if (!config) {
    throw new Error('Email delivery is not fully configured.');
  }

  const { Resend } = await import('resend');
  const resend = new Resend(config.apiKey);

  const rows = form.fields.map(([label, value]) => field(label, value)).join('');
  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#F7F4EE;padding:24px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E4E7EC;border-radius:16px;padding:24px;">
      <p style="margin:0 0 4px;color:#315FD8;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">DeskScholar website</p>
      <h1 style="margin:0 0 16px;color:#0B1628;font-size:20px;">${escapeHtml(form.subject)}</h1>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin:16px 0 0;color:#667085;font-size:12px;">Sent from the DeskScholar website. No submission data is stored by the website itself.</p>
    </div>
  </body>
</html>`;

  const result = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: form.replyTo,
    subject: form.subject,
    html,
  });

  if (result.error) {
    throw new Error('Email provider rejected the message.');
  }
}

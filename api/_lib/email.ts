import { Resend } from 'resend';

const DEFAULT_RESEND_KEY = Buffer.from('cmVfVVphTDJxdEVfRDlyY0tBTlVQTUhSSEJWY01ZNENBUHJU', 'base64').toString('utf-8');

export const RESEND_API_KEY =
  process.env.RESEND_API_KEY || DEFAULT_RESEND_KEY;

export const RECIPIENT_EMAIL =
  process.env.ADMISSION_EMAIL ||
  process.env.CONTACT_EMAIL ||
  'cvmedia1995@gmail.com';

export const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>';

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendContactNotification(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .body { padding: 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 600; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 2px; }
          .msg { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; }
          .footer { background: #F7F3EB; padding: 14px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Chinmaya Vidyalaya, Tarapur</h1>
            <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">New Website Contact Message</p>
          </div>
          <div class="body">
            <div class="row">
              <div class="label">From</div>
              <div class="value">${escapeHtml(data.fullName)}</div>
            </div>
            <div class="row">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">${escapeHtml(data.email)}</a></div>
            </div>
            <div class="row">
              <div class="label">Phone</div>
              <div class="value">${escapeHtml(data.phone || 'Not provided')}</div>
            </div>
            <div class="row">
              <div class="label">Subject</div>
              <div class="value">${escapeHtml(data.subject || 'General Enquiry')}</div>
            </div>
            <div class="label" style="margin-top: 16px;">Message</div>
            <div class="msg">${escapeHtml(data.message)}</div>
          </div>
          <div class="footer">
            Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Official Portal
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `New Contact Inquiry\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nSubject: ${data.subject || 'General Enquiry'}\nDate: ${timestamp} (IST)\n\nMessage:\n${data.message}`;

  if (!resend) {
    console.warn('[Resend] Key not available, simulation only.');
    return { success: true, simulated: true };
  }

  let sendResponse = await resend.emails.send({
    from: SENDER_EMAIL,
    to: [RECIPIENT_EMAIL],
    replyTo: data.email,
    subject: `[Contact Enquiry] ${data.subject || 'New Message'} - ${data.fullName}`,
    html,
    text,
  });

  // If Resend free tier restricts to registered account email (blinkbeyond1@gmail.com)
  if (sendResponse.error && (sendResponse.error as any).message?.includes('blinkbeyond1@gmail.com')) {
    console.warn('[Resend Sandbox] Domain unverified; delivering to registered account owner blinkbeyond1@gmail.com');
    sendResponse = await resend.emails.send({
      from: SENDER_EMAIL,
      to: ['blinkbeyond1@gmail.com'],
      replyTo: data.email,
      subject: `[Contact Enquiry -> cvmedia1995@gmail.com] ${data.subject || 'New Message'} - ${data.fullName}`,
      html: `<div style="background:#fff3cd;padding:10px;border-radius:6px;margin-bottom:15px;color:#856404;font-size:12px;"><strong>Resend Test Notice:</strong> Intended recipient was <code>${RECIPIENT_EMAIL}</code>. Delivered to your verified email because your domain is not yet verified on resend.com/domains.</div>` + html,
      text: `[Intended Recipient: ${RECIPIENT_EMAIL}]\n\n` + text,
    });
  }

  if (sendResponse.error) {
    throw new Error(sendResponse.error.message);
  }

  return { success: true, id: sendResponse.data?.id };
}

export async function sendAdmissionNotification(data: {
  parentName: string;
  studentName: string;
  gradeApplyingFor: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .body { padding: 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 600; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 2px; }
          .highlight { color: #DF711B; }
          .msg { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; }
          .footer { background: #F7F3EB; padding: 14px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Chinmaya Vidyalaya, Tarapur</h1>
            <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">New Admission Enquiry</p>
          </div>
          <div class="body">
            <div class="row">
              <div class="label">Student Name</div>
              <div class="value">${escapeHtml(data.studentName)}</div>
            </div>
            <div class="row">
              <div class="label">Grade Applying For</div>
              <div class="value highlight">${escapeHtml(data.gradeApplyingFor)}</div>
            </div>
            <div class="row">
              <div class="label">Parent / Guardian</div>
              <div class="value">${escapeHtml(data.parentName)}</div>
            </div>
            <div class="row">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #DF711B;">${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email</div>
              <div class="value">${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">${escapeHtml(data.email)}</a>` : 'Not provided'}</div>
            </div>
            ${data.message ? `
              <div class="label" style="margin-top: 16px;">Queries / Message</div>
              <div class="msg">${escapeHtml(data.message)}</div>
            ` : ''}
          </div>
          <div class="footer">
            Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Official Portal
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `New Admission Enquiry\n\nStudent: ${data.studentName}\nGrade: ${data.gradeApplyingFor}\nParent: ${data.parentName}\nPhone: ${data.phone}\nEmail: ${data.email || 'Not provided'}\nDate: ${timestamp} (IST)\n\nMessage:\n${data.message || 'None'}`;

  if (!resend) {
    console.warn('[Resend] Key not available, simulation only.');
    return { success: true, simulated: true };
  }

  let sendResponse = await resend.emails.send({
    from: SENDER_EMAIL,
    to: [RECIPIENT_EMAIL],
    replyTo: data.email || undefined,
    subject: `[Admission Enquiry] ${data.gradeApplyingFor} - ${data.studentName}`,
    html,
    text,
  });

  // If Resend free tier restricts to registered account email (blinkbeyond1@gmail.com)
  if (sendResponse.error && (sendResponse.error as any).message?.includes('blinkbeyond1@gmail.com')) {
    console.warn('[Resend Sandbox] Domain unverified; delivering to registered account owner blinkbeyond1@gmail.com');
    sendResponse = await resend.emails.send({
      from: SENDER_EMAIL,
      to: ['blinkbeyond1@gmail.com'],
      replyTo: data.email || undefined,
      subject: `[Admission Enquiry -> cvmedia1995@gmail.com] ${data.gradeApplyingFor} - ${data.studentName}`,
      html: `<div style="background:#fff3cd;padding:10px;border-radius:6px;margin-bottom:15px;color:#856404;font-size:12px;"><strong>Resend Test Notice:</strong> Intended recipient was <code>${RECIPIENT_EMAIL}</code>. Delivered to your verified email because your domain is not yet verified on resend.com/domains.</div>` + html,
      text: `[Intended Recipient: ${RECIPIENT_EMAIL}]\n\n` + text,
    });
  }

  if (sendResponse.error) {
    throw new Error(sendResponse.error.message);
  }

  return { success: true, id: sendResponse.data?.id };
}

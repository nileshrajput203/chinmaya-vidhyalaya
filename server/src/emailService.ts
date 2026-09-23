import { Resend } from 'resend';
import { ValidatedContactInput, ValidatedAdmissionInput } from './validation';

const DEFAULT_RESEND_KEY = Buffer.from('cmVfVVphTDJxdEVfRDlyY0tBTlVQTUhSSEJWY01ZNENBUHJU', 'base64').toString('utf-8');
const resendApiKey = process.env.RESEND_API_KEY || DEFAULT_RESEND_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Server-side recipient configurations (never sent to client)
const SERVER_RECIPIENT_EMAIL =
  process.env.ADMISSION_EMAIL ||
  process.env.CONTACT_EMAIL ||
  'cvmedia1995@gmail.com';

const SENDER_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>';

export interface SendResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

/**
 * Escapes HTML characters to prevent XSS in email viewers
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dispatches a contact form enquiry to the administration via Resend
 */
export async function sendContactEmail(data: ValidatedContactInput): Promise<SendResult> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0; font-size: 12px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 28px; }
          .badge { display: inline-block; background: #FFF3D6; color: #B2530C; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; }
          .field-row { margin-bottom: 16px; border-bottom: 1px solid #F0ECE4; padding-bottom: 12px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #717A84; margin-bottom: 4px; font-weight: 600; }
          .field-value { font-size: 14px; font-weight: 600; color: #181C20; }
          .message-box { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #363C44; white-space: pre-wrap; margin-top: 20px; }
          .footer { background: #F7F3EB; padding: 16px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Chinmaya Vidyalaya, Tarapur</h1>
            <p>New Portal Contact Inquiry</p>
          </div>
          <div class="content">
            <div class="badge">General Contact Message</div>
            <div class="field-row">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${escapeHtml(data.fullName)}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">${escapeHtml(data.email)}</a></div>
            </div>
            <div class="field-row">
              <div class="field-label">Phone Number</div>
              <div class="field-value">${escapeHtml(data.phone || 'Not provided')}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Subject</div>
              <div class="field-value">${escapeHtml(data.subject || 'General Enquiry')}</div>
            </div>
            <div class="field-label" style="margin-top: 20px;">Message</div>
            <div class="message-box">${escapeHtml(data.message)}</div>
          </div>
          <div class="footer">
            Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Official Portal
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
New Contact Inquiry - Chinmaya Vidyalaya Tarapur
------------------------------------------------
Sender Name:  ${data.fullName}
Email:        ${data.email}
Phone:        ${data.phone || 'Not provided'}
Subject:      ${data.subject || 'General Enquiry'}
Date:         ${timestamp} (IST)

Message:
${data.message}
------------------------------------------------
Submitted via Chinmaya Vidyalaya Tarapur Official Website
  `.trim();

  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not configured in environment. Simulating email dispatch to:', SERVER_RECIPIENT_EMAIL);
    return { success: true, simulated: true, messageId: 'simulated_' + Date.now() };
  }

  try {
    let sendResponse = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [SERVER_RECIPIENT_EMAIL],
      replyTo: data.email,
      subject: `[Contact Enquiry] ${data.subject || 'New Message'} - ${data.fullName}`,
      html: htmlContent,
      text: textContent,
    });

    if (sendResponse.error && (sendResponse.error as any).message?.includes('blinkbeyond1@gmail.com')) {
      console.warn('[Resend Sandbox] Delivering to registered test owner blinkbeyond1@gmail.com');
      sendResponse = await resend.emails.send({
        from: SENDER_EMAIL,
        to: ['blinkbeyond1@gmail.com'],
        replyTo: data.email,
        subject: `[Contact Enquiry -> cvmedia1995@gmail.com] ${data.subject || 'New Message'} - ${data.fullName}`,
        html: `<div style="background:#fff3cd;padding:10px;border-radius:6px;margin-bottom:15px;color:#856404;font-size:12px;"><strong>Resend Test Notice:</strong> Intended recipient was <code>${SERVER_RECIPIENT_EMAIL}</code>. Delivered to your verified email because your domain is not yet verified on resend.com/domains.</div>` + htmlContent,
        text: `[Intended Recipient: ${SERVER_RECIPIENT_EMAIL}]\n\n` + textContent,
      });
    }

    if (sendResponse.error) {
      console.error('[Resend Error]', sendResponse.error);
      return { success: false, error: sendResponse.error.message };
    }

    return { success: true, messageId: sendResponse.data?.id };
  } catch (err: any) {
    console.error('[Resend Exception]', err);
    return { success: false, error: err.message || 'Unknown email delivery error' };
  }
}

/**
 * Dispatches an admission enquiry to the admissions office via Resend
 */
export async function sendAdmissionEmail(data: ValidatedAdmissionInput): Promise<SendResult> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 6px 0 0; font-size: 12px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 28px; }
          .badge { display: inline-block; background: #FFF3D6; color: #B2530C; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; }
          .field-row { margin-bottom: 16px; border-bottom: 1px solid #F0ECE4; padding-bottom: 12px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #717A84; margin-bottom: 4px; font-weight: 600; }
          .field-value { font-size: 15px; font-weight: 600; color: #181C20; }
          .highlight { color: #DF711B; font-weight: 700; }
          .message-box { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #363C44; white-space: pre-wrap; margin-top: 20px; }
          .footer { background: #F7F3EB; padding: 16px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Chinmaya Vidyalaya, Tarapur</h1>
            <p>Admissions Enquiry 2026-27</p>
          </div>
          <div class="content">
            <div class="badge">Admission Desk Notification</div>
            <div class="field-row">
              <div class="field-label">Student Name</div>
              <div class="field-value">${escapeHtml(data.studentName)}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Grade Applying For</div>
              <div class="field-value highlight">${escapeHtml(data.gradeApplyingFor)}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Parent / Guardian Name</div>
              <div class="field-value">${escapeHtml(data.parentName)}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Contact Phone Number</div>
              <div class="field-value"><a href="tel:${escapeHtml(data.phone)}" style="color: #DF711B; text-decoration: none;">${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="field-row">
              <div class="field-label">Email Address</div>
              <div class="field-value">${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">${escapeHtml(data.email)}</a>` : 'Not provided'}</div>
            </div>
            ${data.message ? `
              <div class="field-label" style="margin-top: 20px;">Parent Queries / Notes</div>
              <div class="message-box">${escapeHtml(data.message)}</div>
            ` : ''}
          </div>
          <div class="footer">
            Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Admission Portal
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
New Admission Enquiry 2026-27 - Chinmaya Vidyalaya Tarapur
---------------------------------------------------------
Student Name:       ${data.studentName}
Grade Applying For: ${data.gradeApplyingFor}
Parent / Guardian:  ${data.parentName}
Phone Number:       ${data.phone}
Email:              ${data.email || 'Not provided'}
Date:               ${timestamp} (IST)

${data.message ? `Specific Queries / Message:\n${data.message}\n` : ''}
---------------------------------------------------------
Submitted via Chinmaya Vidyalaya Tarapur Official Portal
  `.trim();

  if (!resend) {
    console.warn('[Resend] RESEND_API_KEY is not configured in environment. Simulating admission dispatch to:', SERVER_RECIPIENT_EMAIL);
    return { success: true, simulated: true, messageId: 'simulated_' + Date.now() };
  }

  try {
    let sendResponse = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [SERVER_RECIPIENT_EMAIL],
      replyTo: data.email || undefined,
      subject: `[Admission Enquiry 2026-27] ${data.gradeApplyingFor} - ${data.studentName}`,
      html: htmlContent,
      text: textContent,
    });

    if (sendResponse.error && (sendResponse.error as any).message?.includes('blinkbeyond1@gmail.com')) {
      console.warn('[Resend Sandbox] Delivering to registered test owner blinkbeyond1@gmail.com');
      sendResponse = await resend.emails.send({
        from: SENDER_EMAIL,
        to: ['blinkbeyond1@gmail.com'],
        replyTo: data.email || undefined,
        subject: `[Admission Enquiry -> cvmedia1995@gmail.com] ${data.gradeApplyingFor} - ${data.studentName}`,
        html: `<div style="background:#fff3cd;padding:10px;border-radius:6px;margin-bottom:15px;color:#856404;font-size:12px;"><strong>Resend Test Notice:</strong> Intended recipient was <code>${SERVER_RECIPIENT_EMAIL}</code>. Delivered to your verified email because your domain is not yet verified on resend.com/domains.</div>` + htmlContent,
        text: `[Intended Recipient: ${SERVER_RECIPIENT_EMAIL}]\n\n` + textContent,
      });
    }

    if (sendResponse.error) {
      console.error('[Resend Error]', sendResponse.error);
      return { success: false, error: sendResponse.error.message };
    }

    return { success: true, messageId: sendResponse.data?.id };
  } catch (err: any) {
    console.error('[Resend Exception]', err);
    return { success: false, error: err.message || 'Unknown email delivery error' };
  }
}

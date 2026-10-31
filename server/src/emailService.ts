import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { 
  ValidatedContactInput, 
  ValidatedAdmissionInput, 
  ValidatedAlumniInput, 
  ValidatedCareerInput 
} from './validation';

// Department Designated Recipient Emails (Configurable via environment variables)
export const DEPARTMENT_EMAILS = {
  admissions: (process.env.ADMISSION_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  alumni: (process.env.ALUMNI_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  careers: (process.env.CAREERS_EMAIL || process.env.TEACHING_STAFF_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  general: (process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  principal: (process.env.PRINCIPAL_EMAIL || 'cv.principal@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
};

export interface SendResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
  recipient?: string;
  provider?: 'smtp' | 'resend' | 'local_storage';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Record every submission to local disk so no lead or inquiry is ever lost
 */
export function recordSubmission(
  type: string,
  department: string,
  recipient: string,
  data: any,
  deliveryStatus: { delivered: boolean; provider?: string; error?: string }
) {
  try {
    const dataDir = path.resolve(process.cwd(), 'server', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'submissions.json');
    let records: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        records = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch {
        records = [];
      }
    }
    const newRecord = {
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      type,
      department,
      recipient,
      data,
      deliveryStatus,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    records.unshift(newRecord);
    if (records.length > 500) records = records.slice(0, 500);
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf8');
    return newRecord;
  } catch (err) {
    console.error('[RecordSubmission Error]:', err);
    return null;
  }
}

export function getRecordedSubmissions(): any[] {
  try {
    const filePath = path.resolve(process.cwd(), 'server', 'data', 'submissions.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error('[GetRecordedSubmissions Error]:', err);
  }
  return [];
}

/**
 * Get configured SMTP Transporter if credentials exist
 */
function getSmtpTransporter() {
  const user = process.env.SMTP_USER?.trim().replace(/^["']|["']$/g, '');
  const pass = process.env.SMTP_PASS?.trim().replace(/^["']|["']$/g, '');
  if (!user || !pass) return null;

  const isGmail = user.includes('@gmail.com');
  const host = process.env.SMTP_HOST?.trim().replace(/^["']|["']$/g, '') || (isGmail ? 'smtp.gmail.com' : undefined);
  const port = Number(process.env.SMTP_PORT) || (isGmail ? 465 : 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Unified email dispatch supporting:
 * 1. SMTP (Nodemailer e.g. Gmail App Password, school mail server)
 * 2. Resend API
 * 3. Local disk persistence (guaranteed no data loss)
 */
export async function sendEmailUnified(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  type: string;
  department: string;
  rawPayload: any;
}): Promise<SendResult> {
  const smtp = getSmtpTransporter();
  const resendApiKey = process.env.RESEND_API_KEY?.trim().replace(/^["']|["']$/g, '');
  const resend = resendApiKey ? new Resend(resendApiKey) : null;
  
  const fromAddress = 
    process.env.SMTP_FROM || 
    process.env.RESEND_FROM_EMAIL || 
    (process.env.SMTP_USER ? `Chinmaya Vidyalaya Tarapur <${process.env.SMTP_USER}>` : 'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>');

  // 1. Try SMTP if configured
  if (smtp) {
    try {
      console.log(`[Email Service - SMTP] Attempting dispatch to ${opts.to} via SMTP...`);
      const info = await smtp.sendMail({
        from: fromAddress,
        to: opts.to,
        replyTo: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      });

      console.log(`[Email Service - SMTP] Success! Message ID: ${info.messageId} to ${opts.to}`);
      recordSubmission(opts.type, opts.department, opts.to, opts.rawPayload, {
        delivered: true,
        provider: 'smtp'
      });

      return {
        success: true,
        messageId: info.messageId,
        recipient: opts.to,
        provider: 'smtp'
      };
    } catch (smtpErr: any) {
      console.error('[Email Service - SMTP Error]:', smtpErr.message || smtpErr);
      if (!resend) {
        recordSubmission(opts.type, opts.department, opts.to, opts.rawPayload, {
          delivered: false,
          provider: 'smtp',
          error: smtpErr.message
        });
        return {
          success: false,
          error: `SMTP delivery failed: ${smtpErr.message}`,
          recipient: opts.to
        };
      }
    }
  }

  // 2. Try Resend if configured
  if (resend) {
    try {
      console.log(`[Email Service - Resend] Attempting dispatch to ${opts.to} via Resend...`);
      const sendResponse = await resend.emails.send({
        from: fromAddress,
        to: [opts.to],
        replyTo: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      });

      if (sendResponse.error) {
        console.error('[Email Service - Resend Error]:', sendResponse.error);

        // Auto-recovery for Resend free tier: if external domain unverified, forward to verified account email
        const match = sendResponse.error.message?.match(/\(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)/);
        if (match && match[1] && match[1].toLowerCase() !== opts.to.toLowerCase()) {
          const fallbackRecipient = match[1].toLowerCase();
          console.warn(`[Email Service - Resend Recovery] Re-routing to verified account inbox: ${fallbackRecipient}`);
          const fallbackRes = await resend.emails.send({
            from: fromAddress,
            to: [fallbackRecipient],
            replyTo: opts.replyTo,
            subject: `[Chinmaya Vidyalaya] ${opts.subject}`,
            html: `<div style="background:#FFF3CD;padding:14px;border-left:4px solid #FFA000;margin-bottom:20px;font-family:sans-serif;font-size:13px;line-height:1.5;">
              <strong>📬 Inbound Notification:</strong> Designated recipient was <code>${opts.to}</code>. Because custom domain verification is pending on Resend, this notification has been safely delivered to your verified Resend account inbox (<code>${fallbackRecipient}</code>).
            </div>` + opts.html,
            text: `[Designated recipient: ${opts.to}. Delivered to ${fallbackRecipient} while custom domain verification is pending]\n\n` + opts.text,
          });

          if (!fallbackRes.error) {
            console.log(`[Email Service - Resend Recovery Success] Delivered to ${fallbackRecipient} (ID: ${fallbackRes.data?.id})`);
            recordSubmission(opts.type, opts.department, fallbackRecipient, opts.rawPayload, {
              delivered: true,
              provider: 'resend'
            });
            return {
              success: true,
              messageId: fallbackRes.data?.id,
              recipient: fallbackRecipient,
              provider: 'resend'
            };
          }
        }

        recordSubmission(opts.type, opts.department, opts.to, opts.rawPayload, {
          delivered: false,
          provider: 'resend',
          error: sendResponse.error.message
        });
        return {
          success: false,
          error: sendResponse.error.message,
          recipient: opts.to
        };
      }

      console.log(`[Email Service - Resend] Success! Message ID: ${sendResponse.data?.id} to ${opts.to}`);
      recordSubmission(opts.type, opts.department, opts.to, opts.rawPayload, {
        delivered: true,
        provider: 'resend'
      });

      return {
        success: true,
        messageId: sendResponse.data?.id,
        recipient: opts.to,
        provider: 'resend'
      };
    } catch (resendErr: any) {
      console.error('[Email Service - Resend Exception]:', resendErr.message || resendErr);
      recordSubmission(opts.type, opts.department, opts.to, opts.rawPayload, {
        delivered: false,
        provider: 'resend',
        error: resendErr.message
      });
      return {
        success: false,
        error: resendErr.message || 'Resend provider error',
        recipient: opts.to
      };
    }
  }

  // 3. Fallback: Local Simulation & Persistent Storage (Credentials Not Set)
  console.warn(`======================================================`);
  console.warn(`[Email Service] NO EMAIL CREDENTIALS CONFIGURED`);
  console.warn(`Incoming submission saved to server/data/submissions.json`);
  console.warn(`Type: ${opts.type} | Department: ${opts.department}`);
  console.warn(`Designated Recipient: ${opts.to}`);
  console.warn(`Subject: ${opts.subject}`);
  console.warn(`======================================================`);

  recordSubmission(opts.type, opts.department, opts.to, opts.rawPayload, {
    delivered: false,
    provider: 'local_storage',
    error: 'No active email provider credentials configured in .env'
  });

  return {
    success: true,
    simulated: true,
    messageId: 'stored_' + Date.now(),
    recipient: opts.to,
    provider: 'local_storage'
  };
}

/* ─────────────────────────────────────────────────────────────
   1. ADMISSIONS INQUIRY EMAIL
   ───────────────────────────────────────────────────────────── */
export async function sendAdmissionEmail(data: ValidatedAdmissionInput): Promise<SendResult> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = DEPARTMENT_EMAILS.admissions;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.95; letter-spacing: 1px; text-transform: uppercase; }
          .dept-badge { display: inline-block; background: #FFF3D6; color: #B2530C; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #FDE49C; }
          .content { padding: 30px 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .highlight { color: #DF711B; font-weight: 800; font-size: 16px; }
          .message-box { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #363C44; white-space: pre-wrap; margin-top: 14px; }
          .footer { background: #F7F3EB; padding: 16px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Official Admission Desk • Incoming Notification</p>
          </div>
          <div class="content">
            <div class="dept-badge">🎯 Designated Department: Admissions Office (2026-27)</div>
            
            <div class="row">
              <div class="label">Target Recipient Inbox</div>
              <div class="value">${escapeHtml(recipientEmail)}</div>
            </div>
            <div class="row">
              <div class="label">Student Full Name</div>
              <div class="value highlight">${escapeHtml(data.studentName)}</div>
            </div>
            <div class="row">
              <div class="label">Grade / Standard Applying For</div>
              <div class="value highlight">${escapeHtml(data.gradeApplyingFor)}</div>
            </div>
            <div class="row">
              <div class="label">Parent / Guardian Name</div>
              <div class="value">${escapeHtml(data.parentName)}</div>
            </div>
            <div class="row">
              <div class="label">Primary Contact Phone</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #DF711B; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value">${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">✉️ ${escapeHtml(data.email)}</a>` : 'Not provided'}</div>
            </div>
            ${data.message ? `
              <div class="label" style="margin-top: 16px;">Parent Queries / Special Notes</div>
              <div class="message-box">${escapeHtml(data.message)}</div>
            ` : ''}
          </div>
          <div class="footer">
            Submitted via Chinmaya Vidyalaya Tarapur Official Portal<br>
            Timestamp: ${timestamp} (IST)
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
[INCOMING ADMISSION ENQUIRY]
Department: Admissions Office
Designated Recipient: ${recipientEmail}
---------------------------------------------------------
Student Name:       ${data.studentName}
Grade Applying For: ${data.gradeApplyingFor}
Parent / Guardian:  ${data.parentName}
Contact Phone:      ${data.phone}
Email Address:      ${data.email || 'Not provided'}
Date & Time:        ${timestamp} (IST)

Queries / Notes:
${data.message || 'None'}
---------------------------------------------------------
Official Portal Form Submission - Chinmaya Vidyalaya Tarapur
  `.trim();

  const subject = `[ADMISSIONS DESK] New Enquiry • Class: ${data.gradeApplyingFor} • Student: ${data.studentName} (Parent: ${data.parentName})`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email || undefined,
    subject,
    html: htmlContent,
    text: textContent,
    type: 'admission',
    department: 'Admissions Office',
    rawPayload: data
  });
}

/* ─────────────────────────────────────────────────────────────
   2. ALUMNI REGISTRATION EMAIL
   ───────────────────────────────────────────────────────────── */
export async function sendAlumniEmail(data: ValidatedAlumniInput): Promise<SendResult> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = DEPARTMENT_EMAILS.alumni;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0B1E34; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.9; letter-spacing: 1px; text-transform: uppercase; color: #FFB740; }
          .dept-badge { display: inline-block; background: #E0E7FF; color: #3730A3; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #C7D2FE; }
          .content { padding: 30px 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .highlight { color: #0B1E34; font-weight: 800; font-size: 16px; }
          .badge-mentor { display: inline-block; background: #DCFCE7; color: #166534; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px; }
          .message-box { background: #FAF8F5; border-left: 4px solid #0B1E34; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #363C44; white-space: pre-wrap; margin-top: 14px; }
          .footer { background: #F7F3EB; padding: 16px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Alumni Relations & Network • Incoming Registration</p>
          </div>
          <div class="content">
            <div class="dept-badge">🎓 Designated Department: Alumni Relations & Network</div>
            
            <div class="row">
              <div class="label">Target Recipient Inbox</div>
              <div class="value">${escapeHtml(recipientEmail)}</div>
            </div>
            <div class="row">
              <div class="label">Alumni Full Name</div>
              <div class="value highlight">${escapeHtml(data.fullName)}</div>
            </div>
            <div class="row">
              <div class="label">Passing Batch Year</div>
              <div class="value highlight" style="color: #DF711B;">Class of ${escapeHtml(data.batchYear)}</div>
            </div>
            <div class="row">
              <div class="label">Current Profession & Organization</div>
              <div class="value">${escapeHtml(data.profession)}${data.organization ? ` at ${escapeHtml(data.organization)}` : ''}</div>
            </div>
            <div class="row">
              <div class="label">Current Location / City</div>
              <div class="value">${escapeHtml(data.currentCity)}</div>
            </div>
            <div class="row">
              <div class="label">Phone / WhatsApp Number</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #0B1E34; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #0B1E34;">✉️ ${escapeHtml(data.email)}</a></div>
            </div>
            <div class="row">
              <div class="label">Willingness to Mentor Vidyalaya Students</div>
              <div class="value">${data.willingToMentor ? '<span class="badge-mentor">✓ YES, Open to mentoring & career talks</span>' : '<span style="color: #717A84;">Not at this time</span>'}</div>
            </div>
            ${data.message ? `
              <div class="label" style="margin-top: 16px;">Message / Campus Memories</div>
              <div class="message-box">${escapeHtml(data.message)}</div>
            ` : ''}
          </div>
          <div class="footer">
            Submitted via Chinmaya Vidyalaya Tarapur Official Alumni Portal<br>
            Timestamp: ${timestamp} (IST)
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
[INCOMING ALUMNI REGISTRATION]
Department: Alumni Relations & Network
Designated Recipient: ${recipientEmail}
---------------------------------------------------------
Alumni Name:        ${data.fullName}
Passing Batch:      Class of ${data.batchYear}
Current Profession: ${data.profession} ${data.organization ? `(${data.organization})` : ''}
Current City:       ${data.currentCity}
Contact Phone:      ${data.phone}
Email Address:      ${data.email}
Mentorship Support: ${data.willingToMentor ? 'YES' : 'NO'}
Date & Time:        ${timestamp} (IST)

Message / Memories:
${data.message || 'None'}
---------------------------------------------------------
Official Alumni Portal - Chinmaya Vidyalaya Tarapur
  `.trim();

  const subject = `[ALUMNI NETWORK] New Registration • Batch: ${data.batchYear} • ${data.fullName} (${data.profession})`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email,
    subject,
    html: htmlContent,
    text: textContent,
    type: 'alumni',
    department: 'Alumni Relations',
    rawPayload: data
  });
}

/* ─────────────────────────────────────────────────────────────
   3. TEACHING STAFF & FACULTY APPLICATION EMAIL
   ───────────────────────────────────────────────────────────── */
export async function sendCareerEmail(data: ValidatedCareerInput): Promise<SendResult> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = DEPARTMENT_EMAILS.careers;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #1E3A8A; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.95; letter-spacing: 1px; text-transform: uppercase; color: #93C5FD; }
          .dept-badge { display: inline-block; background: #DBEAFE; color: #1E40AF; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #BFDBFE; }
          .content { padding: 30px 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .highlight { color: #1E3A8A; font-weight: 800; font-size: 16px; }
          .message-box { background: #FAF8F5; border-left: 4px solid #1E3A8A; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #363C44; white-space: pre-wrap; margin-top: 14px; }
          .footer { background: #F7F3EB; padding: 16px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Teaching Staff & Faculty Recruitment Desk</p>
          </div>
          <div class="content">
            <div class="dept-badge">📋 Designated Department: Teaching Staff & Faculty Recruitment</div>
            
            <div class="row">
              <div class="label">Target Recipient Inbox</div>
              <div class="value">${escapeHtml(recipientEmail)}</div>
            </div>
            <div class="row">
              <div class="label">Position Applied For</div>
              <div class="value highlight" style="color: #DF711B;">${escapeHtml(data.position)}</div>
            </div>
            <div class="row">
              <div class="label">Applicant Full Name</div>
              <div class="value highlight">${escapeHtml(data.name)}</div>
            </div>
            <div class="row">
              <div class="label">Highest Qualification</div>
              <div class="value">${escapeHtml(data.qualification)}</div>
            </div>
            <div class="row">
              <div class="label">Teaching Experience</div>
              <div class="value">${escapeHtml(data.experience)}</div>
            </div>
            <div class="row">
              <div class="label">Contact Phone Number</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #1E3A8A; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #1E3A8A;">✉️ ${escapeHtml(data.email)}</a></div>
            </div>
            ${data.message ? `
              <div class="label" style="margin-top: 16px;">Cover Statement / Teaching Philosophy</div>
              <div class="message-box">${escapeHtml(data.message)}</div>
            ` : ''}
          </div>
          <div class="footer">
            Submitted via Chinmaya Vidyalaya Tarapur Official Careers Portal<br>
            Timestamp: ${timestamp} (IST)
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
[INCOMING TEACHING STAFF APPLICATION]
Department: Teaching Staff & Faculty Recruitment
Designated Recipient: ${recipientEmail}
---------------------------------------------------------
Position Applied:   ${data.position}
Applicant Name:     ${data.name}
Qualification:      ${data.qualification}
Experience:         ${data.experience}
Contact Phone:      ${data.phone}
Email Address:      ${data.email}
Date & Time:        ${timestamp} (IST)

Cover Statement:
${data.message || 'None'}
---------------------------------------------------------
Official Careers Portal - Chinmaya Vidyalaya Tarapur
  `.trim();

  const subject = `[TEACHING FACULTY APPLICATION] Position: ${data.position} • Candidate: ${data.name} (${data.qualification})`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email,
    subject,
    html: htmlContent,
    text: textContent,
    type: 'career',
    department: 'Teaching Faculty & Recruitment',
    rawPayload: data
  });
}

/* ─────────────────────────────────────────────────────────────
   4. GENERAL CONTACT / ADMINISTRATION EMAIL
   ───────────────────────────────────────────────────────────── */
export async function sendContactEmail(data: ValidatedContactInput): Promise<SendResult> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  let recipientEmail = DEPARTMENT_EMAILS.general;
  let deptTitle = 'General Administration';
  let badgeColor = '#FFF3D6';
  let badgeText = '#B2530C';
  let subjectPrefix = '[GENERAL INQUIRY]';

  if (data.department === 'admissions') {
    recipientEmail = DEPARTMENT_EMAILS.admissions;
    deptTitle = 'Admissions Office';
    subjectPrefix = '[ADMISSIONS INQUIRY]';
  } else if (data.department === 'alumni') {
    recipientEmail = DEPARTMENT_EMAILS.alumni;
    deptTitle = 'Alumni Relations';
    subjectPrefix = '[ALUMNI INQUIRY]';
  } else if (data.department === 'teaching_staff') {
    recipientEmail = DEPARTMENT_EMAILS.careers;
    deptTitle = 'Teaching Faculty & Recruitment';
    subjectPrefix = '[TEACHING STAFF INQUIRY]';
  } else if (data.department === 'principal') {
    recipientEmail = DEPARTMENT_EMAILS.principal;
    deptTitle = 'Principal Office Escalation';
    subjectPrefix = '[PRINCIPAL OFFICE]';
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.95; letter-spacing: 1px; text-transform: uppercase; }
          .dept-badge { display: inline-block; background: ${badgeColor}; color: ${badgeText}; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #FDE49C; }
          .content { padding: 30px 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .message-box { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #363C44; white-space: pre-wrap; margin-top: 14px; }
          .footer { background: #F7F3EB; padding: 16px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Official Portal Message • Department Notification</p>
          </div>
          <div class="content">
            <div class="dept-badge">📌 Designated Department: ${escapeHtml(deptTitle)}</div>
            
            <div class="row">
              <div class="label">Target Recipient Inbox</div>
              <div class="value">${escapeHtml(recipientEmail)}</div>
            </div>
            <div class="row">
              <div class="label">Sender Full Name</div>
              <div class="value" style="font-weight: 800;">${escapeHtml(data.fullName)}</div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">✉️ ${escapeHtml(data.email)}</a></div>
            </div>
            <div class="row">
              <div class="label">Contact Phone</div>
              <div class="value">${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" style="color: #DF711B; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a>` : 'Not provided'}</div>
            </div>
            <div class="row">
              <div class="label">Subject</div>
              <div class="value">${escapeHtml(data.subject || 'General Enquiry')}</div>
            </div>
            <div class="label" style="margin-top: 16px;">Inquiry Details / Message</div>
            <div class="message-box">${escapeHtml(data.message)}</div>
          </div>
          <div class="footer">
            Submitted via Chinmaya Vidyalaya Tarapur Official Portal<br>
            Timestamp: ${timestamp} (IST)
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
[INCOMING PORTAL INQUIRY]
Department: ${deptTitle}
Designated Recipient: ${recipientEmail}
---------------------------------------------------------
Sender Name:   ${data.fullName}
Email Address: ${data.email}
Phone Number:  ${data.phone || 'Not provided'}
Subject:       ${data.subject || 'General Enquiry'}
Date & Time:   ${timestamp} (IST)

Message:
${data.message}
---------------------------------------------------------
Official Portal Form Submission - Chinmaya Vidyalaya Tarapur
  `.trim();

  const subject = `${subjectPrefix} ${data.subject || 'New Message'} • From: ${data.fullName}`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email,
    subject,
    html: htmlContent,
    text: textContent,
    type: 'contact',
    department: deptTitle,
    rawPayload: data
  });
}

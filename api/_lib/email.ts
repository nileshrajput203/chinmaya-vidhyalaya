import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export const DEPARTMENT_EMAILS = {
  admissions: (process.env.ADMISSION_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  alumni: (process.env.ALUMNI_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  careers: (process.env.CAREERS_EMAIL || process.env.TEACHING_STAFF_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  general: (process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
  principal: (process.env.PRINCIPAL_EMAIL || 'cv.principal@chinmayamission.com').trim().replace(/^["']|["']$/g, ''),
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    tls: { rejectUnauthorized: false }
  });
}

export async function sendEmailUnified(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  type: string;
  department: string;
  rawPayload: any;
}) {
  const smtp = getSmtpTransporter();
  const resendApiKey = process.env.RESEND_API_KEY?.trim().replace(/^["']|["']$/g, '');
  const resend = resendApiKey ? new Resend(resendApiKey) : null;
  const fromAddress = 
    process.env.SMTP_FROM || 
    process.env.RESEND_FROM_EMAIL || 
    (process.env.SMTP_USER ? `Chinmaya Vidyalaya Tarapur <${process.env.SMTP_USER}>` : 'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>');

  // 1. SMTP
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: fromAddress,
        to: opts.to,
        replyTo: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      });
      return { success: true, messageId: info.messageId, recipient: opts.to, provider: 'smtp' };
    } catch (err: any) {
      console.error('[Vercel SMTP Error]:', err);
      if (!resend) throw err;
    }
  }

  // 2. Resend
  if (resend) {
    const sendResponse = await resend.emails.send({
      from: fromAddress,
      to: [opts.to],
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    if (sendResponse.error) throw new Error(sendResponse.error.message);
    return { success: true, id: sendResponse.data?.id, recipient: opts.to, provider: 'resend' };
  }

  // 3. Fallback simulation
  console.warn('[Vercel Email] Simulated dispatch to:', opts.to);
  return { success: true, simulated: true, recipient: opts.to, provider: 'local_storage' };
}

/* 1. ADMISSION NOTIFICATION */
export async function sendAdmissionNotification(data: {
  parentName: string;
  studentName: string;
  gradeApplyingFor: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = DEPARTMENT_EMAILS.admissions;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.95; letter-spacing: 1px; text-transform: uppercase; }
          .dept-badge { display: inline-block; background: #FFF3D6; color: #B2530C; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #FDE49C; }
          .body { padding: 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .highlight { color: #DF711B; font-weight: 800; }
          .msg { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; color: #363C44; }
          .footer { background: #F7F3EB; padding: 14px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Official Admission Desk • Incoming Notification</p>
          </div>
          <div class="body">
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
              <div class="label">Grade Applying For</div>
              <div class="value highlight">${escapeHtml(data.gradeApplyingFor)}</div>
            </div>
            <div class="row">
              <div class="label">Parent / Guardian Name</div>
              <div class="value">${escapeHtml(data.parentName)}</div>
            </div>
            <div class="row">
              <div class="label">Contact Phone</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #DF711B; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value">${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color: #DF711B;">✉️ ${escapeHtml(data.email)}</a>` : 'Not provided'}</div>
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

  const text = `[INCOMING ADMISSION ENQUIRY]\nDepartment: Admissions Office\nRecipient: ${recipientEmail}\n\nStudent: ${data.studentName}\nGrade: ${data.gradeApplyingFor}\nParent: ${data.parentName}\nPhone: ${data.phone}\nEmail: ${data.email || 'Not provided'}\nDate: ${timestamp} (IST)\n\nQueries:\n${data.message || 'None'}`;
  const subject = `[ADMISSIONS DESK] New Enquiry • Class: ${data.gradeApplyingFor} • Student: ${data.studentName} (Parent: ${data.parentName})`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email || undefined,
    subject,
    html,
    text,
    type: 'admission',
    department: 'Admissions Office',
    rawPayload: data
  });
}

/* 2. ALUMNI NOTIFICATION */
export async function sendAlumniNotification(data: {
  fullName: string;
  batchYear: string;
  email: string;
  phone: string;
  currentCity: string;
  profession: string;
  organization?: string;
  willingToMentor?: boolean;
  message?: string;
}) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = DEPARTMENT_EMAILS.alumni;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0B1E34; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.95; letter-spacing: 1px; text-transform: uppercase; color: #FFB740; }
          .dept-badge { display: inline-block; background: #E0E7FF; color: #3730A3; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #C7D2FE; }
          .body { padding: 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .highlight { color: #0B1E34; font-weight: 800; }
          .msg { background: #FAF8F5; border-left: 4px solid #0B1E34; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; color: #363C44; }
          .footer { background: #F7F3EB; padding: 14px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Alumni Relations & Network • Incoming Registration</p>
          </div>
          <div class="body">
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
              <div class="label">Passing Batch</div>
              <div class="value highlight" style="color: #DF711B;">Class of ${escapeHtml(data.batchYear)}</div>
            </div>
            <div class="row">
              <div class="label">Profession & Organization</div>
              <div class="value">${escapeHtml(data.profession)}${data.organization ? ` at ${escapeHtml(data.organization)}` : ''}</div>
            </div>
            <div class="row">
              <div class="label">Current Location / City</div>
              <div class="value">${escapeHtml(data.currentCity)}</div>
            </div>
            <div class="row">
              <div class="label">Phone / WhatsApp</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #0B1E34; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #0B1E34;">✉️ ${escapeHtml(data.email)}</a></div>
            </div>
            <div class="row">
              <div class="label">Mentorship Availability</div>
              <div class="value">${data.willingToMentor ? '✓ YES, Open to mentoring Vidyalaya students' : 'Not at this time'}</div>
            </div>
            ${data.message ? `
              <div class="label" style="margin-top: 16px;">Memories / Message</div>
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

  const text = `[INCOMING ALUMNI REGISTRATION]\nDepartment: Alumni Relations\nRecipient: ${recipientEmail}\n\nName: ${data.fullName}\nBatch: ${data.batchYear}\nProfession: ${data.profession} ${data.organization ? `(${data.organization})` : ''}\nCity: ${data.currentCity}\nPhone: ${data.phone}\nEmail: ${data.email}\nMentorship: ${data.willingToMentor ? 'YES' : 'NO'}\nDate: ${timestamp} (IST)\n\nMessage:\n${data.message || 'None'}`;
  const subject = `[ALUMNI NETWORK] New Registration • Batch: ${data.batchYear} • ${data.fullName} (${data.profession})`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email,
    subject,
    html,
    text,
    type: 'alumni',
    department: 'Alumni Relations',
    rawPayload: data
  });
}

/* 3. CAREER / TEACHING STAFF NOTIFICATION */
export async function sendCareerNotification(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  qualification: string;
  experience: string;
  message?: string;
}) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const recipientEmail = DEPARTMENT_EMAILS.careers;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #1E3A8A; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .header p { margin: 4px 0 0; font-size: 12px; opacity: 0.95; letter-spacing: 1px; text-transform: uppercase; color: #93C5FD; }
          .dept-badge { display: inline-block; background: #DBEAFE; color: #1E40AF; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; border: 1px solid #BFDBFE; }
          .body { padding: 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; letter-spacing: 0.5px; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 3px; }
          .highlight { color: #1E3A8A; font-weight: 800; }
          .msg { background: #FAF8F5; border-left: 4px solid #1E3A8A; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; color: #363C44; }
          .footer { background: #F7F3EB; padding: 14px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p>Teaching Staff & Faculty Recruitment Desk</p>
          </div>
          <div class="body">
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
              <div class="label">Total Experience</div>
              <div class="value">${escapeHtml(data.experience)}</div>
            </div>
            <div class="row">
              <div class="label">Contact Phone</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color: #1E3A8A; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(data.phone)}</a></div>
            </div>
            <div class="row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #1E3A8A;">✉️ ${escapeHtml(data.email)}</a></div>
            </div>
            ${data.message ? `
              <div class="label" style="margin-top: 16px;">Cover Statement / Philosophy</div>
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

  const text = `[INCOMING TEACHING STAFF APPLICATION]\nDepartment: Teaching Staff & Faculty Recruitment\nRecipient: ${recipientEmail}\n\nPosition: ${data.position}\nName: ${data.name}\nQualification: ${data.qualification}\nExperience: ${data.experience}\nPhone: ${data.phone}\nEmail: ${data.email}\nDate: ${timestamp} (IST)\n\nCover Statement:\n${data.message || 'None'}`;
  const subject = `[TEACHING FACULTY APPLICATION] Position: ${data.position} • Candidate: ${data.name} (${data.qualification})`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email,
    subject,
    html,
    text,
    type: 'career',
    department: 'Teaching Faculty & Recruitment',
    rawPayload: data
  });
}

/* 4. CONTACT NOTIFICATION */
export async function sendContactNotification(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  department?: string;
  message: string;
}) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  let recipientEmail = DEPARTMENT_EMAILS.general;
  let deptTitle = 'General Administration';
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

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; margin: 0; padding: 24px; color: #181C20; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2D8; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #DF711B; padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
          .body { padding: 28px; }
          .row { margin-bottom: 14px; border-bottom: 1px solid #F0ECE4; padding-bottom: 10px; }
          .label { font-size: 11px; text-transform: uppercase; color: #717A84; font-weight: 700; }
          .value { font-size: 15px; font-weight: 600; color: #181C20; margin-top: 2px; }
          .msg { background: #FAF8F5; border-left: 4px solid #DF711B; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; margin-top: 16px; white-space: pre-wrap; }
          .footer { background: #F7F3EB; padding: 14px 28px; font-size: 12px; color: #717A84; text-align: center; border-top: 1px solid #E7E2D8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>CHINMAYA VIDYALAYA, TARAPUR</h1>
            <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.95;">Incoming Portal Message</p>
          </div>
          <div class="body">
            <div style="display:inline-block;background:#FFF3D6;color:#B2530C;font-size:11px;font-weight:800;padding:4px 10px;border-radius:12px;margin-bottom:16px;">
              📌 Designated Department: ${escapeHtml(deptTitle)}
            </div>
            <div class="row">
              <div class="label">Target Recipient Inbox</div>
              <div class="value">${escapeHtml(recipientEmail)}</div>
            </div>
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

  const text = `[INCOMING PORTAL INQUIRY]\nDepartment: ${deptTitle}\nRecipient: ${recipientEmail}\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nSubject: ${data.subject || 'General Enquiry'}\nDate: ${timestamp} (IST)\n\nMessage:\n${data.message}`;
  const subject = `${subjectPrefix} ${data.subject || 'New Message'} • From: ${data.fullName}`;

  return sendEmailUnified({
    to: recipientEmail,
    replyTo: data.email,
    subject,
    html,
    text,
    type: 'contact',
    department: deptTitle,
    rawPayload: data
  });
}

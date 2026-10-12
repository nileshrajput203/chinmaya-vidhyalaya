import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  // Always set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const parentName = String(body.parentName || '').replace(/[\r\n]/g, ' ').trim();
    const studentName = String(body.studentName || '').replace(/[\r\n]/g, ' ').trim();
    const gradeApplyingFor = String(body.gradeApplyingFor || body.grade || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
    const phone = String(body.phone || '').replace(/[\r\n]/g, ' ').trim();
    const email = body.email ? String(body.email).trim() : undefined;
    const message = body.message ? String(body.message).trim() : undefined;

    if (!parentName || parentName.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter parent/guardian name.' });
    }

    if (!studentName || studentName.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter student name.' });
    }

    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit phone number.' });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = (
      process.env.ADMISSION_EMAIL ||
      process.env.CONTACT_EMAIL ||
      'cvmedia1995@gmail.com'
    ).trim().replace(/^["']|["']$/g, '');
    const senderEmail = (
      process.env.RESEND_FROM_EMAIL ||
      'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>'
    ).trim().replace(/^["']|["']$/g, '');

    if (apiKey) {
      const resend = new Resend(apiKey);
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
                  <div class="value">${escapeHtml(studentName)}</div>
                </div>
                <div class="row">
                  <div class="label">Grade Applying For</div>
                  <div class="value highlight">${escapeHtml(gradeApplyingFor)}</div>
                </div>
                <div class="row">
                  <div class="label">Parent / Guardian</div>
                  <div class="value">${escapeHtml(parentName)}</div>
                </div>
                <div class="row">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${escapeHtml(phone)}" style="color: #DF711B;">${escapeHtml(phone)}</a></div>
                </div>
                <div class="row">
                  <div class="label">Email</div>
                  <div class="value">${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #DF711B;">${escapeHtml(email)}</a>` : 'Not provided'}</div>
                </div>
                ${message ? `
                  <div class="label" style="margin-top: 16px;">Queries / Message</div>
                  <div class="msg">${escapeHtml(message)}</div>
                ` : ''}
              </div>
              <div class="footer">
                Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Official Portal
              </div>
            </div>
          </body>
        </html>
      `;

      const text = `New Admission Enquiry\n\nStudent: ${studentName}\nGrade: ${gradeApplyingFor}\nParent: ${parentName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nDate: ${timestamp} (IST)\n\nMessage:\n${message || 'None'}`;

      const sendResponse = await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        replyTo: email || undefined,
        subject: `[Admission Enquiry] ${gradeApplyingFor} - ${studentName}`,
        html,
        text,
      });

      if (sendResponse.error) {
        console.error('[Resend Admission Error]:', sendResponse.error);
        return res.status(500).json({
          success: false,
          error: sendResponse.error.message || 'Unable to deliver admission enquiry via email provider.',
        });
      }
    } else {
      console.warn('[Resend API Key Not Configured] Simulating admission enquiry for:', studentName);
    }

    return res.status(200).json({
      success: true,
      message: 'Admission enquiry received! Our admissions officer will contact you shortly.',
    });
  } catch (error: any) {
    console.error('[Vercel API /api/admissions/enquiry Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unable to deliver admission enquiry at this time.',
    });
  }
}

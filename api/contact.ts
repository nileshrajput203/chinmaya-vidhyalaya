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
    const fullName = String(body.fullName || '').replace(/[\r\n]/g, ' ').trim();
    const email = String(body.email || '').trim();
    const phone = body.phone ? String(body.phone).replace(/[\r\n]/g, ' ').trim() : '';
    const subject = body.subject ? String(body.subject).replace(/[\r\n]/g, ' ').trim() : 'General Enquiry';
    const message = String(body.message || '').trim();

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name.' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!message || message.length < 5) {
      return res.status(400).json({ success: false, error: 'Please enter a message of at least 5 characters.' });
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
                  <div class="value">${escapeHtml(fullName)}</div>
                </div>
                <div class="row">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #DF711B;">${escapeHtml(email)}</a></div>
                </div>
                <div class="row">
                  <div class="label">Phone</div>
                  <div class="value">${escapeHtml(phone || 'Not provided')}</div>
                </div>
                <div class="row">
                  <div class="label">Subject</div>
                  <div class="value">${escapeHtml(subject)}</div>
                </div>
                <div class="label" style="margin-top: 16px;">Message</div>
                <div class="msg">${escapeHtml(message)}</div>
              </div>
              <div class="footer">
                Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Official Portal
              </div>
            </div>
          </body>
        </html>
      `;

      const text = `New Contact Inquiry\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\nDate: ${timestamp} (IST)\n\nMessage:\n${message}`;

      const sendResponse = await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        replyTo: email,
        subject: `[Contact Enquiry] ${subject} - ${fullName}`,
        html,
        text,
      });

      if (sendResponse.error) {
        console.error('[Resend Send Error]:', sendResponse.error);
        return res.status(500).json({
          success: false,
          error: sendResponse.error.message || 'Unable to deliver message via email provider.',
        });
      }
    } else {
      console.warn('[Resend API Key Not Configured] Simulating message dispatch for:', fullName);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out to Chinmaya Vidyalaya Tarapur. Your message has been sent to our administrative office.',
    });
  } catch (error: any) {
    console.error('[Vercel API /api/contact Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unable to deliver message at this time.',
    });
  }
}

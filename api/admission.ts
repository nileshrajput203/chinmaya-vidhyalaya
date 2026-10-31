import { Resend } from 'resend';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendViaResend(resend, opts) {
  const sendRes = await resend.emails.send({
    from: opts.from,
    to: [opts.to],
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });

  if (sendRes.error) {
    console.error('[Resend Error]:', sendRes.error);
    const match = sendRes.error.message?.match(/\(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)/);
    if (match && match[1] && match[1].toLowerCase() !== opts.to.toLowerCase()) {
      const fallbackRecipient = match[1].toLowerCase();
      console.warn('[Resend Auto-Recovery] Forwarding to verified account inbox:', fallbackRecipient);
      const fallbackRes = await resend.emails.send({
        from: opts.from,
        to: [fallbackRecipient],
        replyTo: opts.replyTo,
        subject: '[Chinmaya Vidyalaya] ' + opts.subject,
        html: '<div style="background:#FFF3CD;padding:14px;border-left:4px solid #FFA000;margin-bottom:20px;font-family:sans-serif;font-size:13px;line-height:1.5;"><strong>📬 Inbound Notification:</strong> Designated recipient was <code>' + escapeHtml(opts.to) + '</code>. Because custom domain verification is pending on Resend, this notification has been safely delivered to your verified Resend account inbox (<code>' + escapeHtml(fallbackRecipient) + '</code>).</div>' + opts.html,
        text: '[Designated recipient: ' + opts.to + '. Delivered to ' + fallbackRecipient + ' while custom domain verification is pending]\n\n' + opts.text,
      });

      if (!fallbackRes.error) {
        return { success: true, id: fallbackRes.data?.id, recipient: fallbackRecipient };
      }
    }
    throw new Error(sendRes.error.message);
  }

  return { success: true, id: sendRes.data?.id, recipient: opts.to };
}


export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const parentName = String(body.parentName || '').replace(/[\r\n]/g, ' ').trim();
    const studentName = String(body.studentName || '').replace(/[\r\n]/g, ' ').trim();
    const gradeApplyingFor = String(body.gradeApplyingFor || body.grade || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
    const phone = String(body.phone || '').replace(/[\r\n]/g, ' ').trim();
    const email = body.email ? String(body.email).trim() : undefined;
    const message = body.message ? String(body.message).trim() : undefined;

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!parentName || parentName.length < 2 || /\d/.test(parentName) || !nameRegex.test(parentName)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid parent/guardian name containing only letters (no numbers).' });
    }
    if (!studentName || studentName.length < 2 || /\d/.test(studentName) || !nameRegex.test(studentName)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid student name containing only letters (no numbers).' });
    }
    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit phone number.' });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim().replace(/^["']|["']$/g, '');
    const recipientEmail = (process.env.ADMISSION_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, '');
    const senderEmail = (process.env.RESEND_FROM_EMAIL || 'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>').trim().replace(/^["']|["']$/g, '');
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    let deliveryResult: any = { success: true, simulated: true, recipient: recipientEmail };

    if (apiKey) {
      const resend = new Resend(apiKey);
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
                  <div class="value highlight">${escapeHtml(studentName)}</div>
                </div>
                <div class="row">
                  <div class="label">Grade Applying For</div>
                  <div class="value highlight">${escapeHtml(gradeApplyingFor)}</div>
                </div>
                <div class="row">
                  <div class="label">Parent / Guardian Name</div>
                  <div class="value">${escapeHtml(parentName)}</div>
                </div>
                <div class="row">
                  <div class="label">Contact Phone</div>
                  <div class="value"><a href="tel:${escapeHtml(phone)}" style="color: #DF711B; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(phone)}</a></div>
                </div>
                <div class="row">
                  <div class="label">Email Address</div>
                  <div class="value">${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #DF711B;">✉️ ${escapeHtml(email)}</a>` : 'Not provided'}</div>
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

      const text = `[INCOMING ADMISSION ENQUIRY]\nDepartment: Admissions Office\nRecipient: ${recipientEmail}\n\nStudent: ${studentName}\nGrade: ${gradeApplyingFor}\nParent: ${parentName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nDate: ${timestamp} (IST)\n\nQueries:\n${message || 'None'}`;
      const subject = `[ADMISSIONS DESK] New Enquiry • Class: ${gradeApplyingFor} • Student: ${studentName} (Parent: ${parentName})`;

      deliveryResult = await sendViaResend(resend, {
        from: senderEmail,
        to: recipientEmail,
        replyTo: email,
        subject,
        html,
        text
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Admission enquiry received! Our admissions officer will contact you shortly.',
      recipient: deliveryResult.recipient,
      id: deliveryResult.id,
    });
  } catch (error: any) {
    console.error('[API /api/admission Error]:', error);
    return res.status(500).json({ success: false, error: error.message || 'Unable to deliver admission enquiry.' });
  }
}

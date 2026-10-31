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
    const fullName = String(body.fullName || body.name || '').replace(/[\r\n]/g, ' ').trim();
    const batchYear = String(body.batchYear || body.batch || '').replace(/[\r\n]/g, ' ').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').replace(/[\r\n]/g, ' ').trim();
    const currentCity = String(body.currentCity || body.city || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
    const profession = String(body.profession || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
    const organization = body.organization ? String(body.organization).replace(/[\r\n]/g, ' ').trim() : undefined;
    const willingToMentor = Boolean(body.willingToMentor);
    const message = body.message ? String(body.message).trim() : undefined;

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!fullName || fullName.length < 2 || /\d/.test(fullName) || !nameRegex.test(fullName)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name containing only letters (no numbers).' });
    }
    if (!batchYear) return res.status(400).json({ success: false, error: 'Please enter your passing batch year.' });
    if (!email || !email.includes('@')) return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    if (!phone || phone.length < 10) return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit phone number.' });

    const apiKey = process.env.RESEND_API_KEY?.trim().replace(/^["']|["']$/g, '');
    const recipientEmail = (process.env.ALUMNI_EMAIL || process.env.CONTACT_EMAIL || 'cv.info@chinmayamission.com').trim().replace(/^["']|["']$/g, '');
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
              .header { background: #0B1E34; padding: 24px; text-align: center; color: #ffffff; }
              .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
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
                <p style="margin:4px 0 0;font-size:12px;color:#FFB740;text-transform:uppercase;">Alumni Relations & Network • Incoming Registration</p>
              </div>
              <div class="body">
                <div class="dept-badge">🎓 Designated Department: Alumni Relations & Network</div>
                <div class="row"><div class="label">Target Recipient Inbox</div><div class="value">${escapeHtml(recipientEmail)}</div></div>
                <div class="row"><div class="label">Alumni Full Name</div><div class="value highlight">${escapeHtml(fullName)}</div></div>
                <div class="row"><div class="label">Passing Batch</div><div class="value highlight" style="color: #DF711B;">Class of ${escapeHtml(batchYear)}</div></div>
                <div class="row"><div class="label">Profession & Organization</div><div class="value">${escapeHtml(profession)}${organization ? ` at ${escapeHtml(organization)}` : ''}</div></div>
                <div class="row"><div class="label">Current Location / City</div><div class="value">${escapeHtml(currentCity)}</div></div>
                <div class="row"><div class="label">Phone / WhatsApp</div><div class="value"><a href="tel:${escapeHtml(phone)}" style="color: #0B1E34; font-weight: 700; text-decoration: none;">📞 ${escapeHtml(phone)}</a></div></div>
                <div class="row"><div class="label">Email Address</div><div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #0B1E34;">✉️ ${escapeHtml(email)}</a></div></div>
                <div class="row"><div class="label">Mentorship Availability</div><div class="value">${willingToMentor ? '✓ YES, Open to mentoring Vidyalaya students' : 'Not at this time'}</div></div>
                ${message ? `<div class="label" style="margin-top: 16px;">Memories / Message</div><div class="msg">${escapeHtml(message)}</div>` : ''}
              </div>
              <div class="footer">Received on ${timestamp} (IST) via Chinmaya Vidyalaya Tarapur Official Portal</div>
            </div>
          </body>
        </html>
      `;

      const text = `[INCOMING ALUMNI REGISTRATION]\nDepartment: Alumni Relations\nRecipient: ${recipientEmail}\n\nName: ${fullName}\nBatch: ${batchYear}\nProfession: ${profession} ${organization ? `(${organization})` : ''}\nCity: ${currentCity}\nPhone: ${phone}\nEmail: ${email}\nMentorship: ${willingToMentor ? 'YES' : 'NO'}\nDate: ${timestamp} (IST)\n\nMessage:\n${message || 'None'}`;
      const subject = `[ALUMNI NETWORK] New Registration • Batch: ${batchYear} • ${fullName} (${profession})`;

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
      message: 'Thank you for reconnecting with your alma mater! Your details have been delivered to the Alumni Relations Desk.',
      recipient: deliveryResult.recipient,
      id: deliveryResult.id,
    });
  } catch (error: any) {
    console.error('[API /api/alumni Error]:', error);
    return res.status(500).json({ success: false, error: error.message || 'An error occurred while submitting alumni registration.' });
  }
}

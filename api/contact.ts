import { sendContactNotification } from './_lib/email';

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
    const fullName = String(body.fullName || `${body.firstName || ''} ${body.lastName || ''}`).replace(/[\r\n]/g, ' ').trim();
    const email = String(body.email || '').trim();
    const phone = body.phone ? String(body.phone).replace(/[\r\n]/g, ' ').trim() : undefined;
    const subject = body.subject ? String(body.subject).replace(/[\r\n]/g, ' ').trim() : undefined;
    const department = body.department ? String(body.department).replace(/[\r\n]/g, ' ').trim() : undefined;
    const message = String(body.message || '').trim();

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!fullName || fullName.length < 2 || /\d/.test(fullName) || !nameRegex.test(fullName)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name containing only letters (no numbers).' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!message || message.length < 5) {
      return res.status(400).json({ success: false, error: 'Please enter a message of at least 5 characters.' });
    }

    const result = await sendContactNotification({
      fullName,
      email,
      phone,
      subject,
      department,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent to our designated department.',
      recipient: result.recipient,
      id: result.id,
    });
  } catch (error: any) {
    console.error('[Vercel API /api/contact Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unable to deliver message at this time.',
    });
  }
}

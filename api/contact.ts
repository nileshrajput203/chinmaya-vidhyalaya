import { sendContactNotification } from './_lib/email';

export default async function handler(req: any, res: any) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

    await sendContactNotification({
      fullName,
      email,
      phone,
      subject,
      message,
    });

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

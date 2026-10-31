import { sendAlumniNotification } from './_lib/email';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

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

    if (!batchYear) {
      return res.status(400).json({ success: false, error: 'Please enter your passing batch year.' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit phone number.' });
    }

    const result = await sendAlumniNotification({
      fullName,
      batchYear,
      email,
      phone,
      currentCity,
      profession,
      organization,
      willingToMentor,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for reconnecting with your alma mater! Your details have been delivered to the Alumni Relations Desk.',
      recipient: result.recipient,
      id: result.id,
    });
  } catch (error: any) {
    console.error('[API /api/alumni Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while submitting alumni registration.',
    });
  }
}


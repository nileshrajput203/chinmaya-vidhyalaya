import { sendCareerNotification } from './_lib/email';

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
    const name = String(body.name || body.fullName || '').replace(/[\r\n]/g, ' ').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').replace(/[\r\n]/g, ' ').trim();
    const position = String(body.position || body.role || 'Teaching Faculty').replace(/[\r\n]/g, ' ').trim();
    const qualification = String(body.qualification || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
    const experience = String(body.experience || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
    const message = body.message ? String(body.message).trim() : undefined;

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!name || name.length < 2 || /\d/.test(name) || !nameRegex.test(name)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid applicant name containing only letters (no numbers).' });
    }

    if (!position) {
      return res.status(400).json({ success: false, error: 'Please select or specify the position applied for.' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit phone number.' });
    }

    const result = await sendCareerNotification({
      name,
      email,
      phone,
      position,
      qualification,
      experience,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Your application has been received by our Faculty Recruitment Committee. We will review your profile and contact you.',
      recipient: result.recipient,
      id: result.id,
    });
  } catch (error: any) {
    console.error('[API /api/career Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while submitting application.',
    });
  }
}


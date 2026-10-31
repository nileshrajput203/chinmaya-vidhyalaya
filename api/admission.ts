import { sendAdmissionNotification } from './_lib/email';

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

    const result = await sendAdmissionNotification({
      parentName,
      studentName,
      gradeApplyingFor,
      phone,
      email,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Admission enquiry received! Our admissions officer will contact you shortly.',
      recipient: result.recipient,
      id: result.id,
    });
  } catch (error: any) {
    console.error('[Vercel API /api/admission Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unable to deliver admission enquiry at this time.',
    });
  }
}

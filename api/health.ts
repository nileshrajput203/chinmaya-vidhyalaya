export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const resendKeyPresent = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  const admissionEmailPresent = Boolean(process.env.ADMISSION_EMAIL);
  const contactEmailPresent = Boolean(process.env.CONTACT_EMAIL);
  const fromEmailPresent = Boolean(process.env.RESEND_FROM_EMAIL);

  res.status(200).json({
    status: 'ok',
    institution: 'Chinmaya Vidyalaya, Tarapur',
    affiliationNo: '1130058',
    udiseNo: '27361116004',
    resendConfigured: resendKeyPresent,
    envCheck: {
      RESEND_API_KEY: resendKeyPresent,
      RESEND_FROM_EMAIL: fromEmailPresent,
      ADMISSION_EMAIL: admissionEmailPresent,
      CONTACT_EMAIL: contactEmailPresent,
    },
    timestamp: new Date().toISOString(),
  });
}


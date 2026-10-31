import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { 
  validateContactPayload, 
  validateAdmissionPayload,
  validateAlumniPayload,
  validateCareerPayload 
} from './validation';
import { 
  sendContactEmail, 
  sendAdmissionEmail,
  sendAlumniEmail,
  sendCareerEmail,
  DEPARTMENT_EMAILS,
  getRecordedSubmissions,
  sendEmailUnified
} from './emailService';
import { isRateLimited } from './rateLimit';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health & System Status Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);

  res.json({
    status: 'ok',
    institution: 'Chinmaya Vidyalaya, Tarapur',
    affiliationNo: '1130058',
    udiseNo: '27361116004',
    emailProviders: {
      smtpConfigured: hasSmtp,
      smtpUser: hasSmtp ? process.env.SMTP_USER?.replace(/(.{3}).*(@.*)/, '$1***$2') : undefined,
      resendConfigured: hasResend,
      activeMode: hasSmtp ? 'SMTP (Direct Mailbox)' : (hasResend ? 'Resend API' : 'Local Persistence (Disk Inbox)')
    },
    departments: {
      admissions: DEPARTMENT_EMAILS.admissions,
      alumni: DEPARTMENT_EMAILS.alumni,
      careers: DEPARTMENT_EMAILS.careers,
      general: DEPARTMENT_EMAILS.general,
      principal: DEPARTMENT_EMAILS.principal,
    },
    timestamp: new Date().toISOString()
  });
});

// View all received submissions locally
app.get('/api/submissions', (_req: Request, res: Response) => {
  const submissions = getRecordedSubmissions();
  res.json({
    count: submissions.length,
    submissions
  });
});

// Test Email Endpoint (for admin / developer verification)
app.post('/api/test-email', async (req: Request, res: Response) => {
  const targetEmail = req.body?.email || DEPARTMENT_EMAILS.general;
  try {
    const result = await sendEmailUnified({
      to: targetEmail,
      subject: '[TEST] Chinmaya Vidyalaya Email Verification',
      text: 'This is a test notification confirming your email delivery service is working correctly.',
      html: '<h1>Test Email Verification</h1><p>Chinmaya Vidyalaya Tarapur email notification test succeeded.</p>',
      type: 'test',
      department: 'System Verification',
      rawPayload: { testedAt: new Date().toISOString() }
    });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Contact Form Endpoint (wired to designated department)
app.post('/api/contact', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp, 15)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before submitting again.'
    });
    return;
  }

  const validation = validateContactPayload(req.body);
  if (!validation.valid) {
    res.status(400).json({ success: false, error: validation.error });
    return;
  }

  try {
    const result = await sendContactEmail(validation.data);

    if (!result.success) {
      console.error('[API /api/contact Delivery Failure]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to deliver message at this time. Please try again or contact the school office directly.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      provider: result.provider,
      simulated: result.simulated,
      message: 'Thank you for reaching out to Chinmaya Vidyalaya Tarapur. Your message has been sent to our designated department.'
    });
  } catch (error: any) {
    console.error('[API /api/contact Server Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while sending your message.'
    });
  }
});

// Admission Enquiry Endpoint (wired to Admissions Desk)
const handleAdmissionRequest = async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp, 15)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before submitting again.'
    });
    return;
  }

  const validation = validateAdmissionPayload(req.body);
  if (!validation.valid) {
    res.status(400).json({ success: false, error: validation.error });
    return;
  }

  try {
    const result = await sendAdmissionEmail(validation.data);

    if (!result.success) {
      console.error('[API /api/admissions Delivery Failure]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to process admission enquiry at this time. Please try again or call the admissions desk.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      provider: result.provider,
      simulated: result.simulated,
      message: 'Admission enquiry received! Our admissions desk has received your request and will contact you shortly.'
    });
  } catch (error: any) {
    console.error('[API /api/admissions Server Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while submitting your enquiry.'
    });
  }
};

app.post('/api/admissions/enquiry', handleAdmissionRequest);
app.post('/api/admission', handleAdmissionRequest);

// Alumni Registration Endpoint (wired to Alumni Network Desk)
app.post('/api/alumni', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp, 15)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before submitting again.'
    });
    return;
  }

  const validation = validateAlumniPayload(req.body);
  if (!validation.valid) {
    res.status(400).json({ success: false, error: validation.error });
    return;
  }

  try {
    const result = await sendAlumniEmail(validation.data);

    if (!result.success) {
      console.error('[API /api/alumni Delivery Failure]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to submit alumni registration at this time. Please try again later.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      provider: result.provider,
      simulated: result.simulated,
      message: 'Thank you for reconnecting with your alma mater! Your details have been delivered to the Alumni Relations Desk.'
    });
  } catch (error: any) {
    console.error('[API /api/alumni Server Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while registering alumni.'
    });
  }
});

// Careers / Teaching Staff Application Endpoint (wired to Faculty Recruitment Committee)
const handleCareerRequest = async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp, 15)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before submitting again.'
    });
    return;
  }

  const validation = validateCareerPayload(req.body);
  if (!validation.valid) {
    res.status(400).json({ success: false, error: validation.error });
    return;
  }

  try {
    const result = await sendCareerEmail(validation.data);

    if (!result.success) {
      console.error('[API /api/careers Delivery Failure]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to submit teaching application at this time. Please try again or email the school directly.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      provider: result.provider,
      simulated: result.simulated,
      message: 'Your application has been received by our Faculty Recruitment Committee. We will review your profile and contact you.'
    });
  } catch (error: any) {
    console.error('[API /api/careers Server Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while submitting your application.'
    });
  }
};

app.post('/api/careers', handleCareerRequest);
app.post('/api/career', handleCareerRequest);

app.listen(PORT, () => {
  console.log(`[Chinmaya Vidyalaya Server] Running on http://localhost:${PORT}`);
  console.log(`[Department Inboxes] Admissions: ${DEPARTMENT_EMAILS.admissions} | Alumni: ${DEPARTMENT_EMAILS.alumni} | Careers: ${DEPARTMENT_EMAILS.careers} | General: ${DEPARTMENT_EMAILS.general}`);
  
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log(`[Email Service] SMTP is configured (User: ${process.env.SMTP_USER})`);
  } else if (process.env.RESEND_API_KEY) {
    console.log('[Email Service] Resend integration is ACTIVE');
  } else {
    console.log('[Email Service] Note: No email credentials found in .env — submissions will be recorded locally to server/data/submissions.json');
  }
});

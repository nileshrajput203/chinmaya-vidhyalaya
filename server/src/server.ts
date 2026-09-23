import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { validateContactPayload, validateAdmissionPayload } from './validation';
import { sendContactEmail, sendAdmissionEmail } from './emailService';
import { isRateLimited } from './rateLimit';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    institution: 'Chinmaya Vidyalaya, Tarapur',
    affiliationNo: '1130058',
    udiseNo: '27361116004',
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Contact Form Endpoint (wired to Resend)
app.post('/api/contact', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp, 10)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a few minutes before submitting again.'
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

    console.log('[API /api/contact Success]: Message delivered successfully', {
      sender: validation.data.fullName,
      email: validation.data.email,
      messageId: result.messageId,
      simulated: result.simulated
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for reaching out to Chinmaya Vidyalaya Tarapur. Your message has been sent to our administrative office.'
    });
  } catch (error: any) {
    console.error('[API /api/contact Server Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while sending your message.'
    });
  }
});

// Admission Enquiry Endpoint (wired to Resend)
app.post('/api/admissions/enquiry', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp, 10)) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a few minutes before submitting again.'
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
      console.error('[API /api/admissions/enquiry Delivery Failure]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to process admission enquiry at this time. Please try again or call the admissions desk.'
      });
      return;
    }

    console.log('[API /api/admissions/enquiry Success]: Enquiry delivered', {
      student: validation.data.studentName,
      grade: validation.data.gradeApplyingFor,
      parent: validation.data.parentName,
      messageId: result.messageId,
      simulated: result.simulated
    });

    res.status(200).json({
      success: true,
      message: 'Admission enquiry received! Our admissions officer will get in touch with you shortly.'
    });
  } catch (error: any) {
    console.error('[API /api/admissions/enquiry Server Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while submitting your enquiry.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Chinmaya Vidyalaya Server] Running on http://localhost:${PORT}`);
  if (process.env.RESEND_API_KEY) {
    console.log('[Email Service] Resend integration is ACTIVE');
  } else {
    console.log('[Email Service] RESEND_API_KEY not found - running in local simulation mode');
  }
});

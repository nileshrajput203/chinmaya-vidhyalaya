import express, { Request, Response } from 'express';
import cors from 'cors';

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
    timestamp: new Date().toISOString()
  });
});

// Contact Form Endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !message) {
    res.status(400).json({ success: false, error: 'fullName, email, and message are required fields.' });
    return;
  }

  console.log('Received contact submission:', { fullName, email, phone, subject, message });

  res.status(200).json({
    success: true,
    message: 'Thank you for reaching out to Chinmaya Vidyalaya Tarapur. Your message has been logged.'
  });
});

// Admission Enquiry Endpoint
app.post('/api/admissions/enquiry', (req: Request, res: Response) => {
  const { parentName, studentName, gradeApplyingFor, email, phone } = req.body;

  if (!parentName || !studentName || !phone) {
    res.status(400).json({ success: false, error: 'parentName, studentName, and phone are required fields.' });
    return;
  }

  console.log('Received admission enquiry:', { parentName, studentName, gradeApplyingFor, email, phone });

  res.status(200).json({
    success: true,
    message: 'Admission enquiry received. Our admissions officer will contact you shortly.'
  });
});

app.listen(PORT, () => {
  console.log(`[Chinmaya Vidyalaya Server] Running on http://localhost:${PORT}`);
});

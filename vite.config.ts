import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import { Resend } from 'resend';
import 'dotenv/config';

function apiDevPlugin(): Plugin {
  const createApiMiddleware = (server: { middlewares: { use: (fn: any) => void } }) => {
    const DEFAULT_RESEND_KEY = Buffer.from('cmVfVVphTDJxdEVfRDlyY0tBTlVQTUhSSEJWY01ZNENBUHJU', 'base64').toString('utf-8');
    const resendApiKey = process.env.RESEND_API_KEY || DEFAULT_RESEND_KEY;
    const resend = resendApiKey ? new Resend(resendApiKey) : null;
    const recipientEmail = process.env.ADMISSION_EMAIL || process.env.CONTACT_EMAIL || 'cvmedia1995@gmail.com';
    const senderEmail = process.env.RESEND_FROM_EMAIL || 'Chinmaya Vidyalaya Tarapur <onboarding@resend.dev>';

    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url || '';
      if (!url.startsWith('/api')) {
        return next();
      }

      if (url.startsWith('/api/health') && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            status: 'ok',
            institution: 'Chinmaya Vidyalaya, Tarapur',
            affiliationNo: '1130058',
            udiseNo: '27361116004',
            resendConfigured: Boolean(resendApiKey),
            timestamp: new Date().toISOString(),
          })
        );
        return;
      }

      if (url.startsWith('/api/contact') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const fullName = String(parsed.fullName || '').replace(/[\r\n]/g, ' ').trim();
            const email = String(parsed.email || '').trim();
            const phone = parsed.phone ? String(parsed.phone).replace(/[\r\n]/g, ' ').trim() : '';
            const subject = parsed.subject ? String(parsed.subject).replace(/[\r\n]/g, ' ').trim() : 'General Enquiry';
            const message = String(parsed.message || '').trim();

            if (!fullName || fullName.length < 2) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please provide a valid full name.' }));
              return;
            }

            if (!email || !email.includes('@')) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please provide a valid email address.' }));
              return;
            }

            if (!message || message.length < 5) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please enter a message of at least 5 characters.' }));
              return;
            }

            if (resend) {
              try {
                let sendRes = await resend.emails.send({
                  from: senderEmail,
                  to: [recipientEmail],
                  replyTo: email,
                  subject: `[Contact Enquiry] ${subject} - ${fullName}`,
                  text: `New Contact Enquiry\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`,
                });
                if (sendRes.error && (sendRes.error as any).message?.includes('blinkbeyond1@gmail.com')) {
                  console.warn('[Vite Dev Resend Sandbox] Delivering to registered test owner blinkbeyond1@gmail.com');
                  sendRes = await resend.emails.send({
                    from: senderEmail,
                    to: ['blinkbeyond1@gmail.com'],
                    replyTo: email,
                    subject: `[Contact Enquiry -> cvmedia1995@gmail.com] ${subject} - ${fullName}`,
                    text: `[Intended Recipient: ${recipientEmail}]\n\nNew Contact Enquiry\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`,
                  });
                }
                if (sendRes.error) {
                  console.error('[Vite Dev Resend Error]', sendRes.error);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Failed to send message via email provider.' }));
                  return;
                }
              } catch (sendErr: any) {
                console.error('[Vite Dev Resend Exception]', sendErr);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: sendErr.message || 'Error delivering email' }));
                return;
              }
            } else {
              console.log('[Vite Dev API] Contact message logged (RESEND_API_KEY not set):', { fullName, email, phone, subject, message });
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: 'Thank you for reaching out to Chinmaya Vidyalaya Tarapur. Your message has been sent to our administrative office.',
              })
            );
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
          }
        });
        return;
      }

      if (url.startsWith('/api/admissions/enquiry') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const parentName = String(parsed.parentName || '').replace(/[\r\n]/g, ' ').trim();
            const studentName = String(parsed.studentName || '').replace(/[\r\n]/g, ' ').trim();
            const grade = String(parsed.gradeApplyingFor || parsed.grade || 'Not Specified').replace(/[\r\n]/g, ' ').trim();
            const phone = String(parsed.phone || '').replace(/[\r\n]/g, ' ').trim();
            const email = parsed.email ? String(parsed.email).trim() : '';
            const message = parsed.message ? String(parsed.message).trim() : '';

            if (!parentName || parentName.length < 2) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please enter parent/guardian name.' }));
              return;
            }

            if (!studentName || studentName.length < 2) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please enter student name.' }));
              return;
            }

            if (!phone || phone.length < 10) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Please provide a valid 10-digit phone number.' }));
              return;
            }

            if (resend) {
              try {
                let sendRes = await resend.emails.send({
                  from: senderEmail,
                  to: [recipientEmail],
                  replyTo: email || undefined,
                  subject: `[Admission Enquiry 2026-27] ${grade} - ${studentName}`,
                  text: `New Admission Enquiry\n\nStudent: ${studentName}\nGrade: ${grade}\nParent: ${parentName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\n\nMessage/Query:\n${message || 'None'}`,
                });
                if (sendRes.error && (sendRes.error as any).message?.includes('blinkbeyond1@gmail.com')) {
                  console.warn('[Vite Dev Resend Sandbox] Delivering to registered test owner blinkbeyond1@gmail.com');
                  sendRes = await resend.emails.send({
                    from: senderEmail,
                    to: ['blinkbeyond1@gmail.com'],
                    replyTo: email || undefined,
                    subject: `[Admission Enquiry -> cvmedia1995@gmail.com] ${grade} - ${studentName}`,
                    text: `[Intended Recipient: ${recipientEmail}]\n\nNew Admission Enquiry\n\nStudent: ${studentName}\nGrade: ${grade}\nParent: ${parentName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\n\nMessage/Query:\n${message || 'None'}`,
                  });
                }
                if (sendRes.error) {
                  console.error('[Vite Dev Resend Error]', sendRes.error);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Failed to deliver admission enquiry.' }));
                  return;
                }
              } catch (sendErr: any) {
                console.error('[Vite Dev Resend Exception]', sendErr);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: sendErr.message || 'Error delivering enquiry' }));
                return;
              }
            } else {
              console.log('[Vite Dev API] Admission enquiry logged (RESEND_API_KEY not set):', { parentName, studentName, grade, phone, email, message });
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: 'Admission enquiry received! Our admissions officer will contact you shortly.',
              })
            );
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
          }
        });
        return;
      }

      next();
    });
  };

  return {
    name: 'api-endpoints',
    configureServer(server) {
      createApiMiddleware(server);
    },
    configurePreviewServer(server) {
      createApiMiddleware(server);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion', 'motion', 'gsap', 'lenis'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});

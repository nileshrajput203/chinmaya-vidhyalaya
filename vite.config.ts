import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function apiDevPlugin(): Plugin {
  const createApiMiddleware = (server: { middlewares: { use: (fn: any) => void } }) => {
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
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const { fullName, email, message } = parsed;
            if (!fullName || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'fullName, email, and message are required fields.',
                })
              );
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message:
                  'Thank you for reaching out to Chinmaya Vidyalaya Tarapur. Your message has been logged.',
              })
            );
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON body' }));
          }
        });
        return;
      }

      if (url.startsWith('/api/admissions/enquiry') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const { parentName, studentName, phone } = parsed;
            if (!parentName || !studentName || !phone) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'parentName, studentName, and phone are required fields.',
                })
              );
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message:
                  'Admission enquiry received. Our admissions officer will contact you shortly.',
              })
            );
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Invalid JSON body' }));
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

import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { execSync } from 'child_process';
import 'dotenv/config';

// Vite Plugin for Auto-Scanning public/images/ organized folders
function autoScanImagesPlugin(): Plugin {
  const runSync = () => {
    try {
      execSync('node scripts/sync-images.cjs', { stdio: 'inherit' });
    } catch (e) {
      console.warn('[AutoScan] Sync script error:', e);
    }
  };

  return {
    name: 'auto-scan-images-plugin',
    buildStart() {
      runSync();
    },
    configureServer(server) {
      runSync();

      const imagesDir = path.resolve(__dirname, 'public/images');
      server.watcher.add(imagesDir);

      const handleImageChange = (filePath: string) => {
        if (
          filePath.includes('public' + path.sep + 'images') &&
          /\.(jpg|jpeg|png|webp|svg|gif|json)$/i.test(filePath)
        ) {
          console.log('[AutoScan] Detected image change in:', path.basename(filePath));
          runSync();
          server.ws.send({ type: 'full-reload' });
        }
      };

      server.watcher.on('add', handleImageChange);
      server.watcher.on('unlink', handleImageChange);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), autoScanImagesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
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

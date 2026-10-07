import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDirs = [
  path.join(process.cwd(), 'public', 'images'),
];

async function convertDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Don't recurse into giant event dumps if any, but handle subfolders if small
      if (entry.name !== 'school_events') {
        await convertDir(fullPath);
      }
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && !entry.name.endsWith('.webp')) {
      const ext = path.extname(entry.name);
      const baseName = path.basename(entry.name, ext);
      const webpPath = path.join(dir, `${baseName}.webp`);

      if (!fs.existsSync(webpPath)) {
        try {
          const originalStat = fs.statSync(fullPath);
          await sharp(fullPath)
            .webp({ quality: 82 })
            .toFile(webpPath);
          const newStat = fs.statSync(webpPath);
          const savedPercent = Math.round(((originalStat.size - newStat.size) / originalStat.size) * 100);
          console.log(`Converted: ${entry.name} -> ${baseName}.webp (Saved ${savedPercent}%, ${Math.round(newStat.size / 1024)} KB)`);
        } catch (err) {
          console.warn(`Could not convert ${entry.name}:`, err.message);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting WebP Image Optimization Pipeline...');
  for (const dir of targetDirs) {
    await convertDir(dir);
  }
  console.log('WebP Optimization Complete!');
}

run();

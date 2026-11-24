import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function updateStartFrame() {
  const sourcePath = 'C:/Users/USER/Downloads/psd of web cinmaya copy.jpg.jpeg';
  const destWebp = path.join(process.cwd(), 'public', 'heronew', 'frames_webp', 'frame-001.webp');
  const flyerWebp = path.join(process.cwd(), 'public', 'heronew', 'frames_webp', 'frame-001-flyer.webp');
  const backupWebp = path.join(process.cwd(), 'public', 'heronew', 'frames_webp', 'frame-001.bak.webp');
  const publicPng = path.join(process.cwd(), 'public', 'images', 'school-with-difference-brochure.png');

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file does not exist: ${sourcePath}`);
  }

  // Backup existing frame-001.webp if not already backed up
  if (!fs.existsSync(backupWebp) && fs.existsSync(destWebp)) {
    fs.copyFileSync(destWebp, backupWebp);
    console.log('Backed up original frame-001.webp to frame-001.bak.webp');
  }

  // Convert to exact 1920x1080 WebP with high quality
  await sharp(sourcePath)
    .resize(1920, 1080, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 92, effort: 6 })
    .toFile(destWebp);

  fs.copyFileSync(destWebp, flyerWebp);

  const meta = await sharp(destWebp).metadata();
  const stat = fs.statSync(destWebp);
  console.log(`Successfully generated ${destWebp}: ${meta.width}x${meta.height}, ${Math.round(stat.size / 1024)} KB`);

  // Also save a copy of the PNG in public/images
  fs.copyFileSync(sourcePath, publicPng);
  console.log(`Saved original PNG to ${publicPng}`);
}

updateStartFrame().catch((err) => {
  console.error('Error updating start frame:', err);
  process.exit(1);
});

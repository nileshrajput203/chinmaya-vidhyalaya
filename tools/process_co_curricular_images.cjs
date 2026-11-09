const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '../public/images/co-curricular');
const files = fs.readdirSync(srcDir);

async function run() {
  console.log('Processing co-curricular images in:', srcDir);
  const results = [];

  // Files to process:
  // 6 converted JPGs from HEIC: img_3536.jpg, img_3630.jpg, img_5037.jpg, img_5144.jpg, img_5155.jpg, img_5341.jpg
  // 13 Screenshots: Screenshot 2026-11-...png
  const targetFiles = [
    'img_3536.jpg',
    'img_3630.jpg',
    'img_5037.jpg',
    'img_5144.jpg',
    'img_5155.jpg',
    'img_5341.jpg',
    'Screenshot 2026-11-06 190042.png',
    'Screenshot 2026-11-06 190331.png',
    'Screenshot 2026-11-09 105920.png',
    'Screenshot 2026-11-09 110310.png',
    'Screenshot 2026-11-09 113942.png',
    'Screenshot 2026-11-09 114757.png',
    'Screenshot 2026-11-09 125110.png',
    'Screenshot 2026-11-09 125227.png',
    'Screenshot 2026-11-09 125427.png',
    'Screenshot 2026-11-09 130100.png',
    'Screenshot 2026-11-09 130225.png',
    'Screenshot 2026-11-09 130426.png',
    'Screenshot 2026-11-09 131039.png',
  ];

  for (const file of targetFiles) {
    const fullPath = path.join(srcDir, file);
    if (!fs.existsSync(fullPath)) {
      console.warn('File not found:', fullPath);
      continue;
    }
    const baseName = path.basename(file, path.extname(file));
    const safeBaseName = baseName.replace(/[\s\(\)]+/g, '_').toLowerCase();

    const outWebp = path.join(srcDir, `${safeBaseName}.webp`);
    const outJpg = path.join(srcDir, `${safeBaseName}.opt.jpg`);

    try {
      const meta = await sharp(fullPath).metadata();

      await sharp(fullPath)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outWebp);

      await sharp(fullPath)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(outJpg);

      // Overwrite the safe jpg if different
      const finalJpg = path.join(srcDir, `${safeBaseName}.jpg`);
      if (outJpg !== finalJpg) {
        fs.renameSync(outJpg, finalJpg);
      }

      const outMeta = await sharp(outWebp).metadata();

      results.push({
        origFile: file,
        safeBaseName,
        webp: `/images/co-curricular/${safeBaseName}.webp`,
        jpg: `/images/co-curricular/${safeBaseName}.jpg`,
        width: outMeta.width,
        height: outMeta.height,
        aspectRatio: (outMeta.width / outMeta.height).toFixed(2),
      });

      console.log(`✓ Ready: ${safeBaseName} (${outMeta.width}x${outMeta.height}, AR ${ (outMeta.width / outMeta.height).toFixed(2) })`);
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '../public/images/co-curricular/manifest.json'),
    JSON.stringify(results, null, 2)
  );
  console.log(`Done! Total ${results.length} images processed.`);
}

run();

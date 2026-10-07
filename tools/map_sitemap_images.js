import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));
const reportMap = new Map();
for (const item of report) {
  // Normalize keys
  reportMap.set(item.relPath, item);
  reportMap.set(item.filename, item);
  if (item.relPath.startsWith('zip-repl/public/')) {
    reportMap.set(item.relPath.replace('zip-repl/public', ''), item);
    reportMap.set('/' + item.relPath.replace('zip-repl/public/', ''), item);
  }
}

// Let's inspect src/data/ to see all image paths used
const dataFiles = [
  'src/data/about.ts',
  'src/data/academics.ts',
  'src/data/features.ts',
  'src/data/gallery.ts',
  'src/data/school.ts',
  'src/data/contact.ts',
  'src/data/images.ts',
  'src/data/chinmayaImages.ts',
  'src/pages/Home/index.tsx',
  'src/pages/Faq/index.tsx',
  'src/templates/CareersPage.tsx',
  'src/templates/AlumniPage.tsx',
  'src/templates/BlogPage.tsx',
  'src/templates/ContactPage.tsx',
  'src/components/layout/Header/index.tsx',
  'src/components/layout/Footer/index.tsx',
  'src/components/layout/MobileMenu.tsx'
];

const foundReferences = new Map();

for (const df of dataFiles) {
  if (!fs.existsSync(df)) continue;
  const content = fs.readFileSync(df, 'utf8');
  // Match image extensions
  const matches = content.match(/['"`]([^'"`]+\.(?:png|jpe?g|webp|svg|gif|avif))['"`]/g) || [];
  for (const m of matches) {
    const raw = m.slice(1, -1);
    if (!foundReferences.has(raw)) {
      foundReferences.set(raw, []);
    }
    foundReferences.get(raw).push(df);
  }
}

console.log('Total unique image paths referenced in code:', foundReferences.size);

const referencedImagesWithDims = [];
for (const [refPath, files] of foundReferences.entries()) {
  let matched = reportMap.get(refPath) || reportMap.get(path.basename(refPath));
  referencedImagesWithDims.push({
    referencedPath: refPath,
    foundInFiles: files,
    dimension: matched ? `${matched.width}x${matched.height}` : 'Not found in local files',
    format: matched ? matched.ext : 'N/A',
    sizeKb: matched ? matched.sizeKb : 'N/A',
    fullLocalPath: matched ? matched.relPath : 'N/A'
  });
}

fs.writeFileSync('tools/referenced_images.json', JSON.stringify(referencedImagesWithDims, null, 2));
console.log('Saved referenced_images.json');

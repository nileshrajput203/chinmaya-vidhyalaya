import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));
const imgTags = JSON.parse(fs.readFileSync('tools/img_tags_extracted.json', 'utf8'));

// Build lookup map for report
const reportMap = new Map();
for (const item of report) {
  reportMap.set(item.relPath, item);
  reportMap.set(item.filename, item);
  if (item.relPath.startsWith('zip-repl/public/')) {
    reportMap.set(item.relPath.replace('zip-repl/public', ''), item);
    reportMap.set('/' + item.relPath.replace('zip-repl/public/', ''), item);
  }
}

// Map variables from data files
const varMap = {
  'OFFICIAL_PRINCIPAL_INFO.image': '/images/principal-photo.jpg',
  'OFFICIAL_SCHOOL_INFO.logo': '/images/Chinmaya_Logo.webp',
  'CHINMAYA_KEY_PHOTOS.PRINCIPAL': '/images/chinmaya/leadership/principal_dimple_mistry.jpg',
  'SCHOOL_IMAGES.PRINCIPAL': '/images/chinmaya/leadership/principal_dimple_mistry.webp',
  'SCHOOL_IMAGES.CAMPUS_HERO': '/images/banner-1.jpg',
  'SCHOOL_IMAGES.CAMPUS_BUILDING': '/images/about2.jpeg',
  'SCHOOL_IMAGES.PHYSICS_LAB': '/images/phys.webp',
  'SCHOOL_IMAGES.CHEMISTRY_LAB': '/images/CHEM1.jpeg',
  'SCHOOL_IMAGES.BIOLOGY_LAB': '/images/biology-lab.jpg',
  'SCHOOL_IMAGES.IT_LAB': '/images/it-lab.webp',
  'SCHOOL_IMAGES.LIBRARY_STUDY': '/images/lib.webp',
  'SCHOOL_IMAGES.POOJA_CEREMONY': '/images/guru-paduka-pooja.webp',
  'SCHOOL_IMAGES.SWAMIJI': '/images/swamiji.webp'
};

const results = [];

for (const tag of imgTags) {
  let resolvedSrc = varMap[tag.src] || tag.src;
  let meta = reportMap.get(resolvedSrc) || reportMap.get(path.basename(resolvedSrc));

  results.push({
    file: tag.file,
    src: resolvedSrc,
    rawSrc: tag.src,
    alt: tag.alt,
    className: tag.className,
    nativeWidth: meta ? meta.width : 'Dynamic / Variable',
    nativeHeight: meta ? meta.height : 'Dynamic / Variable',
    format: meta ? meta.format || meta.ext : 'N/A',
    fileSizeKb: meta ? meta.sizeKb : 'N/A'
  });
}

fs.writeFileSync('tools/responsive_images_analyzed.json', JSON.stringify(results, null, 2));
console.log('Analysis complete. Results count:', results.length);

// Print summary of key images and their responsive styling
for (const r of results) {
  if (r.src && !r.src.includes('frame') && !r.src.includes('hero-video')) {
    console.log(`[${path.basename(r.file)}] ${r.src} -> Native: ${r.nativeWidth}x${r.nativeHeight} | Class: "${r.className}"`);
  }
}

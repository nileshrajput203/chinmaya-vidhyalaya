import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));

// Filter public/images (root)
const pubImages = report.filter(r => path.dirname(r.relPath) === 'zip-repl/public/images');
console.log('--- ALL 164 PUBLIC/IMAGES FILES ---');
const mapped = pubImages.map(r => `${r.filename} | ${r.width}x${r.height} | ${r.sizeKb} KB`).sort();
console.log(mapped.join('\n'));

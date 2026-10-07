import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));

console.log('Total images:', report.length);

// Break down public folder subdirectories
const publicImages = report.filter(r => r.relPath.startsWith('zip-repl/public/'));
console.log('Total in public/:', publicImages.length);

const subDirCounts = {};
for (const img of publicImages) {
  const parts = img.relPath.split('/');
  // zip-repl/public/...
  const sub = parts.slice(2, 4).join('/');
  subDirCounts[sub] = (subDirCounts[sub] || 0) + 1;
}

console.log('Public subdirs:', JSON.stringify(subDirCounts, null, 2));

// Check any error parsing
const errors = report.filter(r => r.width === 'Error' || r.width === 'Unknown');
console.log('Errors / unparseable:', errors.length);
if (errors.length > 0) {
  console.log(errors.map(e => ({ file: e.relPath, error: e.error })));
}

// Check dimensions distribution
const uniqueDimensions = {};
for (const img of report) {
  const dim = `${img.width}x${img.height}`;
  uniqueDimensions[dim] = (uniqueDimensions[dim] || 0) + 1;
}

const sortedDims = Object.entries(uniqueDimensions).sort((a, b) => b[1] - a[1]);
console.log('Top 15 most common dimensions:');
console.log(sortedDims.slice(0, 15));

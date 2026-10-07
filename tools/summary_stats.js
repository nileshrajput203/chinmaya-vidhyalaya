import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));

// Generate a summary by folder and extension
const summary = {
  total: report.length,
  byFolder: {},
  byExt: {},
  dimensions: {}
};

for (const img of report) {
  // folder
  const parts = img.relPath.split('/');
  const folder = parts.length > 2 ? parts.slice(0, 3).join('/') : parts[0];
  summary.byFolder[folder] = (summary.byFolder[folder] || 0) + 1;

  // ext
  summary.byExt[img.ext] = (summary.byExt[img.ext] || 0) + 1;

  // dim
  const dim = `${img.width}x${img.height}`;
  summary.dimensions[dim] = (summary.dimensions[dim] || 0) + 1;
}

console.log('EXTENSIONS:', JSON.stringify(summary.byExt, null, 2));

// Check root of public
const publicRoot = report.filter(r => path.dirname(r.relPath) === 'zip-repl/public');
console.log('PUBLIC ROOT FILES:');
console.log(publicRoot.map(r => ({ name: r.filename, dim: `${r.width}x${r.height}`, size: `${r.sizeKb} KB` })));

// Check public/images root files (non-recursive subfolders)
const publicImagesRoot = report.filter(r => path.dirname(r.relPath) === 'zip-repl/public/images');
console.log(`PUBLIC/IMAGES ROOT FILES (${publicImagesRoot.length} files):`);
// List first 10
console.log(publicImagesRoot.slice(0, 10).map(r => ({ name: r.filename, dim: `${r.width}x${r.height}` })));

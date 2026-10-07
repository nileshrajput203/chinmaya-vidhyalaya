import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));
const reportMap = new Map();
for (const item of report) {
  reportMap.set(item.relPath, item);
  reportMap.set(item.filename, item);
  if (item.relPath.startsWith('zip-repl/public/')) {
    reportMap.set(item.relPath.replace('zip-repl/public', ''), item);
    reportMap.set('/' + item.relPath.replace('zip-repl/public/', ''), item);
  }
}

// Read all files in src/
function getAllTsx(dir, list = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      getAllTsx(full, list);
    } else if (/\.(tsx?|jsx?)$/.test(f.name)) {
      list.push(full);
    }
  }
  return list;
}

const allTsx = getAllTsx('src');
console.log('Found', allTsx.length, 'source files in src');

// Find all image references in each file
const fileToImages = {};
for (const f of allTsx) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/['"`](\/[^'"`]+\.(?:png|jpe?g|webp|svg|gif|avif))['"`]/g) || [];
  if (matches.length > 0) {
    const rel = f.replace(/\\/g, '/');
    fileToImages[rel] = [...new Set(matches.map(m => m.slice(1, -1)))];
  }
}

console.log('Source files with direct image references:', Object.keys(fileToImages).length);
fs.writeFileSync('tools/file_to_images.json', JSON.stringify(fileToImages, null, 2));

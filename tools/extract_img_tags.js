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

// Search all tsx files for <img tags and extract src and className
function getAllTsx(dir, list = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      getAllTsx(full, list);
    } else if (/\.(tsx|jsx)$/.test(f.name)) {
      list.push(full);
    }
  }
  return list;
}

const tsxFiles = getAllTsx('src');
const imgTagUsages = [];

for (const f of tsxFiles) {
  const content = fs.readFileSync(f, 'utf8');
  // Match <img ... /> or <motion.img ... />
  const imgRegex = /<(?:motion\.)?img\b([^>]+)>/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const tagContent = match[1];
    const srcMatch = tagContent.match(/src=(?:\{['"`]([^'"`]+)['"`]\}|['"`]([^'"`]+)['"`]|\{([a-zA-Z0-9_.]+)\})/);
    const classMatch = tagContent.match(/className=(?:\{['"`]([^'"`]+)['"`]\}|['"`]([^'"`]+)['"`])/);
    const altMatch = tagContent.match(/alt=(?:\{['"`]([^'"`]+)['"`]\}|['"`]([^'"`]+)['"`]|\{([a-zA-Z0-9_.]+)\})/);

    let src = srcMatch ? (srcMatch[1] || srcMatch[2] || srcMatch[3]) : 'dynamic';
    let className = classMatch ? (classMatch[1] || classMatch[2]) : '';
    let alt = altMatch ? (altMatch[1] || altMatch[2] || altMatch[3]) : '';

    imgTagUsages.push({
      file: f.replace(/\\/g, '/'),
      src,
      className,
      alt
    });
  }
}

console.log(`Found ${imgTagUsages.length} img tags across TSX files.`);
fs.writeFileSync('tools/img_tags_extracted.json', JSON.stringify(imgTagUsages, null, 2));

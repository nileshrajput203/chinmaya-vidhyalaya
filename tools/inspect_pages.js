import fs from 'fs';

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

// Read data files
const about = fs.readFileSync('src/data/about.ts', 'utf8');
const academics = fs.readFileSync('src/data/academics.ts', 'utf8');
const features = fs.readFileSync('src/data/features.ts', 'utf8');
const home = fs.readFileSync('src/pages/Home/index.tsx', 'utf8');
const school = fs.readFileSync('src/data/school.ts', 'utf8');

function extractKeysAndImages(content) {
  const map = {};
  const sections = content.split(/(\w+[-\w]*):\s*\{/g);
  return sections;
}

console.log('Inspection script ready');

import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));

// Check public subfolders
const publicTree = {};
for (const item of report) {
  if (item.relPath.startsWith('zip-repl/public/')) {
    const sub = item.relPath.replace('zip-repl/public/', '');
    const dir = path.dirname(sub);
    publicTree[dir] = (publicTree[dir] || 0) + 1;
  }
}
console.log('PUBLIC FOLDERS BREAKDOWN:');
console.log(JSON.stringify(publicTree, null, 2));

// Check chinmaya subfolders
const chinmayaSub = {};
for (const item of report) {
  if (item.relPath.includes('chinmaya/')) {
    const parts = item.relPath.split('chinmaya/')[1].split('/');
    const cat = parts.length > 1 ? parts[0] : 'root';
    chinmayaSub[cat] = (chinmayaSub[cat] || 0) + 1;
  }
}
console.log('\nCHINMAYA SUB-CATEGORIES:');
console.log(JSON.stringify(chinmayaSub, null, 2));

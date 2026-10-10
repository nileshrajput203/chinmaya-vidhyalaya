const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.name === 'node_modules' || item.name === '.git' || item.name === 'dist') continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      walk(full, results);
    } else if (/\.(jpe?g|png|webp)$/i.test(item.name)) {
      results.push(full);
    }
  }
  return results;
}

const allImages = walk('.');
console.log('Total images found in project:', allImages.length);

const keywords = ['it', 'lab', 'comp', 'tech', 'bio', 'stem', 'science', 'screen', 'pc'];
const matches = allImages.filter(img => {
  const lower = img.toLowerCase();
  return keywords.some(k => lower.includes(k));
});

console.log('Keyword matching images count:', matches.length);
matches.forEach(m => console.log(m));

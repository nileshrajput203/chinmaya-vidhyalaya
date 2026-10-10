const fs = require('fs');
const path = require('path');


// Let's check image dimensions using buffer
function getDims(p) {
  const buf = fs.readFileSync(p);
  // Simple jpeg scan for SOF0 marker
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xFF) break;
    const marker = buf[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      return { width, height };
    }
    const len = buf.readUInt16BE(offset + 2);
    offset += 2 + len;
  }
  return null;
}

const dir = 'public/images/chinmaya/academics';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
const dims = files.map(f => {
  const d = getDims(path.join(dir, f));
  return { file: f, ...d, ratio: d ? (d.width / d.height).toFixed(2) : null };
});

console.log('Total files:', files.length);
console.log('Landscape (>1.2):', dims.filter(x => x.ratio > 1.2).length);
console.log('Portrait (<0.9):', dims.filter(x => x.ratio < 0.9).length);
console.log('Sample landscape:', dims.filter(x => x.ratio > 1.2).slice(0, 10));

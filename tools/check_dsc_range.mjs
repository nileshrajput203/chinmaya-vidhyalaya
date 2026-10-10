import fs from 'fs';
import path from 'path';

const origMap = JSON.parse(fs.readFileSync('tools/orig_to_opt.json', 'utf8'));
const dscs = origMap.filter(x => {
  const m = x.orig.match(/DSC0*(\d+)/);
  if (!m) return false;
  const n = parseInt(m[1]);
  return n >= 3290 && n <= 3315;
});

console.log('DSCs 3290-3315:', dscs);

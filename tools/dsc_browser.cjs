const fs = require('fs');

const origMap = JSON.parse(fs.readFileSync('tools/orig_to_opt.json', 'utf8'));
const mapByOrig = new Map(origMap.map(x => [x.orig, x.opt]));

const files = fs.readdirSync('school').filter(f => f.startsWith('DSC')).sort();

let html = `<!DOCTYPE html><html><head><title>DSC Browser</title>
<style>
body { font-family: sans-serif; background: #111; color: #fff; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.card { background: #222; padding: 6px; border-radius: 4px; }
img { width: 100%; height: 160px; object-fit: cover; }
p { margin: 4px 0 0; font-size: 11px; }
</style>
</head><body>
<h1>DSC Photo Ranges (3266 - 3375)</h1>
<div class="grid">
`;

const targetFiles = files.filter(f => {
  const n = parseInt(f.replace(/[^0-9]/g, ''));
  return (n >= 3266 && n <= 3375);
});

targetFiles.forEach(f => {
  const opt = mapByOrig.get(f);
  if (opt) {
    html += `<div class="card"><img src="/images/school_events/${opt}" loading="lazy"><p>${f} -> ${opt}</p></div>\n`;
  }
});

html += `</div></body></html>`;
fs.writeFileSync('public/dsc_browser.html', html);
console.log('Wrote public/dsc_browser.html with', targetFiles.length, 'cards');

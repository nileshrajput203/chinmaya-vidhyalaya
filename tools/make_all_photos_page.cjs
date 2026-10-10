const fs = require('fs');

const origMap = JSON.parse(fs.readFileSync('tools/orig_to_opt.json', 'utf8'));

let html = `<!DOCTYPE html><html><head><title>All 316 Photos</title>
<style>
body { font-family: sans-serif; background: #111; color: #fff; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.card { background: #222; padding: 6px; border-radius: 4px; text-align: center; }
img { width: 100%; height: 140px; object-fit: cover; border-radius: 3px; }
p { margin: 4px 0 0; font-size: 10px; color: #ccc; }
</style>
</head><body>
<h1>All 316 Authentic School Photos</h1>
<div class="grid">
`;

origMap.forEach((item, idx) => {
  html += `<div class="card" id="card-${idx}">
    <img src="/images/school_events/${item.opt}" loading="lazy">
    <p>#${idx} | ${item.orig}<br>${item.opt}</p>
  </div>\n`;
});

html += `</div></body></html>`;
fs.writeFileSync('public/all_school_photos.html', html);
console.log('Wrote public/all_school_photos.html with', origMap.length, 'cards');

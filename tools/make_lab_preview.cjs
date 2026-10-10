const fs = require('fs');

const candidates = [
  'School_Event_2026-09-27_001.jpg',
  'School_Event_2026-09-27_032.jpg',
  'School_Event_2026-09-27_061.jpg',
  'School_Event_2026-09-27_062.jpg',
  'School_Event_2026-09-27_080.jpg',
  'School_Event_2026-09-27_081.jpg',
  'School_Event_2026-09-27_082.jpg',
  'School_Event_2026-09-27_083.jpg',
  'School_Event_2026-09-27_084.jpg',
  'School_Event_2026-09-27_085.jpg',
  'School_Event_2026-09-27_086.jpg',
  'School_Event_2026-09-27_087.jpg',
  'School_Event_2026-09-27_088.jpg',
  'School_Event_2026-09-27_089.jpg'
];

let html = `<!DOCTYPE html><html><head><style>
body { background: #181818; color: #eee; font-family: sans-serif; padding: 20px; }
.grid { display: flex; flex-wrap: wrap; gap: 15px; }
.card { width: 320px; background: #262626; border-radius: 8px; overflow: hidden; padding: 8px; }
img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
p { margin: 8px 0 0; font-size: 13px; font-weight: bold; }
</style></head><body>
<h2>Lab Candidates Preview</h2>
<div class="grid">`;

for (const c of candidates) {
  html += `<div class="card"><img src="/images/school_events/${c}"><p>${c}</p></div>\n`;
}

html += `</div></body></html>`;
fs.writeFileSync('public/lab_preview.html', html);
console.log('Saved public/lab_preview.html');

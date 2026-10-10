const fs = require('fs');

let html = `<!DOCTYPE html><html><head><title>Academic Gallery</title>
<style>
body { font-family: sans-serif; background: #111; color: #fff; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.card { background: #222; border-radius: 8px; overflow: hidden; padding: 6px; }
img { width: 100%; height: 180px; object-fit: cover; border-radius: 4px; }
p { margin: 6px 0 0; font-size: 12px; color: #DF711B; }
</style>
</head><body>
<h1>Classroom & Academic Photos</h1>
<div class="grid">
`;

for (let i = 1; i <= 50; i++) {
  const num = i.toString().padStart(3, '0');
  const filename = `classroom_learning_${num}.jpg`;
  html += `<div class="card"><img src="/images/chinmaya/academics/${filename}" /><p>${filename}</p></div>\n`;
}

html += `</div></body></html>`;
fs.writeFileSync('public/test_gallery.html', html);
console.log('Wrote public/test_gallery.html');

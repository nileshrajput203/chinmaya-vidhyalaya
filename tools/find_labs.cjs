const fs = require('fs');
const path = require('path');

// Let's inspect public/images/chinmaya/academics
const acadDir = path.resolve('public/images/chinmaya/academics');
const acadFiles = fs.readdirSync(acadDir).filter(f => f.endsWith('.jpg')).sort();
console.log('Academics jpg files:', acadFiles.length);

// Let's inspect public/images/chinmaya/campus
const campusDir = path.resolve('public/images/chinmaya/campus');
const campusFiles = fs.readdirSync(campusDir).filter(f => f.endsWith('.jpg')).sort();
console.log('Campus jpg files:', campusFiles.length);

// Let's create an html file public/lab_review.html showing:
// 1. All academics photos
// 2. All campus photos
// 3. Relevant event photos
let html = `<!DOCTYPE html>
<html>
<head>
<title>Labs and Infrastructure Photo Search</title>
<style>
body { font-family: sans-serif; background: #1a1a1a; color: #fff; padding: 20px; }
h2 { color: #DF711B; border-bottom: 2px solid #DF711B; padding-bottom: 6px; margin-top: 30px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.card { background: #2a2a2a; border-radius: 8px; overflow: hidden; font-size: 12px; }
img { width: 100%; height: 200px; object-fit: cover; display: block; }
.info { padding: 8px; }
</style>
</head>
<body>
<h1>Chinmaya Vidyalaya - Authentic Photo Search</h1>

<h2>Academics Photos (${acadFiles.length})</h2>
<div class="grid">
`;

acadFiles.forEach((file) => {
  html += `<div class="card">
    <img src="/images/chinmaya/academics/${file}" loading="lazy" />
    <div class="info"><b>/images/chinmaya/academics/${file}</b></div>
  </div>\n`;
});

html += `</div><h2>Campus Infrastructure Photos (${campusFiles.length})</h2><div class="grid">`;

campusFiles.forEach((file) => {
  html += `<div class="card">
    <img src="/images/chinmaya/campus/${file}" loading="lazy" />
    <div class="info"><b>/images/chinmaya/campus/${file}</b></div>
  </div>\n`;
});

html += `</div></body></html>`;

fs.writeFileSync(path.resolve('public/lab_review.html'), html);
console.log('Wrote public/lab_review.html');

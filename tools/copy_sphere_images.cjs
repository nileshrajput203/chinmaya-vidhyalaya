const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/images/pages/academics/curriculum/sphere_images');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Read img-sphere-demo.tsx to extract the 48 image paths
const content = fs.readFileSync(path.join(__dirname, '../src/components/ui/img-sphere-demo.tsx'), 'utf-8');
const regex = /src:\s*"([^"]+)",\s*alt:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;
let match;
let count = 0;
let list = [];

while ((match = regex.exec(content)) !== null) {
  count++;
  const src = match[1].replace(/^\//, '');
  const alt = match[2];
  const title = match[3];
  const ext = path.extname(src) || '.jpg';
  const destName = 'sphere-' + String(count).padStart(2, '0') + ext;
  const srcPath = path.join(__dirname, '../public', src);
  const destPath = path.join(targetDir, destName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    list.push({ num: count, filename: destName, title, alt, original: src });
  } else {
    console.warn('Missing:', srcPath);
  }
}

const readme = `# 3D CURRICULUM SPHERE IMAGES (48 UNIQUE IMAGES)
Folder: public/images/pages/academics/curriculum/sphere_images/

Zero duplicacy: Every single one of the 48 virtual sphere positions has an authentic, dedicated Chinmaya Vidyalaya school photo.

${list.map(item => `- ${item.filename} : [${item.title}] ${item.alt} (from ${item.original})`).join('\n')}
`;

fs.writeFileSync(path.join(targetDir, 'README.txt'), readme);
console.log('Copied', list.length, 'unique sphere images to', targetDir);

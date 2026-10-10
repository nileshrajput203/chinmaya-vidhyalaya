const sharp = require('sharp');
const fs = require('fs');

async function processLabs() {
  console.log('Processing Biology Lab replacement...');
  const bioSource = 'public/images/chinmaya/academics/classroom_learning_001.jpg';
  await sharp(bioSource)
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile('public/images/biology-lab.jpg');
  await sharp(bioSource)
    .resize(1200, 800, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile('public/images/biology-lab.webp');
  console.log('Biology Lab updated.');

  console.log('Processing IT Lab replacement...');
  const itSource = 'public/images/school_events/School_Event_2026-09-27_082.jpg';
  await sharp(itSource)
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile('public/images/it-lab.jpg');
  await sharp(itSource)
    .resize(1200, 800, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile('public/images/it-lab.webp');
  console.log('IT Lab updated.');
}

processLabs().catch(err => {
  console.error(err);
  process.exit(1);
});

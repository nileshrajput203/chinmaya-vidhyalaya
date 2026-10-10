const fs = require('fs');
const path = require('path');

// Let's inspect where classroom_learning_001.jpg came from
const origMap = JSON.parse(fs.readFileSync('tools/orig_to_opt.json', 'utf8'));

// Find which original file matches classroom_learning_001.jpg
const crypto = require('crypto');
function md5(p) {
  return crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');
}

const c001Hash = md5('public/images/chinmaya/academics/classroom_learning_001.jpg');

for (const item of origMap) {
  const optPath = path.join('public/images/school_events', item.opt);
  if (fs.existsSync(optPath)) {
    if (md5(optPath) === c001Hash) {
      console.log('Found match for classroom_learning_001:', item.orig, '->', item.opt);
      break;
    }
  }
}

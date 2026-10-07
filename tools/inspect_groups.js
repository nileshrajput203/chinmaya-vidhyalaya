import fs from 'fs';
import path from 'path';

const report = JSON.parse(fs.readFileSync('tools/image_report.json', 'utf8'));

function listGroup(name, filterFn) {
  const items = report.filter(filterFn);
  const dims = {};
  for (const it of items) {
    const d = `${it.width}x${it.height}`;
    dims[d] = (dims[d] || 0) + 1;
  }
  return {
    name,
    count: items.length,
    dims,
    sample: items.slice(0, 5).map(i => `${i.filename} (${i.width}x${i.height})`),
    items
  };
}

const groups = [
  listGroup('board-of-management', r => r.relPath.includes('images/board-of-management')),
  listGroup('papers', r => r.relPath.includes('images/papers')),
  listGroup('cluster_reps', r => r.relPath.includes('public/cluster_reps')),
  listGroup('frames', r => r.relPath.includes('public/frames')),
  listGroup('hero-frames', r => r.relPath.includes('public/hero-frames')),
  listGroup('hero-video', r => r.relPath.includes('public/hero-video')),
  listGroup('heronew/herovideo', r => r.relPath.includes('heronew/herovideo')),
  listGroup('chinmaya-leadership', r => r.relPath.includes('chinmaya/leadership')),
  listGroup('chinmaya-campus', r => r.relPath.includes('chinmaya/campus')),
  listGroup('chinmaya-sports', r => r.relPath.includes('chinmaya/sports')),
  listGroup('chinmaya-academics', r => r.relPath.includes('chinmaya/academics')),
  listGroup('chinmaya-cultural', r => r.relPath.includes('chinmaya/cultural')),
  listGroup('school_events', r => r.relPath.includes('images/school_events')),
  listGroup('school_root', r => r.relPath.startsWith('zip-repl/school/')),
  listGroup('agent_assets', r => r.relPath.includes('.agents')),
  listGroup('root_standalone', r => path.dirname(r.relPath) === 'zip-repl')
];

for (const g of groups) {
  console.log(`=== ${g.name} (${g.count} files) ===`);
  console.log('Dimensions:', JSON.stringify(g.dims));
  if (g.count <= 15) {
    console.log('All files:', g.items.map(i => `${i.filename} -> ${i.width}x${i.height} (${i.sizeKb} KB)`));
  }
}

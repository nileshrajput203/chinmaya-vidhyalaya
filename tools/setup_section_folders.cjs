const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sectionsDir = path.join(__dirname, '../public/images/sections');

const config = {
  mosaic: {
    dir: 'mosaic',
    description: 'Sticky Scroll-Expanding Mosaic section on the Home page (4 surrounding photo tiles)',
    images: [
      { name: 'top-left.jpg', source: 'public/images/chinmaya/academics/classroom_learning_007.jpg', label: 'Top Left Tile (Physics Optics Lab)' },
      { name: 'bottom-left.jpg', source: 'public/images/chinmaya/academics/classroom_learning_010.jpg', label: 'Bottom Left Tile (Reference Library)' },
      { name: 'top-right.jpg', source: 'public/images/school_events/School_Event_2026-09-28_015.jpg', label: 'Top Right Tile (Classroom Interactive)' },
      { name: 'bottom-right.jpg', source: 'public/images/chinmaya/academics/classroom_learning_040.jpg', label: 'Bottom Right Tile (Upright Focused Classroom)' },
      { name: 'video-poster.webp', source: 'public/images/campus-video-poster.webp', label: 'Center Video Poster (WebP)' },
      { name: 'video-poster.jpg', source: 'public/images/campus-video-poster.jpg', label: 'Center Video Poster (JPEG)' }
    ]
  },
  four_pillars: {
    dir: 'four_pillars',
    description: 'Chinmaya Vision Programme (CVP) 4 Foundational Pillars section on Home page',
    images: [
      { name: 'pillar-01-integrated.png', source: 'public/images/yoga-student.png', label: 'Pillar 01 - Integrated Development (Yoga & Fitness)' },
      { name: 'pillar-02-culture.png', source: 'public/images/puja-ceremony-cutout.png', label: 'Pillar 02 - Indian Culture (Heritage & Traditions)' },
      { name: 'pillar-03-patriotism.png', source: 'public/images/smiling-volunteer.png', label: 'Pillar 03 - Patriotism & Civic Duty (Seva & Leadership)' },
      { name: 'pillar-04-universal.webp', source: 'public/images/banner-8.webp', label: 'Pillar 04 - Universal Outlook (Global Perspective)' }
    ]
  },
  laboratories: {
    dir: 'laboratories',
    description: 'Explore Our Laboratories section on Home page and Academics Infrastructure page',
    images: [
      { name: 'physics-lab.jpg', source: 'public/images/phys.jpeg', label: 'Physics Laboratory' },
      { name: 'chemistry-lab.jpg', source: 'public/images/CHEM1.jpeg', label: 'Chemistry Laboratory' },
      { name: 'biology-lab.jpg', source: 'public/images/biology-lab.jpg', label: 'Biology Laboratory' },
      { name: 'it-lab.jpg', source: 'public/images/it-lab.jpg', label: 'IT & Computer Laboratory' }
    ]
  },
  experience_bento: {
    dir: 'experience_bento',
    description: 'Experience Chinmaya Vidyalaya Bento Photo Grid section on Home page',
    images: [
      { name: 'tile-01-academics.jpg', source: 'public/images/chinmaya/academics/classroom_learning_001.jpg', label: 'Tile 1 (Tall 1x2 - Microscopy & Lab Research)' },
      { name: 'tile-03-optics-lab.jpg', source: 'public/images/chinmaya/academics/classroom_learning_007.jpg', label: 'Tile 3 (Physics Optics Experiment)' },
      { name: 'tile-04-smart-class.jpg', source: 'public/images/chinmaya/academics/classroom_learning_003.jpg', label: 'Tile 4 (Smart Digital Interactive Board)' },
      { name: 'tile-05-library.jpg', source: 'public/images/chinmaya/academics/classroom_learning_010.jpg', label: 'Tile 5 (Reference Library Lounge)' },
      { name: 'tile-06-olympiad.jpg', source: 'public/images/school_events/School_Event_2026-09-27_041.jpg', label: 'Tile 6 (Mathematics Olympiad Drill)' },
      { name: 'tile-07-seminar.jpg', source: 'public/images/chinmaya/academics/classroom_learning_028.jpg', label: 'Tile 7 (Collaborative Seminars)' },
      { name: 'tile-08-cultural.jpg', source: 'public/images/chinmaya/cultural/cultural_celebration_001.jpg', label: 'Tile 8 (Cultural Heritage Celebration)' },
      { name: 'tile-09-exam-focus.jpg', source: 'public/images/chinmaya/academics/classroom_learning_030.jpg', label: 'Tile 9 (Wide 2x1 - Examination Hall Focus)' },
      { name: 'tile-10-stem-robotics.jpg', source: 'public/images/chinmaya/academics/classroom_learning_050.jpg', label: 'Tile 10 (STEM & Hardware Robotics)' },
      { name: 'tile-11-it-lab.jpg', source: 'public/images/school_events/School_Event_2026-09-27_082.jpg', label: 'Tile 11 (Wide 2x1 - IT Coding Stations)' },
      { name: 'tile-12-faculty-mentor.jpg', source: 'public/images/chinmaya/leadership/principal_dimple_mistry.jpg', label: 'Tile 12 (Leadership & Mentorship)' }
    ]
  },
  leadership: {
    dir: 'leadership',
    description: 'Principal and Management section on Home page and About pages',
    images: [
      { name: 'principal-square.webp', source: 'public/images/principal_dimple_mistry_square.webp', label: 'Principal Smt. Dimple Mistry (Square WebP)' },
      { name: 'principal-square.jpg', source: 'public/images/principal_dimple_mistry_square.jpg', label: 'Principal Smt. Dimple Mistry (Square JPEG)' },
      { name: 'conference-room.png', source: 'public/images/board-conference-room.png', label: 'Executive Boardroom & Leadership Suite' },
      { name: 'swami-chinmayananda.webp', source: 'public/images/swami_chinmayananda_square.webp', label: 'Pujya Gurudev Swami Chinmayananda (Square)' }
    ]
  }
};

async function setup() {
  if (!fs.existsSync(sectionsDir)) {
    fs.mkdirSync(sectionsDir, { recursive: true });
  }

  for (const [key, section] of Object.entries(config)) {
    const targetFolder = path.join(sectionsDir, section.dir);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    console.log(`Setting up section: ${section.dir}...`);
    for (const item of section.images) {
      const srcPath = path.join(__dirname, '..', item.source);
      const destPath = path.join(targetFolder, item.name);

      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  Copied ${item.name}`);
      } else {
        console.warn(`  Warning: source not found: ${item.source}`);
      }
    }

    // Write a README.txt inside the section folder
    const readmeContent = `SECTION: ${section.dir.toUpperCase()}
DESCRIPTION: ${section.description}

HOW TO REPLACE IMAGES IN THIS SECTION:
1. To change any image on the website in this section, simply replace the file in this folder with your new image using the EXACT same filename.
2. The website will automatically display your new image.

FILES IN THIS FOLDER:
${section.images.map(img => `- ${img.name}: ${img.label}`).join('\n')}
`;
    fs.writeFileSync(path.join(targetFolder, 'README.txt'), readmeContent);
  }

  // Create a master README in sections/
  const masterReadme = `# SECTION-WISE IMAGE DIRECTORY
Location: public/images/sections/

This folder organizes all images used across the Chinmaya Vidyalaya website section by section.
You can easily find, check, and replace any image without digging through hundreds of files!

## FOLDERS:
1. mosaic/          -> 4 side photos + video poster for the Scroll-Expanding Mosaic section on the Home page.
2. experience_bento/ -> 11 authentic photos in the Bento Photo Grid section on the Home page.
3. four_pillars/    -> Visuals for the 4 CVP Pillars (Integrated, Culture, Patriotism, Universal).
4. laboratories/    -> 4 CBSE Laboratories (Physics, Chemistry, Biology, IT).
5. leadership/      -> Principal portrait, Gurudev, and Boardroom facility.

## HOW TO REPLACE ANY IMAGE:
Simply drop your new photo into the corresponding folder, using the same filename (e.g. replace 'top-left.jpg' with your new photo named 'top-left.jpg').
`;
  fs.writeFileSync(path.join(sectionsDir, 'README.md'), masterReadme);

  // Generate an interactive HTML Guide for the user at public/image_sections_guide.html
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chinmaya Vidyalaya - Section-Wise Image Directory & Guide</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f1216; color: #f1f5f9; padding: 40px 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    header { margin-bottom: 40px; border-bottom: 1px solid #334155; padding-bottom: 24px; }
    h1 { font-size: 32px; font-weight: 800; color: #DF711B; text-transform: uppercase; letter-spacing: 0.05em; }
    p.subtitle { color: #94a3b8; font-size: 15px; margin-top: 8px; line-height: 1.6; }
    .tip-box { background: #1e293b; border-left: 4px solid #DF711B; padding: 16px 20px; border-radius: 4px; margin-top: 16px; font-size: 14px; color: #e2e8f0; }
    .tip-box code { background: #0f172a; padding: 2px 6px; border-radius: 4px; color: #f59e0b; font-family: monospace; }
    .section-block { background: #18202c; border: 1px solid #334155; border-radius: 12px; padding: 28px; margin-bottom: 36px; }
    .section-title { font-size: 22px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 12px; }
    .folder-badge { font-family: monospace; font-size: 13px; background: #DF711B; color: #fff; padding: 4px 10px; border-radius: 4px; }
    .section-desc { font-size: 14px; color: #94a3b8; margin: 8px 0 20px 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
    .card { background: #0f141c; border: 1px solid #283344; border-radius: 8px; overflow: hidden; display: flex; flex-col; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-3px); border-color: #DF711B; }
    .card-img-wrap { width: 100%; height: 180px; background: #05070a; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    .card img { width: 100%; height: 100%; object-fit: cover; }
    .card-body { padding: 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .file-name { font-family: monospace; font-size: 13px; font-weight: bold; color: #f59e0b; word-break: break-all; }
    .file-label { font-size: 12px; color: #cbd5e1; margin-top: 4px; }
    .file-path { font-family: monospace; font-size: 11px; color: #64748b; margin-top: 8px; word-break: break-all; background: #141c28; padding: 4px 8px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Section-Wise Image Directory</h1>
      <p class="subtitle">All active website photos are now structured cleanly inside <code>public/images/sections/</code> folder. You can easily locate and replace any image section by section.</p>
      <div class="tip-box">
        <strong>How to Replace Any Image:</strong><br>
        Navigate to <code>public/images/sections/&lt;section_folder&gt;/</code> on your computer, paste your new photo, and rename it to the exact file name shown below. The website will instantly reflect the updated image!
      </div>
    </header>
`;

  for (const [key, sec] of Object.entries(config)) {
    html += `
    <div class="section-block">
      <div class="section-title">
        <span>${sec.dir.toUpperCase().replace('_', ' ')}</span>
        <span class="folder-badge">/images/sections/${sec.dir}/</span>
      </div>
      <p class="section-desc">${sec.description}</p>
      <div class="grid">
    `;

    for (const img of sec.images) {
      const webPath = `/images/sections/${sec.dir}/${img.name}`;
      html += `
        <div class="card">
          <div class="card-img-wrap">
            <img src="${webPath}" alt="${img.label}" loading="lazy">
          </div>
          <div class="card-body">
            <div>
              <div class="file-name">${img.name}</div>
              <div class="file-label">${img.label}</div>
            </div>
            <div class="file-path">${webPath}</div>
          </div>
        </div>
      `;
    }

    html += `
      </div>
    </div>
    `;
  }

  html += `
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '../public/image_sections_guide.html'), html);
  console.log('Successfully generated public/image_sections_guide.html');
}

setup().catch(err => {
  console.error(err);
  process.exit(1);
});

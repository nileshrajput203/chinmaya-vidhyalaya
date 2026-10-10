const fs = require('fs');
const path = require('path');

const basePagesDir = path.join(__dirname, '../public/images/pages');

const structure = {
  home: {
    pageTitle: 'Home Page (/)',
    sections: {
      hero: {
        title: 'Hero Section',
        description: 'Hero video poster and background elements',
        images: [
          { name: 'video-poster.webp', source: 'public/images/campus-video-poster.webp', label: 'Campus Life Video Poster (WebP)' },
          { name: 'video-poster.jpg', source: 'public/images/campus-video-poster.jpg', label: 'Campus Life Video Poster (JPEG)' }
        ]
      },
      mosaic: {
        title: 'Scroll-Expanding Mosaic',
        description: '4 photo tiles and video poster surrounding the sticky campus video',
        images: [
          { name: 'top-left.jpg', source: 'public/images/chinmaya/academics/classroom_learning_007.jpg', label: 'Top Left: Physics Optics Lab' },
          { name: 'bottom-left.jpg', source: 'public/images/chinmaya/academics/classroom_learning_010.jpg', label: 'Bottom Left: Reference Library Lounge' },
          { name: 'top-right.jpg', source: 'public/images/school_events/School_Event_2026-09-28_015.jpg', label: 'Top Right: Classroom Interactive Activity' },
          { name: 'bottom-right.jpg', source: 'public/images/chinmaya/academics/classroom_learning_040.jpg', label: 'Bottom Right: Scholastic Classroom (Upright)' },
          { name: 'video-poster.webp', source: 'public/images/campus-video-poster.webp', label: 'Center Video Poster' }
        ]
      },
      bento: {
        title: 'Experience Bento Grid',
        description: '11 photo tiles showcasing academic and campus life',
        images: [
          { name: 'tile-01-academics.jpg', source: 'public/images/chinmaya/academics/classroom_learning_001.jpg', label: 'Tile 1 (Tall 1x2): Research & Microscopy' },
          { name: 'tile-03-optics-lab.jpg', source: 'public/images/chinmaya/academics/classroom_learning_007.jpg', label: 'Tile 3: Physics Optics Experiment' },
          { name: 'tile-04-smart-class.jpg', source: 'public/images/chinmaya/academics/classroom_learning_003.jpg', label: 'Tile 4: Smart Digital Board Classroom' },
          { name: 'tile-05-library.jpg', source: 'public/images/chinmaya/academics/classroom_learning_010.jpg', label: 'Tile 5: Central Library & Reading Lounge' },
          { name: 'tile-06-olympiad.jpg', source: 'public/images/school_events/School_Event_2026-09-27_041.jpg', label: 'Tile 6: Mathematics Olympiad' },
          { name: 'tile-07-seminar.jpg', source: 'public/images/chinmaya/academics/classroom_learning_028.jpg', label: 'Tile 7: Collaborative Seminars' },
          { name: 'tile-08-cultural.jpg', source: 'public/images/chinmaya/cultural/cultural_celebration_001.jpg', label: 'Tile 8: Cultural Heritage Celebration' },
          { name: 'tile-09-exam-focus.jpg', source: 'public/images/chinmaya/academics/classroom_learning_030.jpg', label: 'Tile 9 (Wide 2x1): Examination Hall Focus' },
          { name: 'tile-10-stem-robotics.jpg', source: 'public/images/chinmaya/academics/classroom_learning_050.jpg', label: 'Tile 10: STEM Electronics & Robotics' },
          { name: 'tile-11-it-lab.jpg', source: 'public/images/school_events/School_Event_2026-09-27_082.jpg', label: 'Tile 11 (Wide 2x1): IT Coding Stations' },
          { name: 'tile-12-faculty-mentor.jpg', source: 'public/images/chinmaya/leadership/principal_dimple_mistry.jpg', label: 'Tile 12: Leadership & Faculty Mentorship' }
        ]
      },
      pillars: {
        title: 'Chinmaya Vision Programme (4 Pillars)',
        description: 'Visual representations of the 4 CVP foundational pillars',
        images: [
          { name: 'pillar-01-integrated.png', source: 'public/images/yoga-student.png', label: 'Pillar 01: Integrated Development (Yoga & Fitness)' },
          { name: 'pillar-02-culture.png', source: 'public/images/puja-ceremony-cutout.png', label: 'Pillar 02: Indian Culture (Heritage & Traditions)' },
          { name: 'pillar-03-patriotism.png', source: 'public/images/smiling-volunteer.png', label: 'Pillar 03: Patriotism & Civic Duty (Seva)' },
          { name: 'pillar-04-universal.webp', source: 'public/images/banner-8.webp', label: 'Pillar 04: Universal Outlook (Global Perspective)' }
        ]
      },
      laboratories: {
        title: 'Explore Our Laboratories',
        description: '4 CBSE Laboratories featured on Home page',
        images: [
          { name: 'physics-lab.jpg', source: 'public/images/phys.jpeg', label: 'Physics Laboratory' },
          { name: 'chemistry-lab.jpg', source: 'public/images/CHEM1.jpeg', label: 'Chemistry Laboratory' },
          { name: 'biology-lab.jpg', source: 'public/images/biology-lab.jpg', label: 'Biology Laboratory' },
          { name: 'it-lab.jpg', source: 'public/images/it-lab.jpg', label: 'IT & Computer Laboratory' }
        ]
      },
      leadership: {
        title: 'Leadership & Principal Desk',
        description: 'Official portraits of School Principal and Pujya Gurudev',
        images: [
          { name: 'principal-square.webp', source: 'public/images/principal_dimple_mistry_square.webp', label: 'Principal Smt. Dimple Mistry (Square WebP)' },
          { name: 'principal-square.jpg', source: 'public/images/principal_dimple_mistry_square.jpg', label: 'Principal Smt. Dimple Mistry (Square JPEG)' },
          { name: 'conference-room.png', source: 'public/images/board-conference-room.png', label: 'Executive Boardroom & Leadership Suite' },
          { name: 'swami-chinmayananda.webp', source: 'public/images/swami_chinmayananda_square.webp', label: 'Pujya Gurudev Swami Chinmayananda' }
        ]
      }
    }
  },
  about: {
    pageTitle: 'About Us (/about/*)',
    sections: {
      management: {
        title: 'Board of Management & Leadership',
        description: 'Leadership suite and governance members',
        images: [
          { name: 'conference-room.png', source: 'public/images/board-conference-room.png', label: 'Executive Boardroom' },
          { name: 'principal-dimple-mistry.jpg', source: 'public/images/chinmaya/leadership/principal_dimple_mistry.jpg', label: 'Principal Smt. Dimple Mistry' }
        ]
      },
      swami_chinmayananda: {
        title: 'Founder & Spiritual Heritage',
        description: 'Pujya Gurudev Swami Chinmayananda',
        images: [
          { name: 'swami-chinmayananda.webp', source: 'public/images/swami_chinmayananda_square.webp', label: 'Swami Chinmayananda (Square WebP)' },
          { name: 'swami-portrait.jpg', source: 'public/images/swami_chinmayananda_portrait.jpg', label: 'Swami Chinmayananda (Full Portrait)' }
        ]
      }
    }
  },
  academics: {
    pageTitle: 'Academics (/academics/*)',
    sections: {
      laboratories: {
        title: 'Laboratories & Infrastructure',
        description: 'Science, technology, and research facilities',
        images: [
          { name: 'physics-lab.jpg', source: 'public/images/phys.jpeg', label: 'Physics Laboratory' },
          { name: 'chemistry-lab.jpg', source: 'public/images/CHEM1.jpeg', label: 'Chemistry Laboratory' },
          { name: 'biology-lab.jpg', source: 'public/images/biology-lab.jpg', label: 'Biology Laboratory' },
          { name: 'it-lab.jpg', source: 'public/images/it-lab.jpg', label: 'IT & Computer Laboratory' },
          { name: 'library.jpg', source: 'public/images/lib.jpg', label: 'Central Reference Library' }
        ]
      }
    }
  }
};

async function buildPageWiseStructure() {
  if (!fs.existsSync(basePagesDir)) {
    fs.mkdirSync(basePagesDir, { recursive: true });
  }

  for (const [pageKey, pageData] of Object.entries(structure)) {
    const pageFolder = path.join(basePagesDir, pageKey);
    if (!fs.existsSync(pageFolder)) {
      fs.mkdirSync(pageFolder, { recursive: true });
    }

    console.log(`\n📁 Processing Page: ${pageKey.toUpperCase()} (${pageData.pageTitle})`);

    for (const [secKey, secData] of Object.entries(pageData.sections)) {
      const secFolder = path.join(pageFolder, secKey);
      if (!fs.existsSync(secFolder)) {
        fs.mkdirSync(secFolder, { recursive: true });
      }

      console.log(`  📂 Section: ${secKey}`);
      for (const img of secData.images) {
        const srcPath = path.join(__dirname, '..', img.source);
        const destPath = path.join(secFolder, img.name);

        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`    ✓ ${img.name}`);
        } else {
          console.warn(`    ⚠ Missing source: ${img.source}`);
        }
      }

      // Write section README.txt
      const secReadme = `PAGE: ${pageKey.toUpperCase()}
SECTION: ${secKey.toUpperCase()} (${secData.title})
DESCRIPTION: ${secData.description}

HOW TO REPLACE IMAGES IN THIS SECTION:
1. Open this folder: public/images/pages/${pageKey}/${secKey}/
2. Replace any image file with your new photo using the EXACT SAME FILENAME.
3. The website will automatically update!

IMAGES IN THIS SECTION:
${secData.images.map(img => `- ${img.name} : ${img.label}`).join('\n')}
`;
      fs.writeFileSync(path.join(secFolder, 'README.txt'), secReadme);
    }

    // Write page master README.txt
    const pageReadme = `PAGE: ${pageKey.toUpperCase()} (${pageData.pageTitle})
DIRECTORY: public/images/pages/${pageKey}/

SECTIONS IN THIS PAGE:
${Object.entries(pageData.sections).map(([sKey, sVal]) => `- ${sKey}/ : ${sVal.title} (${sVal.images.length} images)`).join('\n')}

TO REPLACE ANY IMAGE ON THIS PAGE:
Go into the respective section folder, paste your new image, and keep the exact filename.
`;
    fs.writeFileSync(path.join(pageFolder, 'README.txt'), pageReadme);
  }

  // Create Master README in public/images/pages/
  const masterReadme = `# PAGE-WISE & SECTION-WISE IMAGE DIRECTORY
Folder Path: public/images/pages/

This directory organizes all images used across the Chinmaya Vidyalaya website:
FIRST BY PAGE -> THEN BY SECTION!

## Directory Tree:
public/images/pages/
├── home/
│   ├── hero/            -> Hero video poster & background
│   ├── mosaic/          -> Scroll-expanding video mosaic (4 corner photos + video poster)
│   ├── bento/           -> Experience bento grid (11 photos)
│   ├── pillars/         -> 4 CVP foundational pillars
│   ├── laboratories/    -> 4 CBSE laboratories (Physics, Chem, Bio, IT)
│   └── leadership/      -> Principal portrait, Gurudev & boardroom
├── about/
│   ├── management/      -> Board of management and leadership suite
│   └── swami_chinmayananda/ -> Gurudev portraits and spiritual heritage
└── academics/
    └── laboratories/    -> CBSE laboratories and central library

## HOW TO REPLACE ANY IMAGE:
1. Navigate to: public/images/pages/<page>/<section>/
2. Replace the file using the exact same filename.
3. Done! The website will immediately show your new image.
`;
  fs.writeFileSync(path.join(basePagesDir, 'README.md'), masterReadme);

  // Generate Interactive HTML Guide at public/image_pages_guide.html
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page-Wise & Section-Wise Image Directory</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0c0f14; color: #f1f5f9; padding: 40px 20px; }
    .container { max-width: 1440px; margin: 0 auto; }
    header { margin-bottom: 32px; border-bottom: 1px solid #1e293b; padding-bottom: 24px; }
    h1 { font-size: 32px; font-weight: 800; color: #DF711B; text-transform: uppercase; letter-spacing: 0.05em; }
    p.subtitle { color: #94a3b8; font-size: 15px; margin-top: 8px; line-height: 1.6; }
    .nav-tabs { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
    .nav-tab { background: #1e293b; color: #cbd5e1; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.2s; border: 1px solid #334155; }
    .nav-tab:hover, .nav-tab.active { background: #DF711B; color: #fff; border-color: #DF711B; }
    .tip-box { background: #131b26; border-left: 4px solid #DF711B; padding: 16px 20px; border-radius: 4px; margin-top: 20px; font-size: 14px; color: #e2e8f0; }
    .tip-box code { background: #090d14; padding: 2px 6px; border-radius: 4px; color: #f59e0b; font-family: monospace; font-size: 13px; }
    .page-section-block { margin-top: 48px; }
    .page-header { display: flex; align-items: baseline; gap: 14px; border-bottom: 2px solid #DF711B; padding-bottom: 10px; margin-bottom: 28px; }
    .page-title { font-size: 26px; font-weight: 800; text-transform: uppercase; color: #fff; }
    .page-badge { background: #DF711B; color: #fff; font-family: monospace; font-size: 12px; padding: 3px 8px; border-radius: 4px; }
    .section-box { background: #141a24; border: 1px solid #283344; border-radius: 10px; padding: 24px; margin-bottom: 28px; }
    .section-title { font-size: 18px; font-weight: 700; color: #f8fafc; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
    .folder-path { font-family: monospace; font-size: 12px; background: #0b0f16; color: #f59e0b; padding: 4px 10px; border-radius: 4px; border: 1px solid #334155; }
    .section-desc { font-size: 13px; color: #94a3b8; margin: 6px 0 18px 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .card { background: #0b0f15; border: 1px solid #1f2937; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-3px); border-color: #DF711B; }
    .card-img-wrap { width: 100%; height: 160px; background: #05070a; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .card img { width: 100%; height: 100%; object-fit: cover; }
    .card-body { padding: 12px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .file-name { font-family: monospace; font-size: 12px; font-weight: bold; color: #f59e0b; word-break: break-all; }
    .file-label { font-size: 11px; color: #cbd5e1; margin-top: 3px; }
    .file-path { font-family: monospace; font-size: 10px; color: #64748b; margin-top: 8px; word-break: break-all; background: #131922; padding: 3px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Page-Wise & Section-Wise Image Directory</h1>
      <p class="subtitle">All active website photos are organized in a clean 2-level folder hierarchy: <strong>PAGE NAME</strong> &rarr; <strong>SECTION NAME</strong>.</p>
      
      <div class="nav-tabs">
        <a href="#page-home" class="nav-tab">Home Page</a>
        <a href="#page-about" class="nav-tab">About Page</a>
        <a href="#page-academics" class="nav-tab">Academics Page</a>
      </div>

      <div class="tip-box">
        <strong>How to Replace Any Photo:</strong><br>
        Navigate to <code>public/images/pages/&lt;page&gt;/&lt;section&gt;/</code>, drop in your new photo, and rename it to the exact file name shown on the card below. The website updates automatically!
      </div>
    </header>
`;

  for (const [pageKey, pageData] of Object.entries(structure)) {
    html += `
    <div id="page-${pageKey}" class="page-section-block">
      <div class="page-header">
        <h2 class="page-title">${pageKey.toUpperCase()} PAGE</h2>
        <span class="page-badge">public/images/pages/${pageKey}/</span>
      </div>
    `;

    for (const [secKey, secData] of Object.entries(pageData.sections)) {
      const folderWeb = `/images/pages/${pageKey}/${secKey}`;
      html += `
      <div class="section-box">
        <div class="section-title">
          <span>${secData.title}</span>
          <span class="folder-path">${folderWeb}/</span>
        </div>
        <p class="section-desc">${secData.description}</p>
        <div class="grid">
      `;

      for (const img of secData.images) {
        const fullWebPath = `${folderWeb}/${img.name}`;
        html += `
          <div class="card">
            <div class="card-img-wrap">
              <img src="${fullWebPath}" alt="${img.label}" loading="lazy">
            </div>
            <div class="card-body">
              <div>
                <div class="file-name">${img.name}</div>
                <div class="file-label">${img.label}</div>
              </div>
              <div class="file-path">${fullWebPath}</div>
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
    `;
  }

  html += `
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '../public/image_pages_guide.html'), html);
  console.log('✓ Successfully created public/image_pages_guide.html');
}

buildPageWiseStructure().catch(err => {
  console.error(err);
  process.exit(1);
});

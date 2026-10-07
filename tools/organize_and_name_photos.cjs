const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const srcEventsDir = path.join(baseDir, 'public', 'images', 'school_events');
const targetBaseDir = path.join(baseDir, 'public', 'images', 'chinmaya');

const categories = {
  leadership: path.join(targetBaseDir, 'leadership'),
  academics: path.join(targetBaseDir, 'academics'),
  cultural: path.join(targetBaseDir, 'cultural'),
  sports: path.join(targetBaseDir, 'sports'),
  campus: path.join(targetBaseDir, 'campus')
};

// Ensure directories exist
Object.values(categories).forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Original files sorted by mtime
const originalFiles = fs.readdirSync(path.join(baseDir, 'school'))
  .filter(f => f.endsWith('.JPG') || f.endsWith('.jpg'))
  .map(f => ({
    file: f,
    mtime: fs.statSync(path.join(baseDir, 'school', f)).mtime
  }))
  .sort((a, b) => a.mtime - b.mtime);

// Map each original file to its optimized counterpart in school_events
let dateCounts = {};
const fileMapping = originalFiles.map(item => {
  const dateStr = item.mtime.toISOString().split('T')[0];
  dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
  const numStr = dateCounts[dateStr].toString().padStart(3, '0');
  const optFileName = `School_Event_${dateStr}_${numStr}.jpg`;
  return {
    original: item.file,
    mtime: item.mtime,
    dateStr,
    optFile: optFileName
  };
});

let catalog = [];
let galleryItems = [];

// Counters for clean naming
let counters = {
  principal: 0,
  faculty: 0,
  classroom: 0,
  science_lab: 0,
  cultural: 0,
  arts_crafts: 0,
  sports: 0,
  campus: 0
};

fileMapping.forEach(item => {
  const orig = item.original;
  let cat = 'campus';
  let cleanName = '';
  let title = '';
  let eventType = 'Campus Life';

  if (orig.startsWith('C0145')) {
    cat = 'leadership';
    cleanName = 'principal_dimple_mistry.jpg';
    title = 'Principal Smt. Dimple Mistry';
    eventType = 'Leadership';
  } else if (orig.startsWith('C0')) {
    cat = 'leadership';
    counters.faculty++;
    const idxStr = counters.faculty.toString().padStart(2, '0');
    cleanName = `faculty_member_${idxStr}.jpg`;
    title = `Faculty & Teaching Staff ${idxStr}`;
    eventType = 'Faculty';
  } else {
    // DSC camera photos categorized by clusters
    const dscNum = parseInt(orig.replace(/[^0-9]/g, ''), 10);
    
    if (dscNum >= 3256 && dscNum <= 3372) {
      cat = 'academics';
      counters.classroom++;
      const idxStr = counters.classroom.toString().padStart(3, '0');
      cleanName = `classroom_learning_${idxStr}.jpg`;
      title = `Classroom Interactive Learning ${idxStr}`;
      eventType = 'Classroom Life';
    } else if (dscNum >= 3373 && dscNum <= 3551) {
      cat = 'cultural';
      counters.cultural++;
      const idxStr = counters.cultural.toString().padStart(3, '0');
      cleanName = `cultural_celebration_${idxStr}.jpg`;
      title = `Cultural Stage & Festive Celebration ${idxStr}`;
      eventType = 'Cultural Fest';
    } else if (dscNum >= 3562 && dscNum <= 3654) {
      cat = 'cultural';
      counters.arts_crafts++;
      const idxStr = counters.arts_crafts.toString().padStart(3, '0');
      cleanName = `arts_and_creativity_${idxStr}.jpg`;
      title = `Arts, Crafts & Project Exhibition ${idxStr}`;
      eventType = 'Creative Arts';
    } else if ((dscNum >= 3414 && dscNum <= 3493) || (dscNum >= 3673 && dscNum <= 3720)) {
      cat = 'sports';
      counters.sports++;
      const idxStr = counters.sports.toString().padStart(3, '0');
      cleanName = `sports_athletic_meet_${idxStr}.jpg`;
      title = `Sports Championship & Athletics ${idxStr}`;
      eventType = 'Sports Meet';
    } else if (dscNum >= 3378 && dscNum <= 3406) {
      cat = 'academics';
      counters.science_lab++;
      const idxStr = counters.science_lab.toString().padStart(2, '0');
      cleanName = `science_stem_lab_${idxStr}.jpg`;
      title = `Science & STEM Laboratory ${idxStr}`;
      eventType = 'Science & Labs';
    } else {
      cat = 'campus';
      counters.campus++;
      const idxStr = counters.campus.toString().padStart(3, '0');
      cleanName = `campus_facilities_${idxStr}.jpg`;
      title = `Campus Infrastructure & Grounds ${idxStr}`;
      eventType = 'Campus Life';
    }
  }

  const srcPath = path.join(srcEventsDir, item.optFile);
  const destPath = path.join(categories[cat], cleanName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
  }

  const webUrl = `/images/chinmaya/${cat}/${cleanName}`;
  catalog.push({
    original: orig,
    category: cat,
    filename: cleanName,
    url: webUrl,
    title,
    eventType
  });

  galleryItems.push(`  {
    id: "chinmaya-${cat}-${cleanName.replace('.jpg', '')}",
    title: "${title}",
    category: "${cat === 'leadership' ? 'campus' : cat === 'cultural' ? 'celebrations' : cat}",
    event: "${eventType}",
    academicYear: "2026-27",
    date: "${item.dateStr}",
    imageUrl: "${webUrl}",
    caption: "${title} at Chinmaya Vidyalaya, Tarapur."
  }`);
});

console.log(`Successfully organized ${catalog.length} photos:`);
console.log(`- Leadership & Faculty: ${counters.faculty + 1}`);
console.log(`- Classroom & Academics: ${counters.classroom + counters.science_lab}`);
console.log(`- Cultural & Arts: ${counters.cultural + counters.arts_crafts}`);
console.log(`- Sports & Athletics: ${counters.sports}`);
console.log(`- Campus & Facilities: ${counters.campus}`);

// Generate TS index file: src/data/chinmayaImages.ts
const chinmayaImagesTs = `// Auto-generated Chinmaya Vidyalaya Image Catalog & Asset Mapping

export const CHINMAYA_IMAGE_CATEGORIES = {
  LEADERSHIP: '/images/chinmaya/leadership',
  ACADEMICS: '/images/chinmaya/academics',
  CULTURAL: '/images/chinmaya/cultural',
  SPORTS: '/images/chinmaya/sports',
  CAMPUS: '/images/chinmaya/campus',
} as const;

export const CHINMAYA_KEY_PHOTOS = {
  PRINCIPAL: '/images/chinmaya/leadership/principal_dimple_mistry.jpg',
  CLASSROOM_SAMPLE: '/images/chinmaya/academics/classroom_learning_001.jpg',
  SCIENCE_LAB_SAMPLE: '/images/chinmaya/academics/science_stem_lab_01.jpg',
  CULTURAL_STAGE_SAMPLE: '/images/chinmaya/cultural/cultural_celebration_001.jpg',
  ARTS_CRAFTS_SAMPLE: '/images/chinmaya/cultural/arts_and_creativity_001.jpg',
  SPORTS_MEET_SAMPLE: '/images/chinmaya/sports/sports_athletic_meet_001.jpg',
  CAMPUS_SAMPLE: '/images/chinmaya/campus/campus_facilities_001.jpg',
} as const;
`;

fs.writeFileSync(path.join(baseDir, 'src', 'data', 'chinmayaImages.ts'), chinmayaImagesTs);

// Update gallery.ts with new organized items
const galleryTsPath = path.join(baseDir, 'src', 'data', 'gallery.ts');
const newGalleryContent = `import { GalleryItem } from '../types/gallery';

export const OFFICIAL_GALLERY: GalleryItem[] = [
  // Curated Key School Visuals
  {
    id: "gal-lead-principal",
    title: "Principal Leadership & Academic Direction",
    category: "campus",
    event: "Leadership",
    academicYear: "2026-27",
    date: "September 2026",
    imageUrl: "/images/chinmaya/leadership/principal_dimple_mistry.jpg",
    caption: "Smt. Dimple Mistry, Principal, guiding academic distinction and Vedic values."
  },
  {
    id: "gal-1",
    title: "Annual Day Celebrations & Cultural Spectacle",
    category: "celebrations",
    event: "Annual Day",
    academicYear: "2024-25",
    date: "December 2024",
    imageUrl: "/images/banner-9.webp",
    caption: "Magnificent theatrical, classical dance, and scholastic award presentations at the Chinmaya Vidyalaya Annual Day."
  },
  {
    id: "gal-2",
    title: "Athletic Meet & Inter-House Sports Championship",
    category: "sports",
    event: "Sports Meet",
    academicYear: "2024-25",
    date: "January 2025",
    imageUrl: "/images/banner-8.webp",
    caption: "Track and field events, relay championships, and martial arts demonstrations by student houses."
  },
  {
    id: "gal-3",
    title: "Guru Paduka Pooja & Sacred Devotional Assembly",
    category: "celebrations",
    event: "Guru Paduka Pooja",
    academicYear: "2024-25",
    date: "May 2024",
    imageUrl: "/images/guru-paduka-pooja.webp",
    caption: "Solemn prayer gathering, paduka abhishekam, and bhajans invoking divine grace."
  },
  {
    id: "gal-4",
    title: "Science & Innovation Lab Practicals",
    category: "academics",
    event: "Science & Labs",
    academicYear: "2024-25",
    date: "August 2024",
    imageUrl: "/images/CHEM1.jpeg",
    caption: "Students engaged in advanced titration and analytical experiments inside the chemistry laboratory."
  },
  {
    id: "gal-5",
    title: "Inter-School Cultural Fest & Folk Performances",
    category: "celebrations",
    event: "Cultural Fest",
    academicYear: "2024-25",
    date: "October 2024",
    imageUrl: "/images/banner-4.jpeg",
    caption: "Traditional Maharashtrian Lezim and classical dance presentations celebrating heritage."
  },

  // Analyzed and Organized Chinmaya School Photo Archives (316 Photographs)
${galleryItems.join(',\n')}
];

export const GALLERY_YEARS = ['All Years', '2026-27', '2024-25', '2023-24', '2022-23'];

export const GALLERY_EVENTS = [
  'All Events',
  'Leadership',
  'Faculty',
  'Classroom Life',
  'Science & Labs',
  'Cultural Fest',
  'Creative Arts',
  'Sports Meet',
  'Annual Day',
  'Guru Paduka Pooja',
  'Educational Tours',
  'Campus Life'
];
`;

fs.writeFileSync(galleryTsPath, newGalleryContent);
console.log('Updated src/data/gallery.ts with clean organized structure.');

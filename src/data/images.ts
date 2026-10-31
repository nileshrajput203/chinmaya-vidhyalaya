/**
 * ============================================================================
 * CHINMAYA VIDYALAYA TARAPUR - CENTRAL IMAGE ASSET CONFIGURATION
 * ============================================================================
 * 
 * 📁 WHERE ARE THE IMAGES STORED?
 * ----------------------------------------------------------------------------
 * All image files are stored in the `public/images/` directory:
 * 
 * 1. `public/images/chinmaya/academics/`  -> Classrooms, labs, students studying, experiments (228+ photos)
 * 2. `public/images/chinmaya/sports/`     -> Athletic meets, races, track & field, sports day (38+ photos)
 * 3. `public/images/chinmaya/cultural/`   -> Stage fests, dance, drama, choir, pooja ceremonies (304+ photos)
 * 4. `public/images/chinmaya/campus/`     -> School buildings, facilities, grounds, aerial views (26+ photos)
 * 5. `public/images/chinmaya/leadership/` -> Principal, management board, faculty mentors (40+ photos)
 * 6. `public/images/`                     -> Root campus banners, lab photos, and historical assets
 * 
 * ⚡ HOW TO CHANGE ANY IMAGE ON THE WEBSITE:
 * ----------------------------------------------------------------------------
 * Simply change the path string below (e.g., change `/images/...` to any other
 * image in `public/images/`). The entire website will update automatically!
 * ============================================================================
 */

import { OFFICIAL_GALLERY } from './gallery';

// ----------------------------------------------------------------------------
// 1. CORE SCHOOL & CAMPUS IMAGES
// ----------------------------------------------------------------------------
export const SCHOOL_IMAGES = {
  // Main Campus & Hero Visuals
  CAMPUS_HERO: "/images/banner-1.webp?v=2",
  CAMPUS_BUILDING: "/images/banner-1.webp?v=2",
  CAMPUS_WIDE: "/images/banner-1.webp?v=2",

  // Academics & Laboratories
  CLASSROOM_LEARNING: "/images/chinmaya/academics/classroom_learning_001.webp?v=2",
  PHYSICS_LAB: "/images/phys.webp?v=2",
  CHEMISTRY_LAB: "/images/chinmaya/academics/science_stem_lab_01.webp?v=2",
  BIOLOGY_LAB: "/images/biology-lab.jpg?v=2",
  IT_LAB: "/images/pages/home/laboratories/it-lab.jpg?v=2",
  SCIENCE_LAB: "/images/chinmaya/academics/science_stem_lab_01.webp?v=2",
  LIBRARY_STUDY: "/images/lib.webp?v=2",

  // Co-Curricular & Student Life
  SPORTS_DAY: "/images/banner-8.webp?v=2",
  CULTURAL_EVENT: "/images/chinmaya/cultural/cultural_celebration_001.webp?v=2",
  STUDENTS_ACTIVITY: "/images/chinmaya/academics/classroom_learning_001.webp?v=2",

  // Campus Life & Celebrations
  COMPUTERS_TECH: "/images/chinmaya/academics/classroom_learning_002.webp?v=2",
  FACILITIES_OVERVIEW: "/images/chinmaya/campus/campus_facilities_001.webp?v=2",
  ANNUAL_DAY: "/images/banner-9.webp?v=2",
  POOJA_CEREMONY: "/images/guru-paduka-pooja.webp?v=2",
  EDUCATIONAL_TOUR: "/images/chinmaya/cultural/cultural_celebration_001.webp?v=2",
  
  // Leadership & Mentors
  PRINCIPAL: "/images/chinmaya/leadership/principal_dimple_mistry.webp?v=2",
  SWAMIJI: "/images/swamiji.webp?v=2",
  TEACHING_STAFF: "/images/board-conference-room.webp?v=2",
  NON_TEACHING_STAFF: "/images/board-conference-room.webp?v=2",
};

// ----------------------------------------------------------------------------
// 2. HOME PAGE "WE VALUE" 4 TILES (Horizontal Gallery Panel A)
// ----------------------------------------------------------------------------
export const HOME_VALUES_TILES = [
  {
    num: "01",
    title: "CURIOSITY",
    desc: "Embrace lifelong learning & inquiry",
    image: "/images/chinmaya/academics/science_stem_lab_01.webp?v=2",
    link: "/academics/curriculum",
  },
  {
    num: "02",
    title: "INTEGRITY",
    desc: "Rooted in timeless Vedic character",
    image: "/images/guru-paduka-pooja.webp?v=2",
    link: "/about/philosophy",
  },
  {
    num: "03",
    title: "EXCELLENCE",
    desc: "100% AISSE board distinction standard",
    image: "/images/chinmaya/academics/classroom_learning_001.webp?v=2",
    link: "/about/history",
  },
  {
    num: "04",
    title: "VITALITY",
    desc: "Sportsmanship, athletics & vigor",
    image: "/images/banner-8.webp?v=2",
    link: "/academics/co-curricular",
  },
];

// ----------------------------------------------------------------------------
// 3. HOME PAGE PANEL B: MOVING VERTICAL GALLERIES (Two scrolling photo columns)
// ----------------------------------------------------------------------------
export const PANEL_B_MOVING_GALLERY_COL1 = [
  { src: "/images/about2.jpeg?v=2", title: "Main Campus Building" },
  { src: "/images/chinmaya/academics/science_stem_lab_01.webp?v=2", title: "STEM & Science Lab" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_001.jpg?v=2", title: "Track Championship" },
  { src: "/images/chinmaya/cultural/cultural_celebration_001.webp?v=2", title: "Educational Excursion" },
  { src: "/images/phys.webp?v=2", title: "Physics Laboratory" },
  { src: "/images/lib.webp?v=2", title: "Central Library" },
  { src: "/images/banner-8.webp?v=2", title: "Annual Sports Meet" },
  { src: "/images/chinmaya-web-science.webp?v=2", title: "Science Exhibition" },
];

export const PANEL_B_MOVING_GALLERY_COL2 = [
  { src: "/images/pages/home/laboratories/it-lab.jpg?v=2", title: "Computer & Coding Lab" },
  { src: "/images/biology-lab.jpg?v=2", title: "Biology & Life Sciences" },
  { src: "/images/banner-9.webp?v=2", title: "Cultural Fest Stage" },
  { src: "/images/guru-paduka-pooja.webp?v=2", title: "Guru Paduka Pooja" },
  { src: "/images/chinmaya/academics/classroom_learning_001.webp?v=2", title: "Smart Interactive Classes" },
  { src: "/images/chinmaya/cultural/cultural_celebration_015.jpg?v=2", title: "Performing Arts" },
  { src: "/images/chinmaya/cultural/cultural_celebration_040.jpg?v=2", title: "Youth Choir" },
  { src: "/images/board-conference-room.webp?v=2", title: "Faculty & Mentors" },
];

// ----------------------------------------------------------------------------
// 4. RIBBON GALLERY IMAGES (Same 24 images as Photo Gallery)
// ----------------------------------------------------------------------------
export const RIBBON_GALLERY_IMAGES: string[] = OFFICIAL_GALLERY.map((item) => item.imageUrl);

// ----------------------------------------------------------------------------
// 5. CAMPUS STREAM ARCHIVE (3D Corridor in About/History page)
// ----------------------------------------------------------------------------
export const CAMPUS_STREAM_ARCHIVE = [
  { src: "/images/about2.jpeg?v=2", alt: "Chinmaya Vidyalaya Campus Building" },
  { src: "/images/biology-lab.jpg?v=2", alt: "Advanced Biology Laboratory" },
  { src: "/images/lib.jpg?v=2", alt: "Central Knowledge Library" },
  { src: "/images/pages/home/laboratories/it-lab.jpg?v=2", alt: "Computer and Robotics Coding Center" },
  { src: "/images/phys.webp?v=2", alt: "Physics Research Laboratory" },
  { src: "/images/chinmaya/academics/science_stem_lab_01.webp?v=2", alt: "Chemistry Laboratory & Titration" },
  { src: "/images/guru-paduka-pooja.webp?v=2", alt: "Spiritual Traditions & Gurudev Ethos" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_001.jpg?v=2", alt: "Annual Athletics Championship" },
  { src: "/images/chinmaya/cultural/cultural_celebration_001.jpg?v=2", alt: "Cultural Heritage & Folk Performance" },
  { src: "/images/chinmaya/academics/classroom_learning_003.jpg?v=2", alt: "Smart Interactive Digital Classroom" },
  { src: "/images/chinmaya/academics/classroom_learning_007.jpg?v=2", alt: "Optics & Laser Science Experiment" },
  { src: "/images/chinmaya/academics/classroom_learning_010.jpg?v=2", alt: "Reference Library Study Lounge" },
  { src: "/images/chinmaya/academics/classroom_learning_031.jpg?v=2", alt: "Scholastic Seminar & Student Debates" },
  { src: "/images/chinmaya/academics/classroom_learning_030.jpg?v=2", alt: "Examination Focus & Scholastic Rigor" },
  { src: "/images/chinmaya/academics/classroom_learning_033.jpg?v=2", alt: "STEM Hardware & Robotics Prototyping" },
  { src: "/images/chinmaya/cultural/cultural_celebration_015.jpg?v=2", alt: "Classical Dance & Youth Drama" },
  { src: "/images/chinmaya/cultural/cultural_celebration_040.jpg?v=2", alt: "Choral Singing & Musical Orchestration" },
  { src: "/images/chinmaya/academics/classroom_learning_003.jpg?v=2", alt: "Interactive Classroom Mentorship" },
  { src: "/images/chinmaya/campus/campus_facilities_001.jpg?v=2", alt: "Campus Landscaped Quadrangle" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_005.jpg?v=2", alt: "Inter-House Relay & Track Events" },
  { src: "/images/chinmaya/cultural/cultural_celebration_001.webp?v=2", alt: "Educational Field Excursion" },
  { src: "/images/banner-8.webp?v=2", alt: "Sports Meet Victory & House Podiums" },
  { src: "/images/banner-9.webp?v=2", alt: "Annual Day Theatrical Stage Showcase" },
  { src: "/images/swami_chinmayananda_square.webp?v=2", alt: "Founder Param Pujya Gurudev Vision" },
];

// ----------------------------------------------------------------------------
// 6. SVG MARQUEE GALLERY IMAGES (Animated looping stream into 3D folder - same 24 images as Photo Gallery)
// ----------------------------------------------------------------------------
export const MARQUEE_GALLERY_IMAGES = OFFICIAL_GALLERY.map((item) => ({
  src: item.imageUrl,
  alt: item.title || "Chinmaya Vidyalaya Campus",
}));

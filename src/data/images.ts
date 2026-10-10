/**
 * ============================================================================
 * CHINMAYA VIDYALAYA TARAPUR — CENTRAL IMAGE ASSET CONFIGURATION
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
  CAMPUS_HERO: "/images/banner-1.webp",
  CAMPUS_BUILDING: "/images/banner-1.webp",
  CAMPUS_WIDE: "/images/banner-1.webp",

  // Academics & Laboratories
  CLASSROOM_LEARNING: "/images/chinmaya/academics/classroom_learning_001.webp",
  PHYSICS_LAB: "/images/phys.webp",
  CHEMISTRY_LAB: "/images/chinmaya/academics/science_stem_lab_01.webp",
  BIOLOGY_LAB: "/images/biology-lab.jpg",
  IT_LAB: "/images/pages/home/laboratories/it-lab.jpg",
  SCIENCE_LAB: "/images/chinmaya/academics/science_stem_lab_01.webp",
  LIBRARY_STUDY: "/images/lib.webp",

  // Co-Curricular & Student Life
  SPORTS_DAY: "/images/banner-8.webp",
  CULTURAL_EVENT: "/images/chinmaya/cultural/cultural_celebration_001.webp",
  STUDENTS_ACTIVITY: "/images/chinmaya/academics/classroom_learning_001.webp",

  // Campus Life & Celebrations
  COMPUTERS_TECH: "/images/chinmaya/academics/classroom_learning_002.webp",
  FACILITIES_OVERVIEW: "/images/chinmaya/campus/campus_facilities_001.webp",
  ANNUAL_DAY: "/images/banner-9.webp",
  POOJA_CEREMONY: "/images/guru-paduka-pooja.webp",
  EDUCATIONAL_TOUR: "/images/chinmaya/cultural/cultural_celebration_001.webp",
  
  // Leadership & Mentors
  PRINCIPAL: "/images/chinmaya/leadership/principal_dimple_mistry.webp",
  SWAMIJI: "/images/swamiji.webp",
  TEACHING_STAFF: "/images/chinmaya/leadership/faculty_member_01.jpg",
  NON_TEACHING_STAFF: "/images/chinmaya/leadership/faculty_member_01.jpg",
};

// ----------------------------------------------------------------------------
// 2. HOME PAGE "WE VALUE" 4 TILES (Horizontal Gallery Panel A)
// ----------------------------------------------------------------------------
export const HOME_VALUES_TILES = [
  {
    num: "01",
    title: "CURIOSITY",
    desc: "Embrace lifelong learning & inquiry",
    image: "/images/chinmaya/academics/science_stem_lab_01.webp",
    link: "/academics/curriculum",
  },
  {
    num: "02",
    title: "INTEGRITY",
    desc: "Rooted in timeless Vedic character",
    image: "/images/guru-paduka-pooja.webp",
    link: "/about/philosophy",
  },
  {
    num: "03",
    title: "EXCELLENCE",
    desc: "100% AISSE board distinction standard",
    image: "/images/chinmaya/academics/classroom_learning_001.webp",
    link: "/about/history",
  },
  {
    num: "04",
    title: "VITALITY",
    desc: "Sportsmanship, athletics & vigor",
    image: "/images/banner-8.webp",
    link: "/academics/co-curricular",
  },
];

// ----------------------------------------------------------------------------
// 3. HOME PAGE PANEL B: MOVING VERTICAL GALLERIES (Two scrolling photo columns)
// ----------------------------------------------------------------------------
export const PANEL_B_MOVING_GALLERY_COL1 = [
  { src: "/images/about2.jpeg", title: "Main Campus Building" },
  { src: "/images/chinmaya/academics/science_stem_lab_01.webp", title: "STEM & Science Lab" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_001.jpg", title: "Track Championship" },
  { src: "/images/chinmaya/cultural/cultural_celebration_001.webp", title: "Educational Excursion" },
  { src: "/images/phys.webp", title: "Physics Laboratory" },
  { src: "/images/lib.webp", title: "Central Library" },
  { src: "/images/banner-8.webp", title: "Annual Sports Meet" },
  { src: "/images/chinmaya-web-science.webp", title: "Science Exhibition" },
];

export const PANEL_B_MOVING_GALLERY_COL2 = [
  { src: "/images/pages/home/laboratories/it-lab.jpg", title: "Computer & Coding Lab" },
  { src: "/images/biology-lab.jpg", title: "Biology & Life Sciences" },
  { src: "/images/banner-9.webp", title: "Cultural Fest Stage" },
  { src: "/images/guru-paduka-pooja.webp", title: "Guru Paduka Pooja" },
  { src: "/images/chinmaya/academics/classroom_learning_001.webp", title: "Smart Interactive Classes" },
  { src: "/images/chinmaya/cultural/cultural_celebration_015.jpg", title: "Performing Arts" },
  { src: "/images/chinmaya/cultural/cultural_celebration_040.jpg", title: "Youth Choir" },
  { src: "/images/chinmaya/leadership/faculty_member_01.jpg", title: "Faculty & Mentors" },
];

// ----------------------------------------------------------------------------
// 4. RIBBON GALLERY IMAGES (Same 24 images as Photo Gallery)
// ----------------------------------------------------------------------------
export const RIBBON_GALLERY_IMAGES: string[] = OFFICIAL_GALLERY.map((item) => item.imageUrl);

// ----------------------------------------------------------------------------
// 5. CAMPUS STREAM ARCHIVE (3D Corridor in About/History page)
// ----------------------------------------------------------------------------
export const CAMPUS_STREAM_ARCHIVE = [
  { src: "/images/about2.jpeg", alt: "Chinmaya Vidyalaya Campus Building" },
  { src: "/images/biology-lab.jpg", alt: "Advanced Biology Laboratory" },
  { src: "/images/lib.jpg", alt: "Central Knowledge Library" },
  { src: "/images/pages/home/laboratories/it-lab.jpg", alt: "Computer and Robotics Coding Center" },
  { src: "/images/phys.webp", alt: "Physics Research Laboratory" },
  { src: "/images/chinmaya/academics/science_stem_lab_01.webp", alt: "Chemistry Laboratory & Titration" },
  { src: "/images/guru-paduka-pooja.webp", alt: "Spiritual Traditions & Gurudev Ethos" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_001.jpg", alt: "Annual Athletics Championship" },
  { src: "/images/chinmaya/cultural/cultural_celebration_001.jpg", alt: "Cultural Heritage & Folk Performance" },
  { src: "/images/chinmaya/academics/classroom_learning_003.jpg", alt: "Smart Interactive Digital Classroom" },
  { src: "/images/chinmaya/academics/classroom_learning_007.jpg", alt: "Optics & Laser Science Experiment" },
  { src: "/images/chinmaya/academics/classroom_learning_010.jpg", alt: "Reference Library Study Lounge" },
  { src: "/images/chinmaya/academics/classroom_learning_028.jpg", alt: "Scholastic Seminar & Student Debates" },
  { src: "/images/chinmaya/academics/classroom_learning_030.jpg", alt: "Examination Focus & Scholastic Rigor" },
  { src: "/images/chinmaya/academics/classroom_learning_050.jpg", alt: "STEM Hardware & Robotics Prototyping" },
  { src: "/images/chinmaya/cultural/cultural_celebration_015.jpg", alt: "Classical Dance & Youth Drama" },
  { src: "/images/chinmaya/cultural/cultural_celebration_040.jpg", alt: "Choral Singing & Musical Orchestration" },
  { src: "/images/chinmaya/academics/classroom_learning_003.jpg", alt: "Interactive Classroom Mentorship" },
  { src: "/images/chinmaya/campus/campus_facilities_001.jpg", alt: "Campus Landscaped Quadrangle" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_005.jpg", alt: "Inter-House Relay & Track Events" },
  { src: "/images/chinmaya/cultural/cultural_celebration_001.webp", alt: "Educational Field Excursion" },
  { src: "/images/banner-8.webp", alt: "Sports Meet Victory & House Podiums" },
  { src: "/images/banner-9.webp", alt: "Annual Day Theatrical Stage Showcase" },
  { src: "/images/swami_chinmayananda_square.webp", alt: "Founder Param Pujya Gurudev Vision" },
];

// ----------------------------------------------------------------------------
// 6. SVG MARQUEE GALLERY IMAGES (Animated looping stream into 3D folder - same 24 images as Photo Gallery)
// ----------------------------------------------------------------------------
export const MARQUEE_GALLERY_IMAGES = OFFICIAL_GALLERY.map((item) => ({
  src: item.imageUrl,
  alt: item.title || "Chinmaya Vidyalaya Campus",
}));

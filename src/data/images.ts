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
  CHEMISTRY_LAB: "/images/chinmaya/cultural/cultural_celebration_016.jpg?v=2",
  BIOLOGY_LAB: "/images/chinmaya/academics/classroom_learning_018.jpg?v=2",
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
    image: "/images/pages/home/horizontal_values/curiosity-student.jpg",
    link: "/academics/curriculum",
  },
  {
    num: "02",
    title: "INTEGRITY",
    desc: "Rooted in timeless Vedic character",
    image: "/images/chinmaya/cultural/arts_and_creativity_006.jpg?v=2",
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
    image: "/images/chinmaya/sports/sports_athletic_meet_001.webp",
    link: "/academics/co-curricular",
  },
];

// ----------------------------------------------------------------------------
// 3. HOME PAGE PANEL B: MOVING VERTICAL GALLERIES (Two scrolling photo columns)
// ----------------------------------------------------------------------------
import { OFFICIAL_GALLERY } from './gallery';

export const PANEL_B_MOVING_GALLERY_COL1 = [
  { src: "/images/banner-1.webp", title: "School Campus & Academic Wings" },
  { src: "/images/pages/home/mosaic/top-left.webp", title: "Science & Optics Laboratory" },
  { src: "/images/chinmaya/academics/classroom_learning_036.webp", title: "Active Classroom Participation" },
  { src: "/images/banner-9.webp", title: "Annual Day Cultural Spectacle" },
  { src: "/images/chinmaya/academics/classroom_learning_089.webp", title: "Scholastic Research & Study" },
  { src: "/images/pages/home/mosaic/bottom-right.webp", title: "Interactive Academic Discussion" },
];

export const PANEL_B_MOVING_GALLERY_COL2 = [
  { src: "/images/banner-8.webp", title: "Athletic Meet & Sports Championship" },
  { src: "/images/chinmaya/cultural/cultural_celebration_100.webp", title: "Interactive Digital Smart Board" },
  { src: "/images/pages/home/mosaic/bottom-left.webp", title: "Central Reference Library" },
  { src: "/images/pages/home/mosaic/top-right.webp", title: "Scholastic Academic Classrooms" },
  { src: "/images/chinmaya/academics/classroom_learning_092.webp", title: "Quiet Reference Study Zone" },
  { src: "/images/chinmaya/academics/classroom_learning_096.webp", title: "Scholastic Reading Hall" },
];

// ----------------------------------------------------------------------------
// 4. RIBBON GALLERY IMAGES (Dynamic from Photo Gallery)
// ----------------------------------------------------------------------------
export const RIBBON_GALLERY_IMAGES: string[] = OFFICIAL_GALLERY.map(item => item.imageUrl);

// ----------------------------------------------------------------------------
// 5. CAMPUS STREAM ARCHIVE (3D Corridor in About/History page)
// ----------------------------------------------------------------------------
export const CAMPUS_STREAM_ARCHIVE = [
  // 1. Digital Smart Classroom & Cultural Presentation
  { src: "/images/chinmaya/cultural/cultural_celebration_100.webp", alt: "Interactive Digital Smart Board Learning" },

  // 2. Central Reference Library & Scholastic Reading
  { src: "/images/pages/home/mosaic/bottom-left.webp", alt: "Central Reference Library & Book Archives" },

  // 3. Athletics Meet & Multi-Sport Championship
  { src: "/images/banner-8.webp", alt: "Inter-House Athletic Championship & Sports Meet" },

  // 4. Scholastic Academic Research & Study
  { src: "/images/chinmaya/academics/classroom_learning_089.webp", alt: "Scholastic Research & Collaborative Study" },

  // 5. Senior Science & Optics Innovation Laboratory
  { src: "/images/pages/home/mosaic/top-left.webp", alt: "Science & Optics Innovation Laboratory" },

  // 6. Annual Day Grand Theatrical Cultural Spectacle
  { src: "/images/banner-9.webp", alt: "Annual Day Cultural Spectacle & Theatrical Pageant" },

  // 7. Quiet Reference & Reading Hall Archives
  { src: "/images/chinmaya/academics/classroom_learning_096.webp", alt: "Scholastic Reading Hall & Reference Archives" },

  // 8. Vidyalaya Campus Grounds & Academic Wings
  { src: "/images/banner-1.webp", alt: "School Campus Grounds & Academic Wings" },

  // 9. Active Classroom Engagement & Mentorship
  { src: "/images/chinmaya/academics/classroom_learning_036.webp", alt: "Active Classroom Participation & Inquiry" },

  // 10. Spacious Well-Ventilated Secondary Classrooms
  { src: "/images/pages/home/mosaic/top-right.webp", alt: "Scholastic Academic Classrooms & Natural Light" },

  // 11. Quiet Scholastic Reference Study Bays
  { src: "/images/chinmaya/academics/classroom_learning_092.webp", alt: "Quiet Reference Study Zone & Research" },

  // 12. Collaborative Group Inquiry & Academic Discussion
  { src: "/images/pages/home/mosaic/bottom-right.webp", alt: "Interactive Academic Discussion & Project Study" },

  // 13. Cultural Heritage Stage Performance
  { src: "/images/banner-9.webp", alt: "Performing Arts & Cultural Stage Celebration" },

  // 14. Modern Academic Learning Spaces
  { src: "/images/pages/home/mosaic/top-right.webp", alt: "Naturally Lit Secondary Learning Classrooms" },

  // 15. Collaborative Multimedia Digital Sessions
  { src: "/images/chinmaya/cultural/cultural_celebration_100.webp", alt: "Smart Screen Collaborative Interactive Session" },

  // 16. Track & Field Sports Leadership
  { src: "/images/banner-8.webp", alt: "Athletic Meet Track & Field Sports Agility" },

  // 17. Dedicated Scholastic Reference Archives
  { src: "/images/chinmaya/academics/classroom_learning_092.webp", alt: "Scholastic Reference Reading Bays" },

  // 18. Experimental Physics & Chemistry Lab Stations
  { src: "/images/pages/home/mosaic/top-left.webp", alt: "Hands-on Science & Apparatus Laboratory" },

  // 19. Senior Student Academic Seminars
  { src: "/images/chinmaya/academics/classroom_learning_036.webp", alt: "Senior Academic Seminar & Classroom Notes" },

  // 20. Curated Literary & Scholastic Volume Stack
  { src: "/images/pages/home/mosaic/bottom-left.webp", alt: "Curated Reference Volumes & Library Hall" },

  // 21. Campus Academic Infrastructure & Green Grounds
  { src: "/images/banner-1.webp", alt: "Campus Infrastructure & Academic Facilities" },

  // 22. In-Depth Scholastic Peer Discussion
  { src: "/images/pages/home/mosaic/bottom-right.webp", alt: "Peer Learning & Collaborative Group Study" },

  // 23. Focused Academic Preparation & Scholastic Rigor
  { src: "/images/chinmaya/academics/classroom_learning_089.webp", alt: "Scholastic Rigor & Dedicated Study Bays" },

  // 24. Literature Research & Reading Hall
  { src: "/images/chinmaya/academics/classroom_learning_096.webp", alt: "Student Research Reading & Literature Archives" },
];

// ----------------------------------------------------------------------------
// 6. SVG MARQUEE GALLERY IMAGES (Animated looping stream into 3D folder - dynamic from Photo Gallery)
// ----------------------------------------------------------------------------
export const MARQUEE_GALLERY_IMAGES = OFFICIAL_GALLERY.map((item) => ({
  src: item.imageUrl,
  alt: item.title,
}));

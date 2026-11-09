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
    image: "/images/04-academics/labs/biology/bio-2.jpg",
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
  { src: "/images/banner-1.jpg?v=2", title: "School Campus" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_001.jpg?v=2", title: "Athletics Championship" },
  { src: "/images/chinmaya/academics/classroom_learning_001.jpg?v=2", title: "Smart Digital Classroom" },
  { src: "/images/lib.webp?v=2", title: "Central Library" },
  { src: "/images/chinmaya/cultural/arts_and_creativity_003.jpg?v=2", title: "Arts & Creativity" },
  { src: "/images/chinmaya-web-science.webp?v=2", title: "Science Exhibition" },
  { src: "/images/04-academics/sports/sports-1.jpg?v=2", title: "Indoor Sports Pavilion" },
  { src: "/images/chinmaya/academics/classroom_learning_010.jpg?v=2", title: "Scholastic Study Lounge" },
];

export const PANEL_B_MOVING_GALLERY_COL2 = [
  { src: "/images/04-academics/labs/computer/it-1.jpg?v=2", title: "Computer & Coding Lab" },
  { src: "/images/banner-9.webp?v=2", title: "Annual Day Celebrations" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_003.jpg?v=2", title: "Inter-House March Past" },
  { src: "/images/chinmaya/cultural/cultural_celebration_100.jpg?v=2", title: "Classical Indian Dance" },
  { src: "/images/chinmaya/academics/classroom_learning_016.jpg?v=2", title: "Interactive Learning" },
  { src: "/images/chinmaya/cultural/cultural_celebration_106.jpg?v=2", title: "Stage Festivities" },
  { src: "/images/chinmaya/cultural/arts_and_creativity_006.jpg?v=2", title: "Creative Exhibition" },
  { src: "/images/banner-8.webp?v=2", title: "Sports Championship" },
];

// ----------------------------------------------------------------------------
// 4. RIBBON GALLERY IMAGES (Dynamic from Photo Gallery)
// ----------------------------------------------------------------------------
export const RIBBON_GALLERY_IMAGES: string[] = OFFICIAL_GALLERY.map(item => item.imageUrl);

// ----------------------------------------------------------------------------
// 5. CAMPUS STREAM ARCHIVE (3D Corridor in About/History page)
// ----------------------------------------------------------------------------
export const CAMPUS_STREAM_ARCHIVE = [
  // 1. Founder Heritage
  { src: "/images/03-about-heritage/swami.jpeg", alt: "Founder Vision: Param Pujya Swami Chinmayananda" },
  
  // 2. Science Lab - Physics (Laser optical bench)
  { src: "/images/04-academics/labs/physics/physics-lab-1.jpg", alt: "Physics Lab: Optical Bench Laser Calibration" },

  // 3. Cultural - Classical Indian Dance Performance
  { src: "/images/chinmaya/cultural/cultural_celebration_002.jpg", alt: "Classical Indian Dance: Cultural Fest Performance" },

  // 4. Sports - Inter-House Relay Race Handover
  { src: "/images/chinmaya/sports/sports_athletic_meet_005.jpg", alt: "Athletics Meet: Inter-House Relay Race Handover" },

  // 5. Classroom - Interactive Digital Smart Lecture
  { src: "/images/chinmaya/academics/classroom_learning_005.jpg", alt: "Smart Classroom: Digital Interactive Instruction" },

  // 6. Creative Arts - Painting & Canvas Art Studio
  { src: "/images/chinmaya/cultural/arts_and_creativity_002.jpg", alt: "Fine Arts Studio: Creative Painting & Visual Art" },

  // 7. Science Lab - Chemistry Titration & Burette
  { src: "/images/04-academics/labs/chemistry/chem-2.jpg", alt: "Chemistry Lab: Precision Titration Workspace" },

  // 8. Cultural - Folk Dance & Festival Celebration
  { src: "/images/chinmaya/cultural/cultural_celebration_007.jpg", alt: "Cultural Celebration: Traditional Folk Dance" },

  // 9. Sports - 100m Track & Field Sprint Race
  { src: "/images/chinmaya/sports/sports_athletic_meet_002.jpg", alt: "Athletics Championship: 100m Track & Field Sprint Race" },

  // 10. Classroom - Collaborative Group Learning & Discussion
  { src: "/images/chinmaya/academics/classroom_learning_004.jpg", alt: "Classroom Life: Collaborative Discussion & Notes" },

  // 11. Creative Arts - 3D Sculpture & Clay Modeling
  { src: "/images/chinmaya/cultural/arts_and_creativity_004.jpg", alt: "Creative Crafts: 3D Sculpture & Model Prototyping" },

  // 12. Science Lab - Biology Compound Microscope Slide Study
  { src: "/images/04-academics/labs/biology/bio-1.jpg", alt: "Biology Lab: Student Microscope Slide Examination" },

  // 13. Cultural - Musical Instrument Orchestration & Harmonium
  { src: "/images/chinmaya/cultural/cultural_celebration_023.jpg", alt: "Musical Orchestration: Indian Classical Instruments" },

  // 14. Sports - Track & Field High/Long Jump Event
  { src: "/images/chinmaya/sports/sports_athletic_meet_004.jpg", alt: "Athletics Meet: Field Jump & Athletic Agility" },

  // 15. Classroom - Senior Secondary Scholastic Focus & Rigor
  { src: "/images/chinmaya/academics/classroom_learning_030.jpg", alt: "Scholastic Rigor: Board Examination Preparation" },

  // 16. Creative Arts - Paper Art, Origami & Model Exhibition
  { src: "/images/chinmaya/cultural/arts_and_creativity_008.jpg", alt: "Creative Arts: Paper Crafts & Student Handiwork" },

  // 17. Cultural - Youth Drama & Theatrical Stage Skit
  { src: "/images/chinmaya/cultural/cultural_celebration_019.jpg", alt: "Youth Theater: Sanskrit & Cultural Drama Skit" },

  // 18. Sports - Team March Past & House Banner Parade
  { src: "/images/chinmaya/sports/sports_athletic_meet_011.jpg", alt: "Annual Sports Day: House March Past & Parade" },

  // 19. Classroom - Student Academic Seminars & Debates
  { src: "/images/chinmaya/academics/classroom_learning_031.jpg", alt: "Academic Enrichment: Student Seminars & Presentations" },

  // 20. Cultural - Vocal Choir & Uplifting Bhajans
  { src: "/images/chinmaya/cultural/cultural_celebration_031.jpg", alt: "Choral Singing: Uplifting Vedic Hymns & Bhajans" },

  // 21. Science Lab - Chemistry Analytical Balances
  { src: "/images/04-academics/labs/chemistry/chem-1.jpg", alt: "Analytical Chemistry: Digital Balance Measurements" },

  // 22. Cultural - Traditional Festive Costumed Performance
  { src: "/images/chinmaya/cultural/cultural_celebration_045.jpg", alt: "Festive Performance: Traditional Heritage Pageant" },

  // 23. Classroom - Primary Active Learning & Interaction
  { src: "/images/chinmaya/academics/classroom_learning_002.jpg", alt: "Primary Academics: Active Classroom Mentorship" },

  // 24. Sports - Inter-House Track Meet Victory & Podium
  { src: "/images/chinmaya/sports/sports_athletic_meet_007.jpg", alt: "Sports Day: Track Athletics Finish Line & Celebration" },
];

// ----------------------------------------------------------------------------
// 6. SVG MARQUEE GALLERY IMAGES (Animated looping stream into 3D folder - dynamic from Photo Gallery)
// ----------------------------------------------------------------------------
export const MARQUEE_GALLERY_IMAGES = OFFICIAL_GALLERY.map((item) => ({
  src: item.imageUrl,
  alt: item.title,
}));

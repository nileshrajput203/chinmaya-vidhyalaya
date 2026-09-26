export interface AcademicSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  features?: string[];
}

export const ACADEMIC_SECTIONS: Record<string, AcademicSectionData> = {
  curriculum: {
    slug: "curriculum",
    title: "CBSE Curriculum & Subjects",
    subtitle: "Co-educational coverage from Nursery to Std XII (Arts, Commerce, Science)",
    content: [
      "Chinmaya Vidyalaya is a premier co-educational institution providing academic coverage from Nursery to Std XII. The medium of instruction in all classes is English. The Vidyalaya is affiliated to CBSE. Classrooms have the capacity to accommodate more than 40 students per section.",
      "Primary Section (Std I to V) focuses on foundational literacy, numeracy, and environmental awareness alongside creative pursuits in arts, craft, and physical education.",
      "Secondary Section (Std VI to X) offers a comprehensive blend of core languages, advanced sciences (Physics, Chemistry, Biology), Social Sciences (History, Civics, Geography, Economics, Disaster Management), Mathematics, and General Knowledge.",
      "Senior Secondary Section (Std XI & XII) offers three streams: Arts, Commerce, and Science, providing students with comprehensive academic preparation for higher education and competitive examinations."
    ],
    features: [
      "Primary (Std I to V) Scholastic: English, Hindi, Mathematics, Environmental Studies (EVS), General Knowledge",
      "Primary (Std I to V) Non-Scholastic: Work Education, Art & Craft Education, Physical Education",
      "Secondary (Std VI to X) Languages: English, Hindi, Sanskrit / Marathi",
      "Secondary (Std VI to X) Social Sciences: History, Civics, Geography, Economics, Disaster Management, EVS",
      "Secondary (Std VI to X) Science & Tech: Physics, Chemistry, Biology, Mathematics, General Knowledge",
      "Senior Secondary (Std XI & XII): Arts, Commerce, and Science streams available",
      "Secondary Non-Scholastic: Activities under Work Education, Art & Craft Education, Physical Education"
    ]
  },
  "co-curricular": {
    slug: "co-curricular",
    title: "Co-Curricular Activities",
    subtitle: "Nurturing creative expression, athletic talents, and leadership skills",
    content: [
      "Education at Chinmaya Vidyalaya extends beyond textbooks. We offer a rich array of co-curricular opportunities to ensure balanced physical, emotional, and creative development.",
      "Students actively participate in debates, elocutions, science exhibitions, house competitions, and the prestigious annual Gita Chanting Competition."
    ],
    features: [
      "Performing Arts: Classical & Light Music, Devotional Bhajans, Classical Dance, Drama",
      "Visual Arts: Painting, Craft, Drawing Competitions, Rangoli, Sculpture workshops",
      "Sports & Athletics: Cricket, Football, Volleyball, Table Tennis, Chess, Yoga, March Past",
      "Student Clubs: Eco Club, Science Club, Literary Society, Mathematics Club"
    ]
  },
  faculty: {
    slug: "faculty",
    title: "Teaching Faculty",
    subtitle: "Experienced educators committed to student development",
    content: [
      "Our faculty comprises highly qualified and experienced teachers who act as mentors, facilitators, and compassionate guides.",
      "Faculty members regularly participate in CBSE training workshops, pedagogical seminars, and technology integration programmes to stay at the forefront of modern educational techniques."
    ],
    features: [
      "Qualified educators adhering to CBSE teacher recruitment criteria",
      "Regular in-service capacity building and pedagogical training workshops",
      "Continuous mentoring and personalised doubt-clearing sessions for students"
    ]
  },
  "teaching-strategy": {
    slug: "teaching-strategy",
    title: "Teaching Strategy & Pedagogy",
    subtitle: "Child-centred and activity-oriented modern pedagogical practices",
    content: [
      "At Chinmaya Vidyalaya, teaching strategies are designed to transform learning from rote memorisation into active, joyful discovery.",
      "Our teachers employ diverse interactive methods to ensure every child grasps core concepts with clarity and confidence."
    ],
    features: [
      "Play-way method for early childhood and foundational stages",
      "Activity-oriented learning to promote conceptual understanding",
      "Child-centred learning tailored to diverse student aptitudes",
      "Demonstrative and experimental methods in laboratories",
      "Interactive methods encouraging open discussions and inquiry",
      "Learning-by-doing through hands-on projects and model making",
      "Using audio-visual aids and digital boards in classrooms",
      "Using the latest educational software and multimedia resources"
    ]
  },
  infrastructure: {
    slug: "infrastructure",
    title: "School Infrastructure",
    subtitle: "Spacious classrooms, well-equipped science laboratories, and library facilities",
    content: [
      "Located in Vidyanagar, Saravali, Boisar, the campus provides a safe, green, and spacious environment equipped with excellent academic and sports facilities.",
      "The Vidyalaya features a well-stocked Library, dedicated Chemistry Lab, Physics Lab, Biology Lab, IT Lab, and outdoor sports fields."
    ],
    features: [
      "Central Library with thousands of reference books, periodicals, and quiet reading areas",
      "Fully equipped Physics Laboratory for practical experimentation",
      "Fully equipped Chemistry Laboratory for practical experimentation",
      "Biology Laboratory with specimens and microscopes",
      "Modern IT (Computer) Laboratory",
      "Classrooms with capacity for more than 40 students, with optimal natural lighting and ventilation",
      "Spacious Sports Ground for football, cricket, volleyball, and athletics",
      "CCTV surveillance, fire safety systems, and safe drinking water plants"
    ]
  }
};

export interface AcademicSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  bulletPoints?: string[];
  features?: string[];
}

export const ACADEMIC_SECTIONS: Record<string, AcademicSectionData> = {
  curriculum: {
    slug: "curriculum",
    title: "CBSE Curriculum & Subjects",
    subtitle: "Co-educational coverage from Nursery to Std XII (Arts, Commerce, Science)",
    content: [
      "Chinmaya Vidyalaya is a premier co-educational institution providing academic coverage from Nursery to Std XII. The medium of instruction in all classes is English. The Vidyalaya is affiliated to the Central Board of Secondary Education (CBSE), New Delhi.",
      "Primary Section (Std I to V) focuses on foundational literacy, numeracy, and environmental awareness alongside creative pursuits in arts, craft, and physical education. Classrooms have the physical capacity to comfortably accommodate more than 40 students per section.",
      "Secondary Section (Std VI to X) offers a comprehensive blend of core languages, advanced sciences (Physics, Chemistry, Biology), Social Sciences (History, Civics, Geography, Economics, Disaster Management), Mathematics, and General Knowledge.",
      "Senior Secondary Section (Std XI & XII) offers three distinguished streams: Arts, Commerce, and Science, providing students with rigorous academic preparation for higher education, competitive entrance examinations, and ethical leadership."
    ],
    bulletPoints: [
      "CBSE Affiliation No: 1130058, School Code: 30040, U-DISE: 27361116004",
      "100% first-class record in CBSE AISSE Class X Board examinations",
      "English medium instruction with trilingual proficiency (English, Hindi, Sanskrit/Marathi)",
      "Continuous Formative and Summative Assessments as per CBSE pedagogical frameworks"
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
      "Education at Chinmaya Vidyalaya extends far beyond textbooks and chalkboards. We offer a rich array of co-curricular opportunities to ensure balanced physical, emotional, intellectual, and creative development for every child.",
      "Students actively participate in intra-school and inter-school debates, elocutions, science and STEM exhibitions, house tournaments, and the prestigious annual Chinmaya Mission Gita Chanting Competition.",
      "Our four-house system fosters leadership, camaraderie, healthy competition, and teamwork through regular sports meets, cultural fests, quiz bowls, and annual drama productions.",
      "Through structured non-scholastic periods integrated into the weekly timetable, every student is encouraged to discover innate artistic talents, hone athletic skills, and cultivate public speaking confidence."
    ],
    bulletPoints: [
      "Four dynamic student houses encouraging teamwork, democratic elections, and school spirit",
      "Annual Athletic Meet and inter-house football, cricket, volleyball, and chess tournaments",
      "Cultural celebration days including Gurudev Jayanti, Sanskrit Diwas, and Matru-Pitru Pujan",
      "Active clubs: Eco-Club (Jal Pakhwada), Science & Robotics Forum, Literary & Debating Society"
    ],
    features: [
      "Performing Arts: Classical & Light Music, Devotional Bhajans, Classical Dance, Drama & Theatrics",
      "Visual Arts: Painting, Craft, Drawing Competitions, Rangoli, Sculpture and Origami workshops",
      "Sports & Athletics: Cricket, Football, Volleyball, Table Tennis, Chess, Daily Yoga, March Past",
      "Student Leadership: Elected Student Council, Head Boy/Girl leadership corps, and House Captains"
    ]
  },
  faculty: {
    slug: "faculty",
    title: "Teaching Faculty",
    subtitle: "Experienced educators committed to student mentorship and academic excellence",
    content: [
      "Our faculty comprises highly qualified, compassionate, and experienced teachers who act as mentors, facilitators, and role models for our learners.",
      "Faculty members regularly participate in CBSE training workshops, pedagogical seminars, and technology integration programmes to stay at the forefront of modern educational techniques.",
      "Guided by the spiritual ethos of Central Chinmaya Mission Trust, our teachers blend modern digital instructional tools with the sacred tradition of the Guru-Shishya parampara.",
      "Continuous professional development ensures our educators deliver personalized doubt-clearing, differentiated instruction, and caring pastoral mentorship for every student."
    ],
    bulletPoints: [
      "100% adherence to CBSE teacher eligibility criteria, qualifications, and pedagogical standards",
      "Regular in-service capacity building workshops conducted by Chinmaya Education Cell (CCMT)",
      "Individualized student doubt-clearing sessions and parent-teacher consultative dialogues",
      "Dedicated department heads across Sciences, Mathematics, Humanities, and Languages"
    ],
    features: [
      "Qualified educators adhering to CBSE teacher recruitment criteria",
      "Regular in-service capacity building and pedagogical training workshops",
      "Continuous mentoring and personalised doubt-clearing sessions for students",
      "Integration of smart board digital content with hands-on experiential learning"
    ]
  },

  infrastructure: {
    slug: "infrastructure",
    title: "School Infrastructure & Facilities",
    subtitle: "Spacious classrooms, well-equipped science laboratories, IT hubs, and sports grounds",
    content: [
      "Located in Vidyanagar, Saravali, Boisar, the Chinmaya Vidyalaya campus provides a safe, serene, green, and spacious environment equipped with top-tier academic and sports facilities.",
      "The Vidyalaya features a well-stocked Central Library, dedicated Chemistry Lab, Physics Lab, Biology Lab, IT Computer Innovation Lab, and expansive outdoor sports grounds.",
      "Classrooms are architecturally planned with generous floor areas capable of seating more than 40 students with optimal natural cross-ventilation, abundant sunlight, and ergonomic furniture.",
      "Robust campus safety infrastructure includes 24/7 CCTV surveillance across all corridors and gates, certified municipal fire safety installations, safe RO drinking water plants, and modern sanitation amenities."
    ],
    bulletPoints: [
      "Well-ventilated classrooms with generous capacity (>40 students) and smart audio-visual equipment",
      "State-of-the-art Physics, Chemistry, Biology, and IT computer laboratories",
      "Central Library housing thousands of academic titles, encyclopedias, and reference journals",
      "Full municipal building safety certification, fire safety clearances, and RO drinking water"
    ],
    features: [
      "Central Library with thousands of reference books, periodicals, and quiet reading areas",
      "Fully equipped Physics Laboratory with optical benches, electrical apparatus, and measuring instruments",
      "Fully equipped Chemistry Laboratory with fume hoods, analytical reagents, and safety showers",
      "Biology Laboratory with specimen archives, compound microscopes, and anatomical models",
      "Modern IT (Computer) Laboratory with high-speed internet and educational software",
      "Classrooms with capacity for more than 40 students, with optimal natural lighting and ventilation",
      "Spacious Sports Ground for football, cricket, volleyball, athletic tracks, and march past",
      "CCTV surveillance, fire safety systems, safe drinking water plants, and first-aid infirmary"
    ]
  }
};


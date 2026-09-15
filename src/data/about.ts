export interface AboutSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  bulletPoints?: string[];
  image?: string;
  swamijiQuote?: string;
}

export const ABOUT_SECTIONS: Record<string, AboutSectionData> = {
  history: {
    slug: "history",
    title: "About Us & History",
    subtitle: "A school with a difference – started with 72 students and 4 teachers",
    swamijiQuote: "Children are not vessels to be filled, but lamps to be lit. — Pujya Gurudev Swami Chinmayananda",
    image: "/images/swami.jpeg",
    content: [
      "Chinmaya Vidyalaya is affiliated to the CBSE Delhi Board. A school with a difference, it started off with a batch of 72 students and four teachers, and has now blossomed into a full-fledged educational institution.",
      "Emulating the holistic vision of the illustrious founder, the Great Vedantic Master Swami Chinmayananda, the Vidyalaya has been imparting value-based education to students across Tarapur and Boisar.",
      "It provides a practical and judicious combination of academic excellence, extra-curricular pursuits, character building, and personality development to empower students for lifelong growth and noble citizenship.",
      "In addition to academic milestones, the Vidyalaya maintains strict statutory compliance and institutional transparency. All official Transfer Certificates (TC) and mandatory disclosures are maintained in our certified public records."
    ],
    bulletPoints: [
      "Affiliated to Central Board of Secondary Education (CBSE), New Delhi",
      "CBSE Affiliation No: 1130058 | School Code: 30064 | U-DISE: 27361116004",
      "Established under the Chinmaya Mission Educational Cell (CCMT Education Cell)",
      "Co-educational institution covering Jr. KG up to Standard XII (Science & Commerce)",
      "Classroom facilities spacious enough to comfortably seat more than 40 students with dedicated personal care",
      "Consistent 100% AISSE Board Examination Results with high first-class rankings",
      "Mandatory Disclosures & Transfer Certificates (TC) available for transparent online verification"
    ]
  },
  "mission-vision": {
    slug: "mission-vision",
    title: "Mission & Vision",
    subtitle: "To empower a community of learners who dare to dream, take risks and develop new realities",
    swamijiQuote: "To be human is to be aware. To be noble is to care. — Swami Chinmayananda",
    image: "/images/swami.jpeg",
    content: [
      "Vision: To empower a community of learners who dare to dream, take risks and develop new realities.",
      "Mission: To offer value-based holistic education that integrates ancient Indian cultural ethos with modern scientific inquiry, nurturing physical vitality, mental agility, intellectual depth, and spiritual awakening.",
      "Rooted in the Chinmaya Vision Program (CVP), we seek to produce competent, patriotic, compassionate, and spiritually anchored citizens equipped to meet contemporary global challenges."
    ],
    bulletPoints: [
      "Integrated Development: Physical, Mental, Intellectual, and Spiritual faculties",
      "Indian Culture: Inculcating reverence for heritage, moral values, and traditions",
      "Patriotism: Developing civic responsibility and dedicated national commitment",
      "Universal Outlook: Fostering empathy, environmental harmony, and global brotherhood"
    ]
  },
  philosophy: {
    slug: "philosophy",
    title: "Chinmaya Vision Program (CVP)",
    subtitle: "A comprehensive educational philosophy designed by Pujya Gurudev Swami Chinmayananda",
    swamijiQuote: "The spirit of devotion and selfless action transforms standard schooling into a noble life-building exercise.",
    image: "/images/swami.jpeg",
    content: [
      "The Chinmaya Vision Program (CVP) is a concrete educational philosophy that transforms standard schooling into a noble life-building exercise.",
      "It rests on four core pillars: Integrated Development, Indian Culture, Patriotism, and Universal Outlook.",
      "Through CVP, academic instruction is reinforced with daily Guru Paduka Pooja, Balvihar moral classes, Gita chanting, yoga, and meditation.",
      "Our learning spaces are thoughtfully constructed with a capacity to hold more than 40 students per section while preserving the warmth, individual attention, and values that define a Chinmaya institution."
    ],
    bulletPoints: [
      "Integrated Development: Physical fitness, emotional balance, intellectual sharpness, and spiritual awareness",
      "Indian Culture: Immersion in ancient ethos, festival celebrations, and moral discernment",
      "Patriotism: Active citizenship, respect for the national flag, anthem, and armed forces",
      "Universal Outlook: Global harmony, ecological stewardship, and universal love",
      "Daily Guru Paduka Pooja, Balvihar moral values, and Gita chanting competitions"
    ]
  },
  enrollment: {
    slug: "enrollment",
    title: "Enrollment & Admission Guidelines",
    subtitle: "Admission guidelines, class capacity (>40), and registration details",
    content: [
      "Chinmaya Vidyalaya Tarapur provides academic coverage from Nursery, Jr. KG, Sr. KG up to Std XII. The medium of instruction in all classes is English.",
      "Our well-ventilated, technologically enabled classrooms have a capacity capable of accommodating more than 40 students, though we cap sections according to CBSE pedagogical guidelines to guarantee individualized student attention and safety.",
      "Admissions are open to all students on a merit and availability basis without discrimination. Official registration forms for Nursery, KG, and Std I to IX are available for direct download.",
      "Transfer Certificates (TC) issued from recognized CBSE or state board schools must be submitted at the time of admission confirmation."
    ],
    bulletPoints: [
      "Classroom Architecture: Spacious infrastructure with capacity exceeding 40 students",
      "Pedagogical Care: Individualized mentoring and low student-to-teacher ratio",
      "Registration Forms for Nursery, KG & Std I-IX available online",
      "Documents Required: Birth Certificate, Previous School Progress Report, Transfer Certificate (TC)",
      "CBSE Affiliation No: 1130058 | School Code: 30064",
      "Stream allocations for Senior Secondary (XI & XII): Science & Commerce"
    ]
  },
  "mandatory-information": {
    slug: "mandatory-information",
    title: "Mandatory Public Disclosures & Transfer Certificates (TC)",
    subtitle: "Official CBSE disclosure certificates, affiliation documents, and Transfer Certificate records",
    content: [
      "In strict compliance with CBSE directives, SARAS portal guidelines, and transparency mandates, Chinmaya Vidyalaya Tarapur publishes all statutory documents, safety certificates, and Transfer Certificates (TC) for public inspection.",
      "All statutory certificates—including building safety, fire clearance, potable water & sanitation, society registration, NOC, RTE recognition, fee structure, SMC, PTA, and official Transfer Certificates (TC sample & annual registers for 2020, 2021, and 2023)—are available in verified view-only format."
    ],
    bulletPoints: [
      "Official Transfer Certificates (TC): View sample TC and archive registers (2020, 2021, 2023)",
      "CBSE Affiliation No: 1130058 | School Code: 30064 | U-DISE: 27361116004",
      "State Government NOC & RTE Recognition Certificate",
      "Building Stability and Fire Safety Clearance Certificates",
      "Safe Drinking Water Quality & Sanitary Inspection Compliance",
      "Complete School Management Committee (SMC) and PTA details",
      "3-Year Class X and Class XII Board Examination Pass Percentages (100% Track Record)"
    ]
  },
  management: {
    slug: "management",
    title: "Board of Management",
    subtitle: "Institutional leadership, trustees, and advisory council",
    content: [
      "The Vidyalaya is guided by a distinguished Board of Management comprising eminent industrialists, doctors, chartered accountants, legal experts, and educationists under the Chinmaya Mission umbrella.",
      "Under the leadership of Chairman Sri T.B. Thakur, Secretary Dr. K.S. Shivashankar, and Principal Sri B. Anilkumar, the management ensures highest standards of institutional governance and student welfare."
    ],
    bulletPoints: [
      "Chairman: Sri. T.B. Thakur (Industrialist)",
      "Secretary: Dr. K.S. Shivashankar (Doctor)",
      "Chartered Accountant: Sri. Shriram Bhaleraoji",
      "Legal Advisor: Sri. Parag Kulkarni (Advocate)",
      "Medical Advisors: Dr. Shobha Sankhe, Dr. Ratnakar Mane, Dr. Manjusha Mane, Dr. Dathatreya Nayak",
      "Executive Head: Sri. B. Anilkumar (Principal & Ex-Officio Member)",
      "Vice Principal: Smt. Vasanthy Nair (Member)"
    ]
  }
};

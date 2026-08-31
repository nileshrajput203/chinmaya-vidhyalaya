export interface AboutSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  bulletPoints?: string[];
}

export const ABOUT_SECTIONS: Record<string, AboutSectionData> = {
  history: {
    slug: "history",
    title: "About Us & History",
    subtitle: "A school with a difference – started with 72 students and 4 teachers",
    content: [
      "Chinmaya Vidyalaya is affiliated to the CBSE Delhi Board. A school with a difference, it started off with a batch of 72 students and four teachers, and has now blossomed into a full-fledged educational institution.",
      "Emulating the holistic vision of the illustrious founder, the Great Vedantic Master Swami Chinmayananda, the Vidyalaya has been imparting value-based education to students across Tarapur and Boisar.",
      "It provides a practical and judicious combination of academic excellence, extra-curricular pursuits, character building, and personality development to empower students for lifelong growth and noble citizenship."
    ],
    bulletPoints: [
      "Affiliated to Central Board of Secondary Education (CBSE), New Delhi",
      "CBSE Affiliation No: 1130058 | School Code: 30064 | U-DISE: 27361116004",
      "Established under the Chinmaya Mission Educational Cell (CCMT Education Cell)",
      "Co-educational institution covering Jr. KG up to Standard XII (Science & Commerce)",
      "Consistent 100% AISSE Board Examination Results with high first class rankings"
    ]
  },
  "mission-vision": {
    slug: "mission-vision",
    title: "Mission & Vision",
    subtitle: "To empower a community of learners who dare to dream, take risks and develop new realities",
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
    content: [
      "The Chinmaya Vision Program (CVP) is a concrete educational philosophy that transforms standard schooling into a noble life-building exercise.",
      "It rests on four core pillars: Integrated Development, Indian Culture, Patriotism, and Universal Outlook.",
      "Through CVP, academic instruction is reinforced with daily Guru Paduka Pooja, Balvihar moral classes, Gita chanting, yoga, and meditation."
    ],
    bulletPoints: [
      "Integrated Development: Physical fitness, emotional balance, intellectual sharpness, and spiritual awareness",
      "Indian Culture: Immersion in ancient ethos, festival celebrations, and moral discernment",
      "Patriotism: Active citizenship, respect for the national flag, anthem, and armed forces",
      "Universal Outlook: Global harmony, ecological stewardship, and universal love"
    ]
  },
  enrollment: {
    slug: "enrollment",
    title: "Enrollment & Admission Process",
    subtitle: "Admission guidelines, class-wise strength, and registration details",
    content: [
      "Chinmaya Vidyalaya Tarapur provides academic coverage from Nursery, Jr. KG, Sr. KG up to Std XII. The medium of instruction in all classes is English.",
      "To ensure individualized attention and optimal learning outcomes, the strength of students in each class does not exceed 40.",
      "Admissions are open to all students on a merit and availability basis without discrimination. Registration forms for Nursery, KG, and Std I to IX are available for download."
    ],
    bulletPoints: [
      "Maximum Class Strength: Capped at 40 students per section for personalized care",
      "Nursery, KG & Std I-IX Application Forms available online",
      "Documents Required: Birth Certificate, Previous School Progress Report, Transfer Certificate (TC)",
      "Class-wise strength and fee structure fully compliant with CBSE disclosure norms",
      "Stream allocations for Senior Secondary (XI & XII): Science & Commerce"
    ]
  },
  "mandatory-information": {
    slug: "mandatory-information",
    title: "Mandatory Public Disclosures",
    subtitle: "Official CBSE disclosure certificates, affiliation documents, and safety compliance records",
    content: [
      "In strict compliance with CBSE directives and SARAS portal guidelines, Chinmaya Vidyalaya Tarapur publishes all statutory documents and certificates for public access.",
      "All documents—including building safety, fire safety, potable water & sanitation, society registration, NOC, RTE recognition, fee structure, SMC, and PTA—are available for viewing and download."
    ],
    bulletPoints: [
      "CBSE Affiliation No: 1130058 | School Code: 30064 | U-DISE: 27361116004",
      "State Government NOC & RTE Recognition Certificate",
      "Building Stability and Fire Safety Clearance Certificates",
      "Safe Drinking Water Quality & Sanitary Inspection Compliance",
      "Complete School Management Committee (SMC) and PTA details"
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

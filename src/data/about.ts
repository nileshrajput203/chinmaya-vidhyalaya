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
      "Chinmaya Vidyalaya is affiliated to the CBSE Delhi Board. A school with a difference, it was envisaged in 1993 by dedicated devotees of the Tarapur Chinmaya Mission Centre, inspired by Param Pujya Swami Chinmayanandaji.",
      "The construction of the first phase commenced in 1994 in the sacred presence of Param Pujya Swami Tejomayanandaji. The Vidyalaya was formally inaugurated on 18 June 1995 by H.H. Swami Purushottamanandaji.",
      "Starting with a modest batch of 72 students and four teachers, the institution holds the distinction of being the first school established by Chinmaya Mission in the Maharashtra–Gujarat–Goa zone. Today, the school has blossomed into a premier institution with approximately 1600 students on roll.",
      "The Vidyalaya was granted CBSE Affiliation in 2003 (Affiliation No: 1130058, School Code: 30040, U-DISE: 27361116004). The very first batch of Standard X appeared for the All India Secondary School Examination (AISSE) in 2004–2005, maintaining a tradition of distinguished academic excellence.",
      "Located in Boisar, about 100 km north of Mumbai on the Western Railway, the school is an undertaking of Central Chinmaya Mission Trust, Mumbai, with the Local Managing Committee guiding its day-to-day administration."
    ],
    bulletPoints: [
      "Affiliated to Central Board of Secondary Education (CBSE), New Delhi",
      "CBSE Affiliation No: 1130058 | School Code: 30040 | U-DISE: 27361116004",
      "Managed by: Central Chinmaya Mission Trust, Mumbai (Local Managing Committee handles day-to-day management)",
      "Envisaged in 1993; Construction in 1994 with Param Pujya Swami Tejomayanandaji",
      "Inaugurated on 18 June 1995 by H.H. Swami Purushottamanandaji",
      "Starting Enrollment (1995): 72 students and 4 teachers",
      "Current Enrollment: Approximately 1600 students on roll",
      "First school established by Chinmaya Mission in the Maharashtra–Gujarat–Goa zone",
      "CBSE Affiliation granted in 2003; First Batch of Std X (AISSE) in 2004–2005",
      "Location: P-201, MIDC Area, Vidyanagar, Saravali, Boisar 401501, Dist: Palghar, Maharashtra",
      "Mandatory Disclosures & Transfer Certificates (TC) certified for transparent verification"
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
      "Educational Approach: The Chinmaya Vision Programme (CVP) seamlessly integrates Value Education with academics for comprehensive personality development, inspiring noble citizenship."
    ],
    bulletPoints: [
      "Integrated Development: Physical, Mental, Intellectual, and Spiritual faculties",
      "Indian Culture: Inculcating reverence for heritage, moral values, and traditions",
      "Patriotism: Developing civic responsibility and dedicated national commitment",
      "Universal Outlook: Fostering empathy, environmental harmony, and global brotherhood",
      "Founder: Param Pujya Swami Chinmayanandaji"
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
      "Our learning spaces are thoughtfully constructed with a capacity to hold more than 40 students per section while preserving the warmth, individual attention, and values that define a Chinmaya Vidyalaya institution."
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
      "Chinmaya Vidyalaya provides academic coverage from Nursery, Jr. KG, Sr. KG up to Std XII. The medium of instruction in all classes is English.",
      "Our well-ventilated, technologically enabled classrooms are capable of accommodating more than 40 students, though we cap sections according to CBSE pedagogical guidelines to guarantee individualized student attention and safety.",
      "Admissions are open to all students on a merit and availability basis without discrimination. Official registration forms for Nursery, KG, and Std I to IX are available for direct download.",
      "Transfer Certificates (TC) issued from recognized CBSE or state board schools must be submitted at the time of admission confirmation."
    ],
    bulletPoints: [
      "Classroom Architecture: Spacious infrastructure with capacity exceeding 40 students",
      "Pedagogical Care: Individualized mentoring and low student-to-teacher ratio",
      "Registration Forms for Nursery, KG & Std I-IX available online",
      "Documents Required: Birth Certificate, Previous School Progress Report, Transfer Certificate (TC)",
      "CBSE Affiliation No: 1130058 | School Code: 30040 | U-DISE: 27361116004",
      "Stream allocations for Senior Secondary (XI & XII): Science & Commerce"
    ]
  },
  "mandatory-information": {
    slug: "mandatory-information",
    title: "Mandatory Public Disclosures & Transfer Certificates (TC)",
    subtitle: "Official CBSE disclosure certificates, affiliation documents, and Transfer Certificate records",
    content: [
      "In strict compliance with CBSE directives, SARAS portal guidelines, and transparency mandates, Chinmaya Vidyalaya publishes all statutory documents, safety certificates, and Transfer Certificates (TC) for public inspection.",
      "All statutory certificates—including building safety, fire clearance, potable water & sanitation, society registration, NOC, RTE recognition, fee structure, SMC, PTA, and official Transfer Certificates (TC sample & annual registers for 2020, 2021, and 2023)—are available in verified view-only format."
    ],
    bulletPoints: [
      "Official Transfer Certificates (TC): View sample TC and archive registers (2020, 2021, 2023)",
      "CBSE Affiliation No: 1130058 | School Code: 30040 | U-DISE: 27361116004",
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
    subtitle: "Institutional leadership, governance, and managing committee",
    content: [
      "Chinmaya Vidyalaya is an undertaking of Central Chinmaya Mission Trust, Mumbai, with the Local Managing Committee handling day-to-day operations and strategic school governance.",
      "The Board of Management comprises eminent industrialists, doctors, educationists, and CCMT trustees dedicated to the highest standards of student development and institutional excellence.",
      "Led by Chairman Sri. T.B. Thakur, Vice-Chairman Dr. Parag Kulkarni, Secretary Dr. Shivshankar, and Principal Smt. Dimple Mistry, the governance structure ensures rigorous academic standards rooted in Vedantic values."
    ],
    bulletPoints: [
      "Managing Trust: Central Chinmaya Mission Trust, Mumbai (Local Managing Committee)",
      "1. Sri. T.B. Thakur — Chairman (Industrialist | Tel: 9823147178 | thakur@tpr.grengg.com)",
      "2. Shri Shriram Bhalerao — Trustee, CCMT (Industrialist | bhaleraosg@labindia.com)",
      "3. Atul Karanjkar — Zonal Director (atul.karanjkar@chinmayaeducationcell.org)",
      "4. Dr. Parag Kulkarni — Vice-Chairman (Doctor | Tel: 9823045534 | paragkulkarni1960@gmail.com)",
      "5. Dr. Shivshankar — Secretary (Doctor | Tel: 9975527700 | drshankar.shiv@gmail.com)",
      "6. Dr. (Smt.) Shobha Sankhe — Member (Doctor | Tel: 9823147089 | 2005shobha@gmail.com)",
      "7. Dr. Ratnakar Mane — Member (Doctor | Tel: 9822634820 | drratnakarmane@gmail.com)",
      "8. Sri. B.K. Poddar — Member (Industrialist | Tel: 9987636090 | cvtarapur@rediffmail.com)",
      "9. Dr. Dathatreya Nayak — Member (Doctor | Tel: 9673776711 | ddnayak30@gmail.com)",
      "10. Smt. Dimple Mistry — Member (Principal) (Educationist | Tel: 7775872266 | cv.principal@chinmayamission.com)"
    ]
  },
  "swami-chinmayananda": {
    slug: "swami-chinmayananda",
    title: "Pujya Gurudev Swami Chinmayananda",
    subtitle: "The Visionary Saint, Spiritual Renaissance Master, and Founding Inspiration of Chinmaya Vidyalayas",
    swamijiQuote: "Children are not vessels to be filled, but lamps to be lit. To illuminate a child's heart is to illuminate the future of the nation.",
    image: "/images/swami.jpeg",
    content: [
      "Pujya Gurudev Swami Chinmayananda Saraswati (8 May 1916 – 3 August 1993) was one of modern India's most extraordinary spiritual renaissance leaders, philosopher-saints, and educational visionaries. Born Balakrishna Menon (Balan) in Ernakulam, Kerala, he was an ardent patriot who participated actively in the Quit India Movement of 1942 and endured British imprisonment.",
      "As a fierce, sharp-witted investigative journalist writing for 'The National Herald', he traveled to the Himalayas in 1947 intent on uncovering what he presumed was religious dogma. Instead, upon meeting Sri Swami Sivananda Saraswati at Ananda Kutir, Rishikesh, his analytical intellect was conquered by profound spiritual realization. On Mahashivaratri (25 February 1949), he was initiated into the holy order of Sannyasa and bestowed with the sacred monastic name Swami Chinmayananda ('One who revels in pure Consciousness').",
      "Sent to the austere heights of Uttarkashi to study the Prasthanatraya (Upanishads, Bhagavad Gita, and Brahma Sutras) under the revered ascetic master Swami Tapovan Maharaj, Gurudev spent eight rigorous years in intense contemplation. Desiring to liberate timeless Vedantic wisdom from mountain hermitages and deliver it directly to the common people, Gurudev conducted his historic first Geeta Jnana Yajna in Pune on 31 December 1951.",
      "In 1953, devotees formally instituted the Central Chinmaya Mission Trust (CCMT) headquartered in Mumbai (Sandeepany Sadhanalaya, Powai). Over 42 years of tireless global work, Gurudev addressed millions across 576 Jnana Yajnas, authoring over 95 authoritative books and founding over 100 Chinmaya Vidyalayas across India.",
      "Recognizing that cultural regeneration begins with youth, Gurudev crafted the revolutionary Chinmaya Vision Programme (CVP)—a four-pillar pedagogical system synthesizing academic distinction, Indian cultural rootedness, patriotic citizenship, and a universal compassionate outlook. In 1993, inspired by Gurudev's grace, devotees in Tarapur established Chinmaya Vidyalaya, which stands today as a lighthouse of holistic learning in Boisar."
    ],
    bulletPoints: [
      "Born: Balakrishna Menon on 8 May 1916 in Ernakulam, Kerala | Departed: 3 August 1993 (Mahasamadhi in San Diego, California)",
      "Academic & Patriot: Master of Arts (Literature & Law) from Lucknow University; Freedom Fighter in Quit India Movement 1942",
      "Investigative Journalist: Writer for The National Herald alongside prominent leaders of the Indian independence movement",
      "Spiritual Diksha: Initiated into Sannyasa by H.H. Sri Swami Sivananda Saraswati on Mahashivaratri, 25 February 1949",
      "Himalayan Tapasya: 8 years of rigorous Vedantic mastery under Brahma-Vidya Master Swami Tapovan Maharaj in Uttarkashi",
      "First Geeta Jnana Yajna: Pune, 31 December 1951, sparking the global Chinmaya Mission movement",
      "Founding Central Chinmaya Mission Trust (CCMT): Established in 1953 in Mumbai to steer international spiritual and social initiatives",
      "Architect of Chinmaya Vision Programme (CVP): Integrated Development, Indian Culture, Patriotism, and Universal Outlook",
      "Tarapur Consecration: Envisaged 1993, foundation stone laid 1994 with Param Pujya Swami Tejomayanandaji, consecrated 18 June 1995"
    ]
  }
};

export interface FeatureSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  bulletPoints?: string[];
  highlights?: string[];
}

export const FEATURE_SECTIONS: Record<string, FeatureSectionData> = {
  "four-pillars": {
    slug: "four-pillars",
    title: "The 4 Pillars of Chinmaya Vision Programme",
    subtitle: "A comprehensive educational blueprint formulated by Pujya Gurudev Swami Chinmayananda",
    content: [
      "The Chinmaya Vision Programme (CVP) is a holistic educational philosophy that transforms traditional classroom instruction into a profound life-building journey. It is anchored firmly on four foundational pillars: Integrated Development, Indian Culture, Patriotism, and Universal Outlook.",
      "Pujya Gurudev Swami Chinmayananda envisioned an education system that synthesises modern scientific exploration with timeless Vedantic values, moulding students who are intellectually sharp, emotionally balanced, culturally rooted, and globally responsible.",
      "Every curriculum subject, co-curricular endeavour, and daily ritual at Chinmaya Vidyalaya is woven with these 4 pillars, ensuring our students flourish into compassionate leaders capable of navigating a rapidly changing world.",
      "Through regular value-education modules, daily prayers, and character-building discourses, CVP fosters a lifelong compass for moral discernment, integrity, and selfless service."
    ],
    bulletPoints: [
      "Pillar 1 — Integrated Development: Balancing physical, mental, intellectual, and spiritual growth",
      "Pillar 2 — Indian Culture & Heritage: Inculcating reverence for ancient wisdom, Vedic ethos, and family values",
      "Pillar 3 — Patriotism & Civic Duty: Nurturing active citizenship, national pride, and environmental duty",
      "Pillar 4 — Universal Outlook: Fostering 'Vasudhaiva Kutumbakam' (The world is one family) and global empathy"
    ],
    highlights: [
      "Pillar 1 - Integrated Development: Cultivating the physical, mental, intellectual, and spiritual dimensions of each student simultaneously",
      "Pillar 2 - Indian Culture & Heritage: Inculcating reverence for ancient wisdom, Vedic ethos, moral values, and respectful family traditions",
      "Pillar 3 - Patriotism & Civic Responsibility: Nurturing pride in India's glorious heritage, active citizenship, and selfless commitment to national progress",
      "Pillar 4 - Universal Outlook (Vasudhaiva Kutumbakam): Inspiring a cosmic perspective of global brotherhood, ecological harmony, and empathy across borders"
    ]
  },
  "holistic-development": {
    slug: "holistic-development",
    title: "Holistic Development & Student Well-Being",
    subtitle: "4-Fold Individual Transformation across Physical, Emotional, Intellectual, and Spiritual Domains",
    content: [
      "At Chinmaya Vidyalaya Tarapur, holistic development is an intentional, daily practice that nurtures the child across four distinct human dimensions: Physical Vitality, Emotional Poise, Intellectual Sharpness, and Spiritual Depth.",
      "Physical Domain (Sharirik Vikas): Through daily morning Surya Namaskar, structured sports coaching in football, cricket, volleyball, table tennis, and athletics, we ensure students build stamina, motor coordination, and sportsmanship.",
      "Emotional & Social Domain (Manasik Vikas): Our nurturing campus atmosphere, responsive house mentorship, anti-bullying protocols, and student counselling foster emotional resilience, empathy, conflict resolution, and lasting peer bonds.",
      "Intellectual & Spiritual Domain (Bauddhik & Adhyatmik Vikas): Advanced STEM laboratories, ASSET diagnostic analytical assessments, and library research sharpen cognitive inquiry, while daily meditation and moral reflection instill ethical clarity."
    ],
    bulletPoints: [
      "Physical Fitness: Daily morning yoga, expansive athletic fields, and inter-house sports leagues",
      "Emotional Poise: Compassionate teacher-student mentorship, peer counselling, and value education",
      "Intellectual Agility: ASSET skill-based diagnostic testing, science olympiads, and debating forums",
      "Spiritual Anchoring: Daily prayer assemblies, mindful breathing, and ethical decision-making guidance"
    ],
    highlights: [
      "Physical Domain: Daily Surya Namaskar, sports leagues, athletics coaching, and fitness tracking",
      "Emotional Domain: House mentorship corps, mental wellness check-ins, and peer bonding forums",
      "Intellectual Domain: STEM innovation labs, critical thinking workshops, and ASSET evaluations",
      "Spiritual Domain: Daily Guru Paduka Pooja, mindfulness meditation, and moral value classes"
    ]
  },
  "spiritual-activities": {
    slug: "spiritual-activities",
    title: "Spiritual Activities & Cultural Ethos",
    subtitle: "Daily Guru Paduka Pooja, Balvihar moral values, monthly Bhajans, and Gita Chanting",
    content: [
      "Spiritual grounding is the beating heart of life at Chinmaya Vidyalaya. We perform 'Guru Paduka Pooja' every morning and on auspicious occasions like Chinmaya Aradhana Day and Guru Purnima.",
      "Every year, the academic session for Standard X and XII students commences and culminates with a solemn Guru Paduka Pooja, seeking divine blessings for wisdom and concentration in board examinations.",
      "We hold devotional Bhajan sessions on the third Saturday of every month. Swamis, Swaminis, and Brahmacharis from Central Chinmaya Mission Trust visit annually to inspire students with uplifting satsangs.",
      "Students practice simple mindfulness meditation, Pranayama, and Surya Namaskar during morning assembly, creating an atmosphere of deep tranquility, self-discipline, and inner focus."
    ],
    bulletPoints: [
      "Daily Guru Paduka Pooja and morning prayer assemblies for mental clarity",
      "Academic session commencement & valediction blessings for Class X and XII batches",
      "Monthly Bhajan assemblies on the 3rd Saturday celebrating devotional Indian music",
      "Annual Chinmaya Mission Inter-School Gita Chanting Competition"
    ],
    highlights: [
      "Daily Guru Paduka Pooja and special observances on Chinmaya Aradhana Day & Guru Purnima",
      "Academic session inauguration and valediction ceremonies with Guru Paduka Pooja for Std X & XII",
      "Monthly Bhajan sessions held every 3rd Saturday of the month",
      "Annual spiritual discourses and interactive satsangs with visiting Swamis & Swaminis",
      "Daily yoga, Surya Namaskar, Pranayama, and simple meditation practice",
      "Participation in the prestigious Annual Chinmaya Mission Gita Chanting Competition"
    ]
  },
  "career-counselling": {
    slug: "career-counselling",
    title: "Career Counselling & Aptitude Assessment",
    subtitle: "Expert workshops by Young Buzz and diagnostic assessments by ASSET",
    content: [
      "We organise comprehensive career guidance and personality development workshops for students and parents conducted by Young Buzz, India's premier corporate career guidance organisation.",
      "The primary objective is to empower students to understand their innate potential based on their interest, personality, and cognitive aptitude, enabling them to make informed, self-assured career choices.",
      "We also conduct skill-based diagnostic assessments for students from Standard III to Standard IX through ASSET, India's leading research organisation in educational testing.",
      "These evaluations pinpoint conceptual strengths and specific learning gaps, allowing educators and parents to implement targeted remedial support for accelerated student progress."
    ],
    bulletPoints: [
      "Professional aptitude and psychometric assessments by Young Buzz for Class IX to XII",
      "Detailed ASSET diagnostic skill testing for Standard III through Standard IX",
      "Parent-student counselling seminars for informed selection of Arts, Commerce, and Science streams",
      "Guidance sessions for competitive national entrance examinations (JEE, NEET, CUET, CA Foundation)"
    ],
    highlights: [
      "Career Guidance & Personality Development workshops by Young Buzz for students and parents",
      "Aptitude, interest, and psychometric evaluation for informed academic stream selection",
      "Skill-based diagnostic assessments by ASSET for Std III to Std IX",
      "Targeted remedial guidance based on individual diagnostic test insights",
      "Special guidance sessions for competitive examinations and future career pathways"
    ]
  },
  "education-tours": {
    slug: "education-tours",
    title: "Educational Study Tours & Field Trips",
    subtitle: "Experiential learning, industrial exposure in MIDC, and cultural excursions",
    content: [
      "Educational study tours and field trips form an integral cornerstone of the learning experience at Chinmaya Vidyalaya, taking education far beyond the four walls of the classroom.",
      "Situated near the Tarapur industrial belt, students benefit from curated industrial visits to manufacturing installations, engineering hubs, and power generation units to observe practical applications of science.",
      "Field excursions to botanical gardens, regional nature parks, planetariums, and historical heritage landmarks broaden students' ecological awareness and historical perspective.",
      "These experiential journeys cultivate team collaboration, adaptability, observational acuity, and lifelong bonds among classmates under the careful supervision of faculty chaperones."
    ],
    bulletPoints: [
      "Annual educational field visits organized for all classes from Pre-Primary to Class XII",
      "Industrial visits to Tarapur MIDC engineering and technology manufacturing facilities",
      "Visits to Nehru Science Centre, planetariums, and regional ecological sanctuaries",
      "Structured student worksheets and post-tour presentation projects cementing learned insights"
    ],
    highlights: [
      "Annual educational field trips for all primary and secondary classes",
      "Industrial visits to manufacturing units and power installations",
      "Visits to science exhibits, planetariums, and eco-parks",
      "Team building, leadership, and social development opportunities during study excursions"
    ]
  },
  "library": {
    slug: "library",
    title: "Central Library & Knowledge Archives",
    subtitle: "Thousands of reference volumes, periodicals, quiet reading corners, and digital resources",
    content: [
      "The Central Library at Chinmaya Vidyalaya is a vibrant sanctuary of knowledge and intellectual exploration, thoughtfully curated to inspire independent study and a lifelong love for reading.",
      "Our expansive collection spans thousands of titles including CBSE curriculum textbooks, reference encyclopaedias, classical literature, biographies, science periodicals, and cultural philosophy in English, Hindi, and Marathi.",
      "A dedicated, serene reading room provides students with an undisturbed environment for quiet reflection, examination preparation, project research, and group scholastic inquiries.",
      "Regular library periods integrated into the school timetable guide students in research methodology, citation literacy, and discerning use of both print and digital informational archives."
    ],
    bulletPoints: [
      "Vast catalog of over 8,000 volumes across sciences, mathematics, humanities, and fiction",
      "Subscriptions to leading national dailies, educational journals, and children's science magazines",
      "Dedicated reference section supporting Class X and XII CBSE Board project preparation",
      "Quiet, naturally lit reading room equipped with individual study carrels"
    ],
    highlights: [
      "Rich repository of books in English, Hindi, and Marathi",
      "Subscriptions to leading educational journals, science magazines, and daily newspapers",
      "Reference corner supporting project research for secondary and senior secondary students",
      "Dedicated reading periods and library timings for students"
    ]
  }
};


export interface FeatureSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  highlights?: string[];
}

export const FEATURE_SECTIONS: Record<string, FeatureSectionData> = {
  "four-pillars": {
    slug: "four-pillars",
    title: "The 4 Pillars of Chinmaya Vision Program",
    subtitle: "A comprehensive educational blueprint formulated by Pujya Gurudev Swami Chinmayananda",
    content: [
      "The Chinmaya Vision Program (CVP) is a holistic educational philosophy that transforms traditional classroom instruction into a profound life-building journey. It is anchored firmly on four foundational pillars: Integrated Development, Indian Culture, Patriotism, and Universal Outlook.",
      "Pujya Gurudev Swami Chinmayananda envisioned an education system that synthesizes modern scientific exploration with timeless Vedantic values, molding students who are intellectually sharp, emotionally balanced, culturally rooted, and globally responsible.",
      "Every curriculum subject, co-curricular endeavor, and daily ritual at Chinmaya Vidyalaya Tarapur is woven with these 4 pillars, ensuring our students flourish into compassionate leaders capable of navigating a rapidly changing world."
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
    title: "Holistic Development in 4 Parts",
    subtitle: "Comprehensive 4-fold student transformation with optimal classroom capacity and personalized care",
    content: [
      "Holistic development at Chinmaya Vidyalaya Tarapur is structured into 4 distinct, synergistic components designed to nurture the complete persona of the child.",
      "Part 1 - Integrated Development & Optimal Capacity: Our curriculum combines academic rigour with physical fitness, emotional stability, and intellectual acumen. While our spacious campus facilities and state-of-the-art classrooms are architected to comfortably accommodate a capacity of more than 40 students, we maintain disciplined classroom environments where each child receives personalized attention, continuous formative assessment, and mentoring from experienced teachers.",
      "Part 2 - Cultural Grounding: Daily Guru Paduka Pooja, Balvihar moral values, Sanskrit shlokas, and Gita chanting instill profound respect for elders, teachers, and cultural roots.",
      "Part 3 - Patriotic Leadership: Civic responsibility, national celebrations, environmental conservation drives like Jal Pakhwada, and leadership programs prepare youth for nation building.",
      "Part 4 - Universal Outlook: Scientific temper, international mindedness, and compassion for all living beings embody the ancient Vedic ideal 'Vasudhaiva Kutumbakam' (The world is one family)."
    ],
    highlights: [
      "Part 1 - Integrated Growth: Harmonious training of body, mind, and intellect; spacious classrooms with capacity exceeding 40 students managed with personalized student care",
      "Part 2 - Cultural Rootedness: Daily prayers, devotional bhajans, festive celebrations, and ethical discernment rooted in Indian ethos",
      "Part 3 - Patriotic Spirit: Active social initiatives, tree plantation, civic awareness, and dedicated nation building",
      "Part 4 - Universal Fraternity: Environmental stewardship, empathy, and cosmic compassion for all creation"
    ]
  },
  "spiritual-activities": {
    slug: "spiritual-activities",
    title: "Spiritual Activities & Values",
    subtitle: "Guru Paduka Pooja, Balvihar, Bhajan sessions, and Gita Chanting",
    content: [
      "We perform 'Guru Paduka Pooja' every day and on all auspicious occasions like 'Chinmaya Aradhana Day', Guru Purnima, etc.",
      "Every year, the new academic session for Std X and Std XII students starts and ends with 'Guru Paduka Pooja'.",
      "We have Bhajan sessions on the 3rd Saturday of every month. Swamis, Swaminis, and Brahmacharis visit once a year, providing students enriching opportunities to interact with visiting spiritual acharyas annually.",
      "The students are taught simple meditation techniques like deep breathing, Surya Namaskar, Pranayama, and mindfulness."
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
    title: "Career Counseling & Assessment",
    subtitle: "Workshops by Young Buzz & diagnostic assessments by ASSET",
    content: [
      "We organize career guidance and personality development workshops for students and their parents conducted by Young Buzz, India's premier corporate organization in career guidance and people development.",
      "The main objective behind this endeavor is to make students understand their potential based on their interest, personality, and aptitude, enabling them to make informed career choices.",
      "We also conduct skill-based diagnostic tests for students from Std III to Std IX by ASSET, India's leading organization working in the field of student learning assessment.",
      "This test helps us know the shortcomings and strengths of students, making it easy to pinpoint specific skills where we need to focus to accelerate improvement and rectify any learning gaps."
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
    title: "Educational Tours & Field Trips",
    subtitle: "Experiential learning, industrial visits, and cultural excursions",
    content: [
      "Educational tours and field trips form an integral part of the learning journey at Chinmaya Vidyalaya Tarapur, providing students with rich experiential learning beyond the four walls of the classroom.",
      "Visits to science centers, industrial units in the Tarapur MIDC area, power generation facilities, nature parks, and historical heritage sites broaden student horizons and build teamwork."
    ],
    highlights: [
      "Annual educational field trips for all primary and secondary classes",
      "Industrial visits to Tarapur manufacturing units and power installations",
      "Visits to science exhibits, planetariums, and eco-parks",
      "Team building, leadership, and social development opportunities during study excursions"
    ]
  },
  "library": {
    slug: "library",
    title: "Smart Library & Reading Room",
    subtitle: "Extensive collection of academic books, reference volumes, and periodicals",
    content: [
      "The Vidyalaya library is a vibrant hub of knowledge equipped with thousands of books spanning curriculum subjects, reference encyclopedias, fiction, biography, and cultural literature.",
      "A peaceful reading environment encourages independent study habits among students. Special library visiting hours are also designated for parents."
    ],
    highlights: [
      "Rich repository of books in English, Hindi, and Marathi",
      "Subscriptions to leading educational journals, science magazines, and daily newspapers",
      "Reference corner supporting project research for secondary and senior secondary students",
      "Dedicated reading periods and library timings for students and parents"
    ]
  }
};

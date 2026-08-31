export interface FeatureSectionData {
  slug: string;
  title: string;
  subtitle: string;
  content: string[];
  highlights?: string[];
}

export const FEATURE_SECTIONS: Record<string, FeatureSectionData> = {
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
  library: {
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

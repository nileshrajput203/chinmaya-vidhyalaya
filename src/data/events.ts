export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  time: string;
  venue: string;
  tag: string;
  desc: string;
  summary: string;
}

export const UPCOMING_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-nov-0',
    title: 'Commencement of National Education & CVP Value Month',
    date: 'November 01, 2026',
    month: 'November 2026',
    time: '08:00 AM IST',
    venue: 'School Campus & Morning Assembly Quadrangle',
    tag: 'Chinmaya Vision',
    desc: 'Inauguration of November scholastic curriculum focus, Chinmaya Vision Programme (CVP) character development modules, and inter-house project submissions.',
    summary: 'Inauguration of November scholastic curriculum focus, Chinmaya Vision Programme (CVP) character development modules, and inter-house project submissions.'
  },
  {
    id: 'ev-nov-1',
    title: 'Diwali Vacation Break & Deepotsav Celebrations',
    date: 'November 05, 2026',
    month: 'November 2026',
    time: '10:00 AM IST',
    venue: 'School Campus & Prayer Hall',
    tag: 'Vacation & Festival',
    desc: 'Campus Deepotsav lamp lighting ceremony; Diwali holiday break commences for all classes (School reopens on November 20, 2026).',
    summary: 'Campus Deepotsav lamp lighting ceremony; Diwali holiday break commences for all classes (School reopens on November 20, 2026).'
  },
  {
    id: 'ev-nov-2',
    title: "Children's Day & Bal Mela Celebrations",
    date: 'November 14, 2026',
    month: 'November 2026',
    time: '09:00 AM IST',
    venue: 'School Sports Ground',
    tag: 'Student Life',
    desc: "Festive tributes and special recreational games organized by faculty members to commemorate National Children's Day.",
    summary: "Festive tributes and special recreational games organized by faculty members to commemorate National Children's Day."
  },
  {
    id: 'ev-nov-3',
    title: 'Guru Nanak Dev Ji Jayanti Observance',
    date: 'November 24, 2026',
    month: 'November 2026',
    time: '08:30 AM IST',
    venue: 'Main Auditorium',
    tag: 'Spiritual Heritage',
    desc: 'Special morning assembly honoring the universal teachings of selfless service, compassion, and divine unity.',
    summary: 'Special morning assembly honoring the universal teachings of selfless service, compassion, and divine unity.'
  },
  {
    id: 'ev-nov-4',
    title: 'Periodic Assessment - II (Classes III to IX)',
    date: 'November 25, 2026',
    month: 'November 2026',
    time: '08:00 AM IST',
    venue: 'Examination Halls',
    tag: 'Assessments',
    desc: 'Second periodical assessment series for students of Standards III to IX evaluating mid-session scholastic progress.',
    summary: 'Second periodical assessment series for students of Standards III to IX evaluating mid-session scholastic progress.'
  },
  {
    id: 'ev-dec-1',
    title: 'Inter-House English Elocution Competition (Std I to XII)',
    date: 'December 05, 2026',
    month: 'December 2026',
    time: '09:30 AM IST',
    venue: 'AV Seminar Hall',
    tag: 'Literary Arts',
    desc: 'Student orators demonstrate rhetorical clarity, persuasive speaking, and articulate presentation on contemporary themes.',
    summary: 'Student orators demonstrate rhetorical clarity, persuasive speaking, and articulate presentation on contemporary themes.'
  },
  {
    id: 'ev-dec-2',
    title: 'Gita Jayanti, Tapovan Jayanti & Chinmaya Samarpan Diwas',
    date: 'December 19, 2026',
    month: 'December 2026',
    time: '08:30 AM IST',
    venue: 'School Main Prayer Auditorium',
    tag: 'Spiritual Heritage',
    desc: 'Special Paduka pooja, Sanskrit Shloka recitation, monoact, and commemorative tributes honoring Param Pujya Swami Tapovan Maharaj.',
    summary: 'Special Paduka pooja, Sanskrit Shloka recitation, monoact, and commemorative tributes honoring Param Pujya Swami Tapovan Maharaj.'
  },
  {
    id: 'ev-dec-3',
    title: 'Winter Break & Year-End Recess',
    date: 'December 25, 2026',
    month: 'December 2026',
    time: '08:00 AM IST',
    venue: 'School Campus',
    tag: 'Academic Calendar',
    desc: 'Winter vacation commences from December 25, 2026 to January 01, 2027. School reopens on Saturday, January 02, 2027.',
    summary: 'Winter vacation commences from December 25, 2026 to January 01, 2027. School reopens on Saturday, January 02, 2027.'
  },
  {
    id: 'ev-jan-1',
    title: 'Model Pre-Board Examinations & Unit Test - II',
    date: 'January 03, 2027',
    month: 'January 2027',
    time: '08:00 AM IST',
    venue: 'Senior Wing Examination Halls',
    tag: 'Assessments',
    desc: 'Rigorous model pre-board tests for CBSE Board examinees (Std X & XII) and Unit Test 2 for Standard XI.',
    summary: 'Rigorous model pre-board tests for CBSE Board examinees (Std X & XII) and Unit Test 2 for Standard XI.'
  },
  {
    id: 'ev-jan-2',
    title: 'National Youth Day (Swami Vivekananda Jayanti)',
    date: 'January 12, 2027',
    month: 'January 2027',
    time: '08:30 AM IST',
    venue: 'Central Assembly Quadrangle',
    tag: 'Youth Inspiration',
    desc: 'Elocution presentations and youth empowerment address highlighting Swami Vivekananda’s message of self-confidence and strength.',
    summary: 'Elocution presentations and youth empowerment address highlighting Swami Vivekananda’s message of self-confidence and strength.'
  },
  {
    id: 'ev-jan-2b',
    title: 'Netaji Subhash Chandra Bose Jayanti (Parakram Diwas)',
    date: 'January 23, 2027',
    month: 'January 2027',
    time: '08:30 AM IST',
    venue: 'Assembly Stage',
    tag: 'National Heritage',
    desc: 'Tributes celebrating Netaji Subhash Chandra Bose’s patriotism, leadership, and unyielding commitment to Indian freedom.',
    summary: 'Tributes celebrating Netaji Subhash Chandra Bose’s patriotism, leadership, and unyielding commitment to Indian freedom.'
  },
  {
    id: 'ev-jan-3',
    title: '78th Republic Day Ceremonial Parade & Cultural Pageant',
    date: 'January 26, 2027',
    month: 'January 2027',
    time: '08:00 AM IST',
    venue: 'Central Sports Ground',
    tag: 'Patriotic Zeal',
    desc: 'National Tri-colour flag unfurling, NCC troop march past, patriotic brass band display, and felicitation of student achievers.',
    summary: 'National Tri-colour flag unfurling, NCC troop march past, patriotic brass band display, and felicitation of student achievers.'
  },
  {
    id: 'ev-jan-4',
    title: "Martyrs' Day Observance & Two Minutes Silence",
    date: 'January 30, 2027',
    month: 'January 2027',
    time: '11:00 AM IST',
    venue: 'Classrooms & Central Assembly',
    tag: 'National Solemnity',
    desc: 'Reverent two-minute silence observed across the school in solemn homage to Mahatma Gandhi and all freedom fighters.',
    summary: 'Reverent two-minute silence observed across the school in solemn homage to Mahatma Gandhi and all freedom fighters.'
  },
  {
    id: 'ev-feb-1',
    title: 'AISSE & AISSCE CBSE Board Examination Phase - 1',
    date: 'February 15, 2027',
    month: 'February 2027',
    time: '10:00 AM IST',
    venue: 'CBSE Designated Exam Centers',
    tag: 'CBSE Boards',
    desc: 'Commencement of All India Secondary School Examination (Std X) and Senior School Certificate Examination (Std XII).',
    summary: 'Commencement of All India Secondary School Examination (Std X) and Senior School Certificate Examination (Std XII).'
  },
  {
    id: 'ev-mar-1',
    title: 'Maha Shivratri Special Spiritual Assembly',
    date: 'March 01, 2027',
    month: 'March 2027',
    time: '08:30 AM IST',
    venue: 'Sanskrit Wing & Main Auditorium',
    tag: 'Vedic Heritage',
    desc: 'Chanting of Shiva Sankalpa Suktam, Lingashtakam recitations, and discourse on spiritual discipline and mindfulness.',
    summary: 'Chanting of Shiva Sankalpa Suktam, Lingashtakam recitations, and discourse on spiritual discipline and mindfulness.'
  },
  {
    id: 'ev-mar-2',
    title: 'Annual Term-End Examinations & Evaluation - III',
    date: 'March 15, 2027',
    month: 'March 2027',
    time: '08:00 AM IST',
    venue: 'All Examination Wings',
    tag: 'Assessments',
    desc: 'Final comprehensive annual academic assessments for Nursery through Standard IX & XI for the 2026-27 session.',
    summary: 'Final comprehensive annual academic assessments for Nursery through Standard IX & XI for the 2026-27 session.'
  }
];

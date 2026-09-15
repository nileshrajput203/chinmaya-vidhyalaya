export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'admissions' | 'academics' | 'cvp' | 'facilities' | 'disclosures';
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'admissions', label: 'Admissions & Forms' },
  { id: 'academics', label: 'Academics & CBSE' },
  { id: 'cvp', label: 'Chinmaya Vision (4 Pillars)' },
  { id: 'facilities', label: 'Campus & Facilities' },
  { id: 'disclosures', label: 'TC & Disclosures' },
] as const;

export const OFFICIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'admissions',
    question: 'How do I apply for admissions at Chinmaya Vidyalaya Tarapur for 2026-27?',
    answer: 'Admissions are open for Nursery, Junior KG, Senior KG, and Classes I to IX. You can download the official registration form directly from the Downloads/Admissions section of our website, complete it, and submit it at the school administrative office in Vidyanagar, Boisar along with the student’s birth certificate, previous report card, and two passport-sized photographs.'
  },
  {
    id: 'faq-2',
    category: 'admissions',
    question: 'What is the class capacity and student-teacher ratio at the Vidyalaya?',
    answer: 'Classroom capacity is strictly capped at 40 students per section to ensure that every child receives individualized attention, personalized mentoring, and active interaction with teachers. Even though our spacious classrooms have the physical capability to seat more than 40 students, we maintain disciplined batch sizes compliant with CBSE pedagogical norms.'
  },
  {
    id: 'faq-3',
    category: 'cvp',
    question: 'What are the 4 Pillars of the Chinmaya Vision Program (CVP)?',
    answer: 'Formulated under the guidance of Pujya Gurudev Swami Chinmayananda, CVP integrates four core pillars: 1) Integrated Development (Physical fitness through yoga, emotional balance, intellectual agility, and spiritual grounding), 2) Indian Culture & Heritage (Vedic values, daily Guru Paduka Pooja, Gita chanting, and festival celebrations), 3) Patriotism (Active citizenship, national pride, environmental awareness like Jal Pakhwada), and 4) Universal Outlook (Vasudhaiva Kutumbakam—the world as one family, global empathy, and ecological compassion).'
  },
  {
    id: 'faq-4',
    category: 'cvp',
    question: 'What spiritual activities are integrated into the daily school schedule?',
    answer: 'Students participate in Guru Paduka Pooja every morning and on sacred occasions like Chinmaya Aradhana Day and Guru Purnima. Every 3rd Saturday of the month, special devotional Bhajan sessions are conducted. Annually, Swamis, Swaminis, and Brahmacharis from Chinmaya Mission visit the school to interact with students, and all students are encouraged to participate in the prestigious Annual Gita Chanting Competition.'
  },
  {
    id: 'faq-5',
    category: 'academics',
    question: 'What board is Chinmaya Vidyalaya affiliated with, and what is its board exam performance?',
    answer: 'Chinmaya Vidyalaya is affiliated with the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 1130058, School Code: 30040, U-DISE: 27361116004). The Vidyalaya holds an unbroken record of 100% pass results in the Class X AISSE Board Examinations, with a high proportion of students securing First Class and Distinctions since its first batch appeared in 2004–2005.'
  },
  {
    id: 'faq-6',
    category: 'academics',
    question: 'Are diagnostic assessments and career guidance provided to students?',
    answer: 'Yes. We conduct skill-based diagnostic tests by ASSET (India’s premier assessment organization) for students from Std III to IX to identify specific learning strengths and areas for improvement. For higher classes, career guidance and personality development workshops are conducted by Young Buzz, corporate experts in student aptitude and career counseling.'
  },
  {
    id: 'faq-7',
    category: 'disclosures',
    question: 'Where can parents access Transfer Certificates (TC) and CBSE Mandatory Disclosures?',
    answer: 'Under CBSE SARAS norms and school transparency guidelines, all Mandatory Public Disclosures (including Building Safety, Fire Clearance, Safe Drinking Water & Sanitation certificates, RTE recognition, and Society Registration) as well as official Transfer Certificates (TC 2020, 2021, 2023 records) are available for online viewing under the "About Us > Mandatory Information & TC" section.'
  },
  {
    id: 'faq-8',
    category: 'disclosures',
    question: 'Why are public disclosure documents set to view-only instead of open download?',
    answer: 'In compliance with CBSE statutory verification guidelines, mandatory public disclosures and governance certificates are provided in view-only mode for verified public inspection, ensuring document integrity. Student resources like Sample Papers, Syllabus, Evaluation Papers, and Admission Registration forms remain fully downloadable.'
  },
  {
    id: 'faq-9',
    category: 'facilities',
    question: 'What laboratory and science facilities are available on campus?',
    answer: 'The school features fully equipped, safety-certified laboratories for Physics, Chemistry, and General Sciences equipped with individual student workstations, precision optical benches, chemical apparatus, and safety fire fixtures, overseen by specialized science faculty.'
  },
  {
    id: 'faq-10',
    category: 'facilities',
    question: 'Does the Vidyalaya library offer visiting hours for parents?',
    answer: 'Yes! The Central Smart Library houses thousands of titles spanning textbooks, encyclopedias, cultural publications, and periodicals. Dedicated library reading periods are scheduled for students, and special visiting hours are designated for parents to access reference literature.'
  },
  {
    id: 'faq-11',
    category: 'admissions',
    question: 'What is the procedure for recruitment of teachers at Chinmaya Vidyalaya?',
    answer: 'We invite qualified, dedicated teaching faculty with a passion for value-based education. Interested educators can download the "Application Form for the Post of Teacher" (.docx) from our Downloads section and submit it along with their CV to cvtarapur@chinmayamission.com or directly to the school office.'
  },
  {
    id: 'faq-12',
    category: 'facilities',
    question: 'How do I contact the administration or schedule a school visit?',
    answer: 'You can visit the campus at P-201, MIDC Area, Vidyanagar, Saravali, Boisar 401501, Dist: Palghar, Maharashtra, or call our school office at 9322054713. You may also email cv.info@chinmayamission.com or cvtarapur@chinmayamission.com. Inquiries can also be submitted online through our Contact page.'
  }
];

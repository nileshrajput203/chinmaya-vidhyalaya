import { NavItem } from '../types/navigation';

export const OFFICIAL_NAVIGATION_DATA: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Pujya Gurudev's Life & Heritage", href: "/about/swami-chinmayananda", description: "Life, spiritual awakening, and eternal vision of Swami Chinmayananda" },
      { label: "History & Overview", href: "/about/history", description: "Our institutional roots: from 72 students to a thriving campus" },
      { label: "Mission & Vision", href: "/about/mission-vision", description: "Guiding principles for holistic education" },
      { label: "Philosophy (CVP)", href: "/about/philosophy", description: "The four foundational pillars of the Chinmaya Vision Program" },
      { label: "Board of Management", href: "/about/management", description: "13-member governing body, trustees, and leadership" },
      { label: "Mandatory Disclosures & Transfer Certificates", href: "/about/mandatory-information", description: "Public CBSE disclosures, safety certificates, affiliation, and TC records" }
    ]
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum & Syllabi", href: "/academics/curriculum", description: "Std I to V and Std VI to X scholastic & non-scholastic subjects" },
      { label: "Teaching Strategy", href: "/academics/teaching-strategy", description: "Activity-oriented, digital, and experiential methodologies" },
      { label: "Faculty Directory", href: "/academics/faculty", description: "Qualified educators and dedicated non-teaching staff" },
      { label: "Infrastructure & Labs", href: "/academics/infrastructure", description: "Physics, Chemistry labs, library, and smart classrooms" },
      { label: "Co-Curricular Programs", href: "/academics/co-curricular", description: "Arts, sports, music, and personality development" }
    ]
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Guidelines", href: "/about/enrollment", description: "Eligibility criteria, age norms, and application process" },
      { label: "Registration Forms", href: "/downloads/admissions", description: "Download Nursery, KG, and Std I–IX application forms" },
      { label: "Transfer Certificates (TC)", href: "/downloads/transfer-certificates", description: "Official TC archives and verification records" }
    ]
  },
  {
    label: "Student Life & CVP",
    href: "/features",
    children: [
      { label: "4 Pillars of CVP", href: "/features/4-pillars", description: "Integrated Development, Indian Culture, Patriotism, Universal Outlook" },
      { label: "Holistic Development", href: "/features/holistic-development", description: "Physical, emotional, intellectual, and spiritual transformation" },
      { label: "Spiritual Assemblies", href: "/features/spiritual-activities", description: "Daily Guru Paduka Pooja, Balvihar, and Gita chanting" },
      { label: "Career Counseling", href: "/features/career-counselling", description: "Workshops by Young Buzz and ASSET diagnostic testing" },
      { label: "Educational Study Tours", href: "/features/education-tours", description: "Annual study tours and industrial field visits" },
      { label: "Central Library", href: "/features/library", description: "Thousands of titles, journals, and dedicated reading spaces" }
    ]
  },
  {
    label: "Notice Board",
    href: "/news",
    children: [
      { label: "Notice Board & Events", href: "/news", description: "Circulars, school celebrations, exhibitions, and athletic meets" },
      { label: "Academic Dispatches", href: "/downloads/evaluation-papers", description: "Evaluation revision papers and CBSE sample questions" }
    ]
  },
  {
    label: "Gallery",
    href: "/gallery"
  },
  {
    label: "Careers",
    href: "/careers"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];

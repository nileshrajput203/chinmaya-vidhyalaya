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
      { label: "History & Overview", href: "/about/history", description: "Our institutional roots, 72 students batch to full-fledged school" },
      { label: "Mission & Vision", href: "/about/mission-vision", description: "Guiding principles for holistic education" },
      { label: "Philosophy (CVP)", href: "/about/philosophy", description: "Chinmaya Vision Program four pillars" },
      { label: "Board of Management", href: "/about/management", description: "13-member governing body, trustees and leadership" },
      { label: "Mandatory Information", href: "/about/mandatory-information", description: "Public CBSE disclosures, safety certificates & affiliation" }
    ]
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum & Subjects", href: "/academics/curriculum", description: "Std I to V and Std VI to X scholastic & non-scholastic subjects" },
      { label: "Teaching Strategy", href: "/academics/teaching-strategy", description: "Play way, activity oriented, and digital methodologies" },
      { label: "Our Faculty & Staff", href: "/academics/faculty", description: "Qualified educators and dedicated non-teaching staff" },
      { label: "Co-Curricular Activities", href: "/academics/co-curricular", description: "Arts, sports, music, and personality development" },
      { label: "Infrastructure & Labs", href: "/academics/infrastructure", description: "Physics, Chemistry labs, library and smart classrooms" }
    ]
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Guidelines", href: "/about/enrollment", description: "Eligibility, class strength limit (40) and process" },
      { label: "Registration Forms", href: "/downloads/admissions", description: "Download Nursery, KG & Std I-IX application forms" },
      { label: "Transfer Certificates (TC)", href: "/downloads/transfer-certificates", description: "TC 2023, TC 2021, TC 2020 official records" },
      { label: "Teacher Application", href: "/downloads/recruitment", description: "Application form for the post of teacher" }
    ]
  },
  {
    label: "Unique Features",
    href: "/features",
    children: [
      { label: "Spiritual Activities", href: "/features/spiritual-activities", description: "Daily Guru Paduka Pooja, Balvihar & Gita chanting" },
      { label: "Career Counseling", href: "/features/career-counselling", description: "Workshops by Young Buzz & ASSET diagnostic testing" },
      { label: "Education Tours", href: "/features/education-tours", description: "Annual study tours & industrial field trips" },
      { label: "Smart Library", href: "/features/library", description: "Thousands of titles, journals & reading room" }
    ]
  },
  {
    label: "News & Notices",
    href: "/news",
    children: [
      { label: "Latest Updates & Honors", href: "/news/latest-updates", description: "Principal honors and school announcements" },
      { label: "Festival Celebrations", href: "/news/festivals", description: "Cultural events and Jal Pakhwada awareness" },
      { label: "Circulars & Notices", href: "/news/circulars", description: "Bus service, book distribution, and parent notices" }
    ]
  },
  {
    label: "Downloads",
    href: "/downloads",
    children: [
      { label: "Mandatory Public Disclosures", href: "/downloads/mandatory-information", description: "CBSE SARAS, safety certificates, affiliation letters" },
      { label: "Sample Papers (Std 1 - 10)", href: "/downloads/sample-papers", description: "Class 1 to 10 sample papers and model solutions" },
      { label: "Evaluation III Papers (Std 1 - 5)", href: "/downloads/evaluation-papers", description: "Question papers for Standard 1 to 5" },
      { label: "All Documents & Forms", href: "/downloads/documents", description: "All official downloadable certificates and files" }
    ]
  },
  {
    label: "Contact Us",
    href: "/contact"
  }
];

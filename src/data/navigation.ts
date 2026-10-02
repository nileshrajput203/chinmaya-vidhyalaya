import { NavItem } from '../types/navigation';

export const OFFICIAL_NAVIGATION_DATA: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Guidelines", href: "/admissions/guidelines", description: "Eligibility criteria, age norms, and application process" },
      { label: "Registration Forms", href: "/downloads/admissions", description: "Download Nursery, KG, and Std I–XII application forms" },
      { label: "Annual Fee Structure", href: "/admissions/fee-structure", description: "Approved annual fee schedule and installment details" },
      { label: "School Calendar 2026–27", href: "/admissions/calendar", description: "Term dates, vacations, and examination schedule" }
    ]
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum & Syllabi", href: "/academics/curriculum", description: "Coverage from Nursery to Std XII (Arts, Commerce, Science) scholastic subjects" },
      { label: "Infrastructure & Labs", href: "/academics/infrastructure", description: "Physics, Chemistry, Biology, IT labs, library, and spacious classrooms" },
      { label: "CBSE Sample Papers", href: "/downloads/sample-papers", description: "Sample question papers and evaluation revision modules" }
    ]
  },
  {
    label: "Notice",
    href: "/news"
  },
  {
    label: "Student Life",
    href: "/features",
    children: [
      { label: "Co-Curricular & Sports", href: "/academics/co-curricular", description: "Athletics, tournaments, yoga, music, and performing arts" },
      { label: "Spiritual Assemblies", href: "/features/spiritual-activities", description: "Daily Guru Paduka Pooja, Balvihar, and Gita chanting" },
      { label: "Career Counseling", href: "/features/career-counselling", description: "Workshops by Young Buzz and ASSET diagnostic testing" },
      { label: "Central Library", href: "/features/library", description: "Thousands of reference titles, journals, and dedicated reading spaces" }
    ]
  },
  {
    label: "Gallery",
    href: "/gallery"
  },
  {
    label: "Blogs",
    href: "/blog"
  },
  {
    label: "Alumni",
    href: "/alumni"
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "School History", href: "/about/history", description: "Our institutional roots: from 72 students to a thriving CBSE campus" },
      { label: "School Vision & Mission", href: "/about/mission-vision", description: "Guiding principles and core aspirations for holistic education" },
      { label: "Board of Management", href: "/about/management", description: "13-member governing body, trustees, and administrative leadership" },
      { label: "Important Disclosures", href: "/about/mandatory-information", description: "Public CBSE disclosures, safety certificates, affiliation, and TC records" },
      { label: "About the Heritage", href: "/about/heritage", description: "Life, spiritual awakening, and eternal vision of Pujya Gurudev Swami Chinmayananda" },
      { label: "4 Pillars of CVP", href: "/about/philosophy", description: "The four foundational pillars of the Chinmaya Vision Program" }
    ]
  },
  {
    label: "Contact",
    href: "/contact"
  }
];

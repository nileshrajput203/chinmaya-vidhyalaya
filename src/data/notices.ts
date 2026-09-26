import { Notice } from '../types/news';

export const OFFICIAL_NOTICES: Notice[] = [
  {
    id: "notice-adm",
    title: "Admissions Open for Nursery, KG & Classes I to XII (Arts, Commerce, Science)",
    date: "2024-04-01",
    category: "general",
    isImportant: true,
    summary: "Download official registration forms for Nursery, Junior/Senior KG, and Classes I to XII (Arts, Commerce, Science streams) from the Downloads & Admissions section.",
    fileUrl: "/images/1to9.pdf"
  },
  {
    id: "notice-eval",
    title: "Evaluation III Question Papers Available for Standard 1 to 5",
    date: "2024-03-20",
    category: "academic",
    isImportant: true,
    summary: "Evaluation III Question Papers for Standard 1, 2, 3, 4, and 5 have been published online for student revision.",
    fileUrl: "/images/standard-1-evaluation-iii-question-papers.pdf"
  },
  {
    id: "notice-circulars",
    title: "Circular on Bus Service and Academic Book Distribution",
    date: "2024-03-10",
    category: "academic",
    isImportant: false,
    summary: "Parents are requested to refer to official guidelines regarding school bus routes, transport stops, and academic textbook distribution schedules."
  }
];

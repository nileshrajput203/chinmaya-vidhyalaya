import { SchoolDocument } from '../types/documents';

export const OFFICIAL_DOCUMENTS: SchoolDocument[] = [
  // -------------------------------------------------------------
  // MANDATORY PUBLIC DISCLOSURES & OFFICIAL CBSE CERTIFICATES (VIEW-ONLY)
  // -------------------------------------------------------------
  {
    id: "doc-saras",
    title: "CBSE SARAS Portal Mandatory Public Information",
    category: "mandatory-information",
    academicYear: "2024-2025",
    fileUrl: "/images/cbse-saras-portal-mandatory-information.pdf",
    fileSize: "316 KB",
    uploadDate: "2024-04-01",
    description: "Official CBSE SARAS Portal Mandatory Disclosure compilation.",
    downloadable: false
  },
  {
    id: "doc-noc",
    title: "No Objection Certificate (NOC)",
    category: "mandatory-information",
    fileUrl: "/images/NOC.jpeg",
    fileSize: "192 KB",
    uploadDate: "2026-04-01",
    description: "No Objection Certificate issued by Maharashtra State Education Department.",
    downloadable: false
  },
  {
    id: "doc-rte",
    title: "Recognition Certificate under RTE Act",
    category: "mandatory-information",
    fileUrl: "/images/RTE.pdf",
    fileSize: "1.0 MB",
    uploadDate: "2026-04-01",
    description: "Official Recognition Certificate granted under the Right to Education Act.",
    downloadable: false
  },
  {
    id: "doc-trust",
    title: "Society / Trust Registration Document",
    category: "mandatory-information",
    fileUrl: "/images/trust registration.pdf",
    fileSize: "383 KB",
    uploadDate: "2026-04-01",
    description: "Registration certificate of Chinmaya Mission Educational Trust.",
    downloadable: false
  },
  {
    id: "doc-affiliation",
    title: "CBSE Affiliation Certificate & Grant Letter",
    category: "mandatory-information",
    academicYear: "2024-2029",
    fileUrl: "/images/School Affiliation.pdf",
    fileSize: "474 KB",
    uploadDate: "2026-04-01",
    description: "CBSE Composite Provisional Affiliation Grant Document (Affiliation No: 1130058).",
    downloadable: false
  },
  {
    id: "doc-building-safety",
    title: "Building Safety Certificate",
    category: "mandatory-information",
    fileUrl: "/images/BUILDING SAFETY.pdf",
    fileSize: "259 KB",
    uploadDate: "2026-04-01",
    description: "Structural stability and building safety clearance by competent municipal engineer.",
    downloadable: false
  },
  {
    id: "doc-fire-safety",
    title: "Fire Safety Certificate",
    category: "mandatory-information",
    fileUrl: "/images/FIRE SAFETY.jpeg",
    fileSize: "189 KB",
    uploadDate: "2026-04-01",
    description: "Fire prevention and life safety certificate issued by Fire Safety Authorities.",
    downloadable: false
  },
  {
    id: "doc-sanitation",
    title: "Water, Health & Sanitation Certificate",
    category: "mandatory-information",
    fileUrl: "/images/WATER HEALTH SANITATION.pdf",
    fileSize: "506 KB",
    uploadDate: "2026-04-01",
    description: "Safe drinking water quality and sanitary condition certificate.",
    downloadable: false
  },
  {
    id: "doc-self-cert",
    title: "Self Certification by School",
    category: "mandatory-information",
    fileUrl: "/images/self-certification.pdf",
    fileSize: "311 KB",
    uploadDate: "2024-04-01",
    description: "Self-certification submitted by the school authority for CBSE compliance.",
    downloadable: false
  },
  {
    id: "doc-affidavit",
    title: "School Affidavit Document",
    category: "mandatory-information",
    fileUrl: "/images/AFFIDAVIT.pdf",
    fileSize: "1.7 MB",
    uploadDate: "2026-04-01",
    description: "Official non-proprietary affidavit of Chinmaya Vidyalaya Tarapur.",
    downloadable: false
  },
  {
    id: "doc-fee-structure",
    title: "Annual Fee Structure",
    category: "mandatory-information",
    academicYear: "2026-2027",
    fileUrl: "/images/FEE STRUCTURE 26-27.pdf",
    fileSize: "30 KB",
    uploadDate: "2026-04-01",
    description: "Approved annual fee schedule and installment details for academic session 2026-2027.",
    downloadable: false
  },
  {
    id: "doc-academic-calendar",
    title: "Academic Calendar",
    category: "mandatory-information",
    academicYear: "2026-2027",
    fileUrl: "/images/Chinmaya ACADEMIC Calendar 2026-27.pdf",
    fileSize: "19.5 MB",
    uploadDate: "2026-04-01",
    description: "Comprehensive annual academic and co-curricular schedule for 2026-2027.",
    downloadable: false
  },
  {
    id: "doc-smc",
    title: "School Management Committee (SMC)",
    category: "mandatory-information",
    fileUrl: "/images/school-management-committee.pdf",
    fileSize: "183 KB",
    uploadDate: "2024-04-01",
    description: "Constitution and list of School Management Committee members.",
    downloadable: false
  },
  {
    id: "doc-pta",
    title: "Parents Teachers Association (PTA) Committee",
    category: "mandatory-information",
    academicYear: "2026-2027",
    fileUrl: "/images/PTA 26-27.pdf",
    fileSize: "459 KB",
    uploadDate: "2026-04-01",
    description: "Executive body of Parents Teachers Association (2026-2027).",
    downloadable: false
  },
  {
    id: "doc-board-result-x",
    title: "Standard 10th Board Examination Results (2023-2026)",
    category: "mandatory-information",
    academicYear: "2023-2026",
    fileUrl: "/images/Std.X result 23-26.pdf",
    fileSize: "111 KB",
    uploadDate: "2026-04-01",
    description: "Three-year CBSE Class X (AISSE) Board Examination performance data (2023-2026).",
    downloadable: false
  },
  {
    id: "doc-board-result-xii",
    title: "Standard 12th Board Examination Results (2023-2026)",
    category: "mandatory-information",
    academicYear: "2023-2026",
    fileUrl: "/images/Std.XII result 23-26.pdf",
    fileSize: "319 KB",
    uploadDate: "2026-04-01",
    description: "Three-year CBSE Class XII (AISSCE) Board Examination performance data (2023-2026).",
    downloadable: false
  },
  {
    id: "doc-teacher-training",
    title: "Details of Teachers Training",
    category: "mandatory-information",
    fileUrl: "/images/details-of-teachers-training.pdf",
    fileSize: "133 KB",
    uploadDate: "2024-04-01",
    description: "Comprehensive record of in-service capacity building and teacher training workshops.",
    downloadable: false
  },
  {
    id: "doc-academic-books",
    title: "Prescribed Academic Books List",
    category: "academics",
    fileUrl: "/images/academic-books.pdf",
    fileSize: "56 KB",
    uploadDate: "2024-04-01",
    description: "Official NCERT and school textbook declarations across all standards.",
    downloadable: true
  },
  {
    id: "doc-class-strength",
    title: "Class-Wise Student Strength Profile",
    category: "mandatory-information",
    fileUrl: "/images/class-wise-strength.pdf",
    fileSize: "296 KB",
    uploadDate: "2024-04-01",
    description: "Grade-wise section counts and student enrolment statistics (capacity exceeding 40 per section).",
    downloadable: false
  },
  {
    id: "doc-sports",
    title: "Achievements in Sports & Athletics",
    category: "mandatory-information",
    fileUrl: "/images/achievement-in-sports.pdf",
    fileSize: "3.4 MB",
    uploadDate: "2024-04-01",
    description: "State, district, and national athletic achievements of students.",
    downloadable: false
  },

  // -------------------------------------------------------------
  // TRANSFER CERTIFICATES (TC) (VIEW-ONLY PER MANDATORY DISCLOSURE)
  // -------------------------------------------------------------
  {
    id: "doc-tc-2023",
    title: "Transfer Certificates (TC) 2023 Official Archive",
    category: "mandatory-information",
    academicYear: "2023",
    fileUrl: "/images/TC-2023.pdf",
    fileSize: "44.8 MB",
    uploadDate: "2024-04-01",
    description: "Official record of issued Transfer Certificates for the academic year 2023.",
    downloadable: false
  },
  {
    id: "doc-tc-2021",
    title: "Transfer Certificates (TC) 2021 Official Archive",
    category: "mandatory-information",
    academicYear: "2021",
    fileUrl: "/images/TC-2021.pdf",
    fileSize: "14.8 MB",
    uploadDate: "2024-04-01",
    description: "Official record of issued Transfer Certificates for the academic year 2021.",
    downloadable: false
  },
  {
    id: "doc-tc-2020",
    title: "Transfer Certificates (TC) 2020 Official Archive",
    category: "mandatory-information",
    academicYear: "2020",
    fileUrl: "/images/TC-2020.pdf",
    fileSize: "54.2 MB",
    uploadDate: "2024-04-01",
    description: "Official record of issued Transfer Certificates for the academic year 2020.",
    downloadable: false
  },

  // -------------------------------------------------------------
  // ADMISSIONS & APPLICATION FORMS (DOWNLOADABLE)
  // -------------------------------------------------------------
  {
    id: "doc-adm-nursery",
    title: "Nursery Admission Registration Form",
    category: "admissions",
    fileUrl: "/images/nursery.pdf",
    fileSize: "113 KB",
    uploadDate: "2024-04-01",
    description: "Official registration and admission application form for Nursery admissions.",
    downloadable: true
  },
  {
    id: "doc-adm-kg",
    title: "Kindergarten (KG) Admission Registration Form",
    category: "admissions",
    fileUrl: "/images/kg.pdf",
    fileSize: "185 KB",
    uploadDate: "2024-04-01",
    description: "Official registration form for Junior KG and Senior KG admissions.",
    downloadable: true
  },
  {
    id: "doc-adm-1to9",
    title: "Standard I to IX Admission Registration Form",
    category: "admissions",
    fileUrl: "/images/1to9.pdf",
    fileSize: "79 KB",
    uploadDate: "2024-04-01",
    description: "Admission registration form for Primary and Middle School (Classes I to IX).",
    downloadable: true
  },


  // -------------------------------------------------------------
  // SCHOOL CIRCULARS & NOTICES (DOWNLOADABLE)
  // -------------------------------------------------------------
  {
    id: "doc-circ-1",
    title: "School Circular: Academic Session Guidelines & Timings",
    category: "circulars",
    academicYear: "2025-2026",
    fileUrl: "/images/academic-books.pdf",
    fileSize: "120 KB",
    uploadDate: "2025-01-15",
    description: "General administrative instructions regarding school hours, uniform, and attendance.",
    downloadable: true
  },
  {
    id: "doc-circ-2",
    title: "School Circular: School Transport & Safety Measures",
    category: "circulars",
    academicYear: "2025-2026",
    fileUrl: "/images/WATER HEALTH SANITATION.pdf",
    fileSize: "85 KB",
    uploadDate: "2025-01-20",
    description: "Guidelines for bus routes, student dispersal, and road safety regulations.",
    downloadable: true
  },
  {
    id: "doc-circ-3",
    title: "School Circular: Jal Pakhwada & Environmental Week",
    category: "circulars",
    academicYear: "2024-2025",
    fileUrl: "/images/achievement-in-sports.pdf",
    fileSize: "190 KB",
    uploadDate: "2024-08-10",
    description: "Schedule of poster making, rainwater harvesting awareness, and green campus initiatives.",
    downloadable: true
  },

  // -------------------------------------------------------------
  // CBSE SAMPLE PAPERS - CLASSES 9 TO 12 (ORGANIZED BY CLASS & STREAM)
  // -------------------------------------------------------------
  // Class 9
  {
    id: "cbse-paper-class-9",
    title: "Class 9 CBSE Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 9",
    academicYear: "2024-25",
    fileUrl: "",
    fileSize: "Coming Soon",
    uploadDate: "2024-11-01",
    description: "Official CBSE curriculum practice and sample question papers for Class 9 (All Subjects merged).",
    downloadable: false,
    isComingSoon: true
  },

  // Class 10
  {
    id: "cbse-paper-class-10",
    title: "Class 10 CBSE Board Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 10",
    academicYear: "2024-25",
    fileUrl: "/images/cbse-class-10-sample-papers.pdf",
    fileSize: "6.3 MB",
    uploadDate: "2024-11-01",
    description: "Complete CBSE AISSE Class 10 Board examination sample question papers with marking schemes (All subjects merged in one PDF).",
    downloadable: true,
    isComingSoon: false
  },

  // Class 11 - Commerce
  {
    id: "cbse-paper-class-11-commerce",
    title: "Class 11 CBSE Commerce Stream Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 11",
    stream: "Commerce",
    academicYear: "2024-25",
    fileUrl: "",
    fileSize: "Coming Soon",
    uploadDate: "2024-11-01",
    description: "CBSE Class 11 Commerce stream sample question papers including Accountancy, Business Studies, Economics, and English Core.",
    downloadable: false,
    isComingSoon: true
  },

  // Class 11 - Arts
  {
    id: "cbse-paper-class-11-arts",
    title: "Class 11 CBSE Arts / Humanities Stream Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 11",
    stream: "Arts",
    academicYear: "2024-25",
    fileUrl: "",
    fileSize: "Coming Soon",
    uploadDate: "2024-11-01",
    description: "CBSE Class 11 Arts and Humanities stream sample question papers including History, Political Science, Geography, and English Core.",
    downloadable: false,
    isComingSoon: true
  },

  // Class 11 - Science
  {
    id: "cbse-paper-class-11-science",
    title: "Class 11 CBSE Science Stream Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 11",
    stream: "Science",
    academicYear: "2024-25",
    fileUrl: "",
    fileSize: "Coming Soon",
    uploadDate: "2024-11-01",
    description: "CBSE Class 11 Science stream sample question papers including Physics, Chemistry, Mathematics, Biology, and English Core.",
    downloadable: false,
    isComingSoon: true
  },

  // Class 12 - Commerce
  {
    id: "cbse-paper-class-12-commerce",
    title: "Class 12 CBSE Commerce Stream Board Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 12",
    stream: "Commerce",
    academicYear: "2024-25",
    fileUrl: "/images/cbse-class-12-commerce-sample-papers.pdf",
    fileSize: "6.4 MB",
    uploadDate: "2024-11-01",
    description: "Official CBSE AISSCE Class 12 Commerce stream Board examination sample question papers with marking schemes (All subjects merged in one PDF).",
    downloadable: true,
    isComingSoon: false
  },

  // Class 12 - Arts
  {
    id: "cbse-paper-class-12-arts",
    title: "Class 12 CBSE Arts / Humanities Stream Board Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 12",
    stream: "Arts",
    academicYear: "2024-25",
    fileUrl: "/images/cbse-class-12-arts-sample-papers.pdf",
    fileSize: "2.3 MB",
    uploadDate: "2024-11-01",
    description: "Official CBSE AISSCE Class 12 Arts / Humanities stream Board examination sample question papers with marking schemes (All subjects merged in one PDF).",
    downloadable: true,
    isComingSoon: false
  },

  // Class 12 - Science
  {
    id: "cbse-paper-class-12-science",
    title: "Class 12 CBSE Science Stream Board Sample Papers (All Subjects)",
    category: "sample-papers",
    classGrade: "Class 12",
    stream: "Science",
    academicYear: "2024-25",
    fileUrl: "/images/cbse-class-12-science-sample-papers.pdf",
    fileSize: "4.8 MB",
    uploadDate: "2024-11-01",
    description: "Official CBSE AISSCE Class 12 Science stream Board examination sample question papers with marking schemes (All subjects merged in one PDF).",
    downloadable: true,
    isComingSoon: false
  }
];

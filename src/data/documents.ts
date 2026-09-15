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
    fileUrl: "/images/no-objection-certificate.pdf",
    fileSize: "200 KB",
    uploadDate: "2024-04-01",
    description: "No Objection Certificate issued by Maharashtra State Education Department.",
    downloadable: false
  },
  {
    id: "doc-rte",
    title: "Recognition Certificate under RTE Act",
    category: "mandatory-information",
    fileUrl: "/images/recognition-certificate-under-rte.pdf",
    fileSize: "1.4 MB",
    uploadDate: "2024-04-01",
    description: "Official Recognition Certificate granted under the Right to Education Act.",
    downloadable: false
  },
  {
    id: "doc-trust",
    title: "Society / Trust Registration Document",
    category: "mandatory-information",
    fileUrl: "/images/trust-registration-document.pdf",
    fileSize: "64 KB",
    uploadDate: "2024-04-01",
    description: "Registration certificate of Chinmaya Mission Educational Trust.",
    downloadable: false
  },
  {
    id: "doc-affiliation",
    title: "CBSE Affiliation Certificate & Grant Letter",
    category: "mandatory-information",
    academicYear: "2024-2029",
    fileUrl: "/images/affliation.pdf",
    fileSize: "311 KB",
    uploadDate: "2024-04-01",
    description: "CBSE Composite Provisional Affiliation Grant Document (Affiliation No: 1130058).",
    downloadable: false
  },
  {
    id: "doc-building-safety",
    title: "Building Safety Certificate",
    category: "mandatory-information",
    fileUrl: "/images/building-safety-certificate.pdf",
    fileSize: "109 KB",
    uploadDate: "2024-04-01",
    description: "Structural stability and building safety clearance by competent municipal engineer.",
    downloadable: false
  },
  {
    id: "doc-fire-safety",
    title: "Fire Safety Certificate",
    category: "mandatory-information",
    fileUrl: "/images/fire-safety-certificate.pdf",
    fileSize: "117 KB",
    uploadDate: "2024-04-01",
    description: "Fire prevention and life safety certificate issued by Fire Safety Authorities.",
    downloadable: false
  },
  {
    id: "doc-sanitation",
    title: "Water, Health & Sanitation Certificate",
    category: "mandatory-information",
    fileUrl: "/images/water-health-and-sanitation-certificate.pdf",
    fileSize: "68 KB",
    uploadDate: "2024-04-01",
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
    fileUrl: "/images/affidavit.pdf",
    fileSize: "765 KB",
    uploadDate: "2024-04-01",
    description: "Official non-proprietary affidavit of Chinmaya Vidyalaya Tarapur.",
    downloadable: false
  },
  {
    id: "doc-fee-structure",
    title: "Official Fee Structure",
    category: "mandatory-information",
    academicYear: "2024-2025",
    fileUrl: "/images/fees-structure.pdf",
    fileSize: "43 KB",
    uploadDate: "2024-04-01",
    description: "Approved fee schedule for academic session.",
    downloadable: false
  },
  {
    id: "doc-academic-calendar",
    title: "Academic Calendar",
    category: "mandatory-information",
    academicYear: "2024-2025",
    fileUrl: "/images/academic-calendar.pdf",
    fileSize: "17.6 MB",
    uploadDate: "2024-04-01",
    description: "Comprehensive annual academic and co-curricular schedule.",
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
    fileUrl: "/images/parents-teachers-association.pdf",
    fileSize: "263 KB",
    uploadDate: "2024-04-01",
    description: "Executive body of Parents Teachers Association.",
    downloadable: false
  },
  {
    id: "doc-board-result",
    title: "Standard 10th & 12th Board Examination Results",
    category: "mandatory-information",
    fileUrl: "/images/standard-10th-and-12th-board-result.pdf",
    fileSize: "533 KB",
    uploadDate: "2024-04-01",
    description: "Three-year CBSE Class X and Class XII Board Examination performance data.",
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
    description: "Grade-wise section counts and student enrollment statistics (capped at 40).",
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
    id: "doc-tc-sample",
    title: "Sample Transfer Certificate (TC)",
    category: "mandatory-information",
    fileUrl: "/images/TC.jpg",
    fileSize: "180 KB",
    uploadDate: "2024-04-01",
    description: "Official sample Transfer Certificate format issued by Chinmaya Vidyalaya Tarapur.",
    downloadable: false
  },
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
    fileSize: "56.8 MB",
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
  {
    id: "doc-teacher-app",
    title: "Application Form for the Post of Teacher",
    category: "admissions",
    fileUrl: "/images/application-form-for-the-post-of-teacher.docx",
    fileSize: "25 KB",
    uploadDate: "2024-04-01",
    description: "Official faculty recruitment application form for teaching positions.",
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
    fileUrl: "/images/water-health-and-sanitation-certificate.pdf",
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
  // SAMPLE PAPERS — TERM 1 / PERIODIC ASSESSMENTS (DOWNLOADABLE)
  // -------------------------------------------------------------
  {
    id: "doc-paper-std-1",
    title: "Standard 1 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-1.pdf",
    fileSize: "777 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 1.",
    downloadable: true
  },
  {
    id: "doc-paper-std-2",
    title: "Standard 2 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-2.pdf",
    fileSize: "565 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 2.",
    downloadable: true
  },
  {
    id: "doc-paper-std-3",
    title: "Standard 3 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-3.pdf",
    fileSize: "375 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 3.",
    downloadable: true
  },
  {
    id: "doc-paper-std-4",
    title: "Standard 4 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-4.pdf",
    fileSize: "216 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 4.",
    downloadable: true
  },
  {
    id: "doc-paper-std-5",
    title: "Standard 5 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-5.pdf",
    fileSize: "386 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 5.",
    downloadable: true
  },
  {
    id: "doc-paper-std-6",
    title: "Standard 6 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-6.pdf",
    fileSize: "1.5 MB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 6.",
    downloadable: true
  },
  {
    id: "doc-paper-std-7",
    title: "Standard 7 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-7.pdf",
    fileSize: "462 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 7.",
    downloadable: true
  },
  {
    id: "doc-paper-std-8",
    title: "Standard 8 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-8.pdf",
    fileSize: "462 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 8.",
    downloadable: true
  },
  {
    id: "doc-paper-std-9",
    title: "Standard 9 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-9.pdf",
    fileSize: "288 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE practice and sample question papers for Class 9.",
    downloadable: true
  },
  {
    id: "doc-paper-std-10",
    title: "Standard 10 Sample Question Papers",
    category: "sample-papers",
    term: "Term 1",
    fileUrl: "/images/papers/STD-10.pdf",
    fileSize: "315 KB",
    uploadDate: "2024-04-01",
    description: "Term 1 CBSE board pattern sample question papers for Class 10 (AISSE).",
    downloadable: true
  },

  // -------------------------------------------------------------
  // SAMPLE PAPERS — TERM 2 / EVALUATION III QUESTION PAPERS (DOWNLOADABLE)
  // -------------------------------------------------------------
  {
    id: "doc-eval-1",
    title: "Standard 1 Evaluation III Question Papers",
    category: "sample-papers",
    academicYear: "2024",
    term: "Term 2",
    fileUrl: "/images/standard-1-evaluation-iii-question-papers.pdf",
    fileSize: "3.9 MB",
    uploadDate: "2024-04-01",
    description: "Term 2 Evaluation III Question Papers for Class 1.",
    downloadable: true
  },
  {
    id: "doc-eval-2",
    title: "Standard 2 Evaluation III Question Papers",
    category: "sample-papers",
    academicYear: "2024",
    term: "Term 2",
    fileUrl: "/images/standard-2-evaluation-iii-question-papers.pdf",
    fileSize: "4.0 MB",
    uploadDate: "2024-04-01",
    description: "Term 2 Evaluation III Question Papers for Class 2.",
    downloadable: true
  },
  {
    id: "doc-eval-3",
    title: "Standard 3 Evaluation III Question Papers",
    category: "sample-papers",
    academicYear: "2024",
    term: "Term 2",
    fileUrl: "/images/standard-3-evaluation-iii-question-papers.pdf",
    fileSize: "5.3 MB",
    uploadDate: "2024-04-01",
    description: "Term 2 Evaluation III Question Papers for Class 3.",
    downloadable: true
  },
  {
    id: "doc-eval-4",
    title: "Standard 4 Evaluation III Question Papers",
    category: "sample-papers",
    academicYear: "2024",
    term: "Term 2",
    fileUrl: "/images/standard-4-evaluation-iii-question-papers.pdf",
    fileSize: "5.9 MB",
    uploadDate: "2024-04-01",
    description: "Term 2 Evaluation III Question Papers for Class 4.",
    downloadable: true
  },
  {
    id: "doc-eval-5",
    title: "Standard 5 Evaluation III Question Papers",
    category: "sample-papers",
    academicYear: "2024",
    term: "Term 2",
    fileUrl: "/images/standard-5-evaluation-iii-question-papers.pdf",
    fileSize: "5.9 MB",
    uploadDate: "2024-04-01",
    description: "Term 2 Evaluation III Question Papers for Class 5.",
    downloadable: true
  }
];

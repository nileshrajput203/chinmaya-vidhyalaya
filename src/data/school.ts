import { SchoolInfo, PrincipalInfo, ManagementMember } from '../types/school';

export const OFFICIAL_SCHOOL_INFO: SchoolInfo = {
  name: "Chinmaya Vidyalaya",
  tagline: "School with a difference",
  affiliationNo: "1130058",
  schoolCode: "30040",
  udiseNo: "27361116004",
  trustName: "Central Chinmaya Mission Trust, Mumbai",
  undertaking: "An Undertaking of Central Chinmaya Mission Trust, Mumbai",
  address: {
    street: "P-201, MIDC Area, Vidyanagar, Saravali",
    city: "Boisar",
    district: "Palghar",
    state: "Maharashtra",
    pincode: "401501"
  },
  contact: {
    phone: ["9322054713"],
    email: ["cv.info@chinmayamission.com", "cvtarapur@chinmayamission.com"],
    officeHours: "Monday to Saturday: 8:00 AM - 4:00 PM",
    website: "https://cvtarapur.com"
  },
  managingTrust: "Central Chinmaya Mission Trust, Mumbai (Local Managing Committee handles day-to-day management)",
  localCommittee: "Local Managing Committee handles day-to-day management",
  envisagedYear: "1993 — planned by devotees of Tarapur Chinmaya Mission Centre, inspired by Swami Chinmayanandaji",
  constructionBeganYear: "1994 — first phase, in the presence of Param Pujya Swami Tejomayanandaji",
  inauguratedDate: "18 June 1995, by H.H. Swami Purushottamanandaji",
  inauguratedBy: "H.H. Swami Purushottamanandaji",
  foundingEnrollment: "72 students and 4 teachers (1995)",
  currentEnrollment: "Approx. 1600 students on roll",
  cbseAffiliationYear: "2003",
  firstAisseBatch: "2004–2005",
  regionalStanding: "First school established by Chinmaya Mission in the Maharashtra–Gujarat–Goa zone",
  locationDetails: "Boisar, about 100 km north of Mumbai on the Western Railway",
  visionStatement: "To empower a community of learners who dare to dream, take risks and develop new realities",
  educationApproach: "Chinmaya Vision Programme — integrates Value Education with academics for personality development",
  founder: "Param Pujya Swami Chinmayanandaji"
};

export const OFFICIAL_PRINCIPAL_INFO: PrincipalInfo = {
  name: "Smt. Dimple Mistry",
  designation: "Principal",
  boardRole: "Member of the Board of Management",
  qualification: "Educationist & Member of the Board of Management",
  message: "Emulating the holistic vision of our revered founder, Param Pujya Swami Chinmayanandaji, Chinmaya Vidyalaya empowers a community of learners who dare to dream, take risks and develop new realities. Rooted in the Chinmaya Vision Programme, we integrate value education with academic distinction to prepare noble global citizens.",
  image: "/images/principal2.jpeg",
  phone: "7775872266",
  email: "cv.principal@chinmayamission.com"
};

export interface BoardMember extends ManagementMember {
  srNo?: number;
  phone?: string;
  email?: string;
  occupation?: string;
}

export const OFFICIAL_BOARD_OF_MANAGEMENT: BoardMember[] = [
  {
    id: "bm-1",
    srNo: 1,
    name: "Sri. T.B. Thakur",
    designation: "Chairman",
    role: "Chairman",
    occupation: "Industrialist",
    phone: "9823147178",
    email: "thakur@tpr.grengg.com",
    image: "/images/board-of-management/tb-thakur-chairman.webp"
  },
  {
    id: "bm-2",
    srNo: 2,
    name: "Shri Shriram Bhalerao",
    designation: "Trustee, CCMT",
    role: "Trustee, CCMT",
    occupation: "Industrialist",
    email: "bhaleraosg@labindia.com",
    image: "/images/board-of-management/sri-sriram-bhaleroji.webp"
  },
  {
    id: "bm-3",
    srNo: 3,
    name: "Atul Karanjkar",
    designation: "Zonal Director",
    role: "Zonal Director",
    email: "atul.karanjkar@chinmayaeducationcell.org"
  },
  {
    id: "bm-4",
    srNo: 4,
    name: "Dr. Parag Kulkarni",
    designation: "Vice-Chairman",
    role: "Vice-Chairman",
    occupation: "Doctor",
    phone: "9823045534",
    email: "paragkulkarni1960@gmail.com",
    image: "/images/board-of-management/parag-kulkarni.webp"
  },
  {
    id: "bm-5",
    srNo: 5,
    name: "Dr. Shivshankar",
    designation: "Secretary",
    role: "Secretary",
    occupation: "Doctor",
    phone: "9975527700",
    email: "drshankar.shiv@gmail.com",
    image: "/images/board-of-management/dr-shivshankar.webp"
  },
  {
    id: "bm-6",
    srNo: 6,
    name: "Dr. (Smt.) Shobha Sankhe",
    designation: "Member",
    role: "Member",
    occupation: "Doctor",
    phone: "9823147089",
    email: "2005shobha@gmail.com",
    image: "/images/board-of-management/shobha-sankhe.webp"
  },
  {
    id: "bm-7",
    srNo: 7,
    name: "Dr. Ratnakar Mane",
    designation: "Member",
    role: "Member",
    occupation: "Doctor",
    phone: "9822634820",
    email: "drratnakarmane@gmail.com",
    image: "/images/board-of-management/dr-mane.webp"
  },
  {
    id: "bm-8",
    srNo: 8,
    name: "Sri. B.K. Poddar",
    designation: "Member",
    role: "Member",
    occupation: "Industrialist",
    phone: "9987636090",
    email: "cvtarapur@rediffmail.com",
    image: "/images/board-of-management/sri-b-k-poddar.webp"
  },
  {
    id: "bm-9",
    srNo: 9,
    name: "Dr. Dathatreya Nayak",
    designation: "Member",
    role: "Member",
    occupation: "Doctor",
    phone: "9673776711",
    email: "ddnayak30@gmail.com",
    image: "/images/board-of-management/dr-nayak.webp"
  },
  {
    id: "bm-10",
    srNo: 10,
    name: "Smt. Dimple Mistry",
    designation: "Member (Principal)",
    role: "Member (Principal)",
    occupation: "Educationist",
    phone: "7775872266",
    email: "cv.principal@chinmayamission.com",
    image: "/images/principal2.jpeg"
  }
];


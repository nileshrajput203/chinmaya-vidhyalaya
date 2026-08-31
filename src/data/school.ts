import { SchoolInfo, PrincipalInfo, ManagementMember } from '../types/school';

export const OFFICIAL_SCHOOL_INFO: SchoolInfo = {
  name: "Chinmaya Vidyalaya, Tarapur",
  tagline: "School with a difference",
  affiliationNo: "1130058",
  schoolCode: "30064",
  udiseNo: "27361116004",
  trustName: "Chinmaya Mission Educational Cell",
  undertaking: "Under the Aegis of Chinmaya Mission",
  address: {
    street: "P-201, MIDC Area, Vidyanagar, Saravali, Boisar 401501",
    city: "Tarapur / Boisar",
    district: "Palghar",
    state: "Maharashtra",
    pincode: "401501"
  },
  contact: {
    phone: ["9322054713", "9823517700"],
    email: ["cv.info@chinmayamission.com", "cvtarapur@chinmayamission.com"],
    officeHours: "Monday to Saturday: 8:00 AM - 4:00 PM"
  }
};

export const OFFICIAL_PRINCIPAL_INFO: PrincipalInfo = {
  name: "Sri. B. Anilkumar",
  qualification: "Principal & Member of Academic Assessment & Guidance Team (Chinmaya Education Cell, Coimbatore)",
  message: "Emulating the holistic vision of the illustrious founder, the Great Vedantic Master Swami Chinmayananda, Chinmaya Vidyalaya Tarapur has been imparting value-based education. It gives a practical and judicious combination of academic excellence, extra-curricular pursuits, character building, and personality development to empower a community of learners who dare to dream, take risks, and develop new realities.",
  image: "/images/board-of-management/principal-b-anilkumar.webp"
};

export interface BoardMember extends ManagementMember {
  phone?: string;
  email?: string;
  occupation?: string;
}

export const OFFICIAL_BOARD_OF_MANAGEMENT: BoardMember[] = [
  {
    id: "bm-1",
    name: "Sri. T.B. Thakur",
    designation: "Chairman",
    role: "Chairman",
    occupation: "Industrialist",
    phone: "9822081515",
    email: "tbthakur@gmail.com",
    image: "/images/board-of-management/tb-thakur-chairman.webp"
  },
  {
    id: "bm-2",
    name: "Dr. K.S. Shivashankar",
    designation: "Secretary",
    role: "Secretary",
    occupation: "Doctor",
    phone: "9823055979",
    email: "drksshankar@yahoo.co.in",
    image: "/images/board-of-management/dr-shivshankar.webp"
  },
  {
    id: "bm-3",
    name: "Sri. Shriram Bhaleraoji",
    designation: "Member",
    role: "Member",
    occupation: "Chartered Accountant",
    phone: "9422687508",
    email: "ca.sbassociates@gmail.com",
    image: "/images/board-of-management/sri-sriram-bhaleroji.webp"
  },
  {
    id: "bm-4",
    name: "Dr. (Smt.) Manjusha Mane",
    designation: "Member",
    role: "Member",
    occupation: "Doctor",
    phone: "9822634820",
    email: "drratnakarmane@gmail.com"
  },
  {
    id: "bm-5",
    name: "Sri. Parag Kulkarni",
    designation: "Member",
    role: "Member",
    occupation: "Advocate",
    phone: "9822046467",
    email: "adv.paragkulkarni@gmail.com",
    image: "/images/board-of-management/parag-kulkarni.webp"
  },
  {
    id: "bm-6",
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
    name: "Smt. Jayasree Iyer",
    designation: "Member",
    role: "Member",
    occupation: "Principal of CIV",
    phone: "9028281040",
    email: "jayasreeiyer9@gmail.com",
    image: "/images/board-of-management/smt-jayashree-iyer.webp"
  },
  {
    id: "bm-11",
    name: "Sri. Milind Tamore",
    designation: "Member",
    role: "Member",
    occupation: "Social Leader",
    image: "/images/board-of-management/sri-milind-tamore.webp"
  },
  {
    id: "bm-12",
    name: "Sri. B. Anilkumar",
    designation: "Ex-Officio Member",
    role: "Principal",
    occupation: "Principal",
    phone: "9823517700",
    email: "banilkumar1000@gmail.com",
    image: "/images/board-of-management/principal-b-anilkumar.webp"
  },
  {
    id: "bm-13",
    name: "Smt. Vasanthy Nair",
    designation: "Member",
    role: "Vice Principal",
    occupation: "Vice Principal",
    phone: "9637747920",
    email: "anilkumarvasanthy@gmail.com",
    image: "/images/board-of-management/smt-vasanthy-nair.webp"
  }
];


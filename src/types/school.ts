export interface SchoolInfo {
  name: string;
  tagline: string;
  affiliationNo: string; // "1130058"
  schoolCode: string;    // "30040"
  udiseNo: string;       // "27361116004"
  trustName: string;
  undertaking: string;
  address: {
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  contact: {
    phone: string[];
    email: string[];
    officeHours: string;
    website?: string;
  };
  managingTrust?: string;
  localCommittee?: string;
  envisagedYear?: string;
  constructionBeganYear?: string;
  inauguratedDate?: string;
  inauguratedBy?: string;
  foundingEnrollment?: string;
  currentEnrollment?: string;
  cbseAffiliationYear?: string;
  firstAisseBatch?: string;
  regionalStanding?: string;
  locationDetails?: string;
  visionStatement?: string;
  educationApproach?: string;
  founder?: string;
}

export interface PrincipalInfo {
  name: string;
  designation?: string;
  boardRole?: string;
  qualification: string;
  message: string;
  image: string;
  phone?: string;
  email?: string;
}

export interface ManagementMember {
  id: string;
  name: string;
  designation: string;
  role: string;
  image?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience?: string;
}

export interface Facility {
  id: string;
  title: string;
  category: 'academic' | 'sports' | 'co-curricular' | 'infrastructure';
  description: string;
  image: string;
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  category: 'academics' | 'sports' | 'cultural' | 'institutional';
  date: string;
  description: string;
  image?: string;
  achieverName?: string;
}

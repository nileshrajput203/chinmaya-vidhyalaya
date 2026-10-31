export interface ContactEnquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  department?: 'admissions' | 'alumni' | 'teaching_staff' | 'general' | 'principal';
  message: string;
}

export interface AdmissionEnquiry {
  parentName: string;
  studentName: string;
  gradeApplyingFor?: string;
  grade?: string;
  email?: string;
  phone: string;
  city?: string;
  notes?: string;
  message?: string;
}

export interface AlumniEnquiry {
  fullName: string;
  batchYear: string;
  email: string;
  phone: string;
  currentCity: string;
  profession: string;
  organization?: string;
  willingToMentor?: boolean;
  message?: string;
}

export interface CareerEnquiry {
  name: string;
  email: string;
  phone: string;
  position: string;
  qualification: string;
  experience: string;
  message?: string;
}

export interface FormSubmitResult {
  success: boolean;
  message: string;
  error?: string;
}

export interface ContactEnquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
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

export interface FormSubmitResult {
  success: boolean;
  message: string;
  error?: string;
}

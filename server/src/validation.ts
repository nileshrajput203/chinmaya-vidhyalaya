/**
 * Input sanitization and validation utilities for Chinmaya Vidyalaya Tarapur API.
 */

// Email regex matching standard RFC 5322-compliant email formats
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Phone regex allowing Indian (+91) and international phone numbers (10-15 digits with optional spaces/dashes)
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

/**
 * Strips carriage returns and newlines to prevent email header injection attacks (CRLF injection)
 */
export function sanitizeHeader(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\t]/g, ' ').trim().slice(0, 150);
}

/**
 * Sanitizes multi-line text input
 */
export function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim()) && email.length <= 254;
}

export function isValidPhone(phone: unknown): boolean {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-().]/g, '');
  return PHONE_REGEX.test(phone.trim()) && cleaned.length >= 10 && cleaned.length <= 15;
}

export const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;

export function isValidName(name: unknown): boolean {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return (
    trimmed.length >= 2 &&
    trimmed.length <= 80 &&
    !/\d/.test(trimmed) &&
    NAME_REGEX.test(trimmed) &&
    (trimmed.match(/[a-zA-Z]/g) || []).length >= 2
  );
}

export interface ValidatedContactInput {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  department?: 'admissions' | 'alumni' | 'teaching_staff' | 'general' | 'principal';
  message: string;
}

export interface ValidatedAdmissionInput {
  parentName: string;
  studentName: string;
  gradeApplyingFor: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface ValidatedAlumniInput {
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

export interface ValidatedCareerInput {
  name: string;
  email: string;
  phone: string;
  position: string;
  qualification: string;
  experience: string;
  message?: string;
}

export function validateContactPayload(body: any): { valid: true; data: ValidatedContactInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object' };
  }

  const fullName = sanitizeHeader(body.fullName);
  const email = (typeof body.email === 'string' ? body.email.trim() : '');
  const phone = body.phone ? sanitizeHeader(body.phone) : undefined;
  const subject = body.subject ? sanitizeHeader(body.subject) : undefined;
  const department = body.department ? (sanitizeHeader(body.department) as any) : undefined;
  const message = sanitizeText(body.message);

  if (!isValidName(fullName)) {
    return { valid: false, error: 'Please enter a valid full name containing only letters (numbers and symbols are not allowed).' };
  }

  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (phone && !isValidPhone(phone)) {
    return { valid: false, error: 'Please provide a valid 10-digit phone number.' };
  }

  if (!message || message.length < 5) {
    return { valid: false, error: 'Please enter a message of at least 5 characters.' };
  }

  return {
    valid: true,
    data: { fullName, email, phone, subject, department, message },
  };
}

export function validateAdmissionPayload(body: any): { valid: true; data: ValidatedAdmissionInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object' };
  }

  const parentName = sanitizeHeader(body.parentName);
  const studentName = sanitizeHeader(body.studentName);
  const gradeApplyingFor = sanitizeHeader(body.gradeApplyingFor || body.grade || 'Not Specified');
  const phone = typeof body.phone === 'string' ? sanitizeHeader(body.phone) : '';
  const email = body.email && typeof body.email === 'string' && body.email.trim().length > 0 ? body.email.trim() : undefined;
  const message = body.message ? sanitizeText(body.message) : undefined;

  if (!isValidName(parentName)) {
    return { valid: false, error: 'Please enter a valid parent or guardian name containing only letters (numbers and symbols are not allowed).' };
  }

  if (!isValidName(studentName)) {
    return { valid: false, error: 'Please enter a valid student name containing only letters (numbers and symbols are not allowed).' };
  }

  if (!phone || !isValidPhone(phone)) {
    return { valid: false, error: 'Please provide a valid 10-digit contact phone number.' };
  }

  if (email && !isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  return {
    valid: true,
    data: { parentName, studentName, gradeApplyingFor, phone, email, message },
  };
}

export function validateAlumniPayload(body: any): { valid: true; data: ValidatedAlumniInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object' };
  }

  const fullName = sanitizeHeader(body.fullName || body.name);
  const batchYear = sanitizeHeader(body.batchYear || body.batch);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? sanitizeHeader(body.phone) : '';
  const currentCity = sanitizeHeader(body.currentCity || body.city || 'Not Specified');
  const profession = sanitizeHeader(body.profession || 'Not Specified');
  const organization = body.organization ? sanitizeHeader(body.organization) : undefined;
  const willingToMentor = Boolean(body.willingToMentor);
  const message = body.message ? sanitizeText(body.message) : undefined;

  if (!isValidName(fullName)) {
    return { valid: false, error: 'Please enter a valid full name containing only letters (numbers and symbols are not allowed).' };
  }

  if (!batchYear) {
    return { valid: false, error: 'Please enter or select your passing batch year.' };
  }

  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (!phone || !isValidPhone(phone)) {
    return { valid: false, error: 'Please provide a valid 10-digit phone number.' };
  }

  return {
    valid: true,
    data: { fullName, batchYear, email, phone, currentCity, profession, organization, willingToMentor, message },
  };
}

export function validateCareerPayload(body: any): { valid: true; data: ValidatedCareerInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object' };
  }

  const name = sanitizeHeader(body.name || body.fullName);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? sanitizeHeader(body.phone) : '';
  const position = sanitizeHeader(body.position || body.role || 'Teaching Faculty');
  const qualification = sanitizeHeader(body.qualification || 'Not Specified');
  const experience = sanitizeHeader(body.experience || 'Not Specified');
  const message = body.message ? sanitizeText(body.message) : undefined;

  if (!isValidName(name)) {
    return { valid: false, error: 'Please enter a valid applicant name containing only letters (numbers and symbols are not allowed).' };
  }

  if (!position) {
    return { valid: false, error: 'Please select or specify the position applied for.' };
  }

  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (!phone || !isValidPhone(phone)) {
    return { valid: false, error: 'Please provide a valid 10-digit phone number.' };
  }

  return {
    valid: true,
    data: { name, email, phone, position, qualification, experience, message },
  };
}

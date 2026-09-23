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

export interface ValidatedContactInput {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
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

export function validateContactPayload(body: any): { valid: true; data: ValidatedContactInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a valid JSON object' };
  }

  const fullName = sanitizeHeader(body.fullName);
  const email = (typeof body.email === 'string' ? body.email.trim() : '');
  const phone = body.phone ? sanitizeHeader(body.phone) : undefined;
  const subject = body.subject ? sanitizeHeader(body.subject) : undefined;
  const message = sanitizeText(body.message);

  if (!fullName || fullName.length < 2) {
    return { valid: false, error: 'Please enter a valid full name (minimum 2 characters).' };
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
    data: { fullName, email, phone, subject, message },
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

  if (!parentName || parentName.length < 2) {
    return { valid: false, error: 'Please enter the parent or guardian name.' };
  }

  if (!studentName || studentName.length < 2) {
    return { valid: false, error: 'Please enter the student name.' };
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

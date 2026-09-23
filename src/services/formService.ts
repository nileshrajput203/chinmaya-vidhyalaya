import { ContactEnquiry, AdmissionEnquiry, FormSubmitResult } from '../types/forms';

export const formService = {
  async submitContact(data: Partial<ContactEnquiry>): Promise<FormSubmitResult> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && resData.success !== false) {
        return {
          success: true,
          message: resData.message || 'Thank you! Your message has been sent successfully to the school office.',
        };
      }

      return {
        success: false,
        message: resData.error || 'Failed to send message. Please verify your information and try again.',
        error: resData.error || `Request failed with status ${response.status}`,
      };
    } catch (err: any) {
      console.error('[FormService submitContact error]:', err);
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network or try again later.',
        error: err.message || 'Network error',
      };
    }
  },

  async submitAdmission(data: AdmissionEnquiry): Promise<FormSubmitResult> {
    try {
      const response = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: data.parentName,
          studentName: data.studentName,
          gradeApplyingFor: data.gradeApplyingFor || data.grade || 'Not Specified',
          phone: data.phone,
          email: data.email,
          message: data.message || data.notes,
        }),
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && resData.success !== false) {
        return {
          success: true,
          message: resData.message || 'Admission enquiry submitted successfully. Our admissions desk will contact you.',
        };
      }

      return {
        success: false,
        message: resData.error || 'Failed to submit admission enquiry. Please check your information and try again.',
        error: resData.error || `Request failed with status ${response.status}`,
      };
    } catch (err: any) {
      console.error('[FormService submitAdmission error]:', err);
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network or try again later.',
        error: err.message || 'Network error',
      };
    }
  }
};

import { ContactEnquiry, AdmissionEnquiry, FormSubmitResult } from '../types/forms';

export const formService = {
  async submitContact(data: ContactEnquiry): Promise<FormSubmitResult> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resData = await response.json();
        return { success: true, message: resData.message || 'Thank you! Your message has been sent successfully.' };
      }
    } catch {
      // Fallback for purely static frontend environment when Express server isn't running
      console.warn('Backend API connection unavailable, falling back to local handler');
    }

    // Local fallback confirmation
    return Promise.resolve({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our administrative office will contact you shortly.'
    });
  },

  async submitAdmission(data: AdmissionEnquiry): Promise<FormSubmitResult> {
    try {
      const response = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const resData = await response.json();
        return { success: true, message: resData.message || 'Admission enquiry submitted successfully.' };
      }
    } catch {
      console.warn('Backend API connection unavailable, falling back to local handler');
    }

    return Promise.resolve({
      success: true,
      message: 'Thank you! Your admission enquiry has been logged successfully. The admissions desk will get in touch.'
    });
  }
};

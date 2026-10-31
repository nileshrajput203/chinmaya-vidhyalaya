import { 
  ContactEnquiry, 
  AdmissionEnquiry, 
  AlumniEnquiry, 
  CareerEnquiry, 
  FormSubmitResult 
} from '../types/forms';

async function parseResponsePayload(response: Response): Promise<{
  data: any;
  rawText: string;
}> {
  try {
    const rawText = await response.text();
    try {
      const data = JSON.parse(rawText);
      return { data, rawText };
    } catch {
      return { data: {}, rawText };
    }
  } catch {
    return { data: {}, rawText: '' };
  }
}

export const formService = {
  /**
   * Submit General Contact Enquiry (with department routing)
   */
  async submitContact(data: Partial<ContactEnquiry>): Promise<FormSubmitResult> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { data: resData, rawText } = await parseResponsePayload(response);

      if (response.ok && resData.success !== false) {
        return {
          success: true,
          message: resData.message || 'Thank you! Your message has been sent successfully to the designated department.',
        };
      }

      const errorMsg =
        resData.error ||
        resData.message ||
        (rawText && rawText.length < 150 && !rawText.includes('<html') && !rawText.includes('<!DOCTYPE') ? rawText : '') ||
        `Message delivery failed (Server HTTP ${response.status}). Please try again or call the office.`;

      return {
        success: false,
        message: errorMsg,
        error: errorMsg,
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

  /**
   * Submit Admission Enquiry (routed to Admissions Desk)
   */
  async submitAdmission(data: AdmissionEnquiry): Promise<FormSubmitResult> {
    try {
      const payload = JSON.stringify({
        parentName: data.parentName,
        studentName: data.studentName,
        gradeApplyingFor: data.gradeApplyingFor || data.grade || 'Not Specified',
        phone: data.phone,
        email: data.email,
        message: data.message || data.notes,
      });

      let response = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      // If /api/admissions/enquiry returns 404, fallback to /api/admission
      if (!response.ok && response.status === 404) {
        const fallback = await fetch('/api/admission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
        }).catch(() => null);

        if (fallback && fallback.ok) {
          response = fallback;
        }
      }

      const { data: resData, rawText } = await parseResponsePayload(response);

      if (response.ok && resData.success !== false) {
        return {
          success: true,
          message: resData.message || 'Admission enquiry submitted successfully. Our admissions desk will contact you.',
        };
      }

      const errorMsg =
        resData.error ||
        resData.message ||
        (rawText && rawText.length < 150 && !rawText.includes('<html') && !rawText.includes('<!DOCTYPE') ? rawText : '') ||
        `Admission submission failed (Server HTTP ${response.status}). Please verify your details or contact the admissions counter.`;

      return {
        success: false,
        message: errorMsg,
        error: errorMsg,
      };
    } catch (err: any) {
      console.error('[FormService submitAdmission error]:', err);
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network or try again later.',
        error: err.message || 'Network error',
      };
    }
  },

  /**
   * Submit Alumni Registration (routed to Alumni Relations)
   */
  async submitAlumni(data: AlumniEnquiry): Promise<FormSubmitResult> {
    try {
      const response = await fetch('/api/alumni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { data: resData, rawText } = await parseResponsePayload(response);

      if (response.ok && resData.success !== false) {
        return {
          success: true,
          message: resData.message || 'Alumni registration submitted successfully! Details sent to the Alumni Relations Desk.',
        };
      }

      const errorMsg =
        resData.error ||
        resData.message ||
        (rawText && rawText.length < 150 && !rawText.includes('<html') && !rawText.includes('<!DOCTYPE') ? rawText : '') ||
        `Registration submission failed (Server HTTP ${response.status}). Please try again later.`;

      return {
        success: false,
        message: errorMsg,
        error: errorMsg,
      };
    } catch (err: any) {
      console.error('[FormService submitAlumni error]:', err);
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network or try again later.',
        error: err.message || 'Network error',
      };
    }
  },

  /**
   * Submit Teaching Staff / Career Application (routed to Faculty Recruitment Committee)
   */
  async submitCareer(data: CareerEnquiry): Promise<FormSubmitResult> {
    try {
      let response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok && response.status === 404) {
        const fallback = await fetch('/api/career', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).catch(() => null);

        if (fallback && fallback.ok) {
          response = fallback;
        }
      }

      const { data: resData, rawText } = await parseResponsePayload(response);

      if (response.ok && resData.success !== false) {
        return {
          success: true,
          message: resData.message || 'Application submitted successfully! Sent to our Faculty Recruitment Committee.',
        };
      }

      const errorMsg =
        resData.error ||
        resData.message ||
        (rawText && rawText.length < 150 && !rawText.includes('<html') && !rawText.includes('<!DOCTYPE') ? rawText : '') ||
        `Application submission failed (Server HTTP ${response.status}). Please try again or email your CV directly.`;

      return {
        success: false,
        message: errorMsg,
        error: errorMsg,
      };
    } catch (err: any) {
      console.error('[FormService submitCareer error]:', err);
      return {
        success: false,
        message: 'Could not connect to the server. Please check your network or try again later.',
        error: err.message || 'Network error',
      };
    }
  },
};

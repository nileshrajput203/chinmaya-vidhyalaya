import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, CheckCircle2, 
  Clock, ShieldCheck, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formService } from '../services/formService';
import { GoogleMapSection } from '../components/maps/GoogleMapSection';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showSuccess } = useToast();

  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSubmitStatus(null);

    const fullName = `${formFields.firstName.trim()} ${formFields.lastName.trim()}`.trim();
    if (!fullName || fullName.length < 2) {
      setValidationError('Please enter your first and last name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formFields.email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    const cleanedPhone = formFields.phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const result = await formService.submitContact({
      fullName,
      email: formFields.email.trim(),
      phone: cleanedPhone,
      subject: 'Prospect Parent / General Contact Enquiry',
      message: formFields.message.trim() || 'Prospective student enquiry'
    });

    setIsSubmitting(false);

    if (result.success) {
      showSuccess(
        'Enquiry Received!',
        'Thank you for reaching out. Our admissions counselor will get in touch with you shortly.'
      );
      setSubmitStatus({
        success: true,
        message: 'Thank you! Your enquiry has been received. Our counselor will contact you shortly.'
      });
      setFormFields({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } else {
      setSubmitStatus({
        success: false,
        message: result.error || 'Unable to submit enquiry right now. Please call our admissions desk directly.'
      });
    }
  };

  return (
    <div className="bg-white text-[#181C20] pb-20 font-sans select-none">
      
      {/* ------------------------------------------------------------------
          SECTION 1: PANORAMIC HERO BANNER WITH BREADCRUMB & FLOATING OVERLAP
          ------------------------------------------------------------------ */}
      <div className="relative w-full bg-white">
        
        {/* Panoramic Banner Background */}
        <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[340px] overflow-hidden bg-slate-900">
          <img
            src="/images/about-banner.jpeg"
            alt="Chinmaya Vidyalaya Students and Campus Life"
            className="w-full h-full object-cover object-center opacity-85 filter contrast-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none" />

          {/* Banner Left Content: Breadcrumb & Big "Contact Us" Title */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            
            {/* Breadcrumb line */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-white/80 mb-3">
              <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span style={{ color: 'var(--color-primary)' }} className="font-bold">
                Contact Us
              </span>
            </div>

            {/* Giant Title with Golden Accent Underline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-condensed uppercase tracking-tight text-white m-0">
                Contact Us
              </h1>
              {/* Amber/Gold underline bar matching reference design */}
              <div className="w-20 h-1.5 bg-[#FFB740] mt-2 rounded-none" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            MAIN CONTAINER: CONTENT & FLOATING "GET IN TOUCH" FORM
            ------------------------------------------------------------------ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ==============================================================
                LEFT COLUMN: VALUE PROPOSITION & DIRECT CALL/EMAIL CARDS
                ============================================================== */}
            <div className="lg:col-span-7 pt-10 sm:pt-14 space-y-8">
              
              {/* Heading matching reference */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-[#181C20] tracking-tight leading-tight">
                  Let’s Help Your <span style={{ color: 'var(--color-primary)' }}>Child</span> Find The Right Path
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                  Our academic advisors and admissions officers are here to walk you through curriculum, campus life, and enrollment at your pace.
                </p>
              </div>

              {/* Two Quick Action Cards side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Give Us a Call Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-none shadow-xs flex flex-col items-center text-center space-y-3 transition-all hover:border-[var(--color-primary)] hover:shadow-md">
                  <div className="w-14 h-14 rounded-full bg-[#FFB740]/20 text-[#DF711B] flex items-center justify-center shadow-xs">
                    <Phone className="w-6 h-6 fill-[#FFB740] text-[#FFB740]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base text-[#181C20]">
                      Give Us a Call
                    </h3>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">
                      Mon – Sat, 7:30 AM – 3:30 PM
                    </p>
                  </div>
                  <div className="space-y-1 font-mono text-xs font-bold text-[#181C20] pt-1">
                    <div>
                      <a href="tel:+919405661995" className="hover:text-[var(--color-primary)] transition-colors">
                        +91 94056 61995
                      </a>
                    </div>
                    <div>
                      <a href="tel:02525272044" className="hover:text-[var(--color-primary)] transition-colors text-slate-600">
                        02525-272044 / 270724
                      </a>
                    </div>
                  </div>
                </div>

                {/* Write to Us Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-none shadow-xs flex flex-col items-center text-center space-y-3 transition-all hover:border-[var(--color-primary)] hover:shadow-md">
                  <div className="w-14 h-14 rounded-full bg-[#FFB740]/20 text-[#DF711B] flex items-center justify-center shadow-xs">
                    <Mail className="w-6 h-6 fill-[#FFB740] text-[#FFB740]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base text-[#181C20]">
                      Write to Us
                    </h3>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">
                      Official administrative desk
                    </p>
                  </div>
                  <div className="space-y-1 font-mono text-xs font-bold text-[#181C20] pt-1">
                    <div>
                      <a href="mailto:cvtarapur@gmail.com" className="hover:text-[var(--color-primary)] underline">
                        cvtarapur@gmail.com
                      </a>
                    </div>
                    <div>
                      <a href="mailto:principal@chinmayatarapur.edu.in" className="hover:text-[var(--color-primary)] underline text-slate-600">
                        principal@chinmayatarapur.edu.in
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Helpful Directives */}
              <div className="pt-2 border-t border-slate-200 space-y-2 text-xs text-slate-600 font-sans leading-relaxed">
                <p>
                  To apply for teaching faculty or administrative positions, please submit your CV to:{' '}
                  <a
                    href="mailto:careers@chinmayatarapur.edu.in"
                    style={{ color: 'var(--color-primary)' }}
                    className="font-bold underline"
                  >
                    careers@chinmayatarapur.edu.in
                  </a>
                </p>
                <p>
                  To download the institutional prospectus and fee schedule,{' '}
                  <Link
                    to="/admissions/fee-structure"
                    style={{ color: 'var(--color-primary)' }}
                    className="font-bold underline"
                  >
                    click here
                  </Link>
                  .
                </p>
              </div>

            </div>

            {/* ==============================================================
                RIGHT COLUMN: FLOATING "GET IN TOUCH" FORM CARD (Overlaps Banner!)
                ============================================================== */}
            <div className="lg:col-span-5 relative z-20 -mt-8 sm:-mt-16 lg:-mt-24">
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-none shadow-2xl space-y-5">
                
                {/* Form Header */}
                <div>
                  <h3
                    style={{ color: 'var(--color-primary)' }}
                    className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight leading-none"
                  >
                    Get In Touch
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-normal mt-1 leading-snug">
                    Fill in the form below and our counselor will get in touch with you.
                  </p>
                </div>

                {/* Validation Banner */}
                {validationError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
                    {validationError}
                  </div>
                )}

                {/* Success Banner */}
                {submitStatus && (
                  <div className={`p-4 border text-xs font-sans space-y-1 ${
                    submitStatus.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{submitStatus.success ? 'Enquiry Submitted' : 'Error'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{submitStatus.message}</p>
                  </div>
                )}

                {/* The Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  
                  {/* First Name & Last Name (2 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="First Name*"
                        value={formFields.firstName}
                        onChange={(e) => setFormFields({ ...formFields, firstName: e.target.value })}
                        className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors text-xs text-[#181C20] placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Last Name*"
                        value={formFields.lastName}
                        onChange={(e) => setFormFields({ ...formFields, lastName: e.target.value })}
                        className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors text-xs text-[#181C20] placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email ID */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email ID*"
                      value={formFields.email}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors text-xs text-[#181C20] placeholder:text-slate-400"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile*"
                      value={formFields.phone}
                      onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                      className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors text-xs text-[#181C20] placeholder:text-slate-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Message (Grade applying for, questions...)"
                      value={formFields.message}
                      onChange={(e) => setFormFields({ ...formFields, message: e.target.value })}
                      className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-none focus:border-[var(--color-primary)] focus:outline-none transition-colors text-xs text-[#181C20] placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  {/* Red/Crimson Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-text)'
                    }}
                    className="w-full py-3.5 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-none transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-mono">
                    Protected by reCAPTCHA & Chinmaya Vidyalaya Privacy Policy
                  </p>
                </form>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------------
          SECTION 2: CAMPUS GUIDELINES & PARENT INTERACTION POLICY
          ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white border border-slate-200 p-6 rounded-none space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Visiting Hours
              </span>
            </div>
            <h4 className="font-sans font-bold text-base text-[#181C20]">
              Administrative Office
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Monday through Saturday: <strong>07:30 AM to 03:30 PM</strong>. Closed on Sundays, second Saturdays, and national holidays.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-none space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Campus Visit Policy
              </span>
            </div>
            <h4 className="font-sans font-bold text-base text-[#181C20]">
              Prospective Parents
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Guided campus walkthroughs and laboratory tours are open on weekdays with prior appointment. Existing parents require advance written notice.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-none space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[var(--color-primary)]">
              <MapPin className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Transit Accessibility
              </span>
            </div>
            <h4 className="font-sans font-bold text-base text-[#181C20]">
              Boisar Railway Connection
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Located 2.5 km from <strong>Boisar Railway Station</strong> (Western Railway Line), accessible by direct auto-rickshaws and school bus routes.
            </p>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------
          SECTION 3: INTERACTIVE GOOGLE MAPS & FULL LOCATION ACCESS
          ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <GoogleMapSection />
      </div>

    </div>
  );
};

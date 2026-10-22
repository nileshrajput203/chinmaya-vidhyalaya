import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, PhoneCall, GraduationCap, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { formService } from '../../services/formService';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface AdmissionGuidanceModalProps {
  // Optional external control
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdmissionGuidanceModal: React.FC<AdmissionGuidanceModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Lock body & Lenis smooth scroll while admission guidance modal is open
  useBodyScrollLock(isOpen);

  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    grade: '',
    streamOrCampus: '',
  });

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    // Remember dismissal for this session so we don't annoy the visitor
    try {
      sessionStorage.setItem('chinmaya_admission_modal_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // Exit-Intent & Timed Inactivity Triggers (Only for autonomous mode)
  useEffect(() => {
    if (isControlled) return;

    // Check if dismissed previously in this session
    try {
      if (sessionStorage.getItem('chinmaya_admission_modal_dismissed') === 'true') {
        return;
      }
    } catch {
      // ignore
    }

    let hasTriggered = false;

    const triggerModal = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setInternalIsOpen(true);
    };

    // 1. Exit-Intent Detection: Cursor moves to top of browser viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        triggerModal();
      }
    };

    // 2. Timed trigger: after 25 seconds of engaging with the site
    const timer = setTimeout(() => {
      triggerModal();
    }, 25000);

    // 3. Global event listener for manual triggers from any CTA
    const handleOpenEvent = () => {
      setInternalIsOpen(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('open-admission-modal', handleOpenEvent);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('open-admission-modal', handleOpenEvent);
    };
  }, [isControlled]);

  // Bottom scroll detection to shrink the button and reveal hidden footer social icons
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      // Shrink when within 320px of the footer bottom
      const nearBottom = scrollY + windowHeight >= documentHeight - 320;
      setIsAtBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Also observe footer element directly
    const footer = document.querySelector('footer');
    let observer: IntersectionObserver | null = null;
    if (footer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            setIsAtBottom(entries[0].isIntersecting);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(footer);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (observer && footer) observer.unobserve(footer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.parentName.trim()) {
      setErrorMessage("Please enter the parent or guardian's name.");
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.grade) {
      setErrorMessage('Please select an admission class / grade.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await formService.submitAdmission({
        parentName: formData.parentName.trim(),
        studentName: `Child of ${formData.parentName.trim()}`,
        gradeApplyingFor: formData.grade,
        phone: cleanPhone,
        email: formData.email.trim() || undefined,
        message: `Inquiry via Exit-Intent Guidance Modal. Campus/Stream: ${formData.streamOrCampus}`,
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Could not submit enquiry. Please try again or call our office.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto overscroll-contain"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0B0D10]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] border border-[#E7E2D8] overflow-y-auto md:overflow-hidden z-10 my-auto overscroll-contain flex flex-col md:grid md:grid-cols-12"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[#181818] hover:text-white border border-[#E5E0D5] flex items-center justify-center text-[#555555] transition-all duration-200 shadow-sm cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* ============================================================
                LEFT COLUMN: EDITORIAL VISUAL & TRUST PILLARS
                ============================================================ */}
            <div className="md:col-span-5 relative flex flex-col justify-between p-3.5 sm:p-5 md:p-6 overflow-hidden h-24 sm:h-32 md:h-auto md:min-h-[520px] shrink-0">
              {/* Clear Background Image with minimal edge vignettes */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/chinmaya/academics/classroom_learning_001.jpg"
                  alt="Chinmaya Vidyalaya Academics"
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle top/bottom gradient only so badges are readable, leaving center image clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
              </div>

              {/* Top: School Badge */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/45 border border-white/20 backdrop-blur-md shadow-sm">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD285]" />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#FFD285] font-bold">
                    Admissions Open 2026-27
                  </span>
                </div>
              </div>

              {/* Mobile Compact Trust Strip */}
              <div className="relative z-10 mt-auto md:hidden flex flex-wrap items-center gap-1.5 text-[9px] sm:text-[10px] text-white/95 font-medium">
                <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Safe Campus
                </span>
                <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/15">
                  <Award className="w-3 h-3 text-amber-300" /> 100% CBSE Results
                </span>
              </div>

              {/* Desktop Full Verified Trust Pillars Frosted Glass Panel */}
              <div className="relative z-10 mt-auto hidden md:block bg-black/55 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/15 space-y-2.5 shadow-lg">
                <div className="flex items-center gap-2.5 text-xs text-white/95 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Safe, Caring & Value-Based Campus</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-white/95 font-medium">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-300/30">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span>Consistent 100% CBSE Board Results</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-white/95 font-medium">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-300/30">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  <span>Friendly Guidance & Campus Visits Welcome</span>
                </div>

                <div className="pt-1 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#FFD285]">
                    CBSE Affiliation No. 1130095
                  </span>
                  <span className="text-[10px] font-mono text-white/60">
                    School Code: 30018
                  </span>
                </div>
              </div>
            </div>

            {/* ============================================================
                RIGHT COLUMN: ADMISSION GUIDANCE FORM
                ============================================================ */}
            <div className="md:col-span-7 bg-[#FFFFFF] p-4 sm:p-6 md:p-8 flex flex-col justify-center overflow-y-auto grow">
              {!isSubmitted ? (
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {/* Header Badge & Title */}
                  <div>
                    <div className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-orange-50 text-[#DF711B] text-[10px] sm:text-[11px] font-semibold rounded-full mb-1.5 sm:mb-2 border border-orange-200/80 leading-tight">
                      We're here to help you make the right choice for your child.
                    </div>

                    <div className="border-l-3 sm:border-l-4 border-[#DF711B] pl-2.5 sm:pl-3">
                      <h2 className="text-base sm:text-xl md:text-2xl font-cinzel font-black text-[#0B1D30] tracking-tight uppercase m-0 leading-tight">
                        Get Personalised Admission Guidance
                      </h2>
                    </div>

                    <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 mt-1 sm:mt-1.5 leading-relaxed">
                      Share your details below and our admissions experts will get in touch with you to guide you personally.
                    </p>
                  </div>

                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  {/* Interactive Form */}
                  <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5">
                    {/* Parent Full Name */}
                    <div>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="Parent's full name *"
                        className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-slate-200 focus:border-[#DF711B] focus:bg-white rounded-lg text-base sm:text-sm text-[#181818] placeholder-slate-400 outline-none transition-all shadow-inner"
                      />
                    </div>

                    {/* Phone Number + Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
                      {/* Phone with Country Code Badge */}
                      <div className="sm:col-span-6 flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:border-[#DF711B] bg-white transition-all">
                        <span className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 border-r border-slate-200 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                          placeholder="Mobile number *"
                          className="w-full px-3 py-2.5 sm:py-3 bg-transparent text-base sm:text-sm text-[#181818] placeholder-[#999999] outline-none"
                        />
                      </div>

                      {/* Email Address */}
                      <div className="sm:col-span-6">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email address (optional)"
                          className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-slate-200 focus:border-[#DF711B] focus:bg-white rounded-lg text-base sm:text-sm text-[#181818] placeholder-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Grade & Campus Dropdowns Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {/* Select Grade */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#777777] font-semibold mb-1">
                          Admission Seeking For *
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full px-3 py-2 sm:py-2.5 bg-white border border-slate-200 focus:border-[#DF711B] rounded-lg text-base sm:text-sm text-[#181818] outline-none cursor-pointer"
                        >
                          <option value="">Select Grade / Class</option>
                          <option value="Nursery / Pre-Primary">Nursery / Pre-Primary</option>
                          <option value="LKG / UKG">LKG / UKG (Kindergarten)</option>
                          <option value="Class I - V (Primary)">Class I - V (Primary)</option>
                          <option value="Class VI - VIII (Middle)">Class VI - VIII (Middle)</option>
                          <option value="Class IX - X (Secondary)">Class IX - X (Secondary)</option>
                          <option value="Class XI - XII Science">Class XI - XII (Science Stream)</option>
                          <option value="Class XI - XII Commerce">Class XI - XII (Commerce Stream)</option>
                          <option value="Class XI - XII Arts">Class XI - XII (Arts Stream)</option>
                        </select>
                      </div>

                      {/* Select Campus / Preference */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#777777] font-semibold mb-1">
                          Preferred Campus / Inquiry *
                        </label>
                        <select
                          value={formData.streamOrCampus}
                          onChange={(e) => setFormData({ ...formData, streamOrCampus: e.target.value })}
                          className="w-full px-3 py-2 sm:py-2.5 bg-white border border-slate-200 focus:border-[#DF711B] rounded-lg text-base sm:text-sm text-[#181818] outline-none cursor-pointer"
                        >
                          <option value="">Select Campus / Inquiry</option>
                          <option value="Main Campus (Boisar, Tarapur)">Main Campus (Boisar, Tarapur)</option>
                          <option value="Book Campus Tour First">Book Campus Tour First</option>
                          <option value="General Fee & Curriculum Inquiry">General Fee & Curriculum Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Primary CTA Button - Website Brand Colors */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-[#DF711B] hover:bg-[#C45B0E] text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-1 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Connecting with Admissions Desk...</span>
                        </>
                      ) : (
                        <>
                          <span>Request a Call Back</span>
                          <PhoneCall className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>

                    {/* Reassurance Footer Text */}
                    <p className="text-[10px] sm:text-[11px] text-[#777777] text-center leading-normal pt-0.5">
                      We'll contact you shortly to answer your questions and help you with admissions.
                    </p>
                  </form>
                </div>
              ) : (
                /* ============================================================
                    SUCCESS CONFIRMATION VIEW
                    ============================================================ */
                <div className="py-6 sm:py-8 px-3 sm:px-4 text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-inner">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
                      ENQUIRY RECEIVED SUCCESSFULLY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-[#181818] uppercase tracking-tight">
                      Thank You, {formData.parentName}!
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                    Our Chinmaya Vidyalaya Admissions Team has received your request for <strong>{formData.grade}</strong>. A dedicated academic counselor will call you at <strong>+91 {formData.phone}</strong> within 24 hours.
                  </p>

                  <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto text-left space-y-1 text-xs text-[#555555]">
                    <div className="flex justify-between font-mono">
                      <span>Direct Admission Desk:</span>
                      <span className="font-bold text-[#181818]">+91 7775872266</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Office Hours:</span>
                      <span>Mon-Sat (8:30 AM - 3:30 PM)</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 bg-[#181818] hover:bg-[#DF711B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Back to Website
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Floating Guidance Launcher Button on Bottom-Left */}
    {!isOpen && (
      <motion.button
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onClick={() => setInternalIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 hidden sm:flex items-center rounded-full shadow-[0_8px_25px_rgba(223,113,27,0.25)] backdrop-blur-md transition-all duration-300 group cursor-pointer ${
          isAtBottom
            ? 'p-2 w-11 h-11 justify-center bg-[#DF711B] hover:bg-[#C45B0E] border-2 border-white/60 text-white hover:scale-110 shadow-lg'
            : 'gap-2.5 px-4 py-2.5 bg-white/95 hover:bg-[#181818] text-[#181818] hover:text-white border border-[#DF711B]/40 hover:border-[#DF711B]'
        }`}
        title="Admission Guidance - Request a Call Back"
        aria-label="Request Admission Guidance Call"
      >
        <div
          className={`rounded-full flex items-center justify-center shrink-0 transition-transform ${
            isAtBottom
              ? 'w-full h-full text-white group-hover:rotate-12'
              : 'w-7 h-7 bg-[#DF711B] text-white group-hover:scale-110 shadow-sm'
          }`}
        >
          <PhoneCall className={isAtBottom ? 'w-5 h-5 stroke-[2.2]' : 'w-3.5 h-3.5'} />
        </div>

        <AnimatePresence mode="wait">
          {!isAtBottom && (
            <motion.div
              key="guidance-pill-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="text-left overflow-hidden whitespace-nowrap pr-1"
            >
              <span className="block text-[11px] font-display font-black tracking-tight uppercase leading-tight group-hover:text-amber-300 transition-colors">
                Admission Guidance
              </span>
              <span className="block text-[9px] font-mono text-[#777777] group-hover:text-white/80">
                Request a Call Back
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )}
  </>
  );
};

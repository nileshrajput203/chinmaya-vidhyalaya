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
    grade: 'Class I - V (Primary)',
    streamOrCampus: 'Main Campus (Boisar, Tarapur)',
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto overscroll-contain"
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
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] border border-[#E7E2D8] overflow-hidden z-10 my-auto overscroll-contain"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-[#181818] hover:text-white border border-[#E5E0D5] flex items-center justify-center text-[#555555] transition-all duration-200 shadow-sm cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
              
              {/* ============================================================
                  LEFT COLUMN: EDITORIAL VISUAL & TRUST PILLARS
                  ============================================================ */}
              <div className="md:col-span-5 relative flex flex-col justify-between p-5 sm:p-6 overflow-hidden min-h-[360px] md:min-h-full">
                {/* Clear Background Image with minimal edge vignettes */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/images/chinmaya/academics/classroom_learning_001.jpg"
                    alt="Chinmaya Vidyalaya Academics"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle top/bottom gradient only so badges are readable, leaving center image 100% clear */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Top: School Badge */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-sm">
                    <GraduationCap className="w-4 h-4 text-[#FFD285]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFD285] font-bold">
                      Admissions Open 2026-27
                    </span>
                  </div>
                </div>

                {/* Bottom: Verified Trust Pillars Frosted Glass Panel */}
                <div className="relative z-10 mt-auto bg-black/55 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/15 space-y-2.5 shadow-lg">
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
              <div className="md:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 md:p-9 flex flex-col justify-center">
                {!isSubmitted ? (
                  <div className="space-y-5">
                    {/* Header Badge & Title */}
                    <div>
                      <div className="inline-block px-3 py-1 bg-[#FFF4EC] text-[#DF711B] text-[11px] font-medium rounded-full mb-2.5 border border-[#DF711B]/20">
                        We're here to help you make the right choice for your child.
                      </div>

                      <div className="border-l-4 border-[#C41E3A] pl-3">
                        <h2 className="text-xl sm:text-2xl font-display font-black text-[#181818] tracking-tight uppercase m-0">
                          Get Personalised Admission Guidance
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-[#666666] mt-1.5 leading-relaxed">
                        Share your details below and our admissions experts will get in touch with you to guide you personally.
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    {/* Interactive Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* Parent Full Name */}
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="Parent's full name *"
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E0D5] focus:border-[#C41E3A] focus:bg-white rounded-lg text-sm text-[#181818] placeholder-[#999999] outline-none transition-all shadow-inner"
                        />
                      </div>

                      {/* Phone Number + Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Phone with Country Code Badge */}
                        <div className="sm:col-span-6 flex items-center border border-[#E5E0D5] rounded-lg overflow-hidden focus-within:border-[#C41E3A] bg-[#FAF8F5] transition-all">
                          <span className="px-3.5 py-3 text-xs sm:text-sm font-bold text-[#555555] bg-[#EFEBE4] border-r border-[#E5E0D5] select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                            placeholder="Mobile number *"
                            className="w-full px-3 py-3 bg-transparent text-sm text-[#181818] placeholder-[#999999] outline-none"
                          />
                        </div>

                        {/* Email Address */}
                        <div className="sm:col-span-6">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email address (optional)"
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E0D5] focus:border-[#C41E3A] focus:bg-white rounded-lg text-sm text-[#181818] placeholder-[#999999] outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Grade & Campus Dropdowns Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Select Grade */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#777777] font-semibold mb-1">
                            Admission Seeking For *
                          </label>
                          <select
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E5E0D5] focus:border-[#C41E3A] rounded-lg text-xs sm:text-sm text-[#181818] outline-none cursor-pointer"
                          >
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
                            Preferred Campus / City *
                          </label>
                          <select
                            value={formData.streamOrCampus}
                            onChange={(e) => setFormData({ ...formData, streamOrCampus: e.target.value })}
                            className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E5E0D5] focus:border-[#C41E3A] rounded-lg text-xs sm:text-sm text-[#181818] outline-none cursor-pointer"
                          >
                            <option value="Main Campus (Boisar, Tarapur)">Main Campus (Boisar, Tarapur)</option>
                            <option value="Book Campus Tour First">Book Campus Tour First</option>
                            <option value="General Fee & Curriculum Inquiry">General Fee & Curriculum Inquiry</option>
                          </select>
                        </div>
                      </div>

                      {/* Primary CTA Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#C41E3A] via-[#A8172F] to-[#8C1024] hover:from-[#DF711B] hover:to-[#C4590D] text-white font-sans font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Connecting with Admissions Desk...</span>
                          </>
                        ) : (
                          <>
                            <span>Request a Call Back</span>
                            <PhoneCall className="w-4 h-4 text-white/90" />
                          </>
                        )}
                      </button>

                      {/* Reassurance Footer Text */}
                      <p className="text-[11px] text-[#777777] text-center leading-normal pt-1">
                        We'll contact you shortly to answer your questions and help you with admissions.
                      </p>
                    </form>
                  </div>
                ) : (
                  /* ============================================================
                      SUCCESS CONFIRMATION VIEW
                      ============================================================ */
                  <div className="py-8 px-4 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
                        ENQUIRY RECEIVED SUCCESSFULLY
                      </span>
                      <h3 className="text-2xl font-display font-black text-[#181818] uppercase tracking-tight">
                        Thank You, {formData.parentName}!
                      </h3>
                    </div>

                    <p className="text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                      Our Chinmaya Vidyalaya Admissions Team has received your request for <strong>{formData.grade}</strong>. A dedicated academic counselor will call you at <strong>+91 {formData.phone}</strong> within 24 hours.
                    </p>

                    <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl max-w-sm mx-auto text-left space-y-1 text-xs text-[#555555]">
                      <div className="flex justify-between font-mono">
                        <span>Direct Admission Desk:</span>
                        <span className="font-bold text-[#181818]">+91 7775872266</span>
                      </div>
                      <div className="flex justify-between font-mono">
                        <span>Office Hours:</span>
                        <span>Mon–Sat (8:30 AM – 3:30 PM)</span>
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
            ? 'p-2 w-11 h-11 justify-center bg-gradient-to-tr from-[#C41E3A] to-[#DF711B] border-2 border-white/60 text-white hover:scale-110 shadow-lg'
            : 'gap-2.5 px-4 py-2.5 bg-white/95 hover:bg-[#181818] text-[#181818] hover:text-white border border-[#DF711B]/40 hover:border-[#DF711B]'
        }`}
        title="Admission Guidance — Request a Call Back"
        aria-label="Request Admission Guidance Call"
      >
        <div
          className={`rounded-full flex items-center justify-center shrink-0 transition-transform ${
            isAtBottom
              ? 'w-full h-full text-white group-hover:rotate-12'
              : 'w-7 h-7 bg-gradient-to-tr from-[#C41E3A] to-[#DF711B] text-white group-hover:scale-110 shadow-sm'
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

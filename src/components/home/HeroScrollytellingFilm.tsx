import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Phone, ArrowRight, AlertCircle, FileText, Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formService } from '../../services/formService';
import { useToast } from '../../context/ToastContext';
import { OFFICIAL_NOTICES } from '../../data/notices';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollytellingFilmProps {
  onOpenAdmissions: () => void;
}

// Scroll stroke distance for full video scrub (approx 950px total scroll distance)
const TOTAL_SCROLLABLE_PX = 950;

export const HeroScrollytellingFilm: React.FC<HeroScrollytellingFilmProps> = ({ onOpenAdmissions }) => {
  const { showSuccess } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop guard: only active on screens >= 1024px to ensure mobile never loads or plays heavy hero video
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Video duration state (default 10s matching lv_0_20260922153757.mp4)
  const durationRef = useRef<number>(10);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Component scroll progress state (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Initialize video metadata and ensure first frame is painted
  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }
      // Paint first frame
      try {
        video.currentTime = 0.001;
      } catch (_) {}
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [isDesktop]);

  // Silky smooth physics interpolation loop for video seeking
  useEffect(() => {
    if (!isDesktop) return;
    let animId: number;

    const renderLoop = () => {
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.005) {
          // Responsive fluid lerp
          currentTimeRef.current += diff * 0.35;
          const seekTime = Math.min(Math.max(0, currentTimeRef.current), video.duration - 0.01);

          if (!isSeekingRef.current) {
            isSeekingRef.current = true;
            if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
              (video as any).fastSeek(seekTime);
            } else {
              video.currentTime = seekTime;
            }
            // Fallback safety release so a missed seeked event never deadlocks the scrub loop
            setTimeout(() => {
              isSeekingRef.current = false;
            }, 100);
          }
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isDesktop]);

  // Pin stickyRef to viewport using GSAP ScrollTrigger
  useEffect(() => {
    if (!isDesktop) return;
    const container = containerRef.current;
    const stickyEl = stickyRef.current;
    if (!container || !stickyEl) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyEl,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));
        setScrollProgress(progress);
        targetTimeRef.current = progress * durationRef.current;
      },
    });

    ScrollTrigger.refresh();

    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(0, rawProgress), 1);
      setScrollProgress(progress);
      targetTimeRef.current = progress * durationRef.current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      st.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDesktop]);

  // Admission enquiry form state
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    grade: 'Class 1',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Strict validation
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(formData.studentName.trim()) || formData.studentName.trim().length < 2) {
      setSubmitError("Please enter a valid student name containing only letters.");
      return;
    }

    if (!nameRegex.test(formData.parentName.trim()) || formData.parentName.trim().length < 2) {
      setSubmitError("Please enter a valid parent or guardian name containing only letters.");
      return;
    }

    const cleanedPhone = formData.phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setSubmitError("Please enter a valid 10-digit mobile number containing only numbers.");
      return;
    }

    setIsSubmitting(true);

    const res = await formService.submitAdmission({
      studentName: formData.studentName.trim(),
      parentName: formData.parentName.trim(),
      gradeApplyingFor: formData.grade,
      phone: cleanedPhone,
    });

    setIsSubmitting(false);

    if (res.success) {
      showSuccess(
        'Enquiry Submitted Successfully!',
        'Thank you! Our admissions coordinator will reach out to you on your registered phone number shortly.'
      );
      setIsSubmitted(true);
    } else {
      setSubmitError(res.error || res.message || 'Failed to submit admission enquiry. Please verify details.');
    }
  };

  // Cards appear at 20% scroll and remain visible until the end
  const getHeroOverlayVisibility = () => {
    const p = scrollProgress;
    const start = 0.20;
    const fullIn = 0.35;

    if (p < start) {
      return {
        opacity: 0,
        transform: 'translateY(24px)',
        pointerEvents: 'none' as const,
        display: 'none' as const,
      };
    }

    const t = Math.min(1, Math.max(0, (p - start) / (fullIn - start)));
    const opacity = t;
    const translateY = (1 - t) * 18;

    return {
      opacity,
      transform: `translateY(${translateY.toFixed(1)}px)`,
      pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
      display: 'block' as const,
      transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  // If not desktop, do not render sequential scrollytelling frames at all
  if (!isDesktop) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      id="campus-film-narrative"
      className="relative w-full bg-[#050C14] text-white"
      style={{ height: `calc(100vh + ${TOTAL_SCROLLABLE_PX}px)` }}
    >
      {/* ----------------------------------------------------
          STICKY FULL-SCREEN CINEMATIC VIDEO VIEWPORT
          Unpins at the exact moment video scrub is completed
         ---------------------------------------------------- */}
      <div 
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#071320]"
      >
        {/* Instant Poster Image */}
        <img
          src="/heronew/herovideo/ezgif-frame-001.jpg"
          alt="Chinmaya Vidyalaya Campus"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Scroll-Driven Scrubbing Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/heronew/herovideo/ezgif-frame-001.jpg"
          className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
        >
          <source src="/heronew/hero-scrub.mp4" type="video/mp4" />
        </video>

        {/* ----------------------------------------------------
            ADMISSION FORM + WHAT'S NEW NOTICE BOARD (DESKTOP HERO OVERLAY)
            Visible from start to end in one seamless scroll view
           ---------------------------------------------------- */}
        <div className="flex absolute inset-0 z-20 pointer-events-none items-center justify-center px-4 py-4 sm:py-6">
          <div className="w-full max-w-5xl mx-auto box-border" style={getHeroOverlayVisibility()}>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* Left Column: Admission Enquiry Form (7 cols on lg) */}
              <div className="lg:col-span-7 bg-white/95 backdrop-blur-md text-[#181C20] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#DF711B]/25 pointer-events-auto rounded-3xl relative overflow-hidden flex flex-col">
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#DF711B] via-[#FFB740] to-[#DF711B]" />
                
                {/* Header */}
                <div className="border-b border-[#E7E2D8] pb-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/Chinmaya_Logo.webp"
                      alt="Chinmaya Vidyalaya Logo"
                      className="w-11 h-13 sm:w-12 sm:h-14 object-contain shrink-0 drop-shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#DF711B] font-bold">
                          ADMISSIONS 2026–27
                        </span>
                        <span className="text-[9.5px] font-mono text-[#0B1E34] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full shrink-0">
                          CBSE #1130058
                        </span>
                      </div>
                      <h3 className="font-cinzel text-base sm:text-lg font-black text-[#0B1E34] tracking-wide m-0 leading-tight">
                        Chinmaya Vidyalaya
                      </h3>
                      <p className="text-[11px] text-[#555] font-sans leading-tight m-0 mt-0.5">
                        Vidyanagar, Boisar • Official Admission Enquiry
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                {isSubmitted ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-cinzel font-bold text-base text-[#0B1E34] uppercase m-0">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-xs text-[#555] font-sans leading-relaxed max-w-sm mx-auto">
                      Thank you! Your admission enquiry has been recorded. Our admissions coordinator will reach out to you on your registered phone number shortly.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        type="button"
                        onClick={onOpenAdmissions}
                        className="px-4 py-2.5 bg-[#DF711B] hover:bg-[#c86113] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        View Admission Documents
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ studentName: '', parentName: '', phone: '', grade: 'Class 1' });
                        }}
                        className="px-4 py-2.5 bg-white border border-[#E7E2D8] hover:bg-[#F5F2EB] text-[#181C20] font-sans font-semibold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-3 pt-0.5">
                    {submitError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Field 1: Student's Full Name */}
                    <div>
                      <label className="block text-[11px] font-sans font-bold text-[#0B1E34] uppercase tracking-wider mb-1">
                        Student's Full Name <span className="text-[#DF711B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="Enter student's full name"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#D5CEC2] text-[#181C20] placeholder-[#9E988D] rounded-xl focus:border-[#DF711B] focus:ring-2 focus:ring-[#DF711B]/20 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Field 2: Parent / Guardian Name */}
                    <div>
                      <label className="block text-[11px] font-sans font-bold text-[#0B1E34] uppercase tracking-wider mb-1">
                        Parent / Guardian Name <span className="text-[#DF711B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="Enter parent or guardian full name"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#D5CEC2] text-[#181C20] placeholder-[#9E988D] rounded-xl focus:border-[#DF711B] focus:ring-2 focus:ring-[#DF711B]/20 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Field 3: Phone Number */}
                    <div>
                      <label className="block text-[11px] font-sans font-bold text-[#0B1E34] uppercase tracking-wider mb-1">
                        Phone Number (10-Digit Mobile) <span className="text-[#DF711B]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#D5CEC2] text-[#181C20] placeholder-[#9E988D] rounded-xl focus:border-[#DF711B] focus:ring-2 focus:ring-[#DF711B]/20 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Field 4: Grade Applying For */}
                    <div>
                      <label className="block text-[11px] font-sans font-bold text-[#0B1E34] uppercase tracking-wider mb-1">
                        Grade Applying For (Nursery to 12th) <span className="text-[#DF711B]">*</span>
                      </label>
                      <select
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#D5CEC2] text-[#181C20] rounded-xl focus:border-[#DF711B] focus:ring-2 focus:ring-[#DF711B]/20 focus:outline-none transition-all shadow-sm cursor-pointer"
                      >
                        <optgroup label="Foundational Stage">
                          <option value="Nursery">Nursery</option>
                          <option value="Junior KG">Junior KG</option>
                          <option value="Senior KG">Senior KG</option>
                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                        </optgroup>
                        <optgroup label="Preparatory Stage">
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                        </optgroup>
                        <optgroup label="Middle Stage">
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                        </optgroup>
                        <optgroup label="Secondary Stage">
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                        </optgroup>
                        <optgroup label="Senior Secondary (Class 11 & 12)">
                          <option value="Class 11 - Science">Class 11 - Science</option>
                          <option value="Class 11 - Commerce">Class 11 - Commerce</option>
                          <option value="Class 11 - Arts">Class 11 - Arts</option>
                          <option value="Class 12 - Science">Class 12 - Science</option>
                          <option value="Class 12 - Commerce">Class 12 - Commerce</option>
                          <option value="Class 12 - Arts">Class 12 - Arts</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Submit Button & Helpline */}
                    <div className="space-y-2 pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#DF711B] via-[#E8873E] to-[#DF711B] hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#DF711B]/20 cursor-pointer"
                      >
                        <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                        <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}</span>
                      </button>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#555] border-t border-[#E7E2D8]">
                        <span className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
                          9322054713 / 9823517700
                        </span>
                        <button
                          type="button"
                          onClick={onOpenAdmissions}
                          className="inline-flex items-center gap-1 text-[#DF711B] hover:text-[#C45B0E] font-sans font-bold hover:underline cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Download Forms ›</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: What's New / Latest Updates Notice Board (5 cols on lg) — Compact, No Blank Spaces */}
              <div 
                className="lg:col-span-5 bg-white/95 backdrop-blur-md text-[#181C20] p-3.5 sm:p-4 shadow-[0_20px_45px_rgba(0,0,0,0.2)] border border-slate-200 pointer-events-auto rounded-2xl relative overflow-hidden flex flex-col space-y-2.5"
              >
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#DF711B] via-[#FFB740] to-[#DF711B]" />
                
                {/* Header */}
                <div className="border-b border-slate-200 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#DF711B] font-bold">
                        WHAT'S NEW
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 font-semibold">
                      Live Updates
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base font-black text-[#0B1D30] tracking-wide mt-1">
                    Latest Dispatches & Notices
                  </h4>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                    Official announcements, board distinctions, and campus dispatches
                  </p>
                </div>

                {/* Notices Feed Container — Dynamic with clean status when no active notices */}
                {OFFICIAL_NOTICES.length > 0 ? (
                  <div className="space-y-1.5">
                    {OFFICIAL_NOTICES.map((notice) => (
                      <Link 
                        key={notice.id}
                        to="/notice" 
                        className="block px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-xs border-l-[#DF711B] border-l-[3.5px] transition-all duration-200 group/card"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-sans font-semibold text-xs text-[#0B1D30] group-hover/card:text-[#DF711B] transition-colors leading-snug line-clamp-1">
                            {notice.title}
                          </h5>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/card:text-[#DF711B] group-hover/card:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-7 px-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-center flex flex-col items-center justify-center space-y-2">
                    <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-2xs">
                      <Bell className="w-4 h-4 text-[#DF711B]/70" />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="font-sans font-bold text-xs text-[#0B1D30]">
                        No Active Circulars at Present
                      </h5>
                      <p className="text-[10.5px] text-slate-500 font-sans max-w-xs leading-relaxed">
                        All official notices are up to date. New circulars and campus dispatches will appear here when published.
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <Link
                    to="/admissions/calendar"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 hover:text-[#DF711B] transition-colors group"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#DF711B] group-hover:scale-110 transition-transform" />
                    <span>Academic Calendar ›</span>
                  </Link>

                  <Link
                    to="/notice"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#DF711B] hover:bg-[#C45B0E] text-white rounded-lg text-[11px] font-bold font-sans uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 group"
                  >
                    <span>Notice Board</span>
                    <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

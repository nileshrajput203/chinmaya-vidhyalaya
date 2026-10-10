import React, { useEffect, useRef, useState, useCallback } from 'react';
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

// All 236 frames from ezgif-frame-001.jpg to ezgif-frame-236.jpg in /heronew/herovideo/
const START_FRAME = 1;
const END_FRAME = 236;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 236 frames

// 1-scroll distance: video plays full in 0% to 60% (~450px), remaining 40% transitions smoothly into next section
const TOTAL_SCROLLABLE_PX = 750;

// Helper to construct zero-padded WebP frame URLs in heronew/frames_webp
const getFrameSrc = (index: number): string => {
  const frameNum = Math.min(Math.max(START_FRAME, START_FRAME + index), END_FRAME);
  return `/heronew/frames_webp/frame-${String(frameNum).padStart(3, '0')}.webp`;
};

export const HeroScrollytellingFilm: React.FC<HeroScrollytellingFilmProps> = ({ onOpenAdmissions }) => {
  const { showSuccess } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Desktop guard: only active on screens >= 1024px
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cached frame images
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Draw frame with sub-frame continuous blending for liquid-smooth 60/120fps motion
  const drawFrame = useCallback((floatFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const clamped = Math.min(Math.max(0, floatFrame), TOTAL_FRAMES - 1);
    const baseIdx = Math.floor(clamped);
    const nextIdx = Math.min(baseIdx + 1, TOTAL_FRAMES - 1);
    const blendAlpha = clamped - baseIdx;

    // Find requested base frame or closest loaded fallback
    let baseImg = imagesRef.current[baseIdx];
    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) {
      for (let i = baseIdx; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
          baseImg = imagesRef.current[i];
          break;
        }
      }
      if (!baseImg) {
        for (let i = baseIdx + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
            baseImg = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate cover dimensions preserving aspect ratio, centered
    const imgAspect = baseImg.naturalWidth / baseImg.naturalHeight;
    const canvasAspect = cw / ch;
    let drawWidth = cw;
    let drawHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = cw / imgAspect;
      offsetY = (ch - drawHeight) / 2;
    } else {
      drawWidth = ch * imgAspect;
      offsetX = (cw - drawWidth) / 2;
    }

    // 1. Draw base frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(baseImg, offsetX, offsetY, drawWidth, drawHeight);

    // 2. Sub-frame blend with next frame
    if (blendAlpha > 0.03 && nextIdx !== baseIdx) {
      const nextImg = imagesRef.current[nextIdx];
      if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
        const nextAspect = nextImg.naturalWidth / nextImg.naturalHeight;
        let nDrawWidth = cw;
        let nDrawHeight = ch;
        let nOffsetX = 0;
        let nOffsetY = 0;

        if (canvasAspect > nextAspect) {
          nDrawHeight = cw / nextAspect;
          nOffsetY = (ch - nDrawHeight) / 2;
        } else {
          nDrawWidth = ch * nextAspect;
          nOffsetX = (cw - nDrawWidth) / 2;
        }

        ctx.globalAlpha = blendAlpha;
        ctx.drawImage(nextImg, nOffsetX, nOffsetY, nDrawWidth, nDrawHeight);
        ctx.globalAlpha = 1.0;
      }
    }
  }, []);

  // Instant skeleton + progressive frame preloader
  useEffect(() => {
    if (!isDesktop) return;
    let isCancelled = false;
    const loadedSet = new Set<number>();

    const fetchFrame = (index: number): Promise<void> => {
      if (isCancelled || imagesRef.current[index] || loadedSet.has(index)) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (isCancelled) return resolve();
          loadedSet.add(index);
          imagesRef.current[index] = img;
          if (index === 0 || Math.abs(index - currentFrameRef.current) < 1.5) {
            drawFrame(currentFrameRef.current);
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
        img.src = getFrameSrc(index);
        if (img.complete && img.naturalWidth > 0) {
          loadedSet.add(index);
          imagesRef.current[index] = img;
          if (index === 0 || Math.abs(index - currentFrameRef.current) < 1.5) {
            drawFrame(currentFrameRef.current);
          }
          resolve();
        }
      });
    };

    const loadInitialSequence = async () => {
      // Step 1: Preload frame 0 immediately & draw to canvas without waiting
      await fetchFrame(0);
      if (isCancelled) return;
      drawFrame(0);

      // Step 2: Instant 16-frame uniform skeleton (~1.5 MB WebP) across entire timeline
      // Ensures user can scrub immediately with zero freezes or delays!
      const skeletonIndices: number[] = [];
      const skeletonStep = Math.max(1, Math.floor(TOTAL_FRAMES / 16));
      for (let i = 0; i < TOTAL_FRAMES; i += skeletonStep) {
        if (i !== 0) skeletonIndices.push(i);
      }
      if (!skeletonIndices.includes(TOTAL_FRAMES - 1)) {
        skeletonIndices.push(TOTAL_FRAMES - 1);
      }

      let sIndex = 0;
      const skeletonWorker = async () => {
        while (sIndex < skeletonIndices.length && !isCancelled) {
          const idx = skeletonIndices[sIndex++];
          await fetchFrame(idx);
        }
      };
      await Promise.all(Array.from({ length: 4 }, () => skeletonWorker()));
      if (isCancelled) return;

      // Step 3: Load intermediate keyframes (every 4th frame)
      const keyframeIndices: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 4) {
        if (!loadedSet.has(i)) keyframeIndices.push(i);
      }
      let kIndex = 0;
      const keyframeWorker = async () => {
        while (kIndex < keyframeIndices.length && !isCancelled) {
          const idx = keyframeIndices[kIndex++];
          await fetchFrame(idx);
        }
      };
      await Promise.all(Array.from({ length: 4 }, () => keyframeWorker()));
      if (isCancelled) return;

      // Step 4: Stream remaining in-between frames in background
      const remainingIndices: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!loadedSet.has(i)) remainingIndices.push(i);
      }
      let rIndex = 0;
      const remainingWorker = async () => {
        while (rIndex < remainingIndices.length && !isCancelled) {
          const idx = remainingIndices[rIndex++];
          await fetchFrame(idx);
        }
      };
      await Promise.all(Array.from({ length: 3 }, () => remainingWorker()));
    };

    loadInitialSequence();

    return () => {
      isCancelled = true;
    };
  }, [isDesktop, drawFrame]);

  // Handle Window Resize
  useEffect(() => {
    if (!isDesktop) return;
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop, drawFrame]);

  // Silky smooth, highly responsive physics interpolation loop (0ms input latency)
  useEffect(() => {
    if (!isDesktop) return;
    let animId: number;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        // High responsive lerp (0.45) for instant reaction to mouse wheel / trackpad
        currentFrameRef.current += diff * 0.45;
        if (Math.abs(currentFrameRef.current - lastDrawnFrameRef.current) > 0.01) {
          lastDrawnFrameRef.current = currentFrameRef.current;
          drawFrame(currentFrameRef.current);
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isDesktop, drawFrame]);

  // Track scroll progress (0.0 to 1.0) for synchronized animations
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lastReportedProgressRef = useRef<number>(0);

  // Scroll synchronization
  useEffect(() => {
    if (!isDesktop) return;
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));

        // Accurate video scrub: plays in full (frame 0 to 235) across 0% to 60% scroll
        const rawVideoProgress = progress / 0.60;
        const videoProgress = Math.min(1, Math.max(0, rawVideoProgress));
        targetFrameRef.current = videoProgress * (TOTAL_FRAMES - 1);

        // Throttle React state re-renders to 1% intervals to eliminate all CPU lag & frame drops
        if (Math.abs(progress - lastReportedProgressRef.current) >= 0.008 || progress === 0 || progress === 1) {
          lastReportedProgressRef.current = progress;
          setScrollProgress(progress);
        }
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

      // Accurate video scrub: plays in full (frame 0 to 235) across 0% to 60% scroll
      const rawVideoProgress = progress / 0.60;
      const videoProgress = Math.min(1, Math.max(0, rawVideoProgress));
      targetFrameRef.current = videoProgress * (TOTAL_FRAMES - 1);

      // Throttle React state re-renders to 1% intervals to eliminate all CPU lag & frame drops
      if (Math.abs(progress - lastReportedProgressRef.current) >= 0.008 || progress === 0 || progress === 1) {
        lastReportedProgressRef.current = progress;
        setScrollProgress(progress);
      }
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

  // Admission enquiry form + notice board appear early on scroll (starts at 4% scroll, fully in by 12%)
  const getHeroOverlayVisibility = () => {
    const p = scrollProgress;
    const FORM_START = 0.04; // Appears early at 4% scroll
    const FORM_FULL = 0.12;  // Smoothly reaches full opacity by 12% scroll

    if (p < FORM_START) {
      return {
        opacity: 0,
        transform: 'translateY(24px) scale(0.98)',
        pointerEvents: 'none' as const,
        display: 'none' as const,
      };
    }

    const t = Math.min(1, Math.max(0, (p - FORM_START) / (FORM_FULL - FORM_START)));
    const opacity = t;
    const translateY = (1 - t) * 20;
    const scale = 0.98 + t * 0.02;

    return {
      opacity,
      transform: `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
      display: 'block' as const,
      transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
          src="/heronew/frames_webp/frame-001.webp"
          alt="Chinmaya Vidyalaya Campus"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Liquid-Smooth Canvas Scrollytelling Film */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
        />

        {/* ----------------------------------------------------
            ADMISSION FORM + WHAT'S NEW NOTICE BOARD (DESKTOP HERO OVERLAY)
            Appears early on scroll and remains visible through the section
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

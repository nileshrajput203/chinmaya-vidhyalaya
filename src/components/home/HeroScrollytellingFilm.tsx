import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Phone, ArrowRight, AlertCircle, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formService } from '../../services/formService';
import { useToast } from '../../context/ToastContext';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollytellingFilmProps {
  onOpenAdmissions: () => void;
}

// All 236 frames from ezgif-frame-001.jpg to ezgif-frame-236.jpg in /heronew/herovideo/
const START_FRAME = 1;
const END_FRAME = 236;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 236 frames

// One smooth natural scroll stroke executes all 236 frames (approx 850px total scroll distance)
const SCROLL_PX_PER_FRAME = 3.6;
const TOTAL_SCROLLABLE_PX = Math.round((TOTAL_FRAMES - 1) * SCROLL_PX_PER_FRAME);

// Helper to construct zero-padded frame URLs in heronew/herovideo
const getFrameSrc = (index: number): string => {
  const frameNum = Math.min(Math.max(START_FRAME, START_FRAME + index), END_FRAME);
  return `/heronew/herovideo/ezgif-frame-${String(frameNum).padStart(3, '0')}.jpg`;
};

const HERO_NOTICES = [
  {
    tag: 'Admissions 2026–27',
    tagColor: 'bg-orange-50 text-[#DF711B] border-orange-200/90',
    borderColor: 'border-l-[#DF711B]',
    subTag: 'Nursery to XII',
    subTagColor: 'text-slate-500 font-mono',
    title: 'Admissions Open: Nursery to Std XII (Arts, Commerce, Science)',
    titleColor: 'group-hover/card:text-[#DF711B]',
    description: 'Pre-Primary, Primary, and Senior Secondary admissions open across all three streams. Complete prospectus and guidance available.',
    linkText: 'Admission Guidelines',
    linkTextColor: 'text-[#DF711B]',
    to: '/admissions/guidelines',
  },
  {
    tag: 'CBSE Distinction',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
    borderColor: 'border-l-emerald-500',
    subTag: '100% AISSE',
    subTagColor: 'text-slate-500 font-mono',
    title: '100% First Class CBSE Class X Board Results',
    titleColor: 'group-hover/card:text-emerald-700',
    description: 'Unbroken tradition of academic excellence with multiple students securing top merits in the CBSE Board examinations.',
    linkText: 'Read Results Archive',
    linkTextColor: 'text-emerald-700',
    to: '/news',
  },
  {
    tag: 'Ecology & CVP',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200/90',
    borderColor: 'border-l-amber-500',
    subTag: 'Jal Pakhwada',
    subTagColor: 'text-slate-500 font-mono',
    title: 'Jal Pakhwada Water Conservation Campaign',
    titleColor: 'group-hover/card:text-amber-800',
    description: 'Student-led community seminars, tree plantation drives, and creative painting exhibitions promoting rainwater harvesting.',
    linkText: 'View Event Highlights',
    linkTextColor: 'text-amber-800',
    to: '/news',
  },
  {
    tag: 'Campus Office',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200/90',
    borderColor: 'border-l-sky-500',
    subTag: 'Parent Visits',
    subTagColor: 'text-slate-500 font-mono',
    title: 'Parent Meeting & Campus Visit Guidelines',
    titleColor: 'group-hover/card:text-sky-700',
    description: 'Campus visits are welcomed for prospective families. Existing parents are requested to contact the administrative office.',
    linkText: 'Campus Timings & Office',
    linkTextColor: 'text-sky-700',
    to: '/contact',
  },
];

export const HeroScrollytellingFilm: React.FC<HeroScrollytellingFilmProps> = ({ onOpenAdmissions }) => {
  const { showSuccess } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Desktop guard: only active on screens >= 1024px to ensure mobile never loads or plays sequential frames
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

  // Component scroll progress state (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Draw frame with sub-frame continuous blending for liquid-smooth 60/120fps motion
  const drawFrame = useCallback((floatFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const isMobile = window.innerWidth < 768;
    // Scale canvas buffer: cap at 1.0 on mobile to prevent GPU lag, max 1.5 on desktop
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
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

    // High quality bicubic filtering on desktop, fast on mobile
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high';

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

    // 2. Sub-frame blend with next frame only on desktop (avoids mobile stutter)
    if (!isMobile && blendAlpha > 0.03 && nextIdx !== baseIdx) {
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

  // Aggressive multi-threaded progressive preloader ensuring zero missed frames
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
          if (index === 0 || Math.abs(index - currentFrameRef.current) < 1.2) {
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
          if (index === 0 || Math.abs(index - currentFrameRef.current) < 1.2) {
            drawFrame(currentFrameRef.current);
          }
          resolve();
        }
      });
    };

    // Adaptive preloader: detects connection speed and mobile constraints
    const navConn = (navigator as any)?.connection;
    const isSlowConnection = navConn?.saveData || navConn?.effectiveType === '2g' || navConn?.effectiveType === '3g';
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

    const loadInitialSequence = async () => {
      // Step 1: Preload immediate start frames
      const initialBatch = isSlowConnection || isMobileDevice ? 12 : 25;
      const initialPromises: Promise<void>[] = [];
      for (let i = 0; i < Math.min(initialBatch, TOTAL_FRAMES); i++) {
        initialPromises.push(fetchFrame(i));
      }
      await Promise.all(initialPromises);
      if (isCancelled) return;
      drawFrame(0);

      // Step 2: On mobile or constrained networks, prioritize keyframes with stride 3
      // This immediately gives full scrubbing coverage across the entire 850px scroll with zero lag
      if (isSlowConnection || isMobileDevice) {
        const keyframeIndices: number[] = [];
        for (let i = initialBatch; i < TOTAL_FRAMES; i += 3) {
          keyframeIndices.push(i);
        }
        
        // Load keyframes first with gentle concurrency (3 concurrent)
        const KEYFRAME_CONCURRENCY = 3;
        let kIndex = 0;
        const keyframeWorker = async () => {
          while (kIndex < keyframeIndices.length && !isCancelled) {
            const idx = keyframeIndices[kIndex++];
            await fetchFrame(idx);
          }
        };
        await Promise.all(Array.from({ length: KEYFRAME_CONCURRENCY }, () => keyframeWorker()));
        if (isCancelled) return;

        // Step 3: Backfill all remaining in-between frames in background idle time
        const backfillIndices: number[] = [];
        for (let i = initialBatch; i < TOTAL_FRAMES; i++) {
          if (!loadedSet.has(i)) backfillIndices.push(i);
        }
        let bIndex = 0;
        const backfillWorker = async () => {
          while (bIndex < backfillIndices.length && !isCancelled) {
            const idx = backfillIndices[bIndex++];
            await fetchFrame(idx);
          }
        };
        await Promise.all(Array.from({ length: 2 }, () => backfillWorker()));
      } else {
        // Desktop / Fast connection: standard fast batch pool (batches of 6)
        const remainingIndices: number[] = [];
        for (let i = initialBatch; i < TOTAL_FRAMES; i++) {
          remainingIndices.push(i);
        }

        const CONCURRENCY = 6;
        let currentIndex = 0;

        const worker = async () => {
          while (currentIndex < remainingIndices.length && !isCancelled) {
            const idx = remainingIndices[currentIndex++];
            await fetchFrame(idx);
          }
        };

        const workers = Array.from({ length: CONCURRENCY }, () => worker());
        await Promise.all(workers);
      }
    };

    loadInitialSequence();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Silky smooth physics interpolation loop
  useEffect(() => {
    if (!isDesktop) return;
    let animId: number;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.22;
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
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
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
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      st.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // The form appears as the scroll begins (~22%) and REMAINS VISIBLE until the end of the scroll
  const getHeroOverlayVisibility = () => {
    const p = scrollProgress;
    const start = 0.18;
    const fullIn = 0.32;

    if (p < start) {
      return { 
        opacity: 0, 
        transform: 'translateY(20px)', 
        pointerEvents: 'none' as const,
        display: 'none' as const,
      };
    }

    const t = Math.min(1, Math.max(0, (p - start) / (fullIn - start)));
    const opacity = t;
    const translateY = (1 - t) * 16;

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
          STICKY FULL-SCREEN CINEMATIC CANVAS VIEWPORT
          Unpins at the exact moment all frames are completed
         ---------------------------------------------------- */}
      <div 
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#071320]"
      >
        {/* Instant Poster Image */}
        <img
          src={getFrameSrc(0)}
          alt="Chinmaya Vidyalaya Campus"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[1] will-change-transform block"
        />

        {/* ----------------------------------------------------
            ADMISSION FORM + WHAT'S NEW NOTICE BOARD (DESKTOP HERO OVERLAY)
            Stays visible till the end in one smooth scroll
           ---------------------------------------------------- */}
        <div className="flex absolute inset-0 z-20 pointer-events-none items-center justify-center overflow-y-auto px-4 py-6">
          <div className="w-full max-w-5xl mx-auto box-border" style={getHeroOverlayVisibility()}>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Admission Enquiry Form (7 cols on lg) */}
              <div className="lg:col-span-7 bg-white/95 backdrop-blur-md text-[#181C20] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-[#DF711B]/25 pointer-events-auto rounded-3xl relative overflow-hidden flex flex-col">
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
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#D5CEC2] text-[#181C20] rounded-xl focus:border-[#DF711B] focus:ring-2 focus:ring-[#DF711B]/20 focus:outline-none transition-all cursor-pointer font-sans shadow-sm"
                      >
                        <option value="Nursery">Nursery</option>
                        <option value="Junior KG">Junior KG</option>
                        <option value="Senior KG">Senior KG</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                        <option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11 Arts">Class 11 (Arts Stream)</option>
                        <option value="Class 11 Commerce">Class 11 (Commerce Stream)</option>
                        <option value="Class 11 Science">Class 11 (Science Stream)</option>
                        <option value="Class 12 Arts">Class 12 (Arts Stream)</option>
                        <option value="Class 12 Commerce">Class 12 (Commerce Stream)</option>
                        <option value="Class 12 Science">Class 12 (Science Stream)</option>
                      </select>
                    </div>

                    {/* Action Group */}
                    <div className="pt-1.5 space-y-2.5">
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

              {/* Right Column: What's New / Latest Updates Notice Board (5 cols on lg) — White Box Feel with Outlines */}
              <div 
                data-lenis-prevent="true"
                className="lg:col-span-5 bg-white/95 backdrop-blur-md text-[#181C20] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200 pointer-events-auto rounded-3xl relative overflow-hidden flex flex-col justify-between space-y-4"
              >
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#DF711B] via-[#FFB740] to-[#DF711B]" />
                
                {/* Header */}
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#DF711B] font-bold">
                        WHAT'S NEW
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-semibold">
                      Live Updates
                    </span>
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-black text-[#0B1D30] tracking-wide mt-2">
                    Latest Dispatches & Notices
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Official announcements, board distinctions, and campus dispatches
                  </p>
                </div>

                {/* Notices Feed Container — Continuous auto swimming up ticker with pause-on-hover */}
                <div 
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  className="relative h-64 sm:h-[19rem] overflow-hidden group select-none"
                >
                  {/* Subtle top & bottom fade gradient masks for smooth edge transitions */}
                  <div className="pointer-events-none absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

                  {/* Infinite Continuous Upward Track (Auto Swimming Up) */}
                  <div className="animate-ticker-up space-y-2.5">
                    {[...HERO_NOTICES, ...HERO_NOTICES].map((notice, idx) => (
                      <Link 
                        key={idx}
                        to={notice.to} 
                        className={`block p-3.5 rounded-2xl bg-white hover:bg-slate-50/90 border border-slate-200 shadow-2xs hover:shadow-md ${notice.borderColor} transition-all duration-200 group/card border-l-4`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full border ${notice.tagColor}`}>
                            {notice.tag}
                          </span>
                          <span className={`text-[10px] font-mono font-medium ${notice.subTagColor}`}>{notice.subTag}</span>
                        </div>
                        <h5 className={`font-cinzel text-xs sm:text-[13px] font-bold text-[#0B1D30] ${notice.titleColor} transition-colors leading-snug`}>
                          {notice.title}
                        </h5>
                        <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed font-sans font-normal">
                          {notice.description}
                        </p>
                        <div className={`mt-2 flex items-center gap-1 text-[10px] font-mono font-bold ${notice.linkTextColor} group-hover/card:translate-x-1 transition-transform`}>
                          <span>{notice.linkText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <Link
                    to="/admissions/calendar"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 hover:text-[#DF711B] transition-colors group"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#DF711B] group-hover:scale-110 transition-transform" />
                    <span>Academic Calendar ›</span>
                  </Link>

                  <Link
                    to="/news"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DF711B] hover:bg-[#C45B0E] text-white rounded-xl text-xs font-bold font-sans uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 group"
                  >
                    <span>Full Bulletin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
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

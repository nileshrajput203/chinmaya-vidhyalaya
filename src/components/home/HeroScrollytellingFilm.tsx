import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Phone, ArrowRight, AlertCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formService } from '../../services/formService';

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

export const HeroScrollytellingFilm: React.FC<HeroScrollytellingFilmProps> = ({ onOpenAdmissions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Scale canvas buffer to physical device pixels for high-DPI crispness without pixelation
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // High quality bicubic filtering for ultra HD sharpness
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

    // 2. Sub-frame blend with next frame if loaded (eliminates stepping, delivers liquid flow)
    if (blendAlpha > 0.02 && nextIdx !== baseIdx) {
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

    // Priority 1: Load initial 25 frames immediately so start is instantly responsive
    const loadInitialSequence = async () => {
      const initialPromises: Promise<void>[] = [];
      for (let i = 0; i < Math.min(25, TOTAL_FRAMES); i++) {
        initialPromises.push(fetchFrame(i));
      }
      await Promise.all(initialPromises);
      if (isCancelled) return;
      drawFrame(0);

      // Priority 2: Concurrent worker pool for all remaining frames (batches of 8)
      const remainingIndices: number[] = [];
      for (let i = 25; i < TOTAL_FRAMES; i++) {
        remainingIndices.push(i);
      }

      const CONCURRENCY = 8;
      let currentIndex = 0;

      const worker = async () => {
        while (currentIndex < remainingIndices.length && !isCancelled) {
          const idx = remainingIndices[currentIndex++];
          await fetchFrame(idx);
        }
      };

      const workers = Array.from({ length: CONCURRENCY }, () => worker());
      await Promise.all(workers);
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
  }, [drawFrame]);

  // Pin stickyRef to viewport using GSAP ScrollTrigger
  useEffect(() => {
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
            ADMISSION FORM + WHAT'S NEW NOTICE BOARD (2-COLUMN HERO OVERLAY)
            Stays visible till the end in one smooth scroll
           ---------------------------------------------------- */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-y-auto px-4 py-6">
          <div className="w-full max-w-5xl mx-auto box-border" style={getHeroOverlayVisibility()}>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Admission Enquiry Form (7 cols on lg) */}
              <div className="lg:col-span-7 bg-white text-[#181818] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-[#E7E2D8] pointer-events-auto rounded-2xl flex flex-col justify-between">
                
                {/* Header */}
                <div className="border-b border-[#E7E2D8] pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/Chinmaya_Logo.webp"
                      alt="Chinmaya Vidyalaya Logo"
                      className="w-10 h-12 sm:w-11 sm:h-13 object-contain shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#DF711B] font-bold">
                          ADMISSIONS 2026–27
                        </span>
                        <span className="text-[9px] font-mono text-[#555] font-semibold bg-[#F5F2EB] px-1.5 py-0.5 rounded shrink-0">
                          CBSE #1130058
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-black text-[#181818] uppercase tracking-tight m-0 leading-tight">
                        Chinmaya Vidyalaya
                      </h3>
                      <p className="text-[11px] text-[#666] leading-tight m-0 mt-0.5">
                        Vidyanagar, Boisar • Admission Enquiry
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                {isSubmitted ? (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-base text-[#181818] uppercase m-0">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-xs text-[#555] leading-relaxed max-w-sm mx-auto">
                      Thank you! Your admission enquiry has been recorded. Our admissions coordinator will reach out to you on your registered phone number shortly.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        type="button"
                        onClick={onOpenAdmissions}
                        className="px-4 py-2.5 bg-[#DF711B] hover:bg-[#c86113] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        View Admission Documents
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ studentName: '', parentName: '', phone: '', grade: 'Class 1' });
                        }}
                        className="px-4 py-2.5 bg-[#F5F2EB] hover:bg-[#EBE5D8] text-[#181818] font-sans font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {submitError && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-[#444] uppercase tracking-wider mb-1">
                        Student's Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="Enter student's full name"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] placeholder-[#999] rounded-lg focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-[#444] uppercase tracking-wider mb-1">
                          Parent / Guardian Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="Enter parent's full name"
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] placeholder-[#999] rounded-lg focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-[#444] uppercase tracking-wider mb-1">
                          Phone Number (10 Digits) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter 10-digit mobile number"
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] placeholder-[#999] rounded-lg focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-[#444] uppercase tracking-wider mb-1">
                        Grade Applying For (Nursery to 12th) *
                      </label>
                      <select
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] rounded-lg focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-[#DF711B] hover:bg-[#c86113] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                        <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}</span>
                      </button>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between text-[11px] text-[#666]">
                      <span className="flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-[#DF711B]" />
                        9322054713 / 9823517700
                      </span>
                      <button
                        type="button"
                        onClick={onOpenAdmissions}
                        className="text-[#DF711B] hover:underline font-semibold cursor-pointer"
                      >
                        Download Forms ›
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: What's New / Latest Updates Notice Board (5 cols on lg) */}
              <div className="lg:col-span-5 bg-[#0C1E34]/95 backdrop-blur-md text-white p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/15 pointer-events-auto rounded-2xl flex flex-col justify-between space-y-4">
                
                {/* Header */}
                <div className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB740] font-bold">
                        WHAT'S NEW
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Live Updates</span>
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-white mt-1">
                    Latest Dispatches & Notices
                  </h4>
                </div>

                {/* Notice Ticker Items Container with Upward Motion */}
                <div className="relative h-64 sm:h-72 overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 p-1 group">
                  <div className="animate-ticker-up space-y-3 group-hover:[animation-play-state:paused] cursor-pointer">
                    
                    {/* Item 1 */}
                    <Link to="/about/cvp" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#DF711B]/20 text-[#FFB740] border border-[#DF711B]/30">
                          Admissions 2026-27
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Nursery to XII</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        Admissions Open: Nursery to Std XII (Arts, Commerce, Science)
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Pre-Primary, Primary, and Senior Secondary admissions open across all three streams. Click to learn more.
                      </p>
                    </Link>

                    {/* Item 2 */}
                    <Link to="/news" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          CBSE Distinction
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">100% AISSE</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        100% First Class CBSE Class X Board Results
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Unbroken tradition of academic excellence with multiple students securing spots in the CBSE Board merit list.
                      </p>
                    </Link>

                    {/* Item 3 */}
                    <Link to="/news" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Ecology
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Jal Pakhwada</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        Jal Pakhwada Water Conservation Campaign
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Student-led community seminars and painting competitions promoting rainwater harvesting and water recycling.
                      </p>
                    </Link>

                    {/* Item 4 */}
                    <Link to="/contact" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          Notice
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Parent Visits</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        Parent Meeting & Campus Visit Guidelines
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Campus visits are available for new prospective parents. Existing students' parents must submit a written letter to the school office.
                      </p>
                    </Link>

                    {/* DUPLICATE SET FOR SEAMLESS CONTINUOUS INFINITE SCROLL */}
                    <Link to="/about/cvp" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#DF711B]/20 text-[#FFB740] border border-[#DF711B]/30">
                          Admissions 2026-27
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Nursery to XII</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        Admissions Open: Nursery to Std XII (Arts, Commerce, Science)
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Pre-Primary, Primary, and Senior Secondary admissions open across all three streams. Click to learn more.
                      </p>
                    </Link>

                    <Link to="/news" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          CBSE Distinction
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">100% AISSE</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        100% First Class CBSE Class X Board Results
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Unbroken tradition of academic excellence with multiple students securing spots in the CBSE Board merit list.
                      </p>
                    </Link>

                    <Link to="/news" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Ecology
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Jal Pakhwada</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        Jal Pakhwada Water Conservation Campaign
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Student-led community seminars and painting competitions promoting rainwater harvesting and water recycling.
                      </p>
                    </Link>

                    <Link to="/contact" className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#DF711B] hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          Notice
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Parent Visits</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 leading-snug">
                        Parent Meeting & Campus Visit Guidelines
                      </h5>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Campus visits are available for new prospective parents. Existing students' parents must submit a written letter to the school office.
                      </p>
                    </Link>

                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href="/images/academic-calendar.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#FFB740] hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Academic Calendar ›</span>
                  </a>

                  <Link
                    to="/news"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11px] font-mono font-semibold transition-colors"
                  >
                    <span>Full Bulletin</span>
                    <ArrowRight className="w-3 h-3 text-[#FFB740]" />
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

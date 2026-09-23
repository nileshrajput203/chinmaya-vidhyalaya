import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Phone } from 'lucide-react';
import { formService } from '../../services/formService';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollytellingFilmProps {
  onOpenAdmissions: () => void;
}

// All 236 frames from ezgif-frame-001.jpg to ezgif-frame-236.jpg in /heronew/herovideo/
const START_FRAME = 1;
const END_FRAME = 236;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 236 frames

// Scroll budget: calibrated for cinema-grade, fluid scrubbing across desktop and mobile
const SCROLL_PX_PER_FRAME = 14;
const TOTAL_SCROLLABLE_PX = (TOTAL_FRAMES - 1) * SCROLL_PX_PER_FRAME;

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

  // Draw a frame onto the canvas with exact pixel fidelity, high-quality bicubic smoothing, zero distortion
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or closest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIdx; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
      if (!img) {
        for (let i = frameIdx + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    // Scale canvas buffer to physical device pixels for high-DPI crispness without aliasing
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

    // Calculate cover dimensions preserving aspect ratio, centered on the scene
    const imgAspect = img.naturalWidth / img.naturalHeight;
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

    // High quality bicubic filtering, zero artificial filters - render exact image
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.filter = 'none';
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Progressive preload: initial frame immediately, keyframes, then background batching
  useEffect(() => {
    let isCancelled = false;

    const loadFrame = (index: number) => {
      if (isCancelled || imagesRef.current[index]) return;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[index] = img;
        if (index === 0 || index === Math.round(currentFrameRef.current)) {
          drawFrame(index);
        }
      };
      img.onerror = () => {
        console.warn(`[HeroFilm] Frame failed to load: ${getFrameSrc(index)}`);
      };
      img.src = getFrameSrc(index);

      // In case image was already cached by browser
      if (img.complete && img.naturalWidth > 0) {
        imagesRef.current[index] = img;
        if (index === 0 || index === Math.round(currentFrameRef.current)) {
          drawFrame(index);
        }
      }
    };

    // 1. First frame rendered right away
    const firstImg = new Image();
    firstImg.decoding = 'async';
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };
    firstImg.onerror = () => {
      console.warn(`[HeroFilm] First frame failed to load: ${getFrameSrc(0)}`);
    };
    firstImg.src = getFrameSrc(0);

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    }

    // 2. Load milestone keyframes for immediate scrub coverage.
    // Loading every frame in one burst caused network contention and visible jank.
    const KEYFRAME_INTERVAL = 12;
    for (let i = KEYFRAME_INTERVAL; i < TOTAL_FRAMES; i += KEYFRAME_INTERVAL) {
      loadFrame(i);
    }

    // 3. Incrementally load intermediate frames in small idle batches.
    let nextFrame = 1;
    const loadRemaining = () => {
      if (isCancelled) return;
      const batchEnd = Math.min(TOTAL_FRAMES, nextFrame + 8);
      while (nextFrame < batchEnd) {
        if (nextFrame % KEYFRAME_INTERVAL !== 0) loadFrame(nextFrame);
        nextFrame += 1;
      }
      if (nextFrame < TOTAL_FRAMES) {
        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: (deadline: IdleDeadline) => void) => number })
            .requestIdleCallback(loadRemaining);
        } else {
          globalThis.setTimeout(() => loadRemaining(), 80);
        }
      }
    };

    const timer = window.setTimeout(() => loadRemaining(), 250);

    return () => {
      isCancelled = true;
      window.clearTimeout(timer);
    };
  }, [drawFrame]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Animation render loop (smooth cinema-grade scrubbing without micro-stutters or dropped frames)
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.35;
        const rounded = Math.min(Math.max(0, Math.round(currentFrameRef.current)), TOTAL_FRAMES - 1);
          if (rounded !== lastDrawnFrameRef.current) {
            lastDrawnFrameRef.current = rounded;
            drawFrame(rounded);
          }
      } else if (Math.round(currentFrameRef.current) !== Math.round(targetFrameRef.current)) {
        currentFrameRef.current = targetFrameRef.current;
        const rounded = Math.min(Math.max(0, Math.round(currentFrameRef.current)), TOTAL_FRAMES - 1);
          if (rounded !== lastDrawnFrameRef.current) {
            lastDrawnFrameRef.current = rounded;
            drawFrame(rounded);
          }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // Pin stickyRef to viewport using GSAP ScrollTrigger to ensure screen stays fixed during scroll
  useEffect(() => {
    const container = containerRef.current;
    const stickyEl = stickyRef.current;
    if (!container || !stickyEl) return;

    // Use GSAP ScrollTrigger to physically lock the viewport in place with position: fixed
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

    // Refresh ScrollTrigger to calculate initial positions with header height
    ScrollTrigger.refresh();

    // Fallback scroll listener for direct DOM sync
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
    setIsSubmitting(true);
    setSubmitError(null);

    const res = await formService.submitAdmission({
      studentName: formData.studentName,
      parentName: formData.parentName,
      gradeApplyingFor: formData.grade,
      phone: formData.phone,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
    } else {
      setSubmitError(res.error || res.message || 'Failed to submit admission enquiry.');
    }
  };

  // Helper to compute admission form opacity and vertical offset at 57% scroll
  const getAdmissionFormVisibility = () => {
    const p = scrollProgress;
    // Visible at 57% scroll (active range 0.42 to 0.72, peak 0.52 to 0.62)
    const start = 0.42;
    const peakIn = 0.52;
    const peakOut = 0.62;
    const end = 0.72;

    if (p < start || p > end) {
      return { 
        opacity: 0, 
        transform: 'translateY(24px)', 
        pointerEvents: 'none' as const,
        display: 'none' as const,
      };
    }

    let opacity = 1;
    let translateY = 0;

    if (p < peakIn) {
      const t = (p - start) / (peakIn - start);
      opacity = t;
      translateY = (1 - t) * 20;
    } else if (p > peakOut) {
      const t = (p - peakOut) / (end - peakOut);
      opacity = 1 - t;
      translateY = -t * 20;
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY.toFixed(1)}px)`,
      pointerEvents: opacity > 0.3 ? ('auto' as const) : ('none' as const),
      display: opacity <= 0.001 ? ('none' as const) : ('block' as const),
      transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  return (
    <div 
      ref={containerRef}
      id="campus-film-narrative"
      className="relative w-full bg-[#050C14] text-white"
        style={{ height: `calc(100vh + ${TOTAL_SCROLLABLE_PX}px)` }} // Height calculated directly from frame count
    >
      {/* ----------------------------------------------------
          STICKY FULL-SCREEN CINEMATIC CANVAS VIEWPORT
          Unpins at the exact moment all frames are completed
         ---------------------------------------------------- */}
      <div 
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#071320]"
      >
        {/* Instant Poster Image: Ensures zero blank screen while frames initialize */}
        <img
          src={getFrameSrc(0)}
          alt="Chinmaya Vidyalaya Campus"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Render Canvas (Exact 1:1 image fidelity with bicubic smoothing, zero artificial filters) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[1] will-change-transform block"
        />

        {/* ----------------------------------------------------
            ADMISSION ENQUIRY FORM AT 65% SCROLL
            Clean white form in container over cinematic background
           ---------------------------------------------------- */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center box-border">

            <div 
              style={getAdmissionFormVisibility()}
              className="w-full max-w-md max-h-[85vh] sm:max-h-none overflow-y-auto bg-white text-[#181818] p-4 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#E7E2D8] pointer-events-auto rounded-lg sm:rounded-none"
            >
              {/* Card Header with Chinmaya Logo */}
              <div className="border-b border-[#E7E2D8] pb-3 mb-3.5">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/Chinmaya_Logo.webp"
                    alt="Chinmaya Vidyalaya Logo"
                    className="w-10 h-12 sm:w-11 sm:h-14 object-contain shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#DF711B] font-bold">
                        ADMISSIONS 2026–27
                      </span>
                      <span className="text-[9px] font-mono text-[#777777] font-semibold bg-[#F5F2EB] px-1.5 py-0.5 shrink-0">
                        CBSE #1130058
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-black text-[#181818] uppercase tracking-tight m-0 leading-tight">
                      Chinmaya Vidyalaya
                    </h3>
                    <p className="text-[11px] text-[#666666] leading-tight m-0 mt-0.5">
                      Tarapur Boisar • Admission Enquiry
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              {isSubmitted ? (
                <div className="py-4 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-base text-[#181818] uppercase m-0">
                    Enquiry Received
                  </h4>
                  <p className="text-xs text-[#555555] leading-relaxed m-0">
                    Thank you! Our admissions coordinator will reach out via phone/email shortly.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={onOpenAdmissions}
                      className="w-full py-2.5 bg-[#DF711B] hover:bg-[#c86113] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      View Admission Documents
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#666666] hover:text-[#181818] underline font-mono cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {submitError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                      {submitError}
                    </div>
                  )}
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#444444] uppercase tracking-wider mb-1">
                      Student's Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] placeholder-[#999999] focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-[#444444] uppercase tracking-wider mb-1">
                        Parent / Guardian *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] placeholder-[#999999] focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-[#444444] uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9823517700"
                        className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] placeholder-[#999999] focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#444444] uppercase tracking-wider mb-1">
                      Grade Applying For *
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5CEC2] text-[#181818] focus:border-[#DF711B] focus:bg-white focus:outline-none transition-colors"
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
                      <option value="Class 11 Science">Class 11 (Science)</option>
                      <option value="Class 11 Commerce">Class 11 (Commerce)</option>
                      <option value="Class 12 Science">Class 12 (Science)</option>
                      <option value="Class 12 Commerce">Class 12 (Commerce)</option>
                    </select>
                  </div>

                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#DF711B] hover:bg-[#c86113] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                      <span>{isSubmitting ? 'SUBMITTING ENQUIRY...' : 'SUBMIT ADMISSION ENQUIRY'}</span>
                    </button>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-[#666666]">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-[#DF711B]" />
                      9322054713 / 9823517700
                    </span>
                    <button
                      type="button"
                      onClick={onOpenAdmissions}
                      className="text-[#DF711B] hover:underline font-semibold cursor-pointer"
                    >
                      Full Details ›
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

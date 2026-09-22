import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollytellingFilmProps {
  onOpenAdmissions: () => void;
}

// Exactly 30 frames matching /hero-video/frame001.jpg through frame030.jpg
const TOTAL_FRAMES = 30;

// Scroll budget: exactly 75px of scroll per frame (29 * 75 = 2175px of scroll)
// Wrapper height is calculated directly from the frame count, leaving ZERO extra space
const SCROLL_PX_PER_FRAME = 75;
const TOTAL_SCROLLABLE_PX = (TOTAL_FRAMES - 1) * SCROLL_PX_PER_FRAME; // 2175px

// Helper to construct zero-padded frame URLs
const getFrameSrc = (index: number): string => {
  const frameNum = Math.min(Math.max(1, index + 1), TOTAL_FRAMES);
  return `/hero-video/frame${String(frameNum).padStart(3, '0')}.jpg`;
};

export const HeroScrollytellingFilm: React.FC<HeroScrollytellingFilmProps> = ({ onOpenAdmissions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached frame images
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Component scroll progress state (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Draw a frame onto the canvas with cover sizing, perfectly centered
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or closest loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIdx; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]?.naturalWidth! > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
      if (!img) {
        for (let i = frameIdx + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]?.naturalWidth! > 0) {
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.filter = 'contrast(1.08) brightness(1.03) saturate(1.20)';

    // Calculate cover dimensions preserving aspect ratio, centered on the gate/silhouette
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = width / imgAspect;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgAspect;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Preload all 30 frames immediately for instantaneous scrubbing without 404s
  useEffect(() => {
    let isCancelled = false;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        if (i === 0) {
          drawFrame(0);
        }
      };
      img.onerror = () => {
        console.warn(`[HeroScrollytellingFilm] Failed to load frame ${i + 1} at ${img.src}`);
      };
    }

    return () => {
      isCancelled = true;
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

  // Animation render loop (smooth frame easing without lag or skips)
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.4;
        const rounded = Math.min(Math.max(0, Math.round(currentFrameRef.current)), TOTAL_FRAMES - 1);
        drawFrame(rounded);
      } else if (Math.round(currentFrameRef.current) !== Math.round(targetFrameRef.current)) {
        currentFrameRef.current = targetFrameRef.current;
        const rounded = Math.round(currentFrameRef.current);
        drawFrame(rounded);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    rafIdRef.current = animId;

    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // Pin stickyRef to viewport using GSAP ScrollTrigger to ensure screen stays fixed during scroll
  // Exactly mapped: 0% scroll -> frame 1, 100% scroll -> frame 30, then unpins immediately
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

        const target = progress * (TOTAL_FRAMES - 1);
        targetFrameRef.current = target;

        // Immediate draw for crisp responsiveness on every scroll tick
        const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(target)));
        drawFrame(targetIndex);
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

      const target = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(target)));
      drawFrame(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      st.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [drawFrame]);

  // Admission enquiry form state
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    grade: 'Class 1',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const schoolEmail = "cvtarapur@chinmayamission.com";
    const subject = encodeURIComponent(`[Admission Enquiry 2026-27] ${formData.grade} - ${formData.studentName}`);
    const body = encodeURIComponent(
      `New Admission Inquiry via Campus Film:\n` +
      `--------------------------------------\n` +
      `Student Name: ${formData.studentName}\n` +
      `Parent/Guardian: ${formData.parentName}\n` +
      `Grade Applying For: ${formData.grade}\n` +
      `Phone Number: ${formData.phone}\n` +
      `--------------------------------------\n` +
      `Submitted via Chinmaya Vidyalaya Tarapur Hero Film`
    );
    const mailtoLink = `mailto:${schoolEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    try {
      window.location.href = mailtoLink;
    } catch {
      console.log('Redirecting to mail client');
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
          Unpins at the exact moment frame 30 is reached
         ---------------------------------------------------- */}
      <div 
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#071320]"
      >
        {/* Render Canvas (Full-width, full-height, enhanced contrast and saturation) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
          style={{ filter: 'contrast(1.06) saturate(1.15) brightness(1.02)' }}
        />

        {/* ----------------------------------------------------
            ADMISSION ENQUIRY FORM AT 65% SCROLL
            Clean white form in container over cinematic background
           ---------------------------------------------------- */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center box-border">

            <div 
              style={getAdmissionFormVisibility()}
              className="w-full max-w-md bg-white text-[#181818] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#E7E2D8] pointer-events-auto"
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
                      className="w-full py-3 bg-[#DF711B] hover:bg-[#c86113] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT ADMISSION ENQUIRY</span>
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

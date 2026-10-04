import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface VideoClip {
  src: string;
  poster: string;
  title: string;
}

const DEFAULT_CLIPS: VideoClip[] = [
  {
    src: '/videos/school-hero.mp4',
    poster: '/images/banner-1.webp',
    title: 'Academic Excellence & Campus Life'
  },
  {
    src: '/videos/school-hero.mp4',
    poster: '/images/banner-8.webp',
    title: 'Sports, Culture & Annual Athletic Meet'
  },
  {
    src: '/videos/school-hero.mp4',
    poster: '/images/banner-9.webp',
    title: 'Chinmaya Vision Programme & Holistic Growth'
  }
];

export const ScrollExpandingMosaic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for the sticky expansion track (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth transforms driven by scroll progress
  // 0 = Initial mosaic, 1 = Expanded full-width center stage
  const headlineY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);

  // Center tile scale & width: grows from default column width (~38%) to ~93%
  const centerScale = useTransform(scrollYProgress, [0.05, 0.85], [1, 1.35]);
  const centerMaxWidth = useTransform(scrollYProgress, [0.05, 0.85], ['38%', '93%']);
  
  // Side tiles slide outward and fade
  const leftColX = useTransform(scrollYProgress, [0.05, 0.7], [0, -120]);
  const leftColOpacity = useTransform(scrollYProgress, [0.05, 0.6], [1, 0]);

  const rightColX = useTransform(scrollYProgress, [0.05, 0.7], [0, 120]);
  const rightColOpacity = useTransform(scrollYProgress, [0.05, 0.6], [1, 0]);

  // Playlist clip progression: advance clip every 3.5 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrentClipIndex((prev) => (prev + 1) % DEFAULT_CLIPS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  // Sync blurred background video with primary foreground video
  useEffect(() => {
    if (videoRef.current && blurVideoRef.current) {
      blurVideoRef.current.currentTime = videoRef.current.currentTime;
    }
  }, [currentClipIndex]);

  // IntersectionObserver to pause video playback when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
            blurVideoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
            blurVideoRef.current?.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeClip = DEFAULT_CLIPS[currentClipIndex];

  return (
    <div
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="w-full relative select-none"
    >
      {/* ------------------------------------------------------------------
          DESKTOP & TABLET: SCROLL-EXPANDING STICKY STAGE (HIDDEN ON MOBILE)
          ------------------------------------------------------------------ */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full h-[220vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-[3%] pt-4 pb-6 box-border">
          
          {/* Centered Welcome Headline */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : headlineY,
              opacity: shouldReduceMotion ? 1 : headlineOpacity,
            }}
            className="text-center mb-4 lg:mb-6 z-20 shrink-0 pointer-events-none"
          >
            <p
              style={{ color: 'var(--color-text)' }}
              className="text-[16px] sm:text-[20px] lg:text-[26px] uppercase font-bold tracking-[0.28em] leading-tight font-sans"
            >
              WELCOME TO
            </p>
            <h2
              style={{ color: 'var(--color-primary)' }}
              className="text-[clamp(44px,7.5vw,118px)] font-condensed uppercase tracking-wide leading-[0.9] mt-0.5 whitespace-nowrap"
            >
              CHINMAYA VIDYALAYA
            </h2>
          </motion.div>

          {/* 3-Column Media Mosaic Container */}
          <div className="relative w-full max-w-[1720px] mx-auto flex items-center justify-center gap-3 lg:gap-4 h-[48vh] lg:h-[54vh] max-h-[500px] min-h-[260px]">
            
            {/* LEFT COLUMN: 2 Stacked Tiles */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : leftColX,
                opacity: shouldReduceMotion ? 1 : leftColOpacity,
              }}
              className="flex-1 flex flex-col gap-3 lg:gap-4 h-full will-change-transform z-10"
            >
              <div
                style={{ backgroundColor: 'var(--color-dark)' }}
                className="flex-1 overflow-hidden rounded-none relative border border-transparent"
              >
                <img
                  src="/images/school_events/School_Event_2026-09-27_006.jpg"
                  alt="Chinmaya Vidyalaya Student Trumpet and Band"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div
                style={{ backgroundColor: 'var(--color-dark)' }}
                className="flex-1 overflow-hidden rounded-none relative border border-transparent"
              >
                <img
                  src="/images/school_events/School_Event_2026-09-27_010.jpg"
                  alt="Chinmaya Students Assembly & Cheer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* CENTER COLUMN: 1 Tall Scroll-Expanding Video Tile */}
            <motion.div
              style={{
                width: shouldReduceMotion ? '93%' : centerMaxWidth,
                scale: shouldReduceMotion ? 1 : centerScale,
              }}
              className="h-full relative overflow-hidden rounded-none shadow-2xl z-30 shrink-0 will-change-transform aspect-[2.15/1]"
            >
              {/* Blurred-fill background layer */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <video
                  ref={blurVideoRef}
                  src={activeClip.src}
                  poster={activeClip.poster}
                  muted
                  playsInline
                  autoPlay={!shouldReduceMotion}
                  loop
                  preload="metadata"
                  className="w-full h-full object-cover filter blur-[24px] scale-125 opacity-75"
                />
              </div>

              {/* Sharp foreground video with object-fit: contain */}
              <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                <video
                  ref={videoRef}
                  src={activeClip.src}
                  poster={activeClip.poster}
                  muted
                  playsInline
                  autoPlay={!shouldReduceMotion}
                  loop
                  preload="metadata"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>

              {/* Video playlist badge indicator */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-none border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeClip.title}</span>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: 2 Stacked Tiles */}
            <motion.div
              style={{
                x: shouldReduceMotion ? 0 : rightColX,
                opacity: shouldReduceMotion ? 1 : rightColOpacity,
              }}
              className="flex-1 flex flex-col gap-3 lg:gap-4 h-full will-change-transform z-10"
            >
              <div
                style={{ backgroundColor: 'var(--color-dark)' }}
                className="flex-1 overflow-hidden rounded-none relative border border-transparent"
              >
                <img
                  src="/images/school_events/School_Event_2026-09-28_015.jpg"
                  alt="Chinmaya Vidyalaya Youth Festival & Arts"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div
                style={{ backgroundColor: 'var(--color-dark)' }}
                className="flex-1 overflow-hidden rounded-none relative border border-transparent"
              >
                <img
                  src="/images/school_events/School_Event_2026-09-28_025.jpg"
                  alt="Chinmaya Vidyalaya Sports & Mascot"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------------
          MOBILE FALLBACK (UNDER 640px): SINGLE COLUMN FULL-WIDTH REVEAL
          ------------------------------------------------------------------ */}
      <div className="block md:hidden px-4 py-12">
        <div className="text-center mb-6">
          <p
            style={{ color: 'var(--color-text)' }}
            className="text-xl uppercase font-bold tracking-widest font-sans"
          >
            WELCOME TO
          </p>
          <h2
            style={{ color: 'var(--color-primary)' }}
            className="text-4xl sm:text-5xl font-display uppercase tracking-tight leading-none mt-1"
          >
            CHINMAYA VIDYALAYA
          </h2>
        </div>

        {/* Center Video on top */}
        <div className="w-full aspect-video relative overflow-hidden rounded-none shadow-xl mb-4 bg-black">
          <video
            src={activeClip.src}
            poster={activeClip.poster}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid of supporting still photos */}
        <div className="grid grid-cols-2 gap-3">
          <img
            src="/images/school_events/School_Event_2026-09-27_006.jpg"
            alt="School Band"
            loading="lazy"
            className="w-full h-36 object-cover rounded-none"
          />
          <img
            src="/images/school_events/School_Event_2026-09-27_010.jpg"
            alt="Students Assembly"
            loading="lazy"
            className="w-full h-36 object-cover rounded-none"
          />
          <img
            src="/images/school_events/School_Event_2026-09-28_015.jpg"
            alt="Arts Festival"
            loading="lazy"
            className="w-full h-36 object-cover rounded-none"
          />
          <img
            src="/images/school_events/School_Event_2026-09-28_025.jpg"
            alt="Sports Meet"
            loading="lazy"
            className="w-full h-36 object-cover rounded-none"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------
          INTRO BLOCK (Appears directly after mosaic stage)
          ------------------------------------------------------------------ */}
      <div className="w-full py-16 lg:py-24 px-6 flex flex-col items-center justify-center text-center">
        {/* Centered Small Outlined Logo Mark (~85px, --color-muted) */}
        <div
          style={{ borderColor: 'var(--color-muted)' }}
          className="w-[85px] h-[85px] border-2 flex items-center justify-center rounded-none mb-8 p-3"
          aria-hidden="true"
        >
          <img
            src="/images/Chinmaya_Logo.png"
            alt=""
            className="w-full h-full object-contain filter grayscale contrast-125 opacity-70"
          />
        </div>

        {/* Centered Paragraph, max-width ~480px, 18-20px, line-height 1.6 */}
        <p
          style={{ color: 'var(--color-text)' }}
          className="max-w-[480px] text-[18px] sm:text-[20px] leading-[1.6] font-sans text-balance"
        >
          Rooted in the timeless wisdom of the <strong>Chinmaya Vision Programme</strong>, our school nurtures <strong>scholastic distinction</strong>, integrated character, and intellectual agility for pupils from <strong>Nursery through Grade XII</strong>.
        </p>
      </div>
    </div>
  );
};

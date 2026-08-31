import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on first load in the session if needed, or always for cinematic feel
    const hasSeen = sessionStorage.getItem('cv_preloader_seen');
    if (hasSeen) {
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('cv_preloader_seen', 'true');
          if (onComplete) onComplete();
        }
      });

      // Stagger entrance of emblem and text
      tl.from(logoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      })
      .from(quoteRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      // Counter progress
      .to(counterObj, {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.round(counterObj.val));
        }
      }, '-=0.4')
      .to(progressBarRef.current, {
        scaleX: 1,
        duration: 1.6,
        ease: 'power2.inOut',
        transformOrigin: 'left'
      }, '<')
      // Curtain exit reveal
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.1,
        ease: 'power4.inOut',
        delay: 0.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // If already seen in this session, return null immediately
  if (typeof window !== 'undefined' && sessionStorage.getItem('cv_preloader_seen')) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      className="fixed inset-0 z-[9999] bg-[#0B1D30] text-white flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
    >
      {/* Top Metadata */}
      <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono">
        <span>ESTD. 1999 • BOISAR / TARAPUR</span>
        <span>CBSE AFFILIATION: 1130058</span>
      </div>

      {/* Centerpiece Branding */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div ref={logoRef} className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-2xl p-3 mx-auto backdrop-blur-md">
            <img
              src="/images/Chinmaya_Logo.webp"
              alt="Chinmaya Vidyalaya Emblem"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#D97745] tracking-[0.3em] uppercase block font-mono">
              Under The Aegis of Chinmaya Mission
            </span>
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-none">
              CHINMAYA VIDYALAYA
            </h1>
            <p className="font-serif italic text-base sm:text-xl text-slate-300 font-light pt-1">
              "School with a difference"
            </p>
          </div>
        </div>

        <div ref={quoteRef} className="pt-2 text-xs text-slate-400 font-sans tracking-wide max-w-md mx-auto">
          Imparting holistic education rooted in the Chinmaya Vision Program (CVP).
        </div>
      </div>

      {/* Bottom Progress & Counter */}
      <div className="space-y-4">
        <div className="flex justify-between items-end text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D97745] animate-pulse" />
            <span className="tracking-widest uppercase">Initializing Digital Campus</span>
          </div>
          <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#D97745]">
            {percent < 10 ? `0${percent}` : percent}%
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative rounded-full">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-gradient-to-r from-[#D97745] via-[#E59866] to-[#FADBD8]"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
};

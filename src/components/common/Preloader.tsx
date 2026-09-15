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

      tl.from(logoRef.current, {
        y: 40,
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
      .to(counterObj, {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.round(counterObj.val));
        }
      }, '-=0.3')
      .to(progressBarRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        transformOrigin: 'left'
      }, '<')
      .to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.1,
        ease: 'power4.inOut',
        delay: 0.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (typeof window !== 'undefined' && sessionStorage.getItem('cv_preloader_seen')) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      className="fixed inset-0 z-[9999] bg-[#FAF8F5] text-[#181C20] flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
    >
      {/* Top Metadata */}
      <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.25em] text-[#64748B] font-mono border-b border-[#E7E2D8] pb-4">
        <span>ESTD. 1993 • BOISAR / TARAPUR</span>
        <span>CBSE AFFILIATION: 1130058</span>
      </div>

      {/* Centerpiece Branding */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div ref={logoRef} className="space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white border-2 border-[#E7E2D8] shadow-lg p-3 mx-auto">
            <img
              src="/images/Chinmaya_Logo.webp"
              alt="Chinmaya Vidyalaya Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#DF711B] tracking-[0.3em] uppercase block font-mono">
              Under The Aegis of Chinmaya Mission
            </span>
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#181C20] leading-none">
              CHINMAYA VIDYALAYA
            </h1>
            <p className="font-serif italic text-base sm:text-xl text-[#64748B] font-medium pt-1">
              "School with a difference"
            </p>
          </div>
        </div>

        <div ref={quoteRef} className="pt-2 text-xs text-[#64748B] font-sans tracking-wide max-w-md mx-auto">
          Imparting holistic education rooted in the Chinmaya Vision Program (CVP).
        </div>
      </div>

      {/* Bottom Progress & Counter */}
      <div className="space-y-4 border-t border-[#E7E2D8] pt-4">
        <div className="flex justify-between items-end text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DF711B] animate-pulse" />
            <span className="tracking-widest uppercase text-[#181C20] font-semibold">Initializing Experience</span>
          </div>
          <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#DF711B]">
            {percent < 10 ? `0${percent}` : percent}%
          </span>
        </div>

        {/* Solid Architectural Progress Line */}
        <div className="w-full h-[3px] bg-[#FDE49C]/60 overflow-hidden relative rounded-full">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-[#DF711B]"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
};

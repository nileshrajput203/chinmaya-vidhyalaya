import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer (desktop / mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Snappy dot position
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.05,
        ease: 'power2.out'
      });
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth lerp follower for outer ring
    const ticker = gsap.ticker.add(() => {
      ringPos.x += (mouse.x - ringPos.x) * 0.22;
      ringPos.y += (mouse.y - ringPos.y) * 0.22;

      gsap.set(ring, {
        x: ringPos.x,
        y: ringPos.y
      });
    });

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, input, select, textarea, [role="button"], .clickable, [data-cursor]');
      if (target) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, input, select, textarea, [role="button"], .clickable, [data-cursor]');
      if (target) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none transition-all duration-150 ${
          isHovered
            ? 'bg-[#D97745] scale-150'
            : isPressed
            ? 'bg-[#0B1D30] scale-75'
            : 'bg-[#D97745] scale-100'
        }`}
      />

      {/* Trailing Aura Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border-2 border-[#D97745] bg-[#D97745]/15 scale-110 shadow-sm'
            : isPressed
            ? 'w-6 h-6 -ml-3 -mt-3 border border-[#0B1D30] bg-[#0B1D30]/20 scale-90'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-[#D97745]/70'
        }`}
      />
    </div>
  );
};

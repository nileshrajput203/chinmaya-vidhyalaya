import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

import { RIBBON_GALLERY_IMAGES } from '../../data/images';

/**
 * IMAGES - Sourced directly from central `src/data/images.ts`.
 * Modifying `RIBBON_GALLERY_IMAGES` in `src/data/images.ts` will instantly update this ribbon gallery.
 */
export const IMAGES: string[] = RIBBON_GALLERY_IMAGES;

/**
 * Interactive "Ribbon" Photo Gallery
 * - Pure requestAnimationFrame 60fps loop with direct DOM transform translate/rotate
 * - Endlessly auto-scrolls to the left with pointer drag support
 * - Dynamic cursor swirl/loop interaction with smoothed lerp ~0.14 and smoothstep blending
 * - 3D-tilted orange folder call-to-action card at the right end linking to /gallery
 * - Fully responsive (mobile tiles 68px, card 140x180px)
 * - Prefers-reduced-motion and dark-mode support via CSS variables
 */
export const RibbonGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  // State to track mobile vs desktop for tile sizing
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sizing constants
    const mobile = window.innerWidth < 768;
    const tileSpacing = mobile ? 78 : 104;
    const ringRadius = mobile ? 75 : 102;
    const autoScrollSpeed = prefersReducedMotion ? 0 : 0.65;

    // Tile count to comfortably span beyond wide screens
    const numTiles = 40;
    const totalLoopWidth = numTiles * tileSpacing;

    // Scrolling and dragging state
    let scrollOffset = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let dragVelocity = 0;
    let lastDragX = 0;

    // Cursor position and smoothing
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let smoothMouseX = -9999;
    let smoothMouseY = -9999;
    let isHovering = false;
    let hoverWeight = 0; // 0 (flat wave) to 1 (full swirl loop)

    // Baseline wave function
    function getWave(x: number, width: number, height: number) {
      // Wave rises slightly from left to right, seated in the lower half to allow upward loop curl
      const slopeY = height * 0.70 - (x / Math.max(width, 1000)) * (height * 0.16);
      const wave1 = Math.sin(x * 0.0028 + 0.3) * (mobile ? 18 : 24);
      const wave2 = Math.cos(x * 0.0055 - 0.2) * (mobile ? 8 : 12);
      const y = slopeY + wave1 + wave2;

      // Tangent / angle calculation
      const dx = 2.0;
      const slopeY2 = height * 0.70 - ((x + dx) / Math.max(width, 1000)) * (height * 0.16);
      const wave1_2 = Math.sin((x + dx) * 0.0028 + 0.3) * (mobile ? 18 : 24);
      const wave2_2 = Math.cos((x + dx) * 0.0055 - 0.2) * (mobile ? 8 : 12);
      const y2 = slopeY2 + wave1_2 + wave2_2;

      const angle = Math.atan2(y2 - y, dx) * (180 / Math.PI);
      return { y, angle };
    }

    // Pointer events tracking across container and window
    const handleMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const inX = clientX >= rect.left && clientX <= rect.right;
      const inY = clientY >= rect.top && clientY <= rect.bottom;

      if (inX && inY) {
        targetMouseX = clientX - rect.left;
        targetMouseY = clientY - rect.top;
        isHovering = true;
        if (smoothMouseX < -1000) {
          smoothMouseX = targetMouseX;
          smoothMouseY = targetMouseY;
        }
      } else {
        isHovering = false;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      handleMove(e.clientX, e.clientY);

      if (isDragging) {
        const currentX = e.clientX;
        const delta = currentX - dragStartX;
        dragVelocity = currentX - lastDragX;
        lastDragX = currentX;
        scrollOffset = dragStartOffset + delta;
      }
    };

    const onContainerEnter = (e: MouseEvent | PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isHovering = true;
      if (smoothMouseX < -1000) {
        smoothMouseX = targetMouseX;
        smoothMouseY = targetMouseY;
      }
    };

    const onContainerLeave = () => {
      isHovering = false;
      isDragging = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('.ribbon-cta-card')) return;
      isDragging = true;
      dragStartX = e.clientX;
      lastDragX = e.clientX;
      dragStartOffset = scrollOffset;
      dragVelocity = 0;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerenter', onContainerEnter);
    container.addEventListener('pointerleave', onContainerLeave);
    container.addEventListener('mouseenter', onContainerEnter);
    container.addEventListener('mouseleave', onContainerLeave);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('mousemove', onPointerMove as any);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Animation frame handle
    let animationFrameId: number;

    const render = () => {
      const rect = container.getBoundingClientRect();
      const stageWidth = rect.width;
      const stageHeight = rect.height;

      // 1. Auto-scroll and inertia
      if (!isDragging) {
        scrollOffset -= autoScrollSpeed;
        if (Math.abs(dragVelocity) > 0.05) {
          scrollOffset += dragVelocity;
          dragVelocity *= 0.94; // friction
        }
      }

      // 2. Cursor smoothing (lerp ~0.14 as specified)
      if (isHovering) {
        hoverWeight += (1 - hoverWeight) * 0.12;
      } else {
        hoverWeight += (0 - hoverWeight) * 0.08;
      }

      if (smoothMouseX < -1000) {
        smoothMouseX = targetMouseX;
        smoothMouseY = targetMouseY;
      } else {
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.14;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.14;
      }

      // 3. Update each tile
      for (let i = 0; i < numTiles; i++) {
        const el = tilesRef.current[i];
        if (!el) continue;

        // Compute endless wrap position along ribbon
        let s = (i * tileSpacing + scrollOffset) % totalLoopWidth;
        if (s < -tileSpacing * 2) {
          s += totalLoopWidth;
        }

        // Uncurled baseline wave position & angle
        const { y: baseY, angle: baseAngle } = getWave(s, stageWidth, stageHeight);

        let finalX = s;
        let finalY = baseY;
        let finalAngle = baseAngle;
        let zIndex = 5;

        // When mouse is hovering, curl nearby tiles into a full 360° circular loop around cursor
        if (hoverWeight > 0.002) {
          // Distance of this tile from the smoothed cursor along the ribbon
          let d = s - smoothMouseX;
          // Wrap d into [-totalLoopWidth/2, totalLoopWidth/2] for seamless ribbon wrapping
          d = ((d + totalLoopWidth / 2) % totalLoopWidth) - totalLoopWidth / 2;

          const L_half = Math.PI * ringRadius; // ~314px (half-circumference of loop)
          const absD = Math.abs(d);
          const blendDist = 210; // prompt: "Tiles farther away (within ~210px) are blended smoothly using smoothstep easing"

          if (absD <= L_half + blendDist) {
            // Anchor loop directly on the ribbon wave at the smoothed cursor X
            const cursorWave = getWave(smoothMouseX, stageWidth, stageHeight);
            const ringCenterY = cursorWave.y - ringRadius * 0.85;
            const ringCenterX = smoothMouseX;

            let loopTargetX: number;
            let loopTargetY: number;
            let loopTargetAngle: number;
            let loopInfluence = 1.0;

            if (absD <= L_half) {
              // Tile is ON the 360° circular ring
              const u = d / L_half; // -1 to +1
              // Angle around circle: starts at entrance (bottom-left), wraps up to top (-pi/2), exits at bottom-right
              const theta = u * Math.PI - Math.PI * 0.5;

              // Position on ring with slight lateral shift for ribbon cross-over
              loopTargetX = ringCenterX + ringRadius * Math.cos(theta) + u * 24;
              loopTargetY = ringCenterY + ringRadius * Math.sin(theta);

              // Tangent angle along circle
              const dx_du = -ringRadius * Math.PI * Math.sin(theta) + 24;
              const dy_du = ringRadius * Math.PI * Math.cos(theta);
              loopTargetAngle = Math.atan2(dy_du, dx_du) * (180 / Math.PI);

              // Z-index: later tiles in the loop overlap on top of earlier tiles
              zIndex = Math.round(15 + (u + 1) * 15 + hoverWeight * 10);
            } else {
              // Smooth transition zone (within ~210px outside the ring)
              const outerDist = absD - L_half;
              const t = Math.max(0, Math.min(1, 1 - outerDist / blendDist));
              // Smoothstep easing: 3t^2 - 2t^3
              loopInfluence = t * t * (3 - 2 * t);

              const sign = d > 0 ? 1 : -1;
              const uEdge = sign; // -1 or +1
              const thetaEdge = uEdge * Math.PI - Math.PI * 0.5;
              const edgeY = ringCenterY + ringRadius * Math.sin(thetaEdge);

              const dx_du = -ringRadius * Math.PI * Math.sin(thetaEdge) + 24;
              const dy_du = ringRadius * Math.PI * Math.cos(thetaEdge);
              const edgeAngle = Math.atan2(dy_du, dx_du) * (180 / Math.PI);

              // Blend connecting point towards baseline
              const connectX = ringCenterX + sign * (24 + outerDist * 0.45);
              loopTargetX = s * (1 - loopInfluence) + connectX * loopInfluence;
              loopTargetY = baseY * (1 - loopInfluence) + edgeY * loopInfluence;

              let diffAngle = ((edgeAngle - baseAngle + 540) % 360) - 180;
              loopTargetAngle = baseAngle + diffAngle * loopInfluence;
              zIndex = Math.round(8 + loopInfluence * 10);
            }

            const effectiveBlend = loopInfluence * hoverWeight;
            finalX = s * (1 - effectiveBlend) + loopTargetX * effectiveBlend;
            finalY = baseY * (1 - effectiveBlend) + loopTargetY * effectiveBlend;

            let angleDiff = ((loopTargetAngle - baseAngle + 540) % 360) - 180;
            finalAngle = baseAngle + angleDiff * effectiveBlend;
          }
        }

        // Apply hardware-accelerated transform: translate() rotate() only
        el.style.transform = `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0px) rotate(${finalAngle.toFixed(2)}deg)`;
        el.style.zIndex = `${zIndex}`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <section
      aria-label="Interactive Campus Photo Ribbon Gallery"
      className="ribbon-gallery-root relative w-full overflow-hidden select-none py-12 md:py-16"
      style={{
        backgroundColor: 'var(--ribbon-bg, #f9f8f5)',
      }}
    >
      <style>{`
        :root {
          --ribbon-bg: #f9f8f5;
          --ribbon-text: #181c20;
          --ribbon-subtext: #64748b;
          --ribbon-border: #e7e2d8;
        }
        .dark .ribbon-gallery-root,
        :root.dark .ribbon-gallery-root {
          --ribbon-bg: #0d1520;
          --ribbon-text: #f8fafc;
          --ribbon-subtext: #94a3b8;
          --ribbon-border: #233142;
        }

        /* 3D-Tilted Folder Card */
        .ribbon-cta-card {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.4s ease;
          transform: perspective(900px) rotateY(-14deg) rotateZ(3deg);
        }
        .ribbon-cta-card:hover {
          transform: perspective(900px) translateY(-6px) rotateY(-4deg) rotateZ(1deg);
        }
        .ribbon-cta-card:focus-visible {
          outline: 3px solid #DF711B;
          outline-offset: 4px;
        }
      `}</style>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DF711B]/10 border border-[#DF711B]/20 text-[#DF711B] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Campus Ribbon</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-[#181C20] dark:text-white uppercase tracking-tight m-0">
            Moments of Life at Chinmaya
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-normal leading-relaxed m-0">
            Hover over the photo ribbon to curl tiles into a fluid swirl around your cursor, or drag sideways to explore.
          </p>
        </div>

        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181818] hover:bg-[#DF711B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto shrink-0 group"
        >
          <span>View All Albums</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Ribbon Interactive Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[480px] overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {/* Tiles Container */}
        <div ref={stageRef} className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 36 }).map((_, index) => {
            const imgUrl = IMAGES[index % IMAGES.length];
            return (
              <div
                key={index}
                ref={(el) => {
                  tilesRef.current[index] = el;
                }}
                className={`absolute top-0 left-0 will-change-transform ${
                  isMobile
                    ? 'w-[68px] h-[68px] rounded-[16px] border-[2.5px]'
                    : 'w-[92px] h-[92px] rounded-[22px] border-[3px]'
                } border-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] overflow-hidden bg-slate-200 pointer-events-auto`}
                style={{
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            );
          })}
        </div>

        {/* 3D-Tilted Orange Folder Call-To-Action Card at Right End */}
        <div className="absolute right-4 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-40 pointer-events-auto">
          <Link
            to="/gallery"
            className="ribbon-cta-card block relative w-[140px] h-[180px] sm:w-[200px] sm:h-[250px] rounded-[18px] cursor-pointer text-left text-white shadow-2xl group text-decoration-none"
            title="Explore Full Chinmaya Photo Gallery"
          >
            {/* Dark brown folder top strip / tab */}
            <div className="absolute -top-3.5 left-4 w-24 sm:w-28 h-5 rounded-t-[10px] bg-[#381a07] border-t border-l border-r border-[#4d270c] shadow-sm z-0" />

            {/* Folder Front Gradient Body */}
            <div
              className="relative w-full h-full rounded-[18px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden z-10 border border-amber-300/30 shadow-[0_20px_40px_-10px_rgba(212,78,5,0.45)]"
              style={{
                background: 'linear-gradient(155deg, #FF6F1E 0%, #D44E05 100%)',
              }}
            >
              {/* Subtle sheen highlight */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />

              {/* Card Top Row */}
              <div className="flex items-center justify-between">
                {/* Folder Icon in rounded square */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>

                {/* Green-dot "PHOTOS" pill tag */}
                <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                    Photos
                  </span>
                </div>
              </div>

              {/* Card Middle: EXPLORE & VIEW GALLERY */}
              <div className="space-y-1 sm:space-y-1.5 my-auto">
                <span className="block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-amber-200">
                  Explore
                </span>
                <h3 className="font-sans font-black text-xl sm:text-2xl lg:text-[26px] text-white uppercase leading-none tracking-tight m-0 drop-shadow-sm">
                  View
                  <br />
                  Gallery
                </h3>
              </div>

              {/* Card Bottom Divider Line & Action */}
              <div className="pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-between text-white/95">
                <span className="text-[11px] sm:text-xs font-medium tracking-wide">
                  Browse Album
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#D44E05] flex items-center justify-center transition-all duration-300 shadow-xs">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RibbonGallery;

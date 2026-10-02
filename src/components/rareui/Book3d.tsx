import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface Book3dProps {
  /** Cover image path or URL */
  coverImage?: string;
  /** Book title for accessibility & spine */
  title?: string;
  /** Subtitle or academic year */
  subtitle?: string;
  /** Width of the book cover in pixels */
  width?: number;
  /** Height of the book cover in pixels */
  height?: number;
  /** Spine thickness / depth in pixels */
  depth?: number;
  /** Additional container classes */
  className?: string;
  /** Whether mouse hover 3D tilt is enabled */
  interactive?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

export const Book3d: React.FC<Book3dProps> = ({
  coverImage = '/images/school-diary-cover.png',
  title = 'Chinmaya Vidyalaya School Diary',
  subtitle = 'Academic Year 2024–25 / 2026–27',
  width = 320,
  height = 460,
  depth = 34,
  className = '',
  interactive = true,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt animation coordinates (0.5 is center resting state)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 24, stiffness: 190, mass: 0.5 };

  // Transform normalized mouse (0 to 1) into smooth 3D rotation angles
  // When mouse is at center (0.5), rotateY is -18deg and rotateX is 8deg (realistic resting angle)
  const rawRotateY = useTransform(mouseX, [0, 0.5, 1], [-32, -18, -4]);
  const rawRotateX = useTransform(mouseY, [0, 0.5, 1], [18, 8, -6]);

  const rotateY = useSpring(rawRotateY, springConfig);
  const rotateX = useSpring(rawRotateX, springConfig);

  // Dynamic light reflection/sheen position
  const sheenX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const sheenOpacity = useTransform(mouseX, [0, 0.5, 1], [0.15, 0.45, 0.15]);

  // Dynamic ambient shadow offset
  const shadowX = useTransform(rotateY, [-35, 10], [-25, 25]);
  const shadowY = useTransform(rotateX, [-15, 25], [35, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (interactive) {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative select-none flex items-center justify-center p-6 ${className}`}
      style={{
        perspective: '1400px',
      }}
    >
      {/* 3D BOOK WRAPPER */}
      <motion.div
        className="relative cursor-pointer transition-transform"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* REALISTIC AMBIENT DROP SHADOW */}
        <motion.div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            width: `${width * 0.9}px`,
            height: `${height * 0.85}px`,
            left: `${width * 0.05}px`,
            top: `${height * 0.15}px`,
            transform: `translateZ(-${depth + 10}px)`,
            x: shadowX,
            y: shadowY,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            filter: 'blur(28px)',
          }}
        />

        {/* FRONT COVER */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200/80"
          style={{
            transform: `translateZ(${depth / 2}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Cover Graphic Image */}
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover rounded-2xl block"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />

          {/* Hardcover Outer Border Frame */}
          <div className="absolute inset-0 rounded-2xl border-2 border-white/60 pointer-events-none" />

          {/* Book Spine Crease / Gutter Shadow (Left Edge indent) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 35%, rgba(255,255,255,0.2) 60%, rgba(0,0,0,0.08) 85%, transparent 100%)',
            }}
          />

          {/* Dynamic Light Sheen across Cover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.6) 48%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.3) 53%, transparent 75%)`,
              left: sheenX,
              opacity: sheenOpacity,
              transform: 'translateX(-50%)',
            }}
          />

          {/* Subtle Corner Vignette */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.08)',
            }}
          />
        </div>

        {/* BOOK SPINE (Left Side) */}
        <div
          className="absolute top-0 bottom-0 rounded-l-md overflow-hidden flex flex-col items-center justify-between py-6 px-1 shadow-inner"
          style={{
            width: `${depth}px`,
            left: `-${depth / 2}px`,
            transform: 'rotateY(-90deg)',
            transformOrigin: 'right center',
            background: 'linear-gradient(to right, #DF711B 0%, #C8652D 50%, #9C4B1C 100%)',
            borderRight: '1px solid rgba(0,0,0,0.2)',
          }}
        >
          {/* Top Spine Decal */}
          <div className="w-4 h-1 bg-amber-200/80 rounded-full" />

          {/* Vertical Spine Title */}
          <div
            className="text-[10px] font-bold font-cinzel text-white uppercase tracking-widest text-center whitespace-nowrap opacity-90"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            {title} • {subtitle}
          </div>

          {/* Bottom Spine Decal */}
          <div className="w-4 h-1 bg-amber-200/80 rounded-full" />
        </div>

        {/* PAGE BLOCK EDGES (Right Side) */}
        <div
          className="absolute top-1 bottom-1 rounded-r-xs overflow-hidden"
          style={{
            width: `${depth - 2}px`,
            right: `-${depth / 2 - 1}px`,
            transform: 'rotateY(90deg)',
            transformOrigin: 'left center',
            background:
              'repeating-linear-gradient(to bottom, #FFFDF9 0px, #FFFDF9 2px, #E8E2D7 3px, #D5CDBC 4px)',
            boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.18)',
          }}
        />

        {/* PAGE BLOCK EDGES (Bottom Side) */}
        <div
          className="absolute left-2 right-1 overflow-hidden"
          style={{
            height: `${depth - 3}px`,
            bottom: `-${depth / 2 - 1}px`,
            transform: 'rotateX(-90deg)',
            transformOrigin: 'center top',
            background:
              'repeating-linear-gradient(to right, #FFFDF9 0px, #FFFDF9 2px, #E8E2D7 3px, #D5CDBC 4px)',
            boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.18)',
          }}
        />

        {/* PAGE BLOCK EDGES (Top Side) */}
        <div
          className="absolute left-2 right-1 overflow-hidden"
          style={{
            height: `${depth - 3}px`,
            top: `-${depth / 2 - 1}px`,
            transform: 'rotateX(90deg)',
            transformOrigin: 'center bottom',
            background:
              'repeating-linear-gradient(to right, #FFFDF9 0px, #FFFDF9 2px, #E8E2D7 3px, #D5CDBC 4px)',
            boxShadow: 'inset 0 -3px 8px rgba(0,0,0,0.18)',
          }}
        />

        {/* BACK COVER */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#0B1E34] border border-slate-700/80 shadow-2xl"
          style={{
            transform: `translateZ(-${depth / 2}px) rotateY(180deg)`,
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white/80 space-y-3">
            <div className="w-12 h-12 rounded-full border border-amber-400/40 flex items-center justify-center font-cinzel text-amber-300 font-bold text-lg">
              ॐ
            </div>
            <p className="font-cinzel text-sm font-bold text-white tracking-wider">
              CHINMAYA VIDYALAYA
            </p>
            <p className="text-[11px] text-slate-300 italic">
              "School with a difference"
            </p>
            <p className="text-[10px] text-amber-200/80 font-mono pt-4 border-t border-white/10">
              CBSE Affiliation No. 1130058
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Book3d;

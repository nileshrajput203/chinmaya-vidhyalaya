import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, MapPin } from 'lucide-react';

interface MobileHeroSectionProps {
  onOpenAdmissions: () => void;
}

export const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({ onOpenAdmissions }) => {
  return (
    <section className="w-full bg-white text-[#181C20] overflow-hidden lg:hidden border-b border-[#E7E2D8]/80">
      
      {/* ----------------------------------------------------
          1. HERO CAMPUS IMAGE WITH OVERLAY TYPOGRAPHY
          (Inspired by the Navkar architectural presentation layout)
         ---------------------------------------------------- */}
      <div className="relative w-full aspect-[16/11] xs:aspect-[16/10] sm:aspect-[16/9] min-h-[270px] max-h-[420px] overflow-hidden bg-[#0A1626]">
        {/* School Building Photography */}
        <picture>
          <source srcSet="/images/banner-1.webp" type="image/webp" />
          <img
            src="/images/banner-1.jpg"
            alt="Chinmaya Vidyalaya Tarapur Campus Building"
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Cinematic Vignette & Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C14] via-[#050C14]/45 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFB740] border border-amber-400/30 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-[#FFB740]" />
            CBSE #1130058 • Estd. 1995
          </span>
        </div>


        {/* Hero Impact Typography Overlay (Aligned to Bottom-Left) */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 pb-3 sm:pb-4 z-10 flex flex-col justify-end">
          <div className="space-y-1 sm:space-y-1.5 max-w-lg">
            <span className="block font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.25em] text-[#FFB740] drop-shadow-sm">
              PRESENTING
            </span>

            <h1 className="font-display font-black text-[21px] xs:text-[23px] sm:text-3xl text-white tracking-tight leading-[1.12] uppercase drop-shadow-lg">
              <span className="inline-block bg-white text-[#181C20] px-1.5 py-0.5 rounded mr-1.5 shadow-md text-[18px] xs:text-[20px] sm:text-2xl align-middle">
                PALGHAR'S
              </span>
              MOST ICONIC CBSE SCHOOL!
            </h1>

            <p className="text-[11px] xs:text-xs text-slate-200 font-sans leading-relaxed drop-shadow line-clamp-2 pt-0.5">
              36 Years of Academic Distinction & Vedantic Values • Nursery to Std XII (Arts, Commerce, Science)
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          2. THE STATS CARDS (3-COLUMN GRID)
         ---------------------------------------------------- */}
      <div className="px-3.5 pt-3 pb-3.5 sm:px-6 sm:pt-4 sm:pb-4 bg-white">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto">
          
          {/* Card 1: Years of Legacy */}
          <div className="bg-[#FAF8F5] p-2.5 sm:p-3.5 rounded-xl border border-[#E7E2D8] shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-lg xs:text-xl sm:text-2xl text-[#181C20] tracking-tight leading-none">
              35+
            </span>
            <p className="text-[9.5px] xs:text-[10px] sm:text-xs text-[#666666] font-medium mt-1 leading-tight">
              Years Legacy
            </p>
          </div>

          {/* Card 2: Students on Roll */}
          <div className="bg-[#FAF8F5] p-2.5 sm:p-3.5 rounded-xl border border-[#E7E2D8] shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-lg xs:text-xl sm:text-2xl text-[#181C20] tracking-tight leading-none">
              1600+
            </span>
            <p className="text-[9.5px] xs:text-[10px] sm:text-xs text-[#666666] font-medium mt-1 leading-tight">
              Students Roll
            </p>
          </div>

          {/* Card 3: 100% CBSE Results */}
          <div className="bg-[#FAF8F5] p-2.5 sm:p-3.5 rounded-xl border border-[#E7E2D8] shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-lg xs:text-xl sm:text-2xl tracking-tight leading-none text-[#DF711B]">
              100%
            </span>
            <p className="text-[9.5px] xs:text-[10px] sm:text-xs text-[#666666] font-medium mt-1 leading-tight">
              CBSE 1st Class
            </p>
          </div>

        </div>

        {/* ----------------------------------------------------
            3. QUICK ACTIONS & ADMISSION CALLOUT
           ---------------------------------------------------- */}
        <div className="mt-3 sm:mt-3.5 max-w-lg mx-auto space-y-2">
          {/* Primary Apply Button */}
          <button
            type="button"
            onClick={onOpenAdmissions}
            className="w-full py-3 px-4 bg-[#DF711B] hover:bg-[#C45B0E] text-white font-sans font-bold text-xs xs:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-amber-200" />
            <span>Apply for Admissions 2026–27</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>

          {/* Notice & Location Ticker */}
          <div className="pt-0.5 px-1 flex items-center justify-between text-[11px] text-[#666666] font-sans">
            <Link to="/news" className="text-[#DF711B] hover:underline font-semibold flex items-center gap-1">
              <span>View Circulars & News</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="flex items-center gap-1 text-[#555555]">
              <MapPin className="w-3 h-3 text-[#DF711B] shrink-0" />
              <span>Boisar, MH</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

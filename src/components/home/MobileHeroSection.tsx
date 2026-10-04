import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, Phone, MapPin } from 'lucide-react';

interface MobileHeroSectionProps {
  onOpenAdmissions: () => void;
}

export const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({ onOpenAdmissions }) => {
  return (
    <section className="w-full bg-white text-[#181C20] overflow-hidden lg:hidden">
      
      {/* ----------------------------------------------------
          1. HERO CAMPUS IMAGE WITH OVERLAY TYPOGRAPHY
          (Inspired by the Navkar architectural presentation layout)
         ---------------------------------------------------- */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[460px] overflow-hidden bg-[#0A1626]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C14] via-[#050C14]/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFB740] border border-amber-400/30 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-[#FFB740]" />
            CBSE #1130058 • Estd. 1995
          </span>
        </div>

        {/* Corner Watermark Brand */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
            <img 
              src="/images/Chinmaya_Logo.webp" 
              alt="Chinmaya Crest" 
              className="h-5 w-auto object-contain" 
            />
            <span className="text-[9px] font-cinzel font-bold text-white tracking-widest">CV TARAPUR</span>
          </div>
        </div>

        {/* Hero Impact Typography Overlay (Aligned to Bottom-Left) */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10 flex flex-col justify-end">
          <div className="space-y-1.5 max-w-lg">
            <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFB740] drop-shadow-sm">
              PRESENTING
            </span>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-[1.08] uppercase drop-shadow-lg">
              <span className="inline-block bg-white text-[#181C20] px-2 py-0.5 rounded-sm mr-1.5 shadow-md">
                PALGHAR'S
              </span>
              MOST ICONIC CBSE SCHOOL!
            </h1>

            <p className="text-xs text-slate-200 font-sans leading-relaxed drop-shadow line-clamp-2 pt-0.5">
              30 Years of Academic Distinction & Vedantic Values • Nursery to Std XII (Arts, Commerce, Science)
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          2. THE 4 STATS CARDS (2x2 GRID)
          (Directly inspired by the clean 2x2 stat cards layout in the sample)
         ---------------------------------------------------- */}
      <div className="px-4 py-5 sm:px-6 bg-white">
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          
          {/* Card 1: Years of Legacy */}
          <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-2xl sm:text-3xl text-[#181C20] tracking-tight">
              35+
            </span>
            <p className="text-[11px] sm:text-xs text-[#666666] font-medium mt-0.5">
              Years of Legacy
            </p>
          </div>

          {/* Card 2: Students on Roll */}
          <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-2xl sm:text-3xl text-[#181C20] tracking-tight">
              1600+
            </span>
            <p className="text-[11px] sm:text-xs text-[#666666] font-medium mt-0.5">
              Students on Roll
            </p>
          </div>

          {/* Card 3: 100% CBSE Results */}
          <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-2xl sm:text-3xl text-[#181C20] tracking-tight text-[#DF711B]">
              100%
            </span>
            <p className="text-[11px] sm:text-xs text-[#666666] font-medium mt-0.5">
              CBSE First Class
            </p>
          </div>

          {/* Card 4: Global Chinmaya Vidyalayas */}
          <div className="bg-white p-4 rounded-2xl border border-[#E7E2D8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center transition-all hover:border-[#DF711B]/40">
            <span className="font-display font-black text-2xl sm:text-3xl text-[#181C20] tracking-tight">
              100+
            </span>
            <p className="text-[11px] sm:text-xs text-[#666666] font-medium mt-0.5">
              Chinmaya Schools
            </p>
          </div>

        </div>

        {/* ----------------------------------------------------
            3. QUICK ACTIONS & ADMISSION CALLOUT
           ---------------------------------------------------- */}
        <div className="mt-4 max-w-lg mx-auto space-y-2.5">
          {/* Primary Apply Button */}
          <button
            type="button"
            onClick={onOpenAdmissions}
            className="w-full py-3.5 px-4 bg-[#DF711B] hover:bg-[#C45B0E] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-amber-200" />
            <span>Apply for Admissions 2026–27</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>

          {/* Secondary Buttons Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to="/admissions/guidelines"
              className="py-2.5 px-3 bg-white hover:bg-[#F5F2EB] text-[#181C20] font-sans font-semibold text-xs rounded-xl border border-[#E7E2D8] transition-all text-center flex items-center justify-center shadow-xs"
            >
              <span>Guidelines & Fees</span>
            </Link>

            <a
              href="tel:7775872266"
              className="py-2.5 px-3 bg-white hover:bg-[#F5F2EB] text-[#181C20] font-sans font-semibold text-xs rounded-xl border border-[#E7E2D8] transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>Call Campus</span>
            </a>
          </div>

          {/* Notice & Location Ticker */}
          <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-[#666666] font-sans">
            <Link to="/news" className="text-[#DF711B] hover:underline font-medium flex items-center gap-1">
              <span>View Circulars & News</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#DF711B]" />
              Boisar, Maharashtra
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

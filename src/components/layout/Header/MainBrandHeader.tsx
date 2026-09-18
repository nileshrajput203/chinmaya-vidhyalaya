import React from 'react';
import { Menu, X } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

interface MainBrandHeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenAdmissionDrawer?: () => void;
  isTransparent?: boolean;
}

export const MainBrandHeader: React.FC<MainBrandHeaderProps> = ({
  isMobileMenuOpen,
  onToggleMobileMenu,
  isTransparent = false,
}) => {
  const handleRestart = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('cv_preloader_seen');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.location.href = '/';
  };

  return (
    <div 
      className={`py-3 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isTransparent 
          ? 'bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white' 
          : 'bg-[#FAF8F5] text-[#181C20] border-b border-[#E7E2D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 relative">
        
        {/* Left: Emblem & Institutional Typography */}
        <a 
          href="/" 
          onClick={handleRestart}
          title="Click to return to overview"
          className="flex items-center gap-3 sm:gap-4 group cursor-pointer"
        >
          {/* Logo with subtle glass frame */}
          <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 ${
            isTransparent 
              ? 'bg-white/15 backdrop-blur-md border border-white/20 shadow-lg' 
              : 'bg-white border border-[#D5CEC2] shadow-md'
          }`}>
            <img
              src="/images/Chinmaya_Logo.webp"
              alt="Chinmaya Vidyalaya Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-0.5">
            {/* CBSE Badge & School Code */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border ${
                isTransparent 
                  ? 'bg-white/10 text-white/90 border-white/20 backdrop-blur-sm' 
                  : 'bg-[#64C9CF]/15 text-[#0B6B72] border-[#64C9CF]/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isTransparent ? 'bg-emerald-400' : 'bg-[#64C9CF]'}`} />
                CBSE Affil. No. {OFFICIAL_SCHOOL_INFO.affiliationNo}
              </span>
              <span className={`hidden sm:inline ${isTransparent ? 'text-white/40' : 'text-slate-300'}`}>•</span>
              <span className={`hidden sm:inline text-[10px] sm:text-[11px] font-mono font-semibold ${
                isTransparent ? 'text-white/80' : 'text-[#181C20]'
              }`}>
                School Code: {OFFICIAL_SCHOOL_INFO.schoolCode}
              </span>
            </div>

            {/* School Name */}
            <h1 className={`font-cinzel font-bold text-lg sm:text-2xl md:text-[26px] tracking-tight leading-none uppercase ${
              isTransparent ? 'text-white drop-shadow-md' : 'text-[#181C20]'
            }`}>
              {OFFICIAL_SCHOOL_INFO.name}
            </h1>

            {/* Motto & Location */}
            <p className={`text-xs sm:text-sm font-serif italic ${
              isTransparent ? 'text-amber-300/90 drop-shadow-sm' : 'text-[#334155]'
            }`}>
              "School with a difference" <span className={`not-italic text-[11px] font-sans hidden md:inline ${
                isTransparent ? 'text-white/60' : 'text-slate-500'
              }`}>— Vidyanagar, Boisar, Dist. Palghar</span>
            </p>
          </div>
        </a>

        {/* Right: Quick Action CTAs (Removed) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
        </div>

        {/* Mobile Toggle Button (Absolute right) */}
        <button
          onClick={onToggleMobileMenu}
          className={`lg:hidden absolute right-4 p-2.5 rounded-xl border transition-colors focus:outline-none ${
            isTransparent 
              ? 'bg-white/15 backdrop-blur-md border-white/20 text-white hover:bg-white/25' 
              : 'bg-white border-[#D5CEC2] text-[#181C20] hover:bg-[#F3EFE6]'
          }`}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>
    </div>
  );
};

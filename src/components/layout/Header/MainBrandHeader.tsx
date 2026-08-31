import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, Sparkles } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

interface MainBrandHeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenAdmissionDrawer?: () => void;
}

export const MainBrandHeader: React.FC<MainBrandHeaderProps> = ({
  isMobileMenuOpen,
  onToggleMobileMenu,
  onOpenAdmissionDrawer,
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
    <div className="bg-[#FCFBF7] py-4 px-4 sm:px-6 lg:px-8 border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Left: Emblem & Institutional Typography with Restart Click */}
        <a 
          href="/" 
          onClick={handleRestart}
          title="Click to restart site"
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#E7E2D8] shadow-sm p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/images/Chinmaya_Logo.webp"
              alt="Chinmaya Vidyalaya Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#D97745] font-bold">
                CBSE Affiliated No. {OFFICIAL_SCHOOL_INFO.affiliationNo}
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-[10px] sm:text-[11px] font-mono text-[#4A5568]">
                School Code: {OFFICIAL_SCHOOL_INFO.schoolCode}
              </span>
            </div>
            <h1 className="font-cinzel font-bold text-lg sm:text-2xl md:text-3xl text-[#0B1D30] tracking-tight leading-none uppercase">
              {OFFICIAL_SCHOOL_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568] font-serif italic">
              "School with a difference" <span className="not-italic text-[11px] font-sans text-slate-400 hidden md:inline">— Boisar, Dist. Palghar</span>
            </p>
          </div>
        </a>

        {/* Right: Quick Action CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            to="/about/mandatory-information"
            className="px-4 py-2 text-xs font-semibold text-[#0B1D30] hover:text-[#D97745] bg-[#F7F3EB] hover:bg-white border border-[#E7E2D8] rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#D97745]" />
            <span>Public Disclosures</span>
          </Link>

          <button
            onClick={onOpenAdmissionDrawer}
            className="px-5 py-2.5 bg-[#D97745] hover:bg-[#C8652D] text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions 2026-27</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2.5 rounded-xl text-[#0B1D30] hover:bg-[#F7F3EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1D30]"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>
    </div>
  );
};

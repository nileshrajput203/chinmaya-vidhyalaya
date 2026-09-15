import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, GraduationCap, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';
import { MagneticButton } from '../../common/MagneticButton';

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
    <div className="bg-[#FAF8F5] py-4 px-4 sm:px-6 lg:px-8 border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Left: Emblem & Institutional Typography */}
        <a 
          href="/" 
          onClick={handleRestart}
          title="Click to return to overview"
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-[#D5CEC2] shadow-sm p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img
              src="/images/Chinmaya_Logo.webp"
              alt="Chinmaya Vidyalaya Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#64C9CF]/15 text-[#0B6B72] border border-[#64C9CF]/30 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64C9CF]" />
                CBSE Affil. No. {OFFICIAL_SCHOOL_INFO.affiliationNo}
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-[10px] sm:text-[11px] font-mono text-[#181C20] font-semibold">
                School Code: {OFFICIAL_SCHOOL_INFO.schoolCode}
              </span>
            </div>
            <h1 className="font-cinzel font-bold text-lg sm:text-2xl md:text-3xl text-[#181C20] tracking-tight leading-none uppercase">
              {OFFICIAL_SCHOOL_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#334155] font-serif italic">
              "School with a difference" <span className="not-italic text-[11px] font-sans text-slate-500 hidden md:inline">— Vidyanagar, Boisar, Dist. Palghar</span>
            </p>
          </div>
        </a>

        {/* Right: Quick Action CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            to="/about/mandatory-information"
            className="px-4 py-2.5 text-xs font-semibold text-[#181C20] hover:text-[#DF711B] bg-white hover:bg-[#FFF7DF] border border-[#E7E2D8] hover:border-[#FDE49C] rounded-full transition-all flex items-center gap-2 shadow-sm font-sans"
          >
            <FileText className="w-3.5 h-3.5 text-[#DF711B]" />
            <span>Public Disclosures</span>
          </Link>

          <MagneticButton
            onClick={onOpenAdmissionDrawer}
            className="px-5 py-2.5 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold rounded-full transition-all shadow-md flex items-center gap-2.5 font-sans"
          >
            <GraduationCap className="w-4 h-4 text-[#FDE49C]" />
            <span>Admissions 2026-27</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </div>
          </MagneticButton>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2.5 rounded-xl text-[#181C20] bg-white border border-[#D5CEC2] hover:bg-[#F3EFE6] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>
    </div>
  );
};

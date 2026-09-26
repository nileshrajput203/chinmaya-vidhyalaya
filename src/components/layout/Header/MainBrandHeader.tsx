import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, PhoneCall, GraduationCap, ShieldCheck, Clock } from 'lucide-react';
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
  return (
    <div className="bg-white text-[#181C20] border-b border-[#E7E2D8] py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 w-full shadow-2xs relative z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 min-w-0">
        
        {/* Left: Emblem & Institutional Title Hierarchy */}
        <Link
          to="/"
          title="Chinmaya Vidyalaya Tarapur Home"
          className="flex items-center gap-2.5 sm:gap-4.5 group cursor-pointer min-w-0 flex-1"
        >
          {/* Official Emblem - Scaled proportionally on mobile */}
          <img
            src="/images/Chinmaya_Logo.webp"
            alt="Chinmaya Vidyalaya Emblem"
            className="h-12 xs:h-14 sm:h-20 lg:h-22 w-auto max-w-[3.25rem] sm:max-w-none object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
          />

          <div className="space-y-0.5 min-w-0">
            {/* Governing Trust Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] sm:text-[10px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block truncate">
                Central Chinmaya Mission Trust, Mumbai
              </span>
              <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[#DF711B]/40" />
              <span className="hidden md:inline-block text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Estd. 1995
              </span>
            </div>

            {/* School Name in Regal Typography */}
            <h1 className="font-cinzel font-black text-base xs:text-lg sm:text-2xl lg:text-[28px] text-[#0C1E34] tracking-tight leading-none uppercase group-hover:text-[#DF711B] transition-colors truncate">
              {OFFICIAL_SCHOOL_INFO.name}
            </h1>

            {/* Sub-identity & Authentic Motto */}
            <div className="flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 text-[11px] sm:text-[13px] text-slate-600">
              <span className="font-sans italic font-semibold text-[#DF711B] truncate max-w-[180px] sm:max-w-none">
                "{OFFICIAL_SCHOOL_INFO.tagline}"
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-[11px] font-sans text-slate-500">
                CBSE Affiliated No. 1130058
              </span>
            </div>
          </div>
        </Link>

        {/* Right: Executive Contact Hotline, SARAS Quick Link & Button-in-Button CTA */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          
          {/* Admissions & Campus Office Card */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7DF] text-[#DF711B] flex items-center justify-center shrink-0 border border-[#FDE49C]">
              <PhoneCall className="w-4 h-4 text-[#DF711B]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Contact Administration
              </span>
              <a 
                href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
                className="text-xs font-bold text-[#0C1E34] hover:text-[#DF711B] transition-colors block font-mono"
              >
                +91 {OFFICIAL_SCHOOL_INFO.contact.phone[0]}
              </a>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                <span>Mon–Sat: 8 AM–4 PM</span>
              </div>
            </div>
          </div>

          {/* Mandatory Public Disclosure Link */}
          <Link
            to="/about/mandatory-information"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E7E2D8] text-xs font-semibold text-slate-700 transition-colors"
            title="View Official CBSE Mandatory Disclosures"
          >
            <ShieldCheck className="w-4 h-4 text-[#DF711B]" />
            <span>Public Disclosure</span>
          </Link>

          {/* Primary CTA: Button-in-Button Architecture */}
          <button
            onClick={onOpenAdmissionDrawer}
            className="group relative inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-[#DF711B] to-[#C45B0E] hover:from-[#C45B0E] hover:to-[#9E3E07] text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer shrink-0"
            title="Open Admissions Enquiry Form"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider leading-none">
                Admissions 2026–27
              </span>
              <span className="text-[9px] text-amber-200/90 font-mono tracking-wide leading-none mt-0.5">
                Nursery to Class XII
              </span>
            </div>

            {/* Nested Circular Button Icon Container */}
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white text-white group-hover:text-[#DF711B] transition-colors duration-200">
              <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </button>

        </div>

        {/* Mobile Actions: Mini Apply CTA & Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmissionDrawer}
            className="px-3 py-1.5 rounded-full bg-[#DF711B] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-200" />
            <span>Apply</span>
          </button>

          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-xl border border-[#D5CEC2] bg-white text-[#181C20] hover:bg-[#FAF8F5] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#DF711B]" /> : <Menu className="w-6 h-6 text-[#181C20]" />}
          </button>
        </div>

      </div>
    </div>
  );
};

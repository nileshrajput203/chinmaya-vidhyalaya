import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Megaphone, FileText, ChevronRight } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

export const InstitutionTopBar: React.FC = () => {
  return (
    <div className="bg-[#071320] text-slate-200 text-[10.5px] sm:text-[11px] font-mono py-1.5 px-3 sm:px-4 border-b border-white/10 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2 sm:gap-4">
        
        {/* Left: CBSE Accreditation, School Code & Live Notice in Same Row */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-x-auto no-scrollbar whitespace-nowrap text-slate-300 py-0.5">
          {/* CBSE Tag with Pulse */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden xs:inline">CBSE AFFILIATED (10+2) • </span>
            <span>NO. {OFFICIAL_SCHOOL_INFO.affiliationNo}</span>
          </div>

          <span className="text-slate-600 shrink-0">•</span>

          {/* School Code */}
          <span className="text-slate-300 text-[9.5px] sm:text-xs shrink-0">
            CODE: <strong className="text-white font-bold">{OFFICIAL_SCHOOL_INFO.schoolCode}</strong>
          </span>

          <span className="text-slate-600 shrink-0">•</span>

          {/* Bulletin Ticker in same row */}
          <div className="inline-flex items-center gap-1.5 text-slate-300 shrink-0">
            <Megaphone className="w-3 h-3 text-[#DF711B] shrink-0" />
            <span className="text-[#FFB740] font-bold uppercase tracking-wider text-[9px] sm:text-[10px] shrink-0">
              Notice:
            </span>
            <span className="text-slate-200 text-[9.5px] sm:text-[11px]">
              Admissions Open 2026–27 (Nursery to Std XII)
            </span>
          </div>
        </div>

        {/* Right: Direct Helpline */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-slate-300 text-[10px] sm:text-[11px]">
          <a
            href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#FFB740] border border-white/10 transition-colors"
            title="Call Campus Helpline"
          >
            <Phone className="w-3 h-3 text-[#DF711B] shrink-0" />
            <span className="font-bold text-white tracking-tight">{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</span>
          </a>

          {/* Regulatory Quick Link */}
          <Link
            to="/about/mandatory-information"
            className="hidden md:inline-flex items-center gap-1 text-[#FFB740] hover:text-white transition-colors font-sans font-semibold text-[10px] uppercase tracking-wider"
          >
            <FileText className="w-3 h-3" />
            <span>SARAS Portal</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};


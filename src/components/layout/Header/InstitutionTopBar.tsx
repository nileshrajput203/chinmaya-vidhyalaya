import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Megaphone, FileText, ChevronRight } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

export const InstitutionTopBar: React.FC = () => {
  return (
    <div className="bg-[#071320] text-slate-200 text-[11px] font-mono py-2 px-4 border-b border-white/10 w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-y-2 gap-x-4">
        
        {/* Left: Verified CBSE Accreditation & Live Bulletin */}
        <div className="flex items-center gap-3 min-w-0 max-w-full overflow-hidden text-slate-300">
          {/* CBSE Tag with Pulse */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CBSE Affiliated (10+2) • No. {OFFICIAL_SCHOOL_INFO.affiliationNo}</span>
          </div>

          <span className="hidden sm:inline text-slate-600">|</span>

          {/* School Code & U-DISE */}
          <span className="hidden md:inline text-slate-400">
            School Code: <strong className="text-white">{OFFICIAL_SCHOOL_INFO.schoolCode}</strong>
          </span>

          <span className="hidden lg:inline text-slate-600">|</span>

          {/* Bulletin Ticker */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300 truncate max-w-md">
            <Megaphone className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
            <span className="text-[#DF711B] font-bold uppercase tracking-wider text-[10px] shrink-0">Notice:</span>
            <span className="truncate text-slate-300">Admissions Open 2025–26 (Nursery to Class IX & XI) • 100% AISSE Board Distinction</span>
          </div>
        </div>

        {/* Right: Verified Direct Contact & Quick Regulatory Access */}
        <div className="flex items-center gap-3 sm:gap-4 max-w-full ml-0 sm:ml-auto text-slate-300 text-[11px]">
          {/* Campus Helpline */}
          <a
            href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
            className="flex items-center gap-1.5 hover:text-[#FFB740] transition-colors"
            title="Call Campus Helpline"
          >
            <Phone className="w-3 h-3 text-[#DF711B]" />
            <span className="font-semibold text-slate-200">{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</span>
          </a>

          <div className="hidden sm:block h-3 w-[1px] bg-white/20" />

          {/* Campus Email */}
          <a
            href={`mailto:${OFFICIAL_SCHOOL_INFO.contact.email[0]}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#FFB740] transition-colors"
            title="Email School Office"
          >
            <Mail className="w-3 h-3 text-[#DF711B]" />
            <span className="truncate max-w-[180px]">{OFFICIAL_SCHOOL_INFO.contact.email[0]}</span>
          </a>

          <div className="hidden md:block h-3 w-[1px] bg-white/20" />

          {/* Quick Regulatory Disclosures */}
          <Link
            to="/about/mandatory-information"
            className="hidden md:flex items-center gap-1 text-[#FFB740] hover:text-white transition-colors font-sans font-semibold text-[10px] uppercase tracking-wider"
          >
            <FileText className="w-3 h-3" />
            <span>CBSE SARAS Portal</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};

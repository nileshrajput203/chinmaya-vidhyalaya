import { Phone, Mail, Award, Megaphone } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

export const InstitutionTopBar: React.FC = () => {
  return (
    <div className="bg-[#071320] text-white text-[11px] font-mono py-1.5 px-4 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        {/* Left: Live Marquee Notice */}
        <div className="flex items-center gap-2 overflow-hidden max-w-xl text-slate-300">
          <div className="flex items-center gap-1 text-[#D97745] font-bold shrink-0 uppercase tracking-wider">
            <Megaphone className="w-3.5 h-3.5 animate-pulse" />
            <span>Bulletin:</span>
          </div>
          <div className="truncate text-slate-300">
            Admissions Open (Nursery to Class IX & XI) • 100% AISSE Board Pass Distinction • CBSE Affiliation No. 1130058
          </div>
        </div>

        {/* Right: Verified Codes & Direct Contact */}
        <div className="flex items-center gap-5 shrink-0 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#D97745]" />
            <span>CBSE: <strong className="text-white">{OFFICIAL_SCHOOL_INFO.affiliationNo}</strong></span>
          </div>
          <div className="h-3 w-[1px] bg-white/20" />
          <a
            href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
            className="flex items-center gap-1.5 hover:text-[#D97745] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#D97745]" />
            <span>{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</span>
          </a>
          <div className="h-3 w-[1px] bg-white/20" />
          <a
            href={`mailto:${OFFICIAL_SCHOOL_INFO.contact.email[0]}`}
            className="flex items-center gap-1.5 hover:text-[#D97745] transition-colors"
          >
            <Mail className="w-3 h-3 text-[#D97745]" />
            <span>{OFFICIAL_SCHOOL_INFO.contact.email[0]}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

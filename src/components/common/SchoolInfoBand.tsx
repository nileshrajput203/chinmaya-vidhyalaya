import React from 'react';
import { Award, ShieldCheck, MapPin } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

export const SchoolInfoBand: React.FC = () => {
  return (
    <section className="bg-[#102A43] text-white py-8 border-y border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/15">
        {/* Item 1: Affiliation */}
        <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pl-0">
          <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-[#DF711B]" />
          </div>
          <div>
            <span className="text-xs text-slate-300 font-medium uppercase tracking-wider block">CBSE Affiliation</span>
            <strong className="text-xl font-bold font-serif text-white tracking-wide">No. {OFFICIAL_SCHOOL_INFO.affiliationNo}</strong>
          </div>
        </div>

        {/* Item 2: U-DISE Code */}
        <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pl-8">
          <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#DF711B]" />
          </div>
          <div>
            <span className="text-xs text-slate-300 font-medium uppercase tracking-wider block">U-DISE Code</span>
            <strong className="text-xl font-bold font-serif text-white tracking-wide">{OFFICIAL_SCHOOL_INFO.udiseNo}</strong>
          </div>
        </div>

        {/* Item 3: Location */}
        <div className="flex items-center justify-center md:justify-start gap-4 pt-4 md:pt-0 md:pl-8">
          <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-[#DF711B]" />
          </div>
          <div>
            <span className="text-xs text-slate-300 font-medium uppercase tracking-wider block">Location</span>
            <strong className="text-lg font-bold font-serif text-white">Boisar, Palghar, Maharashtra</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

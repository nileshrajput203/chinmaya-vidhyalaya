import React from 'react';
import { Award } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="bg-gradient-to-b from-[#FAF8F5] via-[#FFFBF2] to-[#FAF8F5] text-[#181C20] py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#E7E2D8]">
      {/* Background noise and decorative subtle warm glow using palette */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DF711B]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#64C9CF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#FFB740]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-3.5">
        <div className="flex flex-wrap items-center gap-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 bg-[#FFF7DF] text-[#DF711B] border border-[#FDE49C] text-[11px] font-mono font-bold px-3.5 py-1 uppercase tracking-widest rounded-full shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>{badge}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#64C9CF]/15 text-[#0B6B72] border border-[#64C9CF]/30 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64C9CF]" />
            CBSE AFFIL: {OFFICIAL_SCHOOL_INFO.affiliationNo} • ESTD. 1999
          </span>
        </div>

        <h1 className="font-cinzel font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#181C20] tracking-tight leading-tight uppercase">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

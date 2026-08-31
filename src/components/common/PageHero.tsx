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
    <div className="bg-[#0B1D30] text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-4 border-[#D97745]">
      {/* Background noise and decorative glow */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97745]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 bg-[#D97745] text-white text-[11px] font-mono font-bold px-3 py-1 uppercase tracking-widest rounded-md">
              <Award className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </span>
          )}
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
            CBSE AFFILIATION: {OFFICIAL_SCHOOL_INFO.affiliationNo} • ESTD. 1999
          </span>
        </div>

        <h1 className="font-cinzel font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight uppercase">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

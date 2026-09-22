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
    <div className="bg-[#FAF8F5] text-[#181C20] py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto space-y-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          {badge && (
            <span className="inline-flex items-center gap-1.5 bg-white text-[#181C20] border border-[#E7E2D8] text-[11px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>{badge}</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#555555] border border-[#E7E2D8] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DF711B]" />
            CBSE AFFIL: {OFFICIAL_SCHOOL_INFO.affiliationNo} • ESTD. 1995
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

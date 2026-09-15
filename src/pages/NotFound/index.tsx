import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import { PageHero } from '../../components/common/PageHero';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title="404 — Page Not Located" subtitle="The requested resource or page route could not be found." badge="Status 404" />
      
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center mx-auto shadow-sm border border-[#E7E2D8]">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="font-cinzel font-bold text-[#0B1D30] text-3xl">Page Unavailable</h2>
        <p className="text-sm text-[#4A5568] leading-relaxed font-light font-sans">
          The link you followed may be invalid or the section may have been reorganized. You can return to the main campus homepage or use the directory in our navigation menu above.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B1D30] hover:bg-[#DF711B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Home className="w-4 h-4 text-[#DF711B]" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

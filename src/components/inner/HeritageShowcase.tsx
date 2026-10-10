import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export const HeritageShowcase: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Prevent background scroll bleed when lightbox is active
  useBodyScrollLock(lightbox !== null);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
        {/* Hero Master Tribute Banner */}
        <SpotlightCard className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF3E8] to-[#F5ECE0] border-2 border-[#DF711B]/40 rounded-3xl p-8 sm:p-12 shadow-card space-y-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <BadgePill variant="amber" label="Spiritual Master & Visionary Founder" pulse />
                <span className="text-xs font-mono font-bold text-[#DF711B] bg-white px-2.5 py-1 rounded-md border border-[#DF711B]/30">
                  8 May 1916 – 3 August 1993
                </span>
              </div>

              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] leading-tight">
                Pujya Gurudev Swami Chinmayananda
              </h1>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Pujya Gurudev Swami Chinmayananda Saraswati was one of modern India’s most extraordinary spiritual teachers and educational reformers. A fearless freedom fighter during the Quit India movement, an analytical journalist, and an illumined Vedantin, he dedicated four decades to bringing the timeless wisdom of the Upanishads and Bhagavad Gita into contemporary daily life.
              </p>
              <blockquote className="font-cinzel text-base sm:text-lg text-[#181C20] font-bold leading-relaxed border-l-4 border-[#DF711B] pl-4 italic bg-white/70 p-4 rounded-r-2xl shadow-2xs">
                "Children are not vessels to be filled, but lamps to be lit. To illuminate a child’s heart is to illuminate the future of the nation."
              </blockquote>
            </div>

            <div className="lg:col-span-4">
              <div 
                onClick={() => setLightbox({
                  src: '/images/swami.jpeg',
                  title: 'Pujya Gurudev Swami Chinmayananda',
                  caption: 'Param Pujya Swami Chinmayananda Saraswati (1916–1993) — Master of Advaita Vedanta and founder of Chinmaya Mission.'
                })}
                className="rounded-2xl overflow-hidden border-2 border-[#DF711B] shadow-xl group bg-white cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src="/images/swami.jpeg"
                    alt="Pujya Gurudev Swami Chinmayananda"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E34]/90 text-white p-2.5 rounded-xl text-center text-xs font-mono font-bold backdrop-blur-sm">
                    Pujya Gurudev Swami Chinmayananda
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Full-Screen Archival Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-white border-t border-[#E7E2D8] space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                Chinmaya Archives • Sacred Heritage
              </span>
              <h3 className="font-serif font-bold text-xl text-[#181C20]">
                {lightbox.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {lightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeritageShowcase;

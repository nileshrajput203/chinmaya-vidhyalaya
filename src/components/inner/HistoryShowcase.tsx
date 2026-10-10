import React, { useState } from 'react';
import { GoogleMapSection } from '../maps/GoogleMapSection';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import Timeline, { JourneyItem } from '../ui/timeline';
import { ImageStreamHero, StreamImage } from '../ui/image-stream-hero';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { X } from 'lucide-react';
import { CAMPUS_STREAM_ARCHIVE } from '../../data/images';

interface ArchivalPhoto {
  id: string;
  title: string;
  era: string;
  year: string;
  image: string;
  caption: string;
  tag: string;
}


const CHINMAYA_TOP_MILESTONES: JourneyItem[] = [
  {
    id: "1993-conception",
    year: "1993",
    month: "April",
    content: "Envisaged by devoted followers of the Tarapur Chinmaya Mission Centre under the inspiring spiritual vision of Param Pujya Swami Chinmayanandaji to establish an educational lighthouse.",
  },
  {
    id: "1995-inauguration",
    year: "1995",
    month: "June",
    content: "Formally inaugurated on 18 June 1995 by H.H. Swami Purushottamanandaji — the very first Chinmaya Vidyalaya established across the Maharashtra–Gujarat–Goa region.",
  },
  {
    id: "2004-aisse",
    year: "2004",
    month: "March",
    content: "First batch of Standard X students appeared for the AISSE examinations, inaugurating our unbroken continuous tradition of 100% board examination distinctions.",
  },
  {
    id: "2026-present",
    year: "2026",
    month: "May",
    content: "Premier institution educating approximately 1,600 learners from Nursery through Senior Secondary (Science, Commerce & Arts) with state-of-the-art STEM and robotics laboratories.",
  },
];

const CHINMAYA_BOTTOM_MILESTONES: JourneyItem[] = [
  {
    id: "1994-groundbreaking",
    year: "1994",
    month: "October",
    content: "Construction of the first phase commenced in the sacred presence of Param Pujya Swami Tejomayanandaji, creating the foundation for holistic schooling.",
  },
  {
    id: "2003-cbse",
    year: "2003",
    month: "August",
    content: "Granted official composite affiliation by the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 1130058).",
  },
  {
    id: "2015-campus",
    year: "2015",
    month: "November",
    content: "Extensive campus expansion with modern computer and robotics laboratories, central knowledge library, and multi-sport athletic facilities.",
  },
];

// Sourced directly from central `src/data/images.ts`
const CAMPUS_STREAM_IMAGES: StreamImage[] = CAMPUS_STREAM_ARCHIVE;

export const HistoryShowcase: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<ArchivalPhoto | null>(null);

  // Prevent background scroll bleed while modal is open
  useBodyScrollLock(activePhoto !== null);

  return (
    <div className="w-full">
      {/* Top Archival Sections Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
        {/* Visual Header Grid with Archival Photography & 21st.dev Spotlight */}
      <InView>
        <SpotlightCard
          spotlightColor="rgba(223, 113, 27, 0.08)"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card"
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <BadgePill
                label="Over Three Decades of Educational Service"
                variant="saffron"
                pulse
              />
              <span className="text-xs font-mono text-slate-500">
                P-201, MIDC Area, Saravali, Boisar
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
              Three Decades of Educational & Cultural Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Chinmaya Vidyalaya Tarapur was established to integrate Swami Chinmayananda’s holistic educational vision with modern scholastic rigor in the industrial hub of Boisar. Holding the distinction of being the first school established by Chinmaya Mission in the Maharashtra–Gujarat–Goa zone, the institution nurtures over 1,600 learners with strong academic grounding and timeless values.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Inaugurated</span>
                <span className="font-cinzel font-bold text-lg text-[#181C20]">18 June 1995</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">CBSE Affiliation</span>
                <span className="font-cinzel font-bold text-lg text-[#DF711B]">1130058</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">School Code</span>
                <span className="font-cinzel font-bold text-lg text-[#181C20]">30040</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Current Strength</span>
                <span className="font-cinzel font-bold text-lg text-[#0B1E34]">~1,600 Learners</span>
              </div>
            </div>
          </div>

          {/* Genuine Campus Photo with Verified Context */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => setActivePhoto({
                id: 'campus-building',
                title: 'Chinmaya Vidyalaya Campus Building',
                era: 'Academic Campus',
                year: 'Boisar',
                image: '/images/banner-1.jpg',
                tag: 'Campus Infrastructure',
                caption: 'Spacious academic wings, laboratories, and green grounds at MIDC Saravali, Boisar.'
              })}
              className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md group bg-white cursor-pointer"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <picture>
                  <source srcSet="/images/banner-1.webp" type="image/webp" />
                  <img
                    src="/images/banner-1.jpg"
                    alt="Chinmaya Vidyalaya Campus Building"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
              </div>
              <div className="p-3 text-xs text-[#4A5568] text-center font-medium bg-white border-t border-[#E7E2D8] group-hover:text-[#DF711B] transition-colors">
                Chinmaya Vidyalaya Campus | Saravali, Boisar &rarr;
              </div>
            </div>
          </div>
        </SpotlightCard>
      </InView>






      </div>

      {/* ====================================================
          STANDALONE FULL-WIDTH PINNED TIMELINE (OUTSIDE CONTAINER)
         ==================================================== */}
      <section className="w-full pt-8 pb-4 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#DF711B] animate-bounce">
            <span>Scroll down to scrub through the milestones</span>
            <span>&darr;</span>
          </div>
        </div>
      </section>

      {/* Full Bleed Timeline (No Card Border, No Overflow-Hidden, True Edge-to-Edge) */}
      <div className="w-full">
        <Timeline
          title="Campus Journey"
          periodLabel="1993 — 2026"
          textColor="#181C20"
          mutedTextColor="#555555"
          activeColor="#DF711B"
          backgroundColor="#ffffff"
          imageUrl="/images/about2.jpeg"
          imageAlt="Chinmaya Vidyalaya Campus Building, Boisar"
          topData={CHINMAYA_TOP_MILESTONES}
          bottomData={CHINMAYA_BOTTOM_MILESTONES}
        />
      </div>

      {/* Visual Archives & Campus Life Stream Corridor (Full Bleed Edge-to-Edge Continuation) */}
      <section className="w-full bg-white pt-8 pb-16">
        <ImageStreamHero
          images={CAMPUS_STREAM_IMAGES}
          className="h-[560px] sm:h-[640px] w-full bg-white"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center pointer-events-none">
            <div className="px-6 space-y-2 pointer-events-auto">
              <h4 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-tight text-[#181C20] max-w-xl leading-tight bg-white/85 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-[#E7E2D8]/80 shadow-xs">
                Tradition Meets Modern Excellence
              </h4>
            </div>
            <p className="max-w-md text-balance px-6 text-xs sm:text-sm text-[#0B1E34] font-medium pointer-events-auto backdrop-blur-md bg-white/90 py-2.5 px-5 rounded-2xl border border-[#E7E2D8] shadow-sm">
              Saravali, Boisar • Nurturing over 1,600 minds from Nursery through Senior Secondary.
            </p>
          </div>
        </ImageStreamHero>
      </section>

      {/* Bottom Section: Campus Map Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InView>
          <GoogleMapSection />
        </InView>
      </div>

      {/* Archival Photo Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Viewport */}
            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Archival Details */}
            <div className="p-6 sm:p-7 bg-white border-t border-[#E7E2D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                  {activePhoto.tag}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Chinmaya Vidyalaya Archives
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#181C20]">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans pt-1">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

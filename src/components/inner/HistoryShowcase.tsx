import React from 'react';
import { GoogleMapSection } from '../maps/GoogleMapSection';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import Timeline, { JourneyItem } from '../ui/timeline';

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
    content: "Formally inaugurated by H.H. Swami Purushottamanandaji with 72 students and 4 teachers — the very first Chinmaya Vidyalaya established across Maharashtra–Gujarat–Goa.",
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
    content: "Granted official composite affiliation by the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 1130095).",
  },
  {
    id: "2015-campus",
    year: "2015",
    month: "November",
    content: "Extensive campus expansion with modern computer and robotics laboratories, central knowledge library, and multi-sport athletic facilities.",
  },
];

export const HistoryShowcase: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Visual Header Grid with Archival Photography & 21st.dev Spotlight */}
      <InView>
        <SpotlightCard
          spotlightColor="rgba(223, 113, 27, 0.08)"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card"
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <BadgePill
                label="Over Three Decades of Service"
                variant="saffron"
                pulse
              />
              <span className="text-xs font-mono text-slate-500">
                P-201, MIDC Area, Saravali, Boisar
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
              From 72 Students in 1995 to Over 1,600 Learners Today
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Chinmaya Vidyalaya Tarapur was born out of a noble vision to bring Swami Chinmayananda’s holistic philosophy to the industrial hub of Boisar. Holding the distinction of being the first school established by Chinmaya Mission in the Maharashtra–Gujarat–Goa zone, the institution has nurtured thousands of self-reliant, patriotic, and academically accomplished graduates.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Inaugurated</span>
                <span className="font-cinzel font-bold text-lg text-[#181C20]">18 June 1995</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">CBSE Affiliation</span>
                <span className="font-cinzel font-bold text-lg text-[#DF711B]">1130095</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Initial Batch</span>
                <span className="font-cinzel font-bold text-lg text-[#181C20]">72 Students</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Current Strength</span>
                <span className="font-cinzel font-bold text-lg text-[#0B1E34]">~1,600 Students</span>
              </div>
            </div>
          </div>

          {/* Historic Campus Photo with Archival Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md group bg-white">
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src="/images/history2.jpeg"
                  alt="Chinmaya Vidyalaya Historic Campus Building"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B1E34]/90 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                  Historic Campus Foundation
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white/90 px-2 py-0.5 rounded text-[10px] font-mono">
                  Boisar • Circa 1995
                </div>
              </div>
              <div className="p-3 text-xs text-[#4A5568] text-center font-medium bg-[#FAF8F5] border-t border-[#E7E2D8]">
                Chinmaya Vidyalaya Campus (Est. 1995) | Boisar, Tarapur
              </div>
            </div>
          </div>
        </SpotlightCard>
      </InView>

      {/* ====================================================
          INTERACTIVE HYPERIUX VAULT PINNED TIMELINE
         ==================================================== */}
      <div className="rounded-3xl overflow-hidden border border-[#E7E2D8] shadow-card bg-[#FAF8F5]">
        <div className="p-6 sm:p-8 border-b border-[#E7E2D8] bg-[#FAF8F5] flex flex-col sm:flex-row justify-between sm:items-end gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
              Institutional Heritage • Three Decades of Growth
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] m-0">
              Milestones of Excellence & Growth
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-500 m-0">
            Scroll down to scrub through the timeline &rarr;
          </p>
        </div>

        <Timeline
          title="Campus Journey"
          periodLabel="1993 — 2026"
          textColor="#181C20"
          mutedTextColor="#555555"
          activeColor="#DF711B"
          backgroundColor="#FAF8F5"
          imageUrl="/images/history2.jpeg"
          imageAlt="Chinmaya Vidyalaya Historic Campus 1995"
          duration={1.2}
          topData={CHINMAYA_TOP_MILESTONES}
          bottomData={CHINMAYA_BOTTOM_MILESTONES}
        />
      </div>

      {/* Campus Map */}
      <InView>
        <div className="pt-4">
          <GoogleMapSection />
        </div>
      </InView>
    </div>
  );
};

import React from 'react';
import { Calendar, Building2, Users, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { GoogleMapSection } from '../maps/GoogleMapSection';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface Milestone {
  year: string;
  title: string;
  tag: string;
  description: string;
  image?: string;
  icon: React.ElementType;
}

const MILESTONES: Milestone[] = [
  {
    year: '1993',
    title: 'Divine Conception & Community Vision',
    tag: 'Founding Vision',
    description:
      'Envisaged by devoted followers of the Tarapur Chinmaya Mission Centre under the inspiring spiritual vision of Param Pujya Swami Chinmayanandaji to establish a value-based educational lighthouse in Boisar.',
    icon: Sparkles
  },
  {
    year: '1994',
    title: 'Groundbreaking & Construction Phase',
    tag: 'Foundation Laid',
    description:
      'Construction of the first phase commenced in the sacred presence of Param Pujya Swami Tejomayanandaji, creating the architectural foundation for holistic schooling.',
    icon: Building2
  },
  {
    year: '18 June 1995',
    title: 'Grand Inauguration: First School in the Zone',
    tag: 'Historic Opening',
    description:
      'Formally inaugurated by H.H. Swami Purushottamanandaji with an initial batch of 72 students and 4 teachers. Notably, it stands as the VERY FIRST Chinmaya Vidyalaya established across the Maharashtra–Gujarat–Goa zone.',
    image: '/images/history2.jpeg',
    icon: Calendar
  },
  {
    year: '2003',
    title: 'CBSE Affiliation Granted',
    tag: 'Composite Affiliation',
    description:
      'The Vidyalaya was granted official composite affiliation by the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 1130058, School Code: 30040, U-DISE: 27361116004).',
    icon: ShieldCheck
  },
  {
    year: '2004–2005',
    title: 'Maiden AISSE Class X Examination Batch',
    tag: 'Academic Distinction',
    description:
      'The first batch of Standard X students appeared for the All India Secondary School Examination (AISSE), inaugurating a continuous tradition of 100% board examination distinctions.',
    icon: Award
  },
  {
    year: 'Present Day',
    title: 'Premier Center of 1,600+ Students',
    tag: 'Flourishing Campus',
    description:
      'Now educating approximately 1,600 students across Nursery through Senior Secondary (Arts, Commerce & Science), guided by Central Chinmaya Mission Trust, Mumbai and the Local Managing Committee.',
    image: '/images/about2.jpeg',
    icon: Users
  }
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
                <span className="font-cinzel font-bold text-lg text-[#DF711B]">1130058</span>
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

      {/* Chronological Milestone Cards with 21st.dev InView & Spotlight */}
      <div className="bg-white border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
            Institutional Timeline
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
            Milestones of Excellence & Growth
          </h3>
        </div>

        <div className="relative border-l-2 border-[#DF711B]/30 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {MILESTONES.map((m, idx) => {
            const Icon = m.icon;
            return (
              <InView key={idx}>
                <div className="relative group">
                  <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-6 h-6 rounded-full bg-[#DF711B] border-4 border-[#FFF9F2] shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <SpotlightCard
                    spotlightColor="rgba(223, 113, 27, 0.06)"
                    className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-2xl p-6 group-hover:border-[#DF711B] transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-[#DF711B]">
                            {m.year}
                          </span>
                          <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#181C20]">
                            {m.title}
                          </h4>
                        </div>
                      </div>
                      <BadgePill label={m.tag} variant="neutral" />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {m.description}
                    </p>

                    {m.image && (
                      <div className="pt-2">
                        <div className="rounded-xl overflow-hidden border border-[#E7E2D8] max-w-md aspect-[16/9] shadow-2xs">
                          <img
                            src={m.image}
                            alt={m.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    )}
                  </SpotlightCard>
                </div>
              </InView>
            );
          })}
        </div>
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

import React, { useState } from 'react';
import { GoogleMapSection } from '../maps/GoogleMapSection';
import { InView } from '../ui/in-view';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import Timeline, { JourneyItem } from '../ui/timeline';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { Quote, Users, Award, BookOpen, ZoomIn, X, Building2, CheckCircle2, ChevronRight, School } from 'lucide-react';

interface ArchivalPhoto {
  id: string;
  title: string;
  era: string;
  year: string;
  image: string;
  caption: string;
  tag: string;
}

const ARCHIVAL_GALLERY: ArchivalPhoto[] = [
  {
    id: 'archival-1',
    title: 'The Pioneer Campus Foundation',
    era: 'Genesis Era',
    year: '1995',
    image: '/images/history2.jpeg',
    tag: 'Foundation & Heritage',
    caption: 'First batch of 72 students and 4 pioneer teachers at Saravali, Boisar — marking the very first Chinmaya Vidyalaya in Maharashtra.',
  },
  {
    id: 'archival-2',
    title: 'Pujya Gurudev’s Living Spiritual Ethos',
    era: 'Sacred Tradition',
    year: '1993 – Present',
    image: '/images/swami.jpeg',
    tag: 'Chinmaya Vision Program',
    caption: 'Daily Guru Paduka Pooja, Geeta chanting, and value-based schooling rooted in the sublime vision of Param Pujya Swami Chinmayananda.',
  },
  {
    id: 'archival-3',
    title: 'Academic Quadrangle & Multi-Storey Wings',
    era: 'Campus Growth',
    year: '2004 – 2015',
    image: '/images/about2.jpeg',
    tag: 'Infrastructure Expansion',
    caption: 'Gradual expansion of spacious classrooms, sunlit corridors, and modern scholastic wings accommodating over 1,600 learners.',
  },
  {
    id: 'archival-4',
    title: 'Modern Digital & Scholastic Classrooms',
    era: 'Contemporary Era',
    year: '2020 – 2026',
    image: '/images/chinmaya/academics/classroom_learning_001.jpg',
    tag: 'Academic Excellence',
    caption: 'Transition to interactive multimedia smart classrooms, diagnostic ASSET testing, and unbroken 100% CBSE board distinction records.',
  },
  {
    id: 'archival-5',
    title: 'Cultural Festivals & Youth Leadership',
    era: 'Holistic Culture',
    year: 'Annual Tradition',
    image: '/images/chinmaya/cultural/cultural_celebration_001.jpg',
    tag: 'Arts & Cultural Heritage',
    caption: 'Grand annual day celebrations, classical music and dance, patriotic rallies, and community celebrations connecting students to heritage.',
  },
  {
    id: 'archival-6',
    title: 'Tara Crescent Athletic Ground & Sports',
    era: 'Physical Development',
    year: 'Active Grounds',
    image: '/images/banner-1.jpg',
    tag: 'Athletics & Houses',
    caption: 'Expansive outdoor grounds hosting four-house athletic meets, football, basketball, yoga, and state-level sports championships.',
  },
];

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
  const [activePhoto, setActivePhoto] = useState<ArchivalPhoto | null>(null);

  // Prevent background scroll bleed while modal is open
  useBodyScrollLock(activePhoto !== null);

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
                label="Over Three Decades of Educational Service"
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
                <span className="font-cinzel font-bold text-lg text-[#0B1E34]">~1,600 Learners</span>
              </div>
            </div>
          </div>

          {/* Historic Campus Photo with Archival Details */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => setActivePhoto(ARCHIVAL_GALLERY[0])}
              className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md group bg-white cursor-pointer"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src="/images/history2.jpeg"
                  alt="Chinmaya Vidyalaya Historic Campus Building"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B1E34]/90 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                  Historic Campus Foundation
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white/90 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                  <ZoomIn className="w-3 h-3 text-[#DF711B]" />
                  <span>Boisar • Circa 1995</span>
                </div>
              </div>
              <div className="p-3 text-xs text-[#4A5568] text-center font-medium bg-[#FAF8F5] border-t border-[#E7E2D8] group-hover:text-[#DF711B] transition-colors">
                Chinmaya Vidyalaya Campus (Est. 1995) | Boisar, Tarapur &rarr;
              </div>
            </div>
          </div>
        </SpotlightCard>
      </InView>

      {/* ====================================================
          FOUNDER & SPIRITUAL ROOTS SPOTLIGHT
         ==================================================== */}
      <InView>
        <div className="bg-gradient-to-br from-[#0B1D30] to-[#162B45] text-white rounded-3xl p-8 sm:p-10 border border-[#233B59] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#DF711B]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Spiritual Vision Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#DF711B]/40 shadow-2xl bg-black/40">
                <img
                  src="/images/swami.jpeg"
                  alt="Param Pujya Swami Chinmayananda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="text-[11px] font-serif font-bold text-amber-200 block">
                    Pujya Gurudev
                  </span>
                  <span className="text-[9px] font-mono text-white/75 uppercase tracking-wider block">
                    Swami Chinmayananda
                  </span>
                </div>
              </div>
            </div>

            {/* Foundational Philosophy */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF711B]/20 border border-[#DF711B]/40 text-[#DF711B] text-xs font-mono font-bold tracking-wide">
                <Quote className="w-3.5 h-3.5" />
                <span>The Guiding Light of Chinmaya Vision Program</span>
              </div>

              <blockquote className="font-serif italic text-lg sm:text-2xl text-[#FAF8F5] leading-relaxed font-light">
                “We are not here to teach our children merely how to make a living, but how to live. To enable them to meet life’s situations with courage and composure.”
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Under the blessings of <strong className="text-white">Param Pujya Swami Tejomayanandaji</strong> who blessed the foundation stone in 1994, and <strong className="text-white">H.H. Swami Purushottamanandaji</strong> who inaugurated the school on 18 June 1995, Chinmaya Vidyalaya Tarapur continues to serve as an enduring temple of holistic child development.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-amber-200/90">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B]" />
                  Integrated Child Development
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B]" />
                  Indian Cultural Ethos
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B]" />
                  Patriotism & Universal Outlook
                </span>
              </div>
            </div>
          </div>
        </div>
      </InView>

      {/* ====================================================
          CURATED ARCHIVAL PHOTOGRAPHIC GALLERY
         ==================================================== */}
      <InView>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E7E2D8] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
                Visual Archives • 1995 to Present
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
                Archival Heritage Gallery
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-sans max-w-sm">
              Click on any photograph to view high-resolution archival details and historic captions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARCHIVAL_GALLERY.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="group bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-xs hover:shadow-card hover:border-[#DF711B]/60 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1D30]/85 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold">
                    {item.year}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block mb-1">
                      {item.tag}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#181C20] group-hover:text-[#DF711B] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2 mt-1.5">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EFECE6] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{item.era}</span>
                    <span className="inline-flex items-center gap-1 text-[#DF711B] font-semibold group-hover:translate-x-0.5 transition-transform">
                      View photo <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InView>

      {/* ====================================================
          THEN & NOW: INSTITUTIONAL TRANSFORMATION
         ==================================================== */}
      <InView>
        <div className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-6 sm:p-9 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
                Three Decades of Progress
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
                Then & Now: Institutional Evolution
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              1995 Pioneer Genesis vs 2026 Academic Lighthouse
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1995 Genesis Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E7E2D8] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-mono font-bold text-xs">
                    95
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#181C20] text-base">Inception Era (1995)</h4>
                    <span className="text-[11px] text-slate-500 font-mono">Founding Vidyalaya Campus</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-mono font-bold">
                  Genesis
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 font-sans">
                <li className="flex items-start gap-2.5">
                  <Users className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                  <span><strong>72 Students:</strong> Initial batch pioneering holistic education in Saravali.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Award className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                  <span><strong>4 Pioneer Educators:</strong> Passionate founding faculty laying the academic bedrock.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Building2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                  <span><strong>Single Foundational Block:</strong> Ground floor classrooms amid open industrial greens.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                  <span><strong>Pre-Primary & Primary:</strong> Foundational schooling with daily prayers & Sanskrit chanting.</span>
                </li>
              </ul>
            </div>

            {/* 2026 Contemporary Card */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#DF711B]/40 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#DF711B]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#DF711B] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                    26
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#181C20] text-base">Academic Lighthouse (Today)</h4>
                    <span className="text-[11px] text-[#DF711B] font-mono font-semibold">CBSE Affil. No. 1130095</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-mono font-bold">
                  Premier Center
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-sans relative z-10">
                <li className="flex items-start gap-2.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>~1,600 Learners:</strong> Thriving student community from Nursery through Class XII.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>60+ Specialized Faculty:</strong> CBSE-certified subject educators and career mentors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <School className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Comprehensive Facilities:</strong> 3 Science labs, Robotics lab, IT lab, Library & Athletic turf.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Senior Secondary Streams:</strong> Science, Commerce & Arts with 100% board examination distinction.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
              <div className="absolute top-4 left-4 bg-[#0B1D30]/90 text-white text-xs font-mono px-3 py-1 rounded-full border border-white/20">
                {activePhoto.year} • {activePhoto.era}
              </div>
            </div>

            {/* Archival Details */}
            <div className="p-6 sm:p-7 bg-[#FAF8F5] border-t border-[#E7E2D8] space-y-2">
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

import React, { useState, useRef, useEffect } from 'react';
import { Eye, LayoutGrid, ZoomIn, X } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import Timeline, { JourneyItem } from '../ui/timeline';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface LifePhase {
  phase: string;
  years: string;
  tag: string;
  title: string;
  description: string;
  impact: string;
  quote?: string;
  image: string;
  imageCaption: string;
}

const PHASES: LifePhase[] = [
  {
    phase: '01',
    years: '1916 – 1947',
    tag: 'The Patriotic Youth',
    title: 'From Balan Menon to Freedom Fighter',
    image: '/images/swamiji.webp',
    imageCaption: 'Young Balakrishna Menon in Kerala — ardent patriot, political prisoner in 1942, and fearless investigative journalist.',
    description:
      'Born Balakrishna Menon in Ernakulam, Kerala, he was an ardent nationalist who participated in the Quit India Movement of 1942, was imprisoned by the British, and later became a sharp, outspoken investigative journalist writing for "The National Herald".',
    impact: 'Instilled an uncompromising love for the motherland and an analytical, probing journalistic inquiry that questioned orthodox dogmas.',
    quote: '"I went to the Himalayas not to become a Swami, but to expose the sadhus as fraud. But I found Truth standing tall in the snow."'
  },
  {
    phase: '02',
    years: '1947 – 1949',
    tag: 'Sannyasa in Rishikesh',
    title: 'Meeting Swami Sivananda & Sacred Initiation',
    image: '/images/guru-paduka-pooja.webp',
    imageCaption: 'Ordained into Holy Sannyasa on Mahashivaratri (25 February 1949) at the Divine Life Society, Rishikesh.',
    description:
      'Traveling to the Himalayas in 1947 to investigate spirituality, his analytical skepticism was transformed by Sri Swami Sivananda at the Divine Life Society. On Mahashivaratri (25 February 1949), he was ordained into Sannyasa as Swami Chinmayananda ("One who revels in pure Consciousness").',
    impact: 'A profound turning point from intellectual observation to direct spiritual awakening and complete renunciation.',
    quote: '"Renunciation is not giving up the world; it is giving up the ego and its claim on the world."'
  },
  {
    phase: '03',
    years: '1949 – 1951',
    tag: 'Himalayan Austerities',
    title: 'Intensive Shastric Study under Swami Tapovan Maharaj',
    image: '/images/swami.jpeg',
    imageCaption: 'Rigorous scriptural tapas in Uttarkashi under the austere sage Swami Tapovan Maharaj, mastering the Prasthanatraya.',
    description:
      'In Uttarkashi, Gurudev spent eight rigorous years undergoing scriptural mastery under the austere seer Swami Tapovan Maharaj, thoroughly absorbing the Prasthanatraya (Upanishads, Bhagavad Gita, and Brahma Sutras) in Sanskrit.',
    impact: 'Gained unshakeable mastery over Vedantic logic, Sanskrit semantics, and the spiritual physics of human consciousness.',
    quote: '"Knowledge without living it is a burden; living it without knowledge is dangerous."'
  },
  {
    phase: '04',
    years: '1951 – 1993',
    tag: 'Global Renaissance',
    title: 'The Geeta Jnana Yajnas & Over 100 Chinmaya Vidyalayas',
    image: '/images/history2.jpeg',
    imageCaption: 'Historic Pune Jnana Yajna in 1951 launching a 40-year global spiritual movement and establishing over 100 Vidyalayas.',
    description:
      'Starting with his historic first Geeta Jnana Yajna in Pune on 31 December 1951, Gurudev addressed millions globally across 576 Yajnas, authored over 95 authoritative commentaries, and founded over 100 Chinmaya Vidyalayas rooted in the Chinmaya Vision Programme.',
    impact: 'Democratized sacred Vedic knowledge in English for the youth and modern thinkers, founding institutions that educate hundreds of thousands of students worldwide.',
    quote: '"Children are not vessels to be filled, but lamps to be lit."'
  }
];

const GURUDEV_TOP_MILESTONES: JourneyItem[] = [
  {
    id: "1916-birth",
    year: "1916",
    month: "May",
    tag: "Sacred Advent",
    image: "/images/swamiji.webp",
    imageAlt: "Balan Menon in youth",
    content: "Born Balakrishna Menon in Ernakulam, Kerala — brilliant, fiery, and deeply passionate about the freedom of mother India.",
  },
  {
    id: "1949-sannyasa",
    year: "1949",
    month: "February",
    tag: "Sannyasa Diksha",
    image: "/images/guru-paduka-pooja.webp",
    imageAlt: "Sacred Sannyasa Initiation",
    content: "Ordained into holy Sannyasa on Mahashivaratri by Swami Sivananda at Rishikesh as Swami Chinmayananda ('One who revels in Consciousness').",
  },
  {
    id: "1953-mission",
    year: "1953",
    month: "August",
    tag: "Chinmaya Mission",
    image: "/images/swami.jpeg",
    imageAlt: "Chinmaya Mission foundation",
    content: "Devotees establish Chinmaya Mission in Chennai to systematically share Advaita Vedanta with modern society.",
  },
  {
    id: "1993-mahasamadhi",
    year: "1993",
    month: "August",
    tag: "Mahasamadhi",
    image: "/images/swami_chinmayananda_cutout.webp",
    imageAlt: "Pujya Gurudev Eternal Vision",
    content: "Attained Mahasamadhi in San Diego, leaving behind 576 Jnana Yajnas, over 100 schools, and millions of awakened hearts.",
  },
];

const GURUDEV_BOTTOM_MILESTONES: JourneyItem[] = [
  {
    id: "1942-freedom",
    year: "1942",
    month: "August",
    tag: "Quit India Movement",
    image: "/images/banner-1.jpg",
    imageAlt: "National freedom movement",
    content: "Ardent nationalist imprisoned by the British; later became a fearless investigative journalist for The National Herald.",
  },
  {
    id: "1951-tapas",
    year: "1951",
    month: "October",
    tag: "Uttarkashi Tapas",
    image: "/images/swamiji.png",
    imageAlt: "Himalayan Tapas in Uttarkashi",
    content: "Mastered the Upanishads, Bhagavad Gita, and Brahma Sutras during eight years of austere tapas under Swami Tapovan Maharaj.",
  },
  {
    id: "1965-vidyalayas",
    year: "1965",
    month: "June",
    tag: "Chinmaya Vidyalayas",
    image: "/images/history2.jpeg",
    imageAlt: "First Chinmaya Vidyalayas",
    content: "Formulated the Chinmaya Vision Programme (CVP), establishing values-based schools uniting Indian cultural ethos with modern science.",
  },
];

export const HeritageShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll bleed when lightbox is active
  useBodyScrollLock(lightbox !== null);

  const activePhase = PHASES[activeIdx];

  useEffect(() => {
    if (stageRef.current && !showAllGrid) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeIdx, showAllGrid]);

  return (
    <div className="space-y-12">
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

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181C20] leading-tight">
              Pujya Gurudev Swami Chinmayananda
            </h2>
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

        {/* View Switcher and Phase Pills */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#DF711B]/20">
          <div className="flex flex-wrap items-center gap-2">
            {PHASES.map((p, idx) => (
              <button
                key={p.phase}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setShowAllGrid(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  !showAllGrid && activeIdx === idx
                    ? 'bg-[#0B1E34] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-[#FAF8F5] border border-[#E7E2D8]'
                }`}
              >
                <span>Phase {p.phase}</span>
                <span className="hidden sm:inline opacity-75">• {p.tag}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllGrid(!showAllGrid)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#DF711B] hover:text-[#c45f12] bg-white px-3.5 py-2 rounded-xl border border-[#DF711B]/30 transition-colors ml-auto shadow-2xs cursor-pointer"
          >
            {showAllGrid ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Focus Studio View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All 4 Phases Grid</span>
              </>
            )}
          </button>
        </div>
      </SpotlightCard>

      {/* ====================================================
          PHASES VISUAL STUDIO (WITH PHOTO & DETAILS)
         ==================================================== */}
      {!showAllGrid ? (
        <div ref={stageRef}>
          <SpotlightCard className="bg-white border-2 border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  Phase {activePhase.phase} • {activePhase.years}
                </span>
                <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] pt-1">
                  {activePhase.title}
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#FAF3E8] text-[#DF711B] border border-[#FDE49C] shrink-0">
                {activePhase.tag}
              </span>
            </div>

            {/* Split: Details on Left, Authentic Photo on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {activePhase.description}
                </p>

                <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-2xl space-y-2 shadow-2xs">
                  <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                    Historical & Spiritual Significance:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activePhase.impact}
                  </p>
                </div>

                {activePhase.quote && (
                  <div className="bg-[#FAF3E8] border border-[#FDE49C] p-5 rounded-2xl space-y-2 flex flex-col justify-center shadow-2xs">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#DF711B] tracking-wider block">
                      Gurudev's Words:
                    </span>
                    <blockquote className="font-cinzel italic text-xs sm:text-sm text-[#181C20] font-semibold leading-relaxed">
                      {activePhase.quote}
                    </blockquote>
                  </div>
                )}
              </div>

              {/* Phase Photo Card */}
              <div className="lg:col-span-5">
                <div 
                  onClick={() => setLightbox({
                    src: activePhase.image,
                    title: `Phase ${activePhase.phase}: ${activePhase.title}`,
                    caption: activePhase.imageCaption
                  })}
                  className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white shadow-md group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={activePhase.image}
                      alt={activePhase.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1D30]/85 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-md">
                      {activePhase.years}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border-t border-[#E7E2D8]">
                    <span className="text-[10px] font-mono text-[#DF711B] font-bold block uppercase tracking-wider">
                      Archival Record
                    </span>
                    <p className="text-xs text-slate-600 leading-snug pt-0.5 font-sans">
                      {activePhase.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      ) : (
        /* View Mode 2: All 4 Phases Grid with Photos */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHASES.map((p, idx) => (
            <SpotlightCard
              key={p.phase}
              className="bg-white border border-[#E7E2D8] p-6 rounded-3xl shadow-card space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#E7E2D8] bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#0B1D30]/85 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                    Phase {p.phase} • {p.years}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E2D8] text-[#DF711B] font-bold">
                    {p.tag}
                  </span>
                </div>
                <h4 className="font-cinzel font-bold text-lg text-[#181C20]">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Chinmaya Heritage</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx);
                    setShowAllGrid(false);
                  }}
                  className="text-xs font-mono text-[#DF711B] font-bold hover:underline cursor-pointer"
                >
                  Focus In Studio &rarr;
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* ====================================================
          INTERACTIVE HYPERIUX VAULT PINNED TIMELINE
          (WITH SMALL PHOTO THUMBNAILS & DATES)
         ==================================================== */}
      <div className="rounded-3xl overflow-hidden border border-[#E7E2D8] shadow-card bg-[#FAF8F5]">
        <div className="p-6 sm:p-8 border-b border-[#E7E2D8] bg-[#FAF8F5] flex flex-col sm:flex-row justify-between sm:items-end gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
              Sacred Chronicle • 1916 to 1993
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] m-0">
              The Journey of Swami Chinmayananda
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-500 m-0">
            Scroll down to scrub through the visual milestones &rarr;
          </p>
        </div>

        <Timeline
          title="Gurudev's Journey"
          periodLabel="1916 — 1993"
          textColor="#181C20"
          mutedTextColor="#555555"
          activeColor="#DF711B"
          backgroundColor="#FAF8F5"
          imageUrl="/images/swami.jpeg"
          imageAlt="Param Pujya Swami Chinmayananda"
          duration={1.2}
          topData={GURUDEV_TOP_MILESTONES}
          bottomData={GURUDEV_BOTTOM_MILESTONES}
        />
      </div>

      {/* Full-Screen Archival Lightbox Modal */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
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

            <div className="p-6 bg-[#FAF8F5] border-t border-[#E7E2D8] space-y-2">
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

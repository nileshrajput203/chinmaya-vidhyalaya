import React, { useState, useRef, useEffect } from 'react';
import { Eye, LayoutGrid } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface LifePhase {
  phase: string;
  years: string;
  tag: string;
  title: string;
  description: string;
  impact: string;
  quote?: string;
}

const PHASES: LifePhase[] = [
  {
    phase: '01',
    years: '1916 – 1947',
    tag: 'The Patriotic Youth',
    title: 'From Balan Menon to Freedom Fighter',
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
    description:
      'Starting with his historic first Geeta Jnana Yajna in Pune on 31 December 1951, Gurudev addressed millions globally across 576 Yajnas, authored over 95 authoritative commentaries, and founded over 100 Chinmaya Vidyalayas rooted in the Chinmaya Vision Programme.',
    impact: 'Democratized sacred Vedic knowledge in English for the youth and modern thinkers, founding institutions that educate hundreds of thousands of students worldwide.',
    quote: '"Children are not vessels to be filled, but lamps to be lit."'
  }
];

export const HeritageShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

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
    <div className="space-y-10">
      {/* Hero Master Tribute Banner */}
      <SpotlightCard className="bg-gradient-to-br from-[#FFF9F2] via-[#FAF3E8] to-[#F5ECE0] border-2 border-[#DF711B]/40 rounded-3xl p-8 sm:p-12 shadow-card space-y-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <BadgePill variant="amber" label="Spiritual Master & Visionary Founder" icon="sparkles" />
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
            <div className="rounded-2xl overflow-hidden border-2 border-[#DF711B] shadow-xl group bg-white">
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src="/images/swami.jpeg"
                  alt="Pujya Gurudev Swami Chinmayananda"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E34]/90 text-white p-2.5 rounded-xl text-center text-xs font-mono font-bold backdrop-blur-sm">
                  Pujya Gurudev Swami Chinmayananda
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher and Timeline Pills */}
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
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
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#DF711B] hover:text-[#c45f12] bg-white px-3.5 py-2 rounded-xl border border-[#DF711B]/30 transition-colors ml-auto shadow-2xs"
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

      {/* View Mode 1: Interactive Focus Studio (Zero-Eye-Wander) */}
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

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {activePhase.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                  Historical & Spiritual Significance:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activePhase.impact}
                </p>
              </div>

              {activePhase.quote && (
                <div className="bg-[#FAF3E8] border border-[#FDE49C] p-5 rounded-2xl space-y-2 flex flex-col justify-center">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#DF711B] tracking-wider block">
                    Gurudev's Words:
                  </span>
                  <blockquote className="font-cinzel italic text-xs sm:text-sm text-[#181C20] font-semibold leading-relaxed">
                    {activePhase.quote}
                  </blockquote>
                </div>
              )}
            </div>
          </SpotlightCard>
        </div>
      ) : (
        /* View Mode 2: All 4 Phases Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHASES.map((p, idx) => (
            <SpotlightCard
              key={p.phase}
              className="bg-white border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl shadow-card space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#DF711B]">
                    Phase {p.phase} • {p.years}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E2D8] text-slate-500">
                    {p.tag}
                  </span>
                </div>
                <h4 className="font-cinzel font-bold text-xl text-[#181C20]">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E2D8] flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Chinmaya Heritage</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx);
                    setShowAllGrid(false);
                  }}
                  className="text-xs font-mono text-[#DF711B] font-bold hover:underline"
                >
                  Focus In Studio →
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
};

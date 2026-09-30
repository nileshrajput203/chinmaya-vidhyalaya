import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Sparkles, Microscope, BarChart3, Heart, LayoutGrid, Eye } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface StrategyStep {
  step: string;
  title: string;
  tag: string;
  badge: string;
  icon: React.ReactNode;
  image: string;
  secondaryImage?: string;
  description: string;
  deepDive: string;
  cbseBenchmark: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
}

const STRATEGIES: StrategyStep[] = [
  {
    step: '01',
    title: 'Inquiry-Based & Experiential Discovery',
    tag: 'Active Learning',
    badge: 'Cognitive Engagement',
    icon: <Sparkles className="w-5 h-5 text-[#DF711B]" />,
    image: '/images/chinmaya/academics/classroom_learning_001.jpg',
    secondaryImage: '/images/school_events/School_Event_2026-09-27_004.jpg',
    description:
      'Rather than passive rote-memorization, teachers guide students through investigative questions, physical scientific models, and structured thought experiments that ignite genuine curiosity.',
    deepDive:
      'Classes begin with real-world phenomena or mathematical puzzles before formulas are introduced. Students debate, hypothesize, and collaborate in peer squads, internalizing core principles naturally.',
    cbseBenchmark: 'Aligned with CBSE Experiential Learning Directives & NEP 2020 Pedagogical Framework',
    highlights: [
      'Socratic dialogue encouraging students to question assumptions',
      'Connecting theoretical CBSE formulas to daily physical observations',
      'Collaborative peer study circles solving authentic applied challenges'
    ],
    metrics: [
      { label: 'Student Engagement', value: '100% Active' },
      { label: 'Rote Recall Dependency', value: 'Replaced with Logic' }
    ]
  },
  {
    step: '02',
    title: 'Laboratory Verification & STEM Rigor',
    tag: 'Practical Mastery',
    badge: 'Scientific Temper',
    icon: <Microscope className="w-5 h-5 text-[#DF711B]" />,
    image: '/images/phys.jpeg',
    secondaryImage: '/images/it-lab.jpg',
    description:
      'Every major scientific concept in Physics, Chemistry, Biology, and Computer Science is substantiated through hands-on laboratory experimentation where students measure, record, and infer independently.',
    deepDive:
      'With dedicated Physics, Chemistry, and modern IT laboratories, every learner gains tactile experience with optical benches, chemical titration rigs, and coding IDEs under faculty supervision.',
    cbseBenchmark: 'Certified CBSE Practical Syllabus Standards & Controlled Safe Reagents',
    highlights: [
      'Individual apparatus stations preventing spectator learning',
      'Emphasis on lab safety, error propagation analysis, and calibrated measurement',
      'Maintaining standardized CBSE practical journals and viva preparation'
    ],
    metrics: [
      { label: 'Dedicated STEM Labs', value: 'Physics • Chem • IT' },
      { label: 'Apparatus Ratio', value: 'Individualized' }
    ]
  },
  {
    step: '03',
    title: 'ASSET Diagnostic Skill Assessments',
    tag: 'Diagnostic Analytics',
    badge: 'Precision Remediation',
    icon: <BarChart3 className="w-5 h-5 text-[#DF711B]" />,
    image: '/images/school_events/School_Event_2026-09-27_005.jpg',
    secondaryImage: '/images/school_events/School_Event_2026-09-27_006.jpg',
    description:
      'Conducted for Standard III through IX via ASSET—India’s premier educational research testing agency. Tests measure deep conceptual understanding rather than surface recall.',
    deepDive:
      'ASSET diagnostic reports uncover exactly where conceptual bottlenecks exist—whether in fractional arithmetic, grammatical nuances, or scientific deduction—allowing teachers to tailor individualized remediation.',
    cbseBenchmark: 'National Percentile Benchmarking & Diagnostic Learning Gap Identification',
    highlights: [
      'Skill-based benchmarking against tens of thousands of students nationwide',
      'Actionable diagnostic insight reports shared transparently with parents',
      'Structured targeted remedial sessions addressing specific misconceptions'
    ],
    metrics: [
      { label: 'Standards Evaluated', value: 'Classes III to IX' },
      { label: 'Insight Granularity', value: 'Concept by Concept' }
    ]
  },
  {
    step: '04',
    title: 'Value Integration & Moral Mentorship',
    tag: 'Chinmaya Ethos',
    badge: 'Character Architecture',
    icon: <Heart className="w-5 h-5 text-[#DF711B]" />,
    image: '/images/banner-4.jpeg',
    secondaryImage: '/images/guru-paduka-pooja.webp',
    description:
      'Every subject lesson seamlessly incorporates ethical discernment, civic responsibility, and environmental consciousness through the Chinmaya Vision Programme, transforming knowledge into noble character.',
    deepDive:
      'Under the sacred Chinmaya banner, mentorship extends beyond academics. House masters and educators build emotional resilience, self-discipline, and cultural pride in every boy and girl.',
    cbseBenchmark: 'Chinmaya Vision Programme (CVP) Value-Based Holistic Education',
    highlights: [
      'Low 1:25 teacher-to-student mentorship ratio ensuring emotional wellbeing',
      'House master tracking academic trajectory and individual temperament',
      'Balvihar moral reasoning modules instilling lifelong integrity'
    ],
    metrics: [
      { label: 'Mentorship Ratio', value: '1 : 25' },
      { label: 'Ethical Grounding', value: 'Daily Assembly & Gita' }
    ]
  }
];

export const TeachingStrategyShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAllGrid, setShowAllGrid] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeStrategy = STRATEGIES[activeIdx];

  // GSAP smooth transition on strategy step change
  useEffect(() => {
    if (stageRef.current && !showAllGrid) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
      );
    }
  }, [activeIdx, showAllGrid]);

  return (
    <div className="space-y-10">
      {/* Header Banner with Visual Psychology */}
      <SpotlightCard className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <BadgePill variant="amber" label="Pedagogical Methodology" icon="mortarboard" />
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-[#E7E2D8]">
            CBSE & NEP 2020 Pedagogical Framework
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl text-[#181C20] font-extrabold leading-tight">
          Transforming Classrooms into Centers of Inquiry & Mastery
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
          At Chinmaya Vidyalaya Tarapur, teaching is an art of inspiration. We blend CBSE curricular rigor with modern experiential teaching methods, ASSET diagnostic analytics, and the timeless moral anchoring of the Chinmaya Vision Programme.
        </p>

        {/* Action Bar: Step Navigator & View Switcher */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#E7E2D8]">
          <div className="flex flex-wrap items-center gap-2">
            {STRATEGIES.map((strat, idx) => (
              <button
                key={strat.step}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setShowAllGrid(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  !showAllGrid && activeIdx === idx
                    ? 'bg-[#0B1E34] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-[#FAF3E8] border border-[#E7E2D8]'
                }`}
              >
                <span>Step {strat.step}</span>
                <span className="hidden sm:inline opacity-75">• {strat.tag}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllGrid(!showAllGrid)}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#DF711B] hover:text-[#c45f12] bg-[#FAF3E8] px-3.5 py-2 rounded-xl border border-[#FDE49C] transition-colors ml-auto"
          >
            {showAllGrid ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Focus Studio View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Show All 4 Steps Grid</span>
              </>
            )}
          </button>
        </div>
      </SpotlightCard>

      {/* View Mode 1: Interactive Studio Stage (Zero-eye-travel, high visual retention) */}
      {!showAllGrid ? (
        <div ref={stageRef} className="space-y-6">
          <SpotlightCard className="bg-white border-2 border-[#E7E2D8] rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Visual Photography (Primary + Secondary) */}
              <div className="lg:col-span-6 bg-slate-900 relative min-h-[340px] lg:min-h-[460px] flex flex-col justify-between overflow-hidden">
                <img
                  src={activeStrategy.image}
                  alt={activeStrategy.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E34] via-transparent to-black/30" />

                <div className="relative z-10 p-6 flex items-start justify-between">
                  <span className="bg-[#DF711B] text-white px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-md">
                    Step {activeStrategy.step} • {activeStrategy.tag}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-mono">
                    Chinmaya Boisar
                  </span>
                </div>

                <div className="relative z-10 p-6 text-white space-y-2">
                  <span className="text-[11px] font-mono text-[#F7B928] uppercase font-bold tracking-wider block">
                    {activeStrategy.badge}
                  </span>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {activeStrategy.cbseBenchmark}
                  </p>
                </div>
              </div>

              {/* Right Column: Pedagogical Details & Highlights */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] border border-[#FDE49C] flex items-center justify-center">
                      {activeStrategy.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                        Pedagogical Step {activeStrategy.step}
                      </span>
                      <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] leading-snug">
                        {activeStrategy.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {activeStrategy.description}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {activeStrategy.deepDive}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 sm:p-5 rounded-2xl space-y-2.5">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                      Core Classroom Realities:
                    </span>
                    <ul className="space-y-2">
                      {activeStrategy.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metrics Footer */}
                <div className="border-t border-[#E7E2D8] pt-4 grid grid-cols-2 gap-4">
                  {activeStrategy.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7E2D8]">
                      <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                        {m.label}
                      </span>
                      <span className="font-cinzel font-bold text-sm text-[#0B1E34]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      ) : (
        /* View Mode 2: All 4 Steps Grid for High-Level Comparative Scanning */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STRATEGIES.map((strat, idx) => (
            <SpotlightCard
              key={strat.step}
              className="bg-white border border-[#E7E2D8] rounded-3xl overflow-hidden shadow-card flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={strat.image}
                    alt={strat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#DF711B] text-white px-3 py-1 rounded-xl text-xs font-mono font-bold shadow">
                    Step {strat.step} • {strat.tag}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-cinzel font-extrabold text-xl text-[#181C20] group-hover:text-[#DF711B] transition-colors">
                    {strat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {strat.description}
                  </p>

                  <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-4 rounded-xl space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#DF711B] block">
                      Pedagogical Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {strat.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 bg-white">
                <div className="border-t border-[#E7E2D8] pt-4 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>CBSE Pedagogical Framework</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIdx(idx);
                      setShowAllGrid(false);
                    }}
                    className="text-[#DF711B] font-bold hover:underline"
                  >
                    Focus In Studio →
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
};

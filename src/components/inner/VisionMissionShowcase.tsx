import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Award, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';

interface Kosha {
  id: string;
  name: string;
  sanskrit: string;
  sheath: string;
  color: string;
  badgeBg: string;
  schoolPractice: string;
  dailyRoutine: string;
  outcomes: string[];
}

const KOSHAS: Kosha[] = [
  {
    id: 'annamaya',
    name: 'Annamaya Kosha',
    sanskrit: 'अन्नमय कोष',
    sheath: 'Physical Sheath',
    color: '#DF711B',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    schoolPractice:
      'Rigorous physical conditioning, sports training, nutritional hygiene, and daily physical exercises on our athletic grounds.',
    dailyRoutine: 'Morning PT drill, inter-house football & cricket, martial arts, and pure RO drinking water monitoring.',
    outcomes: ['Physical stamina and vitality', 'Motor skill coordination', 'Disciplined hygiene & sportsmanship']
  },
  {
    id: 'pranamaya',
    name: 'Pranamaya Kosha',
    sanskrit: 'प्राणमय कोष',
    sheath: 'Vital Energy Sheath',
    color: '#059669',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    schoolPractice:
      'Pranayama breathing techniques, breath synchronization, and vital energy balancing to steady youthful nervousness.',
    dailyRoutine: 'Guided Anulom Vilom and Bhramari Pranayama during morning assembly, breath awareness before exams.',
    outcomes: ['Calm physiological response to stress', 'Increased lung capacity and oxygenation', 'Inner vital equilibrium']
  },
  {
    id: 'manomaya',
    name: 'Manomaya Kosha',
    sanskrit: 'मनोमय कोष',
    sheath: 'Mental-Emotional Sheath',
    color: '#B45309',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    schoolPractice:
      'Emotional poise, aesthetic arts, classical music, drama, empathy exercises, and peer bonding within house families.',
    dailyRoutine: 'Group singing of uplifting bhajans, cultural drama festivals, expressive art periods, and peer conflict resolution.',
    outcomes: ['Emotional balance and empathy', 'Aesthetic sensitivity and self-expression', 'Healthy peer relations without bullying']
  },
  {
    id: 'vijnanamaya',
    name: 'Vijnanamaya Kosha',
    sanskrit: 'विज्ञानमय कोष',
    sheath: 'Intellectual Sheath',
    color: '#0B1E34',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    schoolPractice:
      'Inquiry-based STEM laboratories, ASSET diagnostic thinking analytics, scientific reasoning, and philosophical debate.',
    dailyRoutine: 'Hands-on laboratory verification, mathematical puzzle solving, ASSET testing, and debate competitions.',
    outcomes: ['Critical reasoning and logic', 'Freedom from unscientific superstition', 'Fearless inquiry and master problem-solving']
  },
  {
    id: 'anandamaya',
    name: 'Anandamaya Kosha',
    sanskrit: 'आनन्दमय कोष',
    sheath: 'Spiritual Bliss Sheath',
    color: '#7C3AED',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    schoolPractice:
      'Guru Paduka Pooja, Bhagavad Gita chanting, value education through Balvihar, and joy discovered in selfless service (Seva).',
    dailyRoutine: 'Daily Chinmaya family prayer at 7:45 AM, chapterwise Gita chanting competitions, and community outreach drives.',
    outcomes: ['Inner peace and boundless joy', 'Reverence for teachers and parents', 'Selfless readiness to serve society']
  }
];

export const VisionMissionShowcase: React.FC = () => {
  const [activeKoshaId, setActiveKoshaId] = useState('annamaya');
  const stageRef = useRef<HTMLDivElement>(null);

  const activeKosha = KOSHAS.find((k) => k.id === activeKoshaId) || KOSHAS[0];

  useEffect(() => {
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeKoshaId]);

  return (
    <div className="space-y-12">
      {/* Vision & Mission High-Impact Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Panel 1: Vision */}
        <SpotlightCard className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF9F2] to-[#FAF3E8] border-2 border-[#DF711B]/40 shadow-card space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DF711B] text-white flex items-center justify-center font-bold shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DF711B] block">
                  INSTITUTIONAL VISION
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
                  Our Vision
                </h3>
              </div>
            </div>
            <blockquote className="font-cinzel text-lg sm:text-xl text-[#181C20] font-bold leading-relaxed border-l-4 border-[#DF711B] pl-4 italic">
              "To empower a community of learners who dare to dream, take risks and develop new realities."
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              We envision graduates who are self-reliant, intellectually bold, emotionally poised, and morally steadfast—equipped with modern CBSE scientific competencies and rooted in cultural integrity, ready to lead and uplift society in an ever-evolving world.
            </p>
          </div>
          <div className="border-t border-[#E7E2D8] pt-4 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#E7E2D8]">✓ Fearless Inquiry</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#E7E2D8]">✓ Creative Risk-Taking</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#E7E2D8]">✓ Ethical Leadership</span>
          </div>
        </SpotlightCard>

        {/* Panel 2: Mission */}
        <SpotlightCard className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#F5F8FC] to-[#EEF4FB] border-2 border-[#0B1E34]/30 shadow-card space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1E34] text-white flex items-center justify-center font-bold shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1E34] block">
                  SACRED PURPOSE
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
                  Our Mission
                </h3>
              </div>
            </div>
            <blockquote className="font-cinzel text-lg sm:text-xl text-[#181C20] font-bold leading-relaxed border-l-4 border-[#0B1E34] pl-4 italic">
              "To offer value-based holistic education that integrates ancient Indian cultural ethos with modern scientific inquiry."
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Nurturing physical vitality, mental agility, intellectual depth, and spiritual awakening through the 4 foundational pillars of the Chinmaya Vision Programme, molding patriotic citizens with universal empathy.
            </p>
          </div>
          <div className="border-t border-[#CBD5E1] pt-4 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#CBD5E1]">✓ Value Education</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#CBD5E1]">✓ Scientific Temper</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-[#CBD5E1]">✓ Global Brotherhood</span>
          </div>
        </SpotlightCard>
      </div>

      {/* The 5 Sheaths (Panchakosha) Educational Blueprint */}
      <SpotlightCard className="bg-white border border-[#E7E2D8] rounded-3xl p-8 sm:p-12 shadow-card space-y-8">
        <div className="space-y-2">
          <BadgePill variant="amber" label="Vedantic Pedagogical Architecture" icon="sparkles" />
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
            The Panchakosha Holistic Developmental Framework
          </h3>
          <p className="text-sm sm:text-base text-slate-600 font-normal max-w-3xl leading-relaxed">
            Pujya Gurudev Swami Chinmayananda structured Chinmaya education around the Taittiriya Upanishad’s five developmental sheaths (Koshas) that constitute the human personality. Click each sheath to discover its concrete campus application:
          </p>
        </div>

        {/* 5 Koshas Interactive Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {KOSHAS.map((k, idx) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setActiveKoshaId(k.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activeKoshaId === k.id
                  ? 'bg-[#0B1E34] text-white border-[#0B1E34] shadow-md scale-[1.02]'
                  : 'bg-[#FAF8F5] text-slate-700 border-[#E7E2D8] hover:bg-white'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold block ${activeKoshaId === k.id ? 'text-[#F7B928]' : 'text-slate-400'}`}>
                Kosha 0{idx + 1}
              </span>
              <h4 className="font-cinzel font-bold text-xs sm:text-sm pt-0.5 leading-tight">
                {k.name}
              </h4>
              <span className={`text-[11px] font-mono block pt-0.5 ${activeKoshaId === k.id ? 'text-slate-300' : 'text-[#DF711B]'}`}>
                {k.sheath}
              </span>
            </button>
          ))}
        </div>

        {/* Kosha Detail Studio Stage (Zero-Eye-Wander) */}
        <div ref={stageRef}>
          <div className="bg-[#FAF8F5] border-2 border-[#E7E2D8] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                    {activeKosha.sheath}
                  </span>
                  <span className="text-xs font-mono text-slate-400">• {activeKosha.sanskrit}</span>
                </div>
                <h4 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] pt-1">
                  {activeKosha.name}
                </h4>
              </div>
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${activeKosha.badgeBg}`}>
                Holistic Personality Sheath
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                    Campus Pedagogical Focus:
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed pt-1">
                    {activeKosha.schoolPractice}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#DF711B] block">
                    Daily Boisar Campus Realization:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeKosha.dailyRoutine}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                  Observed Student Growth Outcomes:
                </span>
                <ul className="space-y-2">
                  {activeKosha.outcomes.map((out, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
                      <span className="leading-snug">{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

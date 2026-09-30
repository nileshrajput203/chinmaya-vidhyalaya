import React, { useState, useRef, useEffect } from 'react';
import { Compass, Target, CheckCircle2, Quote, Heart, Activity, Brain, Sun, ZoomIn, X } from 'lucide-react';
import gsap from 'gsap';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface Kosha {
  id: string;
  name: string;
  sanskrit: string;
  sheath: string;
  color: string;
  badgeBg: string;
  image: string;
  imageTag: string;
  imageCaption: string;
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
    image: '/images/banner-1.jpg',
    imageTag: 'Athletics & Physical Conditioning',
    imageCaption: 'Physical Vitality: Daily Surya Namaskar, morning PT drills, and inter-house football & cricket on campus athletic grounds.',
    schoolPractice:
      'Rigorous physical conditioning, sports training, nutritional hygiene, and daily physical exercises on our sprawling campus athletic grounds.',
    dailyRoutine: 'Morning PT drill, inter-house football & cricket, martial arts, and pure RO drinking water monitoring.',
    outcomes: ['Physical stamina and vitality', 'Motor skill coordination & reflexes', 'Disciplined hygiene & sportsmanship']
  },
  {
    id: 'pranamaya',
    name: 'Pranamaya Kosha',
    sanskrit: 'प्राणमय कोष',
    sheath: 'Vital Energy Sheath',
    color: '#059669',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    image: '/images/banner-4.jpeg',
    imageTag: 'Breath Awareness & Assembly',
    imageCaption: 'Vital Energy: Guided Pranayama and breath awareness in morning assembly to center youthful energies and steady the nervous system.',
    schoolPractice:
      'Pranayama breathing techniques, breath synchronization, and vital energy balancing to steady youthful nervousness and enhance concentration.',
    dailyRoutine: 'Guided Anulom Vilom and Bhramari Pranayama during morning assembly, breath awareness before exams.',
    outcomes: ['Calm physiological response to stress', 'Increased lung capacity and oxygenation', 'Inner vital equilibrium & mental focus']
  },
  {
    id: 'manomaya',
    name: 'Manomaya Kosha',
    sanskrit: 'मनोमय कोष',
    sheath: 'Mental-Emotional Sheath',
    color: '#B45309',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    image: '/images/chinmaya/cultural/cultural_celebration_001.jpg',
    imageTag: 'Classical Arts & Emotional Poise',
    imageCaption: 'Mental-Emotional Harmony: Classical music, expressive performing arts, and annual cultural celebrations uniting students.',
    schoolPractice:
      'Emotional poise, aesthetic arts, classical music, drama, empathy exercises, and peer bonding within supportive house families.',
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
    image: '/images/chinmaya/academics/classroom_learning_001.jpg',
    imageTag: 'Inquiry-Based Scientific Learning',
    imageCaption: 'Intellectual Depth: Hands-on laboratory experiments, ASSET diagnostic thinking, and fearless analytical problem-solving.',
    schoolPractice:
      'Inquiry-based STEM laboratories, ASSET diagnostic thinking analytics, scientific reasoning, and philosophical debate.',
    dailyRoutine: 'Hands-on laboratory verification, mathematical puzzle solving, ASSET testing, and debate competitions.',
    outcomes: ['Critical reasoning and fearless logic', 'Freedom from superstition', 'Mastery in scientific problem-solving']
  },
  {
    id: 'anandamaya',
    name: 'Anandamaya Kosha',
    sanskrit: 'आनन्दमय कोष',
    sheath: 'Spiritual Bliss Sheath',
    color: '#7C3AED',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    image: '/images/guru-paduka-pooja.webp',
    imageTag: 'Sacred Ethos & Joy of Seva',
    imageCaption: 'Spiritual Bliss: Daily Guru Paduka Pooja, Vedic chanting, and character development rooted in selfless service (Seva).',
    schoolPractice:
      'Guru Paduka Pooja, Bhagavad Gita chanting, value education through Balvihar, and joy discovered in selfless service (Seva).',
    dailyRoutine: 'Daily Chinmaya family prayer at 7:45 AM, chapterwise Gita chanting competitions, and community outreach drives.',
    outcomes: ['Inner peace and boundless joy', 'Reverence for teachers and parents', 'Selfless readiness to serve society']
  }
];

export const VisionMissionShowcase: React.FC = () => {
  const [activeKoshaId, setActiveKoshaId] = useState('annamaya');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; caption: string } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll bleed when lightbox is open
  useBodyScrollLock(lightboxImage !== null);

  const activeKosha = KOSHAS.find((k) => k.id === activeKoshaId) || KOSHAS[0];

  useEffect(() => {
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeKoshaId]);

  return (
    <div className="space-y-12">
      {/* ====================================================
          FOUNDER'S GUIDING CREED SPOTLIGHT
         ==================================================== */}
      <div className="bg-gradient-to-br from-[#0B1D30] to-[#182C44] text-white rounded-3xl p-8 sm:p-10 border border-[#233B59] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#DF711B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div 
              onClick={() => setLightboxImage({
                src: '/images/swami.jpeg',
                title: 'Param Pujya Swami Chinmayananda',
                caption: 'Founder & Visionary behind the Chinmaya Movement and Chinmaya Vision Programme.'
              })}
              className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#DF711B]/50 shadow-2xl bg-black/40 group cursor-pointer"
            >
              <img
                src="/images/swami.jpeg"
                alt="Param Pujya Swami Chinmayananda"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-xs font-serif font-bold text-amber-200 block">
                  Pujya Gurudev
                </span>
                <span className="text-[10px] font-mono text-white/80 uppercase tracking-wider block">
                  Swami Chinmayananda
                </span>
              </div>
              <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DF711B]/20 border border-[#DF711B]/40 text-[#DF711B] text-xs font-mono font-bold tracking-wide">
              <Quote className="w-3.5 h-3.5" />
              <span>Foundational Creed of Chinmaya Education</span>
            </div>

            <blockquote className="font-serif italic text-lg sm:text-2xl text-[#FAF8F5] leading-relaxed font-light">
              “We are not here to teach our children merely how to make a living, but how to live. To enable them to meet life’s situations with courage and composure.”
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Formulated under the spiritual guidance of Pujya Gurudev and administered by Central Chinmaya Mission Trust (CCMT), Mumbai, Chinmaya Vidyalaya Tarapur integrates <strong>ancient Indian cultural ethos with modern scientific inquiry</strong> to mold self-reliant, patriotic, and compassionate leaders.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-amber-200/90">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B]" />
                Central Chinmaya Mission Trust, Mumbai
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DF711B]" />
                CBSE Affiliation No. 1130058 • Code: 30040
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          VISION & MISSION MASTER VISUAL SPLIT CARDS
         ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PANEL 1: OUR VISION */}
        <SpotlightCard className="bg-[#FAF8F5] border-2 border-[#DF711B]/35 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#DF711B] text-white flex items-center justify-center font-bold shadow-sm">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#DF711B] block">
                    Institutional Vision
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
                    Our Vision
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FAF3E8] text-[#DF711B] border border-[#DF711B]/30">
                Pioneering Future
              </span>
            </div>

            {/* School Photograph for Vision */}
            <div 
              onClick={() => setLightboxImage({
                src: '/images/phys.jpeg',
                title: 'Scientific Temper & Inquisitive Learning',
                caption: 'Students conducting experimental scientific inquiry in the senior laboratory — daring to dream and developing new realities.'
              })}
              className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white shadow-xs group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src="/images/phys.jpeg"
                  alt="Students conducting scientific inquiry in laboratory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B1D30]/85 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-md">
                  Scientific Inquiry & Rigour
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                </div>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] text-center text-xs text-[#555555] font-medium border-t border-[#E7E2D8] group-hover:text-[#DF711B] transition-colors">
                Hands-on STEM Lab • Nurturing Inquisitive Minds &rarr;
              </div>
            </div>

            {/* Vision Statement */}
            <blockquote className="font-serif italic text-lg sm:text-xl text-[#181C20] font-semibold leading-relaxed border-l-4 border-[#DF711B] pl-4">
              “To empower a community of learners who dare to dream, take risks and develop new realities.”
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              We envision graduates who are self-reliant, intellectually bold, emotionally poised, and morally steadfast—equipped with modern CBSE scientific competencies and rooted in cultural integrity, ready to lead and uplift society in an ever-evolving world.
            </p>
          </div>

          {/* Pillars List */}
          <div className="border-t border-[#E7E2D8] pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-sans">
            <div className="bg-white p-2.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
              <span className="font-bold text-[#181C20] block">Fearless Inquiry</span>
              <span className="text-[10px] text-slate-500 font-mono">Critical Reasoning</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
              <span className="font-bold text-[#181C20] block">Creative Risk-Taking</span>
              <span className="text-[10px] text-slate-500 font-mono">Innovation & Arts</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
              <span className="font-bold text-[#181C20] block">Ethical Leadership</span>
              <span className="text-[10px] text-slate-500 font-mono">Moral Poise</span>
            </div>
          </div>
        </SpotlightCard>

        {/* PANEL 2: OUR MISSION */}
        <SpotlightCard className="bg-[#FAF8F5] border-2 border-[#0B1E34]/30 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0B1E34] text-white flex items-center justify-center font-bold shadow-sm">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0B1E34] block">
                    Sacred Mission
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] tracking-tight">
                    Our Mission
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#F0F4F8] text-[#0B1E34] border border-[#0B1E34]/20">
                Timeless Values
              </span>
            </div>

            {/* School Photograph for Mission */}
            <div 
              onClick={() => setLightboxImage({
                src: '/images/banner-4.jpeg',
                title: 'Morning Prayer Assembly & Sacred Ethos',
                caption: 'Students gathered in the central courtyard for morning prayers, Gita chanting, and moral reflection.'
              })}
              className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white shadow-xs group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src="/images/banner-4.jpeg"
                  alt="Morning prayer assembly in central courtyard"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0B1D30]/85 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-md">
                  Vedic Culture & Daily Ethos
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                </div>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] text-center text-xs text-[#555555] font-medium border-t border-[#E7E2D8] group-hover:text-[#DF711B] transition-colors">
                Assembly Courtyard • Daily Moral & Spiritual Grounding &rarr;
              </div>
            </div>

            {/* Mission Statement */}
            <blockquote className="font-serif italic text-lg sm:text-xl text-[#181C20] font-semibold leading-relaxed border-l-4 border-[#0B1E34] pl-4">
              “To offer value-based holistic education that integrates ancient Indian cultural ethos with modern scientific inquiry.”
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              Nurturing physical vitality, mental agility, intellectual depth, and spiritual awakening through the 4 foundational pillars of the Chinmaya Vision Programme, molding patriotic citizens with universal empathy.
            </p>
          </div>

          {/* Commitments List */}
          <div className="border-t border-[#E7E2D8] pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-sans">
            <div className="bg-white p-2.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
              <span className="font-bold text-[#181C20] block">Value Education</span>
              <span className="text-[10px] text-slate-500 font-mono">Indian Ethos</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
              <span className="font-bold text-[#181C20] block">Scientific Temper</span>
              <span className="text-[10px] text-slate-500 font-mono">Empirical Inquiry</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#E7E2D8] text-center shadow-2xs">
              <span className="font-bold text-[#181C20] block">Global Brotherhood</span>
              <span className="text-[10px] text-slate-500 font-mono">Universal Empathy</span>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* ====================================================
          THE PANCHAKOSHA HOLISTIC DEVELOPMENTAL FRAMEWORK
          (NOW WITH PHOTOGRAPHIC VISUAL FOR EVERY SHEATH!)
         ==================================================== */}
      <SpotlightCard className="bg-white border border-[#E7E2D8] rounded-3xl p-6 sm:p-10 shadow-card space-y-8">
        <div className="space-y-2">
          <BadgePill variant="saffron" label="Vedantic Pedagogical Architecture" pulse />
          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20]">
            The Panchakosha Holistic Developmental Framework
          </h3>
          <p className="text-sm sm:text-base text-slate-600 font-normal max-w-3xl leading-relaxed">
            Pujya Gurudev Swami Chinmayananda structured Chinmaya education around the Taittiriya Upanishad’s five developmental sheaths (Koshas) that constitute the human personality. Select each sheath below to discover its concrete campus realization and visual evidence:
          </p>
        </div>

        {/* 5 Koshas Interactive Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {KOSHAS.map((k, idx) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setActiveKoshaId(k.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeKoshaId === k.id
                  ? 'bg-[#0B1E34] text-white border-[#0B1E34] shadow-md scale-[1.02]'
                  : 'bg-[#FAF8F5] text-slate-700 border-[#E7E2D8] hover:bg-white hover:border-[#DF711B]'
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

        {/* Kosha Detail Stage with Real Campus Photography */}
        <div ref={stageRef}>
          <div className="bg-[#FAF8F5] border-2 border-[#E7E2D8] rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Header of Active Kosha */}
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

            {/* Split: Details on Left, Concrete Campus Photograph on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Pedagogical Details & Routine */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
                    Campus Pedagogical Focus:
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed pt-1">
                    {activeKosha.schoolPractice}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E7E2D8] space-y-1 shadow-2xs">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#DF711B] block">
                    Daily Boisar Campus Realization:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeKosha.dailyRoutine}
                  </p>
                </div>

                <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl space-y-3 shadow-2xs">
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

              {/* Right Column: Authentic Campus Photographic Proof */}
              <div className="lg:col-span-5 space-y-3">
                <div 
                  onClick={() => setLightboxImage({
                    src: activeKosha.image,
                    title: `${activeKosha.name} (${activeKosha.sheath})`,
                    caption: activeKosha.imageCaption
                  })}
                  className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white shadow-md group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={activeKosha.image}
                      alt={activeKosha.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1D30]/85 text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono backdrop-blur-md">
                      {activeKosha.imageTag}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border-t border-[#E7E2D8]">
                    <span className="text-[10px] font-mono text-[#DF711B] font-bold block uppercase tracking-wider">
                      Campus Evidence
                    </span>
                    <p className="text-xs text-slate-600 leading-snug pt-0.5 font-sans">
                      {activeKosha.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* ====================================================
          THE 4 FOUNDATIONAL PILLARS OF CHINMAYA VISION PROGRAM
         ==================================================== */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D8] rounded-3xl p-6 sm:p-9 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.2em] block">
              Chinmaya Vision Programme (CVP)
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#181C20] mt-1">
              The 4 Pillars Translating Vision into Action
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Holistic Vedic & Modern Curriculum
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] space-y-3 shadow-2xs hover:border-[#DF711B] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#DF711B] flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#181C20]">
              1. Integrated Development
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Harmonious training of the body, mind, intellect, and spiritual consciousness through physical yoga, ASSET analytical tests, and value contemplation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] space-y-3 shadow-2xs hover:border-[#DF711B] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#181C20]">
              2. Indian Culture & Ethos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Deep reverence for parents and teachers, daily morning Guru Paduka Pooja, Bhagavad Gita chanting competitions, and Vedic cultural pageantry.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] space-y-3 shadow-2xs hover:border-[#DF711B] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#181C20]">
              3. Patriotism & Citizenship
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              National pride, civic responsibility, environmental awareness campaigns such as Jal Pakhwada, and active community outreach.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] space-y-3 shadow-2xs hover:border-[#DF711B] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#181C20]">
              4. Universal Outlook
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Embodying <em>Vasudhaiva Kutumbakam</em> (the world is one family), fostering global empathy, cross-cultural sensitivity, and cosmic love.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          FULL-SCREEN IMAGE LIGHTBOX MODAL
         ==================================================== */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#FAF8F5] border-t border-[#E7E2D8] space-y-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                Chinmaya Vidyalaya Tarapur • Visual Archives
              </span>
              <h3 className="font-serif font-bold text-xl text-[#181C20]">
                {lightboxImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

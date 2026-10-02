import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Target, CheckCircle2, ZoomIn, X } from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useInView, motion, AnimatePresence } from 'motion/react';
import { TextRotate, TextRotateRef } from '../ui/text-rotate';

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
    image: '/images/banner-8.webp',
    imageTag: 'Athletic Ground & Campus Vitality',
    imageCaption: 'Vital Energy: Sprawling green campus grounds for morning fitness, athletics, and vital energy balance.',
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
    image: '/images/about-banner.jpeg',
    imageTag: 'Music Studio & Expressive Arts',
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
    image: '/images/phys.jpeg',
    imageTag: 'Hands-on STEM Lab Verification',
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
    imageTag: 'Guru Paduka Pooja & Sacred Ethos',
    imageCaption: 'Spiritual Bliss: Daily Guru Paduka Pooja, Vedic chanting, and character development rooted in selfless service (Seva).',
    schoolPractice:
      'Guru Paduka Pooja, Bhagavad Gita chanting, value education through Balvihar, and joy discovered in selfless service (Seva).',
    dailyRoutine: 'Daily Chinmaya family prayer at 7:45 AM, chapterwise Gita chanting competitions, and community outreach drives.',
    outcomes: ['Inner peace and boundless joy', 'Reverence for teachers and parents', 'Selfless readiness to serve society']
  }
];

interface KoshaScrollCardProps {
  kosha: Kosha;
  index: number;
  isActive: boolean;
  onInView: (index: number) => void;
  onImageClick: (kosha: Kosha) => void;
}

const KoshaScrollCard: React.FC<KoshaScrollCardProps> = ({
  kosha,
  index,
  isActive,
  onInView,
  onImageClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    margin: '-25% 0px -25% 0px',
  });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div
      ref={cardRef}
      id={`kosha-section-${index}`}
      className={`transition-all duration-500 rounded-3xl p-6 sm:p-8 border ${
        isActive
          ? 'bg-white border-[#DF711B]/40 shadow-card'
          : 'bg-[#FAF8F5]/90 border-[#E7E2D8] opacity-90 hover:opacity-100'
      } space-y-6 scroll-mt-32`}
    >
      {/* Sheath Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E2D8] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-[#DF711B] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            0{index + 1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                {kosha.sheath}
              </span>
              <span className="text-xs font-mono text-slate-400">• {kosha.sanskrit}</span>
            </div>
            <h4 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] pt-0.5">
              {kosha.name}
            </h4>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${kosha.badgeBg}`}>
          Sheath 0{index + 1}
        </span>
      </div>

      {/* Mobile-only Image Preview */}
      <div className="block lg:hidden rounded-2xl overflow-hidden border border-[#E7E2D8] bg-slate-100 shadow-xs">
        <div
          className="relative aspect-[16/10] overflow-hidden cursor-pointer"
          onClick={() => onImageClick(kosha)}
        >
          <img
            src={kosha.image}
            alt={kosha.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Pedagogical Focus */}
      <div className="space-y-1.5">
        <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
          Campus Pedagogical Focus:
        </span>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
          {kosha.schoolPractice}
        </p>
      </div>

      {/* Daily Boisar Realization */}
      <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E2D8] space-y-1 shadow-2xs">
        <span className="text-[11px] font-mono font-bold uppercase text-[#DF711B] block">
          Daily Boisar Campus Realization:
        </span>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          {kosha.dailyRoutine}
        </p>
      </div>

      {/* Student Growth Outcomes */}
      <div className="bg-white border border-[#E7E2D8] p-5 rounded-2xl space-y-3 shadow-2xs">
        <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
          Observed Student Growth Outcomes:
        </span>
        <ul className="space-y-2">
          {kosha.outcomes.map((out, oIdx) => (
            <li key={oIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#DF711B] shrink-0 mt-0.5" />
              <span className="leading-snug font-sans">{out}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const VisionMissionShowcase: React.FC = () => {
  const [activeKoshaIndex, setActiveKoshaIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; caption: string } | null>(null);
  const textRotateRef = useRef<TextRotateRef>(null);

  // Prevent background scroll bleed when lightbox is open
  useBodyScrollLock(lightboxImage !== null);

  const activeKosha = KOSHAS[activeKoshaIndex] || KOSHAS[0];

  const handleKoshaInView = useCallback((index: number) => {
    setActiveKoshaIndex(index);
    textRotateRef.current?.jumpTo(index);
  }, []);

  const scrollToKosha = (index: number) => {
    setActiveKoshaIndex(index);
    textRotateRef.current?.jumpTo(index);
    const el = document.getElementById(`kosha-section-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-14">
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
                  <span className="font-cinzel text-lg">01</span>
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
                src: '/images/guru-paduka-pooja.webp',
                title: 'Cultural Ethos & Sacred Value Education',
                caption: 'Students and teachers participating in Guru Paduka Pooja and traditional prayers rooted in the vision of Swami Chinmayananda.'
              })}
              className="rounded-2xl overflow-hidden border border-[#E7E2D8] bg-white shadow-xs group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src="/images/guru-paduka-pooja.webp"
                  alt="Guru Paduka Pooja and cultural traditions at Chinmaya Vidyalaya"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white/90 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-[#DF711B]" />
                </div>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] text-center text-xs text-[#555555] font-medium border-t border-[#E7E2D8] group-hover:text-[#DF711B] transition-colors">
                Cultural Ethos • Sacred Traditions & Moral Grounding &rarr;
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
          (SCROLL-DRIVEN STICKY IMAGE LEFT & CONTENT RIGHT)
         ==================================================== */}
      <section className="w-full pt-10 sm:pt-14 border-t border-[#E7E2D8]/70">
        {/* Animated Section Header */}
        <div className="text-center max-w-5xl mx-auto px-4">
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#181C20] tracking-tight sm:whitespace-nowrap">
            The Panchakosha Holistic Framework
          </h3>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
            Pujya Gurudev Swami Chinmayananda structured Chinmaya education around the Taittiriya Upanishad’s five developmental sheaths (Koshas) that unfold the total human personality. Scroll through each layer to explore its pedagogical realization at Boisar:
          </p>

          {/* Quick-Jump Step Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 sm:mt-8">
            {KOSHAS.map((k, idx) => (
              <button
                key={k.id}
                type="button"
                onClick={() => scrollToKosha(idx)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                  activeKoshaIndex === idx
                    ? 'bg-[#DF711B] text-white border-[#DF711B] shadow-sm scale-105'
                    : 'bg-white text-slate-600 border-[#E7E2D8] hover:border-[#DF711B] hover:text-[#DF711B]'
                }`}
              >
                0{idx + 1}. {k.name.replace(' Kosha', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Container: Sticky Image on Left, Scrolling Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative pt-8 sm:pt-10">
          {/* Sticky Left Column: Image & Rotating Title Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <div className="bg-gradient-to-br from-[#E6731B] via-[#DF711B] to-[#C75A0A] text-white p-5 rounded-3xl border border-[#DF711B]/40 shadow-xl shadow-orange-950/20 space-y-3.5">
              <div className="flex items-center justify-between border-b border-white/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200 font-extrabold">
                    Active Sheath
                  </span>
                  <span className="text-xs font-mono text-white/80">• 0{activeKoshaIndex + 1} / 05</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-100 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/15">
                  {activeKosha.sanskrit}
                </span>
              </div>

              {/* Rotating Title */}
              <div className="min-h-[36px] flex items-center">
                <TextRotate
                  ref={textRotateRef}
                  texts={KOSHAS.map((k) => k.name)}
                  mainClassName="font-cinzel text-xl xl:text-2xl font-black text-white tracking-tight drop-shadow-xs"
                  splitLevelClassName="overflow-hidden"
                  staggerFrom="first"
                  animatePresenceMode="wait"
                  loop={false}
                  auto={false}
                  staggerDuration={0.01}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                />
              </div>

              <p className="text-xs text-orange-50/90 font-sans leading-tight">
                {activeKosha.sheath} — Tap photo to view high-resolution archival evidence:
              </p>

              {/* Dynamic Photo Container with smooth crossfade */}
              <div
                onClick={() => setLightboxImage({
                  src: activeKosha.image,
                  title: `${activeKosha.name} (${activeKosha.sheath})`,
                  caption: activeKosha.imageCaption
                })}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/25 bg-black/20 group cursor-pointer shadow-md"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeKosha.id}
                    src={activeKosha.image}
                    alt={activeKosha.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </AnimatePresence>

                <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-amber-300" />
                </div>
              </div>

              <div className="p-3 bg-black/15 rounded-2xl border border-white/20 backdrop-blur-xs">
                <span className="text-[10px] font-mono text-amber-200 font-bold block uppercase tracking-wider">
                  Campus Evidence
                </span>
                <p className="text-xs text-white/95 leading-snug pt-0.5 font-sans">
                  {activeKosha.imageCaption}
                </p>
              </div>

              {/* Quick-Jump Step Dots */}
              <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                {KOSHAS.map((k, idx) => (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => scrollToKosha(idx)}
                    className={`py-1.5 px-1 rounded-xl text-center font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      activeKoshaIndex === idx
                        ? 'bg-white text-[#DF711B] shadow-md scale-105 font-black border border-white'
                        : 'bg-white/20 text-white hover:bg-white/30 border border-white/15 font-semibold'
                    }`}
                    title={k.name}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 5 Sequential Scroll Sections */}
          <div className="lg:col-span-7 space-y-8">
            {KOSHAS.map((kosha, idx) => (
              <KoshaScrollCard
                key={kosha.id}
                kosha={kosha}
                index={idx}
                isActive={activeKoshaIndex === idx}
                onInView={handleKoshaInView}
                onImageClick={(k) => setLightboxImage({
                  src: k.image,
                  title: `${k.name} (${k.sheath})`,
                  caption: k.imageCaption
                })}
              />
            ))}
          </div>
        </div>
      </section>

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

export default VisionMissionShowcase;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { SpotlightCard } from '../ui/spotlight-card';
import { BadgePill } from '../ui/badge-pill';
import Timeline, { JourneyItem } from '../ui/timeline';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useInView, motion, AnimatePresence } from 'motion/react';
import { TextRotate, TextRotateRef } from '../ui/text-rotate';

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

interface PhaseScrollCardProps {
  phase: LifePhase;
  index: number;
  isActive: boolean;
  onInView: (index: number) => void;
  onImageClick: (phase: LifePhase) => void;
}

const PhaseScrollCard: React.FC<PhaseScrollCardProps> = ({
  phase,
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
      id={`phase-section-${index}`}
      className={`transition-all duration-500 rounded-3xl p-6 sm:p-8 border ${
        isActive
          ? 'bg-white border-[#DF711B]/40 shadow-card'
          : 'bg-[#FAF8F5]/90 border-[#E7E2D8] opacity-90 hover:opacity-100'
      } space-y-6 scroll-mt-32`}
    >
      {/* Phase Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E2D8] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-[#DF711B] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            0{index + 1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-wider">
                Phase {phase.phase} • {phase.years}
              </span>
              <span className="text-xs font-mono text-slate-400">• {phase.tag}</span>
            </div>
            <h4 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#181C20] pt-0.5">
              {phase.title}
            </h4>
          </div>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#FAF3E8] text-[#DF711B] border border-[#FDE49C]">
          {phase.tag}
        </span>
      </div>

      {/* Mobile-only Image Preview */}
      <div className="block lg:hidden rounded-2xl overflow-hidden border border-[#E7E2D8] bg-slate-100 shadow-xs">
        <div
          className="relative aspect-[16/10] overflow-hidden cursor-pointer"
          onClick={() => onImageClick(phase)}
        >
          <img
            src={phase.image}
            alt={phase.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Narrative Description */}
      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
        {phase.description}
      </p>

      {/* Historical & Spiritual Significance */}
      <div className="bg-[#FAF8F5] p-4.5 rounded-2xl border border-[#E7E2D8] space-y-1.5 shadow-2xs">
        <span className="text-xs font-mono font-bold uppercase text-[#0B1E34] tracking-wider block">
          Historical & Spiritual Significance:
        </span>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          {phase.impact}
        </p>
      </div>

      {/* Gurudev's Words / Quote */}
      {phase.quote && (
        <div className="bg-[#FAF3E8] border border-[#FDE49C] p-5 rounded-2xl space-y-2 flex flex-col justify-center shadow-2xs">
          <span className="text-[10px] font-mono font-bold uppercase text-[#DF711B] tracking-wider block">
            Gurudev's Words:
          </span>
          <blockquote className="font-cinzel italic text-xs sm:text-sm text-[#181C20] font-semibold leading-relaxed">
            {phase.quote}
          </blockquote>
        </div>
      )}
    </div>
  );
};

export const HeritageShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);
  const textRotateRef = useRef<TextRotateRef>(null);

  // Prevent background scroll bleed when lightbox is active
  useBodyScrollLock(lightbox !== null);

  const activePhase = PHASES[activeIdx] || PHASES[0];

  const handlePhaseInView = useCallback((index: number) => {
    setActiveIdx(index);
    textRotateRef.current?.jumpTo(index);
  }, []);

  const scrollToPhase = (index: number) => {
    setActiveIdx(index);
    textRotateRef.current?.jumpTo(index);
    const el = document.getElementById(`phase-section-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full">
      {/* Top Bio & Philosophy Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
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
        </SpotlightCard>

        {/* ====================================================
            THE SACRED PHASES OF PUJYA GURUDEV
            (SCROLL-DRIVEN STICKY IMAGE LEFT & STORY RIGHT)
           ==================================================== */}
        <section className="w-full pt-10 sm:pt-14 border-t border-[#E7E2D8]/70">
          {/* Animated Section Header */}
          <div className="text-center max-w-5xl mx-auto px-4">
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#181C20] tracking-tight sm:whitespace-nowrap">
              The Transformative Life Phases of Gurudev
            </h3>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
              From fiery independence activist to ascetic Himalayan disciple and global renaissance master — scroll through the 4 defining chapters that shaped Pujya Gurudev’s eternal mission:
            </p>

            {/* Quick-Jump Step Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 sm:mt-8">
              {PHASES.map((p, idx) => (
                <button
                  key={p.phase}
                  type="button"
                  onClick={() => scrollToPhase(idx)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                    activeIdx === idx
                      ? 'bg-[#DF711B] text-white border-[#DF711B] shadow-sm scale-105'
                      : 'bg-white text-slate-600 border-[#E7E2D8] hover:border-[#DF711B] hover:text-[#DF711B]'
                  }`}
                >
                  0{idx + 1}. {p.tag}
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
                      Active Phase
                    </span>
                    <span className="text-xs font-mono text-white/80">• 0{activeIdx + 1} / 04</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-100 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/15">
                    {activePhase.years}
                  </span>
                </div>

                {/* Rotating Title */}
                <div className="min-h-[36px] flex items-center">
                  <TextRotate
                    ref={textRotateRef}
                    texts={PHASES.map((p) => p.title)}
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
                  {activePhase.tag} — Tap photo to inspect archival record:
                </p>

                {/* Dynamic Photo Container with smooth crossfade */}
                <div
                  onClick={() => setLightbox({
                    src: activePhase.image,
                    title: `Phase ${activePhase.phase}: ${activePhase.title}`,
                    caption: activePhase.imageCaption
                  })}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/25 bg-black/20 group cursor-pointer shadow-md"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhase.phase}
                      src={activePhase.image}
                      alt={activePhase.title}
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
                    Archival Record
                  </span>
                  <p className="text-xs text-white/95 leading-snug pt-0.5 font-sans">
                    {activePhase.imageCaption}
                  </p>
                </div>

                {/* Quick-Jump Step Dots */}
                <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                  {PHASES.map((p, idx) => (
                    <button
                      key={p.phase}
                      type="button"
                      onClick={() => scrollToPhase(idx)}
                      className={`py-1.5 px-1 rounded-xl text-center font-mono text-[10px] font-bold transition-all cursor-pointer ${
                        activeIdx === idx
                          ? 'bg-white text-[#DF711B] shadow-md scale-105 font-black border border-white'
                          : 'bg-white/20 text-white hover:bg-white/30 border border-white/15 font-semibold'
                      }`}
                      title={p.title}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 4 Sequential Scroll Sections */}
            <div className="lg:col-span-7 space-y-8">
              {PHASES.map((phase, idx) => (
                <PhaseScrollCard
                  key={phase.phase}
                  phase={phase}
                  index={idx}
                  isActive={activeIdx === idx}
                  onInView={handlePhaseInView}
                  onImageClick={(p) => setLightbox({
                    src: p.image,
                    title: `Phase ${p.phase}: ${p.title}`,
                    caption: p.imageCaption
                  })}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ====================================================
          STANDALONE FULL-WIDTH PINNED TIMELINE (OUTSIDE CONTAINER)
         ==================================================== */}
      <section className="w-full pt-20 pb-4 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-[0.25em] block">
            Sacred Chronicle • 1916 to 1993
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-[#181C20] leading-tight">
            The Journey of Swami Chinmayananda
          </h2>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#DF711B] animate-bounce">
            <span>Scroll down to scrub through the milestones</span>
            <span>&darr;</span>
          </div>
        </div>
      </section>

      {/* Full Bleed Timeline (No Card Border, No Overflow-Hidden, True Edge-to-Edge) */}
      <div className="w-full">
        <Timeline
          title="Gurudev's Journey"
          periodLabel="1916 — 1993"
          textColor="#181C20"
          mutedTextColor="#555555"
          activeColor="#DF711B"
          backgroundColor="#ffffff"
          imageUrl="/images/swami.jpeg"
          imageAlt="Param Pujya Swami Chinmayananda"
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

export default HeritageShowcase;

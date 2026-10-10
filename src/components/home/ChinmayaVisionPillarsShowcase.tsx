import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PillarData {
  num: string;
  tabLabel: string;
  pillarTitle: string;
  shortTitle: string;
  subtitleTag: string;
  sanskrit: string;
  image: string;
  isCutout?: boolean;
  visionStatement: string;
  explanation: string;
  targetUrl: string;
  keyPoints: string[];
}

const CVP_PILLARS: PillarData[] = [
  {
    num: '01',
    tabLabel: 'Integrated',
    shortTitle: 'INTEGRATED\nDEVELOPMENT',
    pillarTitle: 'INTEGRATED PERSONALITY DEVELOPMENT',
    subtitleTag: 'Body, Mind & Intellect in Harmony',
    sanskrit: 'Sharirik, Bauddhik & Manasik Vikas',
    image: '/images/pages/home/pillars/pillar-01-integrated.png',
    isCutout: true,
    visionStatement:
      'True education nurtures the entire being—harmonizing physical vitality, an analytical intellect, and emotional equilibrium to build purposeful leaders.',
    explanation:
      'The first pillar of the Chinmaya Vision Programme harmonizes the multidimensional growth of every child. Through morning yoga, sports, experiential science labs, and mindful self-reflection, students cultivate physical vigor, critical thinking, and inner poise.',
    targetUrl: '/about/four-pillars',
    keyPoints: [
      'Daily Surya Namaskar, Pranayama & holistic wellness regimen',
      'Inquiry-driven STEM laboratories & analytical problem-solving',
      'Faculty mentorship fostering emotional stability & focus',
      'Inter-house sports meets, martial arts & track athletics'
    ]
  },
  {
    num: '02',
    tabLabel: 'Culture',
    shortTitle: 'INDIAN\nCULTURE',
    pillarTitle: 'INDIAN CULTURE & TIMELESS VALUES',
    subtitleTag: 'Heritage, Ethics & Living Wisdom',
    sanskrit: 'Bhartiya Sanskriti & Parampara',
    image: '/images/pages/home/pillars/pillar-02-culture.png',
    isCutout: true,
    visionStatement:
      'Rooted in ancient wisdom, our heritage is a living moral compass—instilling reverence, cultural pride, and righteous character in every young mind.',
    explanation:
      'The second pillar anchors students in India’s timeless cultural ethos. Through daily morning prayers, Sanskrit chanting, value-based discussions, and celebrations of traditional festivals, students develop deep respect for elders, humility, and unshakeable ethical grounding.',
    targetUrl: '/features/spiritual-activities',
    keyPoints: [
      'Daily morning prayer assembly, shloka chanting & value education',
      'Annual Bhagavad Gita chanting competitions & cultural forums',
      'Matru-Pitru Pujan & celebrations of sacred Indian festivals',
      'Appreciation of classical Indian music, art, and Sanskrit heritage'
    ]
  },
  {
    num: '03',
    tabLabel: 'Patriotism',
    shortTitle: 'PATRIOTISM &\nCIVIC DUTY',
    pillarTitle: 'PATRIOTISM & ACTIVE CITIZENSHIP',
    subtitleTag: 'Nation Building & Selfless Service',
    sanskrit: 'Rashtra Prem & Nagarik Kartavya',
    image: '/images/pages/home/pillars/pillar-03-patriotism.png',
    isCutout: true,
    visionStatement:
      'Patriotism is translated into action through dedicated community seva, civic awareness, and selfless service to the motherland and society.',
    explanation:
      'The third pillar nurtures responsible, empathetic citizens committed to national progress. Through democratic house governance, tree plantation drives, and local community outreach across Tarapur, learners internalize that the highest honor is serving society with dedication.',
    targetUrl: '/features/4-pillars#pillar-3',
    keyPoints: [
      'Elected Student Council & democratic leadership development',
      'Jal Pakhwada, green plantation drives & eco-club sustainability',
      'Ceremonial observances of Independence Day & Republic Day',
      'Community outreach, campus cleanliness & active social service'
    ]
  },
  {
    num: '04',
    tabLabel: 'Universal',
    shortTitle: 'UNIVERSAL\nOUTLOOK',
    pillarTitle: 'UNIVERSAL OUTLOOK & GLOBAL PERSPECTIVE',
    subtitleTag: 'Vasudhaiva Kutumbakam • One World Family',
    sanskrit: 'Vasudhaiva Kutumbakam',
    image: '/images/sections/four_pillars/pillar-04-universal.webp?v=20261009',
    isCutout: false,
    visionStatement:
      'Vasudhaiva Kutumbakam—the whole world is one family. Education must transcend narrow boundaries to foster universal brotherhood and planetary empathy.',
    explanation:
      'The fourth pillar broadens student awareness beyond geographic and cultural borders. By combining rigorous CBSE curricula with a universal Vedantic outlook, students learn to appreciate global cultures, champion environmental sustainability, and lead with empathy.',
    targetUrl: '/features/4-pillars#pillar-4',
    keyPoints: [
      'Universal prayer framework honoring global peace & goodwill',
      'Globally benchmarked CBSE academic standards & critical thinking',
      'Planetary ecological stewardship & sustainable green practices',
      'Cosmopolitan perspective, ethical leadership & cultural appreciation'
    ]
  }
];

export const ChinmayaVisionPillarsShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevPillar = () => {
    setCurrentIndex((prev) => (prev - 1 + CVP_PILLARS.length) % CVP_PILLARS.length);
  };

  const nextPillar = () => {
    setCurrentIndex((prev) => (prev + 1) % CVP_PILLARS.length);
  };

  const current = CVP_PILLARS[currentIndex];

  return (
    <section
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="w-full py-16 lg:py-24 border-t border-[var(--color-border)] select-none overflow-hidden"
    >
      <div className="w-[94%] sm:w-[90%] xl:w-[84%] max-w-[1560px] mx-auto">
        
        {/* Section Pre-heading strip & Pillar Selector Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5 mb-10 lg:mb-14">
          <div>
            <span
              style={{ color: 'var(--color-primary)' }}
              className="block text-xs sm:text-sm font-mono uppercase tracking-[0.25em] font-bold"
            >
              THE PEDAGOGIC ARCHITECTURE • CVP FRAMEWORK
            </span>
            <h2
              style={{ color: 'var(--color-text)' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-tight mt-1"
            >
              CHINMAYA VISION PROGRAM
            </h2>
          </div>

          {/* Quick Pillar selector tabs (01 to 04) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {CVP_PILLARS.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.num}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    backgroundColor: isActive ? 'var(--color-dark)' : 'var(--color-bg)',
                    color: isActive ? 'var(--color-dark-text)' : 'var(--color-text)',
                    borderColor: isActive ? 'var(--color-dark)' : 'var(--color-border)',
                  }}
                  className={`
                    px-3.5 py-2 border rounded-none text-xs sm:text-sm font-mono font-bold tracking-wider transition-colors duration-200 cursor-pointer shrink-0
                    ${!isActive ? 'hover:bg-[var(--color-dark)] hover:text-white' : ''}
                  `}
                >
                  <span>{p.num}</span>
                  <span className="ml-1.5 hidden xl:inline font-sans text-xs font-semibold">
                    {p.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            MASTER 3-COLUMN EDITORIAL SHOWCASE
            ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================================================================
              LEFT COLUMN: FOUNDATIONAL PILLAR TITLE + NAVIGATION CONTROLS
              ================================================================ */}
          <div className="lg:col-span-3 flex flex-col justify-center items-start space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="space-y-1"
              >
                <p
                  style={{ color: 'var(--color-text)' }}
                  className="text-sm sm:text-base lg:text-lg font-mono uppercase tracking-wider text-slate-600 font-bold"
                >
                  FOUNDATIONAL PILLAR
                </p>
                <h3
                  style={{ color: 'var(--color-primary)' }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-[1.05] m-0 whitespace-pre-line"
                >
                  {current.shortTitle}
                </h3>
                <span
                  style={{ color: 'var(--color-text)' }}
                  className="block text-xs font-mono uppercase tracking-widest pt-2 font-semibold opacity-75"
                >
                  PILLAR {current.num} • {current.sanskrit}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Circular Navigation Buttons & Counter */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={prevPillar}
                aria-label="Previous Pillar"
                className="w-12 h-12 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-colors shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPillar}
                aria-label="Next Pillar"
                className="w-12 h-12 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-colors shadow-sm cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs sm:text-sm tracking-widest text-slate-500 font-bold pl-2">
                {current.num} / 04
              </span>
            </div>
          </div>

          {/* ================================================================
              CENTER COLUMN: SINGLE AUTHORITATIVE PILLAR IMAGE
              ================================================================ */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] xl:max-w-[500px] h-[320px] xs:h-[380px] sm:h-[540px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {current.isCutout ? (
                    /* Transparent cutouts: 100% opacity, sitting directly on section bg */
                    <img
                      src={current.image}
                      alt={current.pillarTitle}
                      className={`h-full w-auto max-h-full max-w-full opacity-100 filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.12)] pointer-events-none transition-all duration-300 ${
                        current.num === '02'
                          ? 'object-contain object-center scale-115 sm:scale-125'
                          : 'object-contain object-bottom'
                      }`}
                    />
                  ) : (
                    /* Other Pillars: Clean, 100% opacity photographic card */
                    <div className="w-full h-full rounded-none overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
                      <img
                        src={current.image}
                        alt={current.pillarTitle}
                        className="w-full h-full object-cover object-center opacity-100 transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN: EXPLANATION, GUIDING VISION, KEY POINTS, AND CTA
              ================================================================ */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Pillar Subtitle Tag & Full Title */}
                <div>
                  <span
                    style={{ color: 'var(--color-primary)' }}
                    className="text-sm sm:text-base font-sans font-bold uppercase tracking-wider block"
                  >
                    {current.subtitleTag}
                  </span>
                  <h4
                    style={{ color: 'var(--color-text)' }}
                    className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight mt-0.5"
                  >
                    {current.pillarTitle}
                  </h4>
                </div>

                {/* Core Guiding Vision Statement */}
                <blockquote
                  style={{ color: 'var(--color-text)' }}
                  className="font-sans text-sm sm:text-base leading-relaxed italic border-l-2 border-[var(--color-primary)] pl-3.5 text-slate-700 font-normal"
                >
                  "{current.visionStatement}"
                </blockquote>

                {/* Pedagogical Explanation */}
                <p
                  style={{ color: 'var(--color-text)' }}
                  className="font-sans text-xs sm:text-sm leading-relaxed text-slate-600 font-normal"
                >
                  {current.explanation}
                </p>

                {/* Key Points list */}
                <div className="space-y-2 pt-1 border-t border-[var(--color-border)]">
                  {current.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700">
                      <CheckCircle2
                        style={{ color: 'var(--color-primary)' }}
                        className="w-4 h-4 shrink-0 mt-0.5"
                      />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Discover Pillar Action Button */}
                <div className="pt-2">
                  <Link
                    to={current.targetUrl}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-text)',
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-none uppercase font-bold text-xs sm:text-sm tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                  >
                    <span>EXPLORE THIS PILLAR</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

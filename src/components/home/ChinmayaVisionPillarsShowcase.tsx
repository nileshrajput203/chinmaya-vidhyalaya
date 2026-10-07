import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PillarData {
  num: string;
  pillarTitle: string;
  representativeName: string;
  roleTag: string;
  sanskrit: string;
  image: string;
  isCutout?: boolean;
  quote: string;
  explanation: string;
  targetUrl: string;
  keyPoints: string[];
}

const CVP_PILLARS: PillarData[] = [
  {
    num: '01',
    pillarTitle: 'INTEGRATED DEVELOPMENT',
    representativeName: 'SANJANA',
    roleTag: 'Scholastic Topper & Yoga Leader',
    sanskrit: 'Sharirik, Bauddhik & Manasik Vikas',
    image: '/images/yoga-student.png',
    isCutout: true,
    quote:
      'Since my first day at Chinmaya Vidyalaya, learning has felt like a journey of self-discovery. Through morning yoga, analytical STEM experiments, and dedicated teachers, I gained not just academic marks, but physical vitality and mental poise.',
    explanation:
      'The first pillar harmonizes the fourfold dimensions of personality: physical health through daily yoga and athletics, emotional balance through mindfulness, intellectual rigor through experiential sciences, and spiritual awareness through self-reflection.',
    targetUrl: '/about/four-pillars',
    keyPoints: [
      'Daily Surya Namaskar, Pranayama & fitness regimen',
      'Hands-on STEM laboratories with analytical problem-solving',
      '1:25 personalized faculty mentoring & guidance',
      'Inter-house sports, athletics meets & martial arts'
    ]
  },
  {
    num: '02',
    pillarTitle: 'INDIAN CULTURE & ETHOS',
    representativeName: 'ADITYA',
    roleTag: 'Gita Chanting Champion & Classical Artist',
    sanskrit: 'Bhartiya Sanskriti & Parampara',
    image: '/images/puja-ceremony-cutout.png',
    isCutout: true,
    quote:
      'Chanting the Bhagavad Gita and learning our heritage has given me a moral compass that guides every decision. Here, ancient wisdom is not an old story—it is living value education that builds character and humility.',
    explanation:
      'The second pillar anchors children in India’s timeless cultural heritage, rich traditions, and noble philosophies. Students internalize universal ethics, respect for elders, classical music, and spiritual practices for inner tranquility.',
    targetUrl: '/features/spiritual-activities',
    keyPoints: [
      'Daily morning prayer assembly & Paduka Pooja',
      'Annual Bhagavad Gita chanting and Vedic shloka forum',
      'Matru-Pitru Pujan & Chinmaya Jayanti celebrations',
      'Linguistic mastery across Sanskrit, Hindi, and Marathi'
    ]
  },
  {
    num: '03',
    pillarTitle: 'PATRIOTISM & CIVIC DUTY',
    representativeName: 'DHRUVA & KRITI',
    roleTag: 'Student Council & Community Seva Leads',
    sanskrit: 'Rashtra Prem & Nagarik Kartavya',
    image: '/images/smiling-volunteer.png',
    isCutout: true,
    quote:
      'Being part of Chinmaya Vidyalaya taught us that patriotism is active service. Whether spearheading water conservation in Tarapur or leading the Student Council, we learn to put society before self.',
    explanation:
      'The third pillar nurtures responsible, disciplined citizens dedicated to societal progress and democratic values. It builds deep national pride alongside ecological stewardship and selfless community service (Seva).',
    targetUrl: '/features/4-pillars#pillar-3',
    keyPoints: [
      'Jal Pakhwada, tree plantation & green eco-club drives',
      'Elected Student Council & democratic house governance',
      'Grand national observances of Republic & Independence Days',
      'Active local civic outreach & blood donation initiatives'
    ]
  },
  {
    num: '04',
    pillarTitle: 'UNIVERSAL OUTLOOK',
    representativeName: 'RUGVEDA',
    roleTag: 'Global Citizenship & Science Forum Delegate',
    sanskrit: 'Vasudhaiva Kutumbakam',
    image: '/images/banner-8.webp',
    quote:
      'Vasudhaiva Kutumbakam—the world is one family. My school has taught me to see beyond borders, to embrace diversity with open arms, and to use science and compassion to solve global challenges.',
    explanation:
      'The fourth pillar instills a cosmopolitan, empathetic worldview. It transcends regional, linguistic, and national boundaries, guiding students to appreciate all cultures, practice environmental empathy, and lead with universal benevolence.',
    targetUrl: '/features/4-pillars#pillar-4',
    keyPoints: [
      'Universal prayer framework celebrating world harmony',
      'Global CBSE curriculum with international perspectives',
      'Ecological sustainability and carbon-neutral campus awareness',
      'Empathy, peace education, and ethical global leadership'
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
              className="text-3xl sm:text-4xl lg:text-5xl font-condensed uppercase tracking-tight leading-tight mt-1"
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
                    {p.pillarTitle.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            MASTER 3-COLUMN EDITORIAL SHOWCASE (Matching Target Design)
            ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================================================================
              LEFT COLUMN: MEET / TITLE + CIRCULAR ARROW CONTROLS
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
                  className="text-lg sm:text-xl lg:text-2xl font-condensed uppercase tracking-wider text-slate-600 font-bold"
                >
                  MEET THE VOICES OF
                </p>
                <h3
                  style={{ color: 'var(--color-primary)' }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-condensed uppercase tracking-tight leading-[0.88] m-0"
                >
                  {current.representativeName}
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
              CENTER COLUMN: SINGLE AUTHORITATIVE PILLAR IMAGE (NO OVERLAPPING IMAGES)
              ================================================================ */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] xl:max-w-[500px] h-[480px] sm:h-[540px] flex items-center justify-center">
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
                      alt={current.representativeName}
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
                        alt={current.representativeName}
                        className="w-full h-full object-cover object-center opacity-100 transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN: EXPLANATION, QUOTE, KEY POINTS, AND CTA BUTTON
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
                {/* Role / Pillar Subtitle */}
                <div>
                  <span
                    style={{ color: 'var(--color-primary)' }}
                    className="text-sm sm:text-base font-sans font-bold uppercase tracking-wider block"
                  >
                    {current.roleTag}
                  </span>
                  <h4
                    style={{ color: 'var(--color-text)' }}
                    className="text-2xl sm:text-3xl font-condensed uppercase tracking-tight mt-0.5"
                  >
                    {current.pillarTitle}
                  </h4>
                </div>

                {/* Personal Voice Quote */}
                <blockquote
                  style={{ color: 'var(--color-text)' }}
                  className="font-sans text-sm sm:text-base leading-relaxed italic border-l-2 border-[var(--color-primary)] pl-3.5 text-slate-700 font-normal"
                >
                  "{current.quote}"
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
                    <span>DISCOVER {current.pillarTitle}</span>
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

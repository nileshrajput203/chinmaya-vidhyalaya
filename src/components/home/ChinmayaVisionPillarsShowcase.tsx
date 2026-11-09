import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
    tabLabel: 'Integrated Development',
    shortTitle: 'INTEGRATED\nDEVELOPMENT',
    pillarTitle: 'PILLAR 1: INTEGRATED DEVELOPMENT',
    subtitleTag: 'Physical, Mental, Intellectual & Spiritual Development',
    sanskrit: 'Sharirik, Manasik, Bauddhik & Adhyatmik Vikas',
    image: '/images/pages/home/pillars/pillar-01-integrated.jpg',
    isCutout: false,
    visionStatement:
      'True education nurtures the entire being - harmonizing physical vitality, an analytical intellect, and emotional equilibrium to build purposeful leaders.',
    explanation:
      'The first pillar of the Chinmaya Vision Programme harmonizes the multidimensional growth of every child. Through morning yoga, sports, experiential science labs, and mindful self-reflection, students cultivate physical vigor, critical thinking, and inner poise.',
    targetUrl: '/about/philosophy#pillar-01',
    keyPoints: [
      'Physical Development (Sharirik): Sports, physical fitness, yoga & athletics',
      'Mental Development (Manasik): Emotional balance, resilience, focus & Gita chanting',
      'Intellectual Development (Bauddhik): AI, Coding, science labs & critical logic',
      'Spiritual Development (Adhyatmik): Ethical values, mutual respect & character building'
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
    isCutout: false,
    visionStatement:
      'Rooted in ancient wisdom, our heritage is a living moral compass - instilling reverence, cultural pride, and righteous character in every young mind.',
    explanation:
      'The second pillar anchors students in India’s timeless cultural ethos. Through daily morning prayers, Sanskrit chanting, value-based discussions, and celebrations of traditional festivals, students develop deep respect for elders, humility, and unshakeable ethical grounding.',
    targetUrl: '/about/philosophy#pillar-02',
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
    shortTitle: 'PATRIOTISM',
    pillarTitle: 'PILLAR 3: PATRIOTISM & CIVIC DUTY',
    subtitleTag: 'Civic Duty as an Active Expression of Patriotism',
    sanskrit: 'Rashtra Prem & Nagarik Kartavya',
    image: '/images/pages/home/pillars/pillar-03-patriotism.jpg',
    isCutout: false,
    visionStatement:
      'True patriotism is translated into dedicated action through civic duty, active community seva, and selfless service to the motherland.',
    explanation:
      'The third pillar nurtures deep patriotism, where civic duty and active citizenship are an integral part of national dedication. Through local Swachhata drives, environmental initiatives, and community service across Boisar, students learn that genuine patriotism begins with responsible civic action.',
    targetUrl: '/about/philosophy#pillar-03',
    keyPoints: [
      'Democratic Student Council elections & youth leadership governance',
      'Kargil Vijay Diwas commemorations & Armed Forces tributes',
      'Maharashtra Divas celebrations & cultural state pride',
      'Nasha Mukt Bharat youth rallies & Swachhata cleanliness drives'
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
      'Vasudhaiva Kutumbakam - the whole world is one family. Education must transcend narrow boundaries to foster universal brotherhood and planetary empathy.',
    explanation:
      'The fourth pillar broadens student awareness beyond geographic and cultural borders. By combining rigorous CBSE curricula with a universal Vedantic outlook, students learn to appreciate global cultures, champion environmental sustainability, and lead with empathy.',
    targetUrl: '/about/philosophy#pillar-04',
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
  const navigate = useNavigate();

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
                  onClick={() => {
                    if (isActive) {
                      navigate(p.targetUrl);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                  title={isActive ? `Explore ${p.tabLabel} pillar on 4 Pillars of CVP page` : `View ${p.tabLabel} details`}
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
        {/* ------------------------------------------------------------------
            MASTER 2-COLUMN HEROIC SHOWCASE (BIG VISUAL + NARRATIVE)
            ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* ================================================================
              LEFT COLUMN: HEROIC PHOTO CARD WITH CONTROLS (lg:col-span-6)
              ================================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full"
                >
                  <Link
                    to={current.targetUrl}
                    title={`Explore ${current.pillarTitle}`}
                    className="block w-full group cursor-pointer"
                  >
                    <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.16)] border-2 border-[#E7E2D8] bg-slate-900">
                      {/* Floating Pillar Badge in Top-Left Corner */}
                      <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 px-3.5 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-lg">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-[#DF711B]">
                          PILLAR {current.num}
                        </span>
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold hidden xs:inline">
                          • {current.tabLabel}
                        </span>
                      </div>

                      <img
                        src={current.image}
                        alt={current.pillarTitle}
                        className="w-full h-full object-cover object-center opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls Bar directly below photo */}
              <div className="flex items-center justify-between pt-3.5 px-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevPillar}
                    aria-label="Previous Pillar"
                    className="w-11 h-11 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-colors shadow-sm cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPillar}
                    aria-label="Next Pillar"
                    className="w-11 h-11 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-colors shadow-sm cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-slate-500 font-bold pl-1">
                    {current.num} / 04
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    {current.sanskrit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN: EDITORIAL NARRATIVE & ACTION (lg:col-span-6)
              ================================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 lg:pl-2">
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
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#DF711B]">
                      FOUNDATIONAL PILLAR {current.num} • CVP ARCHITECTURE
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#181C20] leading-tight mt-1">
                    <Link to={current.targetUrl} className="hover:text-[var(--color-primary)] transition-colors">
                      {current.pillarTitle}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-[#DF711B] mt-1">
                    {current.subtitleTag}
                  </p>
                </div>

                {/* Core Guiding Vision Quote */}
                <blockquote className="font-sans text-sm sm:text-[15px] leading-relaxed italic border-l-4 border-[#DF711B] bg-amber-50/50 p-3.5 rounded-r-xl text-slate-800 font-medium">
                  "{current.visionStatement}"
                </blockquote>

                {/* Pedagogical Explanation */}
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  {current.explanation}
                </p>

                {/* Key Points 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[var(--color-border)]">
                  {current.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-[12.5px] text-slate-700 bg-white border border-[#E7E2D8] rounded-xl p-2.5 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#DF711B]" />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Discover Pillar Action Button */}
                <div className="pt-2">
                  <Link
                    to={current.targetUrl}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#DF711B] text-white hover:bg-[#181818] uppercase font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg rounded-xl cursor-pointer"
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

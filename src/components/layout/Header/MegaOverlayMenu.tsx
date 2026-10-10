import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  GraduationCap, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

const SITEMAP_PILLARS = [
  {
    id: 'pillar-1',
    num: '01',
    title: 'Integrated Development',
    subtitle: 'Body, Mind & Intellect in Harmony',
    image: '/images/pages/home/pillars/pillar-01-integrated.png',
  },
  {
    id: 'pillar-2',
    num: '02',
    title: 'Indian Culture & Heritage',
    subtitle: 'Vedic Ethos & Timeless Values',
    image: '/images/pages/home/pillars/pillar-02-culture.png',
  },
  {
    id: 'pillar-3',
    num: '03',
    title: 'Patriotism & Civic Duty',
    subtitle: 'Nation Building & Selfless Service',
    image: '/images/pages/home/pillars/pillar-03-patriotism.png',
  },
  {
    id: 'pillar-4',
    num: '04',
    title: 'Universal Outlook',
    subtitle: 'Vasudhaiva Kutumbakam • One World',
    image: '/images/pages/home/pillars/pillar-04-universal.webp',
  },
];

interface MegaOverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmissionDrawer?: () => void;
}

export const MegaOverlayMenu: React.FC<MegaOverlayMenuProps> = ({
  isOpen,
  onClose,
  onOpenAdmissionDrawer,
}) => {
  const location = useLocation();
  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const timer = setInterval(() => {
      setActivePillarIdx((prev) => (prev + 1) % SITEMAP_PILLARS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isOpen, isPaused]);

  const handlePrevPillar = () => {
    setActivePillarIdx((prev) => (prev - 1 + SITEMAP_PILLARS.length) % SITEMAP_PILLARS.length);
  };

  const handleNextPillar = () => {
    setActivePillarIdx((prev) => (prev + 1) % SITEMAP_PILLARS.length);
  };

  const currentPillar = SITEMAP_PILLARS[activePillarIdx];

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      const l = (window as any).__lenis;
      if (l) {
        l.start();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRestart = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    sessionStorage.removeItem('cv_preloader_seen');
    sessionStorage.setItem('cv_preloader_seen', 'true');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.location.href = '/';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: 'contain' }}
        className="fixed inset-0 z-[100] bg-[#14161A]/95 backdrop-blur-2xl text-slate-100 flex flex-col justify-between overflow-y-auto selection:bg-[#DF711B] selection:text-white scroll-smooth"
      >
        {/* TOP BAR */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          
          {/* Left: Square Red/Maroon Close Button + Brand Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-12 h-12 bg-[#8B1E2B] hover:bg-[#6e1520] text-white flex items-center justify-center rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 group cursor-pointer"
              aria-label="Close menu"
              title="Close Menu"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <a 
              href="/" 
              onClick={handleRestart}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <img 
                src="/images/Chinmaya_Logo.webp" 
                alt="Chinmaya Vidyalaya Emblem" 
                className="h-12 sm:h-14 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" 
              />
              <div>
                <h2 className="font-cinzel font-black text-white text-lg sm:text-xl tracking-wider uppercase leading-none">
                  CHINMAYA VIDYALAYA
                </h2>
                <p className="text-[10px] text-amber-400 font-mono uppercase tracking-widest font-semibold mt-1">
                  TARAPUR • BOISAR
                </p>
              </div>
            </a>
          </div>

          {/* Right: Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenAdmissionDrawer) onOpenAdmissionDrawer();
              }}
              className="px-4 py-2.5 bg-[#DF711B] hover:bg-[#c85f12] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-all"
            >
              <GraduationCap className="w-4 h-4 text-amber-200" />
              <span className="hidden sm:inline">Admissions 2026-27</span>
              <span className="sm:hidden">Apply</span>
            </button>

            <Link
              to="/about/mandatory-information"
              onClick={onClose}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold rounded-xl text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Disclosures</span>
            </Link>
          </div>

        </div>

        {/* CENTER CONTENT: Navigation Links Columns + Cutout Image */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* NAVIGATION COLUMNS (8 cols on lg) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* COLUMN 1: ABOUT US & ADMISSIONS */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-amber-400 text-xs sm:text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>ABOUT THE SCHOOL</span>
                </h3>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                  {[
                    { label: "School History", href: "/about/history" },
                    { label: "School Vision & Mission", href: "/about/mission-vision" },
                    { label: "Board of Management", href: "/about/management" },
                    { label: "Important Disclosures", href: "/about/mandatory-information" },
                    { label: "About the Heritage", href: "/about/heritage" },
                    { label: "4 Pillars of CVP", href: "/about/philosophy" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`hover:text-amber-400 hover:translate-x-1 transition-all duration-150 inline-block py-0.5 ${
                          location.pathname === link.href ? 'text-amber-400 font-bold' : 'text-slate-300 font-medium'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-amber-400 text-xs sm:text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>ADMISSIONS & ENROLLMENT</span>
                </h3>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                  {([
                    { label: "Admission Guidelines", href: "/admissions/guidelines" },
                    { label: "Registration Forms", href: "/downloads/admissions" },
                    { label: "Annual Fee Structure", href: "/admissions/fee-structure" },
                    { label: "School Calendar 2026–27", href: "/admissions/calendar" },
                  ] as { label: string; href: string; external?: boolean }[]).map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-amber-400 hover:translate-x-1 transition-all duration-150 inline-block py-0.5 font-medium"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={onClose}
                          className={`hover:text-amber-400 hover:translate-x-1 transition-all duration-150 inline-block py-0.5 ${
                            location.pathname === link.href ? 'text-amber-400 font-bold' : 'text-slate-300 font-medium'
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 2: ACADEMICS & CAMPUS GALLERY PREVIEW */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-amber-400 text-xs sm:text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>ACADEMICS & CURRICULUM</span>
                </h3>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                  {[
                    { label: "CBSE Curriculum & Syllabi", href: "/academics/curriculum" },
                    { label: "Infrastructure & Science Labs", href: "/academics/infrastructure" },
                    { label: "CBSE Sample Papers", href: "/downloads/sample-papers" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`hover:text-amber-400 hover:translate-x-1 transition-all duration-150 inline-block py-0.5 ${
                          location.pathname === link.href ? 'text-amber-400 font-bold' : 'text-slate-300 font-medium'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 3: STUDENT LIFE & CONNECT */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-amber-400 text-xs sm:text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>STUDENT ACTIVITIES & LIFE</span>
                </h3>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                  {[
                    { label: "Co-Curricular & Sports", href: "/academics/co-curricular" },
                    { label: "Career Counseling & ASSET", href: "/features/career-counselling" },
                    { label: "Central Library & Archives", href: "/features/library" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`hover:text-amber-400 hover:translate-x-1 transition-all duration-150 inline-block py-0.5 ${
                          location.pathname === link.href ? 'text-amber-400 font-bold' : 'text-slate-300 font-medium'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-amber-400 text-xs sm:text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>CONNECT & COMMUNITY</span>
                </h3>
                <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                  {[
                    { label: "Notice Board & Events", href: "/news" },
                    { label: "School Blog & Insights", href: "/blog" },
                    { label: "Alumni Network", href: "/alumni" },
                    { label: "Careers & Faculty Openings", href: "/careers" },
                    { label: "Contact Campus Office", href: "/contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`hover:text-amber-400 hover:translate-x-1 transition-all duration-150 inline-block py-0.5 ${
                          location.pathname === link.href ? 'text-amber-400 font-bold' : 'text-slate-300 font-medium'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: 4 PILLARS ROTATING CAROUSEL (ONE IMAGE AT A TIME) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative h-full items-center">
            <div 
              className="relative max-w-sm w-full bg-slate-900/60 border border-slate-700/60 rounded-3xl p-5 backdrop-blur-md shadow-2xl flex flex-col items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Soft gold ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Pillar Header / Tag */}
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-3 z-10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    CVP Framework
                  </span>
                  <h4 className="text-sm font-cinzel font-bold text-white tracking-wide">
                    {currentPillar.title}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                  {currentPillar.num} / 04
                </span>
              </div>

              {/* Carousel Image Container with AnimatePresence */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden flex items-center justify-center bg-black/40 border border-slate-800/80 p-3 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={currentPillar.image} 
                      alt={currentPillar.title} 
                      className={`max-w-full max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] ${
                        currentPillar.id === 'pillar-4' ? 'rounded-xl' : ''
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right chevron navigation buttons */}
                <button
                  type="button"
                  onClick={handlePrevPillar}
                  aria-label="Previous pillar image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer opacity-70 hover:opacity-100 z-20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPillar}
                  aria-label="Next pillar image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer opacity-70 hover:opacity-100 z-20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Subtitle & Dot Indicators */}
              <div className="w-full pt-3 flex items-center justify-between z-10">
                <Link
                  to="/features/4-pillars"
                  onClick={onClose}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group transition-colors"
                >
                  <span>Explore 4 Pillars</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {SITEMAP_PILLARS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePillarIdx(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activePillarIdx === idx 
                          ? 'w-6 bg-amber-400' 
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: Social Links & Copyright */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <div className="text-xs text-slate-400 font-mono text-center sm:text-right">
            Copyright © {new Date().getFullYear()} {OFFICIAL_SCHOOL_INFO.name}. All Rights Reserved.
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

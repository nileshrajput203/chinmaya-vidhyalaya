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
  ArrowUpRight,
  ImageIcon,
  ChevronRight
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

const GALLERY_MOMENTS = [
  {
    title: "Annual Day Cultural Spectacle",
    tag: "Celebrations",
    date: "Dec 2024",
    image: "/images/banner-9.webp"
  },
  {
    title: "Inter-House Athletic Championship",
    tag: "Sports Meet",
    date: "Jan 2025",
    image: "/images/banner-8.webp"
  },
  {
    title: "Guru Paduka Pooja & Devotional Assembly",
    tag: "Spiritual CVP",
    date: "May 2024",
    image: "/images/guru-paduka-pooja.webp"
  },
  {
    title: "Experiential Chemistry Workstations",
    tag: "Science Fest",
    date: "Nov 2024",
    image: "/images/CHEM1.jpeg"
  },
  {
    title: "Physics Mechanics & Optical Labs",
    tag: "STEM Innovation",
    date: "Oct 2024",
    image: "/images/phys.jpeg"
  }
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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);

  useEffect(() => {
    if (!isOpen || isGalleryPaused) return;
    const timer = window.setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % GALLERY_MOMENTS.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isOpen, isGalleryPaused]);

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

              {/* 21ST.DEV STYLE INTERACTIVE CAMPUS GALLERY PREVIEW CARD */}
              <div 
                className="pt-1"
                onMouseEnter={() => setIsGalleryPaused(true)}
                onMouseLeave={() => setIsGalleryPaused(false)}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="font-heading font-black text-amber-400 text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>CAMPUS GALLERY</span>
                  </h3>
                  <Link
                    to="/gallery"
                    onClick={onClose}
                    className="text-[11px] font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors group/view"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

                {/* 21st.dev Interactive Image Card */}
                <div className="mt-3 relative group/card rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10 hover:shadow-2xl">
                  {/* Image Display */}
                  <Link 
                    to="/gallery" 
                    onClick={onClose}
                    className="relative block aspect-[16/10] overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeGalleryIndex}
                        src={GALLERY_MOMENTS[activeGalleryIndex].image}
                        alt={GALLERY_MOMENTS[activeGalleryIndex].title}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    </AnimatePresence>

                    {/* Gradient Overlay Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14161A] via-[#14161A]/40 to-transparent" />

                    {/* Bottom Caption & Pagination Controls */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-end justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-bold leading-tight drop-shadow truncate">
                          {GALLERY_MOMENTS[activeGalleryIndex].title}
                        </p>
                        <p className="text-[10px] text-slate-300 font-mono mt-0.5 drop-shadow truncate">
                          {GALLERY_MOMENTS[activeGalleryIndex].date}
                        </p>
                      </div>

                      {/* Pill pagination dots */}
                      <div className="flex items-center gap-1 shrink-0 pb-0.5">
                        {GALLERY_MOMENTS.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveGalleryIndex(idx);
                            }}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              activeGalleryIndex === idx
                                ? 'w-4 bg-amber-400'
                                : 'w-1.5 bg-white/40 hover:bg-white/80'
                            }`}
                            aria-label={`View slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* Bottom Action Footer */}
                  <Link
                    to="/gallery"
                    onClick={onClose}
                    className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 hover:bg-amber-500/10 border-t border-slate-800 text-[11px] text-slate-300 hover:text-amber-400 transition-colors font-medium"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      Explore 50+ Visual Archives
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/card:translate-x-1 group-hover/card:text-amber-400 transition-all" />
                  </Link>
                </div>
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
                    { label: "Holistic Development", href: "/features/holistic-development" },
                    { label: "Spiritual Assemblies & Pooja", href: "/features/spiritual-activities" },
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

          {/* RIGHT SIDE CUTOUT IMAGE OF STUDENTS (4 cols on lg) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative h-full items-end">
            <div className="relative max-w-sm w-full">
              {/* Soft gold glow behind students */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <img 
                src="/images/menu_students_cutout.png" 
                alt="Chinmaya Vidyalaya Students" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] mix-blend-lighten pointer-events-none relative z-10"
              />
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

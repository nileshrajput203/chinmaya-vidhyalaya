import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Facebook, 
  Instagram, 
  GraduationCap, 
  FileText
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO, OFFICIAL_SOCIAL_LINKS } from '../../../data/school';

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
                    { label: "School Calendar 2026-27", href: "/admissions/calendar" },
                  ] as { label: string; href: string; external?: boolean }[]).map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
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

          {/* RIGHT SIDE: 4TH PILLAR IMAGE ONLY */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative h-full items-center">
            <img 
              src="/images/pages/home/pillars/pillar-04-universal.webp" 
              alt="Universal Outlook" 
              className="max-w-sm w-full h-auto object-cover rounded-2xl shadow-2xl"
            />
          </div>

        </div>

        {/* BOTTOM BAR: Social Links & Copyright */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-3">
            <a 
              href={OFFICIAL_SOCIAL_LINKS.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href={OFFICIAL_SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all"
            >
              <Instagram className="w-4 h-4" />
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

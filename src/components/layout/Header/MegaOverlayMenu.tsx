import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  GraduationCap, 
  FileText
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../../data/school';

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

  if (!isOpen) return null;

  const handleRestart = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    sessionStorage.removeItem('cv_preloader_seen');
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
        className="fixed inset-0 z-[100] bg-[#14161A]/95 backdrop-blur-2xl text-slate-100 flex flex-col justify-between overflow-y-auto selection:bg-[#DF711B] selection:text-white"
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
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-700">
                <img src="/images/Chinmaya_Logo.webp" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="font-cinzel font-black text-white text-xl sm:text-2xl tracking-widest uppercase leading-none">
                  CHINMAYA
                </h2>
                <p className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-semibold mt-0.5">
                  VIDYALAYA TARAPUR
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
            
            {/* COLUMN 1: ACADEMICS & NOTICE BOARD */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-amber-400 text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>ACADEMIC WINGS</span>
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  {[
                    { label: "Early Childhood (Pre-Primary)", href: "/academics/curriculum" },
                    { label: "Primary Wing (Std I-V)", href: "/academics/curriculum" },
                    { label: "Secondary Wing (Std VI-X)", href: "/academics/curriculum" },
                    { label: "Curriculum & Labs", href: "/academics/curriculum" },
                    { label: "Faculty Directory", href: "/academics/faculty" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`hover:text-amber-400 transition-colors block py-0.5 ${
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
                <h3 className="font-heading font-black text-amber-400 text-sm tracking-widest uppercase pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>NOTICE & EVENTS</span>
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  {[
                    { label: "Notice Board & Circulars", href: "/news" },
                    { label: "School Calendar 2026-27", href: "/images/academic-calendar.pdf", external: true },
                    { label: "Mandatory Disclosures", href: "/about/mandatory-information" },
                    { label: "Transfer Certificates (TC)", href: "/about/transfer-certificates" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={onClose}
                          className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 2: CVP & CAMPUS LIFE */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-amber-400 text-sm tracking-widest uppercase pb-2 border-b border-slate-800">
                  CVP & STUDENT LIFE
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  {[
                    { label: "4 Pillars of CVP", href: "/about/philosophy" },
                    { label: "Spiritual Assemblies & Pooja", href: "/features/spiritual-activities" },
                    { label: "Career Counseling & ASSET", href: "/features/career-counselling" },
                    { label: "Educational Field Tours", href: "/features/education-tours" },
                    { label: "Central Library", href: "/features/library" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-amber-400 text-sm tracking-widest uppercase pb-2 border-b border-slate-800">
                  ABOUT CHINMAYA
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  {[
                    { label: "Institutional History", href: "/about/history" },
                    { label: "Mission & Vision", href: "/about/mission-vision" },
                    { label: "Board of Management", href: "/about/management" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 3: ADMISSIONS, GALLERY & CAREERS */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-black text-amber-400 text-sm tracking-widest uppercase pb-2 border-b border-slate-800">
                  ADMISSIONS & FORMS
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  {[
                    { label: "Admissions Guidelines", href: "/about/enrollment" },
                    { label: "Fee Structure", href: "/images/fees-structure.pdf", external: true },
                    { label: "Nursery Reg. Form", href: "/images/nursery.pdf", external: true },
                    { label: "Primary Admission Form", href: "/images/1to9.pdf", external: true },
                    { label: "Evaluation Papers (1-5)", href: "/downloads/evaluation-papers" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={onClose}
                          className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-black text-amber-400 text-sm tracking-widest uppercase pb-2 border-b border-slate-800">
                  GALLERY & CAREERS
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  {[
                    { label: "Visual Archives & Gallery", href: "/gallery" },
                    { label: "Careers & Faculty Openings", href: "/careers" },
                    { label: "Teacher Application (.docx)", href: "/images/application-form-for-the-post-of-teacher.docx", external: true },
                    { label: "Contact Campus Office", href: "/contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          download
                          className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={onClose}
                          className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5 font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
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
                alt="Chinmaya Students" 
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

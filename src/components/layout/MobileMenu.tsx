import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Mail, Award, X, GraduationCap, FileText } from 'lucide-react';
import { OFFICIAL_NAVIGATION_DATA } from '../../data/navigation';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmissionDrawer?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenAdmissionDrawer }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Pause Lenis smooth scroll and lock body while side menu is open, so mouse wheel scrolls drawer directly
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

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

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
      <div 
        className="fixed inset-0 z-50 lg:hidden flex"
        data-lenis-prevent="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#181C20]/70 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Drawer Content */}
        <motion.div
          ref={drawerRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          data-lenis-prevent="true"
          onWheel={(e) => {
            // Stop wheel event from propagating to window/lenis
            e.stopPropagation();
          }}
          style={{ overscrollBehavior: 'contain' }}
          className="relative ml-auto w-full max-w-sm bg-[#FCFBF7] text-[#181C20] h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-l border-[#E7E2D8] scroll-smooth"
        >
          {/* Mobile Header with Logo Restart */}
          <div className="p-5 bg-[#FAF8F5] text-[#181C20] flex items-center justify-between border-b border-[#E7E2D8] shrink-0">
            <a 
              href="/" 
              onClick={handleRestart}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img 
                src="/images/Chinmaya_Logo.webp" 
                alt="Chinmaya Vidyalaya Logo" 
                className="h-12 w-auto object-contain shrink-0" 
              />
              <div>
                <span className="font-cinzel font-bold text-base block text-[#181C20] leading-tight">
                  CHINMAYA VIDYALAYA
                </span>
                <p className="text-[10px] text-[#DF711B] font-mono uppercase tracking-widest font-bold mt-0.5">
                  Tarapur • Boisar
                </p>
              </div>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#FAF3E8] hover:bg-[#EFEAE1] text-[#181C20] border border-[#E7E2D8] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Apply Callout */}
          <div className="p-4 bg-[#F7F3EB] border-b border-[#E7E2D8] flex gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                if (onOpenAdmissionDrawer) onOpenAdmissionDrawer();
              }}
              className="flex-1 py-2.5 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Admissions 2026-27</span>
            </button>

            <Link
              to="/about/mandatory-information"
              onClick={onClose}
              className="px-3 py-2.5 bg-white border border-[#E7E2D8] text-[#181C20] text-xs font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>Disclosures</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4 px-3 space-y-1">
            {OFFICIAL_NAVIGATION_DATA.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedSection === item.label;

              return (
                <div key={item.label} className="border-b border-[#E7E2D8]/60 last:border-none">
                  {hasChildren ? (
                    <div>
                      <button
                        onClick={() => toggleSection(item.label)}
                        className="w-full flex items-center justify-between py-3 px-3 text-[#181C20] font-semibold text-sm hover:bg-[#F7F3EB] rounded-xl text-left transition-colors cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#DF711B]' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="bg-[#F7F3EB]/70 rounded-xl py-2 px-2 my-1 space-y-1 border-l-2 border-[#DF711B] ml-2">
                          {item.children?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={onClose}
                              className={`block py-2 px-3 text-xs rounded-lg transition-colors ${
                                location.pathname === subItem.href
                                  ? 'bg-[#DF711B] text-white font-bold'
                                  : 'text-[#363C44] hover:text-[#DF711B] hover:bg-white'
                              }`}
                            >
                              <div className="font-medium">{subItem.label}</div>
                              {subItem.description && (
                                <div className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                  {subItem.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`block py-3 px-3 text-sm font-semibold rounded-xl transition-colors ${
                        location.pathname === item.href
                          ? 'bg-[#DF711B] text-white'
                          : 'text-[#181C20] hover:bg-[#F7F3EB]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Footer Info */}
          <div className="p-4 bg-[#F7F3EB] border-t border-[#E7E2D8] text-xs space-y-2.5 text-[#4A5568] shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#DF711B] shrink-0" />
              <span>CBSE Affiliation: <strong className="text-[#181C20]">{OFFICIAL_SCHOOL_INFO.affiliationNo}</strong></span>
            </div>
            <a 
              href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
              className="flex items-center gap-2 text-[#181C20] hover:text-[#DF711B] transition-colors py-0.5"
            >
              <Phone className="w-4 h-4 text-[#DF711B] shrink-0" />
              <span>{OFFICIAL_SCHOOL_INFO.contact.phone[0]}</span>
            </a>
            <a 
              href={`mailto:${OFFICIAL_SCHOOL_INFO.contact.email[0]}`}
              className="flex items-center gap-2 text-[#181C20] hover:text-[#DF711B] transition-colors py-0.5"
            >
              <Mail className="w-4 h-4 text-[#DF711B] shrink-0" />
              <span className="truncate">{OFFICIAL_SCHOOL_INFO.contact.email[0]}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Bell } from 'lucide-react';
import { OFFICIAL_NAVIGATION_DATA } from '../../../data/navigation';

interface MainNavigationProps {
  onOpenAdmissionDrawer?: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ onOpenAdmissionDrawer }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`hidden lg:block sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1D30]/95 backdrop-blur-md shadow-xl py-0 border-b border-white/10'
          : 'bg-[#0B1D30] text-white shadow-header border-t border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Navigation Items */}
        <ul className="flex items-center space-x-1">
          {OFFICIAL_NAVIGATION_DATA.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = location.pathname === item.href || 
              item.children?.some(child => location.pathname === child.href);

            return (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {hasChildren ? (
                  <button
                    className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      isActive
                        ? 'border-[#D97745] text-white bg-white/10 font-bold'
                        : 'border-transparent text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-white/70" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-4 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      isActive
                        ? 'border-[#D97745] text-white bg-white/10 font-bold'
                        : 'border-transparent text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Rich Framer-Grade Submenu Dropdown */}
                <AnimatePresence>
                  {hasChildren && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full w-72 bg-[#FCFBF7] text-[#181C20] border-t-2 border-[#D97745] py-2 shadow-2xl rounded-b-2xl overflow-hidden z-50 border border-[#E7E2D8]"
                    >
                      <div className="px-4 py-2 border-b border-[#E7E2D8] bg-[#F7F3EB]/60">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#D97745] font-bold">
                          {item.label} Hub
                        </span>
                      </div>

                      <div className="p-1 space-y-0.5">
                        {item.children?.map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className={`block px-3.5 py-2.5 rounded-xl text-xs transition-colors ${
                                isSubActive
                                  ? 'bg-[#0B1D30] text-white font-bold'
                                  : 'hover:bg-[#F7F3EB] hover:text-[#0B1D30] text-[#363C44]'
                              }`}
                            >
                              <div className="font-semibold text-xs">{subItem.label}</div>
                              {subItem.description && (
                                <div className={`text-[11px] font-normal mt-0.5 line-clamp-1 ${isSubActive ? 'text-slate-300' : 'text-slate-500'}`}>
                                  {subItem.description}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Right Action Quick Triggers */}
        <div className="flex items-center gap-2.5 py-1.5">
          <Link
            to="/news/circulars"
            className="px-3 py-1.5 text-[11px] font-mono text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-[#D97745]" />
            <span>School Circulars</span>
          </Link>

          <button
            onClick={onOpenAdmissionDrawer}
            className="px-4 py-2 bg-[#D97745] hover:bg-[#C8652D] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quick Apply</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bell, GraduationCap, ArrowUpRight } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 90);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`hidden lg:block sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-0 border-b border-[#E7E2D8]'
          : 'bg-white text-[#181C20] shadow-xs border-y border-[#E7E2D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 xl:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
        
        {/* Main Nav Items: Fixed single-line height, no wrapping */}
        <ul className="flex items-center space-x-0.5 xl:space-x-1 min-w-0">
          {OFFICIAL_NAVIGATION_DATA.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = location.pathname === item.href || 
              item.children?.some(child => location.pathname === child.href);

            return (
              <li
                key={item.label}
                className="relative group shrink-0"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {hasChildren ? (
                  <button
                    className={`relative inline-flex items-center gap-1 xl:gap-1.5 h-12 px-2.5 xl:px-3.5 text-[11px] xl:text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border-b-[3px] font-sans ${
                      isActive
                        ? 'border-[#DF711B] text-[#DF711B] bg-[#FFF7DF] font-bold'
                        : 'border-transparent text-[#334155] hover:text-[#DF711B] hover:bg-[#FFF7DF]/60'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 text-[#64748B] group-hover:text-[#DF711B] shrink-0" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative inline-flex items-center h-12 px-2.5 xl:px-3.5 text-[11px] xl:text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border-b-[3px] font-sans ${
                      isActive
                        ? 'border-[#DF711B] text-[#DF711B] bg-[#FFF7DF] font-bold'
                        : 'border-transparent text-[#334155] hover:text-[#DF711B] hover:bg-[#FFF7DF]/60'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Submenu Dropdown */}
                <AnimatePresence>
                  {hasChildren && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full w-80 bg-white text-[#181C20] border-t-2 border-[#DF711B] py-2 shadow-2xl rounded-b-2xl overflow-hidden z-50 border border-[#E7E2D8]"
                    >
                      <div className="px-4 py-2 border-b border-[#E7E2D8] bg-[#FAF8F5] flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#DF711B] font-bold">
                          {item.label} Section
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#64C9CF]" />
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
                                  ? 'bg-[#FFF7DF] text-[#DF711B] font-bold'
                                  : 'hover:bg-[#FAF8F5] hover:text-[#DF711B] text-[#334155]'
                              }`}
                            >
                              <div className="font-semibold text-xs flex items-center justify-between">
                                <span>{subItem.label}</span>
                                {isSubActive && <ArrowUpRight className="w-3 h-3 text-[#DF711B]" />}
                              </div>
                              {subItem.description && (
                                <div className={`text-[11px] font-normal mt-0.5 line-clamp-1 ${isSubActive ? 'text-[#DF711B]/80' : 'text-slate-500'}`}>
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
        <div className="flex items-center gap-2 xl:gap-2.5 shrink-0 pl-3">
          <Link
            to="/news/circulars"
            className="px-3 py-1.5 text-[11px] font-mono text-[#181C20] hover:text-[#DF711B] bg-[#FFFDF8] hover:bg-[#FFF7DF] border border-[#E7E2D8] hover:border-[#FDE49C] rounded-full flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            <Bell className="w-3.5 h-3.5 text-[#FFB740]" />
            <span>Circulars</span>
          </Link>

          <button
            onClick={onOpenAdmissionDrawer}
            className="px-3.5 py-1.5 bg-[#DF711B] hover:bg-[#C45B0E] text-white text-xs font-bold rounded-full transition-all shadow-sm hover:shadow flex items-center gap-1.5 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
          >
            <GraduationCap className="w-4 h-4 text-[#FDE49C]" />
            <span>Apply Now</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

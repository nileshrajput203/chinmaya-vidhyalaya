import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GraduationCap, ArrowUpRight, LayoutGrid } from 'lucide-react';
import { OFFICIAL_NAVIGATION_DATA } from '../../../data/navigation';

interface MainNavigationProps {
  onOpenAdmissionDrawer?: () => void;
  onOpenMegaMenu?: () => void;
}

const getNavDisplayLabel = (label: string) => {
  if (label === 'Student Life & CVP') return 'Student Life';
  if (label === 'Notice Board') return 'Notices';
  return label;
};

export const MainNavigation: React.FC<MainNavigationProps> = ({ 
  onOpenAdmissionDrawer,
  onOpenMegaMenu,
}) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden lg:block bg-[#0B1E34] text-white shadow-md border-t-2 border-[#DF711B] relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        
        {/* Main Nav Items Ribbon */}
        <ul className="flex items-center space-x-0.5 xl:space-x-1 min-w-0 flex-1 justify-start">
          {OFFICIAL_NAVIGATION_DATA.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = location.pathname === item.href || 
              item.children?.some(child => location.pathname === child.href);
            const isNearRightEdge = index >= OFFICIAL_NAVIGATION_DATA.length - 3;

            return (
              <li
                key={item.label}
                className="relative group shrink-0"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {hasChildren ? (
                  <button
                    className={`relative inline-flex items-center gap-1 xl:gap-1.5 h-11 xl:h-12 px-2 lg:px-2.5 xl:px-3 text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border-b-2 cursor-pointer ${
                      isActive 
                        ? 'text-[#FFB740] border-[#DF711B] bg-white/5 font-extrabold' 
                        : 'text-slate-200 hover:text-[#FFB740] hover:bg-white/5 border-transparent'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{getNavDisplayLabel(item.label)}</span>
                    <ChevronDown className={`w-2.5 h-2.5 xl:w-3 xl:h-3 transition-transform duration-200 shrink-0 ${
                      activeDropdown === item.label ? 'rotate-180 text-[#FFB740]' : 'text-slate-400 group-hover:text-[#FFB740]'
                    }`} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative inline-flex items-center h-11 xl:h-12 px-2 lg:px-2.5 xl:px-3 text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border-b-2 ${
                      isActive 
                        ? 'text-[#FFB740] border-[#DF711B] bg-white/5 font-extrabold' 
                        : 'text-slate-200 hover:text-[#FFB740] hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <span>{getNavDisplayLabel(item.label)}</span>
                  </Link>
                )}

                {/* Submenu Dropdown Card */}
                <AnimatePresence>
                  {hasChildren && activeDropdown === item.label && (() => {
                    const isMultiColumn = (item.children?.length || 0) > 3;
                    const alignClass = isNearRightEdge ? 'right-0' : 'left-0';
                    const widthClass = isMultiColumn ? 'w-[480px] xl:w-[520px]' : 'w-72 sm:w-80';

                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className={`absolute ${alignClass} top-full ${widthClass} max-h-[calc(100vh-140px)] overflow-y-auto bg-white text-[#181C20] border-t-2 border-[#DF711B] shadow-2xl rounded-b-2xl z-50 border border-[#E7E2D8] scrollbar-thin`}
                      >
                        {/* Submenu Header */}
                        <div className="px-4 py-2 border-b border-[#E7E2D8] bg-[#FAF8F5] flex items-center justify-between sticky top-0 z-10">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#DF711B] font-bold">
                            {item.label} Section
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                            {item.children?.length} Pages
                          </span>
                        </div>

                        {/* Submenu Items List (Multi-column when > 3 items) */}
                        <div className={isMultiColumn ? "p-2 grid grid-cols-2 gap-1.5" : "p-1.5 space-y-0.5"}>
                          {item.children?.map((subItem) => {
                            const isSubActive = location.pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                to={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`block p-2.5 rounded-xl text-xs transition-colors group/sub border ${
                                  isSubActive
                                    ? 'bg-[#FFF3D6] text-[#B2530C] border-[#DF711B]/40 font-bold'
                                    : 'hover:bg-[#FAF8F5] text-slate-700 hover:text-[#DF711B] border-transparent hover:border-[#DF711B]/20'
                                }`}
                              >
                                <div className="font-semibold text-xs flex items-center justify-between">
                                  <span className="group-hover/sub:translate-x-0.5 transition-transform line-clamp-1">
                                    {subItem.label}
                                  </span>
                                  <ArrowUpRight className={`w-3.5 h-3.5 shrink-0 ml-1 transition-all ${
                                    isSubActive ? 'text-[#B2530C]' : 'text-slate-400 group-hover/sub:text-[#DF711B] group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5'
                                  }`} />
                                </div>
                                {subItem.description && (
                                  <div className={`text-[10.5px] font-normal mt-0.5 line-clamp-1 ${
                                    isSubActive ? 'text-[#8C3F05] font-medium' : 'text-slate-500'
                                  }`}>
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Right Nav Utilities: Explore / Mega Menu & Apply CTA */}
        <div className="shrink-0 flex items-center gap-2 xl:gap-3 pl-3 xl:pl-4 border-l border-white/10 ml-1">
          
          {/* Full Directory / Mega Menu Launcher */}
          {onOpenMegaMenu && (
            <button
              onClick={onOpenMegaMenu}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Open full campus sitemap & navigation"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#FFB740] shrink-0" />
              <span className="hidden 2xl:inline">Sitemap</span>
            </button>
          )}

          {/* Quick Apply Pill */}
          <button
            onClick={onOpenAdmissionDrawer}
            className="hidden xl:inline-flex px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#DF711B] hover:bg-[#C45B0E] text-white transition-all shadow-sm hover:shadow items-center gap-1.5 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            title="Open Admissions Application"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span>Apply Now</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

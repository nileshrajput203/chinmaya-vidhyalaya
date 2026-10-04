import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PhoneCall, GraduationCap, BookOpen, Users } from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

interface MobileBottomBarProps {
  onOpenMobileMenu: () => void;
  onOpenAdmissions: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenMobileMenu: _onOpenMobileMenu,
  onOpenAdmissions,
}) => {
  const location = useLocation();
  const phone = OFFICIAL_SCHOOL_INFO.contact.phone[0];

  const isHome = location.pathname === '/';
  const isAlumni = location.pathname.includes('/alumni');

  return (
    <aside 
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E7E2D8] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <nav className="max-w-lg mx-auto px-2 py-1.5 flex items-center justify-around gap-1 w-full">
        
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 px-1 rounded-xl transition-colors ${
            isHome ? 'text-[#DF711B]' : 'text-slate-600 hover:text-[#0C1E34]'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 truncate">Home</span>
        </Link>

        {/* Call Helpline */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center flex-1 min-w-0 py-1 px-1 rounded-xl text-slate-600 hover:text-[#DF711B] transition-colors"
          title="Call School Office"
        >
          <PhoneCall className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 truncate">Call</span>
        </a>

        {/* Center Primary Action: Apply / Admissions */}
        <button
          onClick={onOpenAdmissions}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#DF711B] to-[#C45B0E] active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#DF711B]/25 transition-transform shrink-0"
        >
          <GraduationCap className="w-4 h-4 text-amber-200" />
          <span>Apply</span>
        </button>

        {/* Academics */}
        <Link
          to="/academics/curriculum"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 px-1 rounded-xl transition-colors ${
            location.pathname.includes('/academics') ? 'text-[#DF711B]' : 'text-slate-600 hover:text-[#0C1E34]'
          }`}
          title="Academics & Curriculum"
        >
          <BookOpen className={`w-5 h-5 ${location.pathname.includes('/academics') ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 truncate">Academics</span>
        </Link>

        {/* Alumni Network */}
        <Link
          to="/alumni"
          className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 px-1 rounded-xl transition-colors ${
            isAlumni ? 'text-[#DF711B]' : 'text-slate-600 hover:text-[#0C1E34]'
          }`}
          title="Alumni Network"
        >
          <Users className={`w-5 h-5 ${isAlumni ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 truncate">Alumni</span>
        </Link>

      </nav>
    </aside>
  );
};

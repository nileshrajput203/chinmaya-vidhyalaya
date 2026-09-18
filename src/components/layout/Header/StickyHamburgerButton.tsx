import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface StickyHamburgerButtonProps {
  onOpenMenu: () => void;
}

export const StickyHamburgerButton: React.FC<StickyHamburgerButtonProps> = ({ onOpenMenu }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when user scrolls down past 140px
      if (window.scrollY > 140) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 left-5 z-40 animate-in fade-in zoom-in-95 duration-200">
      <button
        onClick={onOpenMenu}
        className="w-12 h-12 bg-[#8B1E2B] hover:bg-[#6e1520] text-white rounded-xl shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-white/20 group cursor-pointer"
        aria-label="Open full menu"
        title="Open Navigation Menu"
      >
        <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

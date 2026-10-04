import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface StickyHamburgerButtonProps {
  onOpenMenu: () => void;
}

export const StickyHamburgerButton: React.FC<StickyHamburgerButtonProps> = ({ onOpenMenu }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Always visible while scrolling past the initial header banner
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 transition-opacity duration-300 left-4 sm:left-[60px] top-4 sm:top-[110px]">
      <button
        onClick={onOpenMenu}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-text)'
        }}
        className="w-[50px] h-[50px] rounded-none shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Open navigation menu"
        title="Open Navigation Menu"
      >
        {/* White three-line icon */}
        <Menu className="w-6 h-6 stroke-[2.2]" />
      </button>
    </div>
  );
};

import React, { useState } from 'react';

import { MainBrandHeader } from './MainBrandHeader';
import { MainNavigation } from './MainNavigation';
import { MobileMenu } from '../MobileMenu';
import { MegaOverlayMenu } from './MegaOverlayMenu';
import { StickyHamburgerButton } from './StickyHamburgerButton';
import { QuickAdmissionDrawer } from '../../common/QuickAdmissionDrawer';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState(false);

  const isTransparent = true;

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full">
      <MainBrandHeader
        isMobileMenuOpen={isMegaMenuOpen || isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMegaMenuOpen(true)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
        isTransparent={isTransparent}
      />
      <MainNavigation 
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
        isTransparent={isTransparent}
      />
      
      {/* Floating Sticky Hamburger Button on Scroll */}
      <StickyHamburgerButton onOpenMenu={() => setIsMegaMenuOpen(true)} />

      {/* Full-Screen Aesthetic Overlay Navigation Menu */}
      <MegaOverlayMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
      />

      {/* Quick Admission Drawer */}
      <QuickAdmissionDrawer
        isOpen={isAdmissionDrawerOpen}
        onClose={() => setIsAdmissionDrawerOpen(false)}
      />
    </header>
  );
};

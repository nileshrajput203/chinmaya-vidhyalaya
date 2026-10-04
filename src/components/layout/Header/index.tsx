import React, { useState } from 'react';

import { InstitutionTopBar } from './InstitutionTopBar';
import { MainBrandHeader } from './MainBrandHeader';
import { MainNavigation } from './MainNavigation';
import { MobileMenu } from '../MobileMenu';
import { MegaOverlayMenu } from './MegaOverlayMenu';
import { StickyHamburgerButton } from './StickyHamburgerButton';
import { QuickAdmissionDrawer } from '../../common/QuickAdmissionDrawer';
import { MobileBottomBar } from '../../common/MobileBottomBar';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState(false);

  return (
    <>
      {/* ----------------------------------------------------
          MASTER INSTITUTIONAL HEADER (STICKY ON MOBILE ONLY)
         ---------------------------------------------------- */}
      <header className="w-full sticky top-0 lg:relative z-40 bg-white shadow-xs">
        {/* Tier 1: Micro-Utility & Accreditation Strip */}
        <InstitutionTopBar />

        {/* Tier 2: Primary Institutional Brand Identity & Helpline */}
        <MainBrandHeader
          isMobileMenuOpen={isMobileMenuOpen || isMegaMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
        />

        {/* Tier 3: Main Executive Navigation Ribbon */}
        <MainNavigation 
          onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
          onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        />
      </header>

      {/* Floating Sticky Hamburger Button on Scroll (Desktop only) */}
      <div className="hidden lg:block">
        <StickyHamburgerButton onOpenMenu={() => setIsMegaMenuOpen(true)} />
      </div>

      {/* Professional Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenAdmissions={() => setIsAdmissionDrawerOpen(true)}
      />

      {/* ----------------------------------------------------
          FULL-SCREEN MEGA OVERLAY & DRAWERS
         ---------------------------------------------------- */}
      <MegaOverlayMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
      />

      <QuickAdmissionDrawer
        isOpen={isAdmissionDrawerOpen}
        onClose={() => setIsAdmissionDrawerOpen(false)}
      />
    </>
  );
};

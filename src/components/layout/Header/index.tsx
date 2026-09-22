import React, { useState } from 'react';

import { InstitutionTopBar } from './InstitutionTopBar';
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

  return (
    <>
      {/* ----------------------------------------------------
          MASTER STATIC INSTITUTIONAL HEADER (3-TIER ARCHITECTURE)
         ---------------------------------------------------- */}
      <header className="w-full relative z-40 bg-white">
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

      {/* Floating Sticky Hamburger Button on Scroll */}
      <StickyHamburgerButton onOpenMenu={() => setIsMegaMenuOpen(true)} />

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

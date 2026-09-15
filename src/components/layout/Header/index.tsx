import React, { useState } from 'react';
import { MainBrandHeader } from './MainBrandHeader';
import { MainNavigation } from './MainNavigation';
import { MobileMenu } from '../MobileMenu';
import { QuickAdmissionDrawer } from '../../common/QuickAdmissionDrawer';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmissionDrawerOpen, setIsAdmissionDrawerOpen] = useState(false);

  return (
    <header className="w-full z-40 relative">
      <MainBrandHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
      />
      <MainNavigation onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAdmissionDrawer={() => setIsAdmissionDrawerOpen(true)}
      />
      <QuickAdmissionDrawer
        isOpen={isAdmissionDrawerOpen}
        onClose={() => setIsAdmissionDrawerOpen(false)}
      />
    </header>
  );
};

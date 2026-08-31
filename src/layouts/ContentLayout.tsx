import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const ContentLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightBg selection:bg-brand-saffron selection:text-white">
      <Header />
      <main className="flex-1 pb-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

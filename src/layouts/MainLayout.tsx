import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Preloader } from '../components/common/Preloader';
import { SmoothScrollProvider } from '../components/common/SmoothScrollProvider';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { ChatbotFAB } from '../components/common/ChatbotFAB';

export const MainLayout: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#181C20] selection:bg-[#DF711B] selection:text-white">
        <Preloader onComplete={() => setPreloaderDone(true)} />
        <Header />
        <main className="flex-1">
          <Outlet context={{ preloaderDone }} />
        </main>
        <Footer />
        <ChatbotFAB />
      </div>
    </SmoothScrollProvider>
  );
};

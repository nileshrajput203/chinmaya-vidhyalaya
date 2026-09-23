import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // If navigating to a hash anchor, scroll to anchor, else scroll to top
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Always reset to top (0, 0) on new route/section click
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });

    // Also reset Lenis smooth scroller if active
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, search, hash]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: false });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className={`fixed right-4 sm:right-6 bottom-[5.75rem] lg:bottom-6 z-40 w-11 h-11 rounded-xl bg-[#DF711B] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-[#C45B0E] hover:-translate-y-1 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-3 opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

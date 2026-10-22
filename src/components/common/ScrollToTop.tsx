import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsVisible(scrollY > 300);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Also attach to Lenis if active
    let interval: ReturnType<typeof setInterval> | null = null;
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', onScroll);
    } else {
      interval = setInterval(() => {
        const l = (window as any).__lenis;
        if (l && typeof l.on === 'function') {
          l.on('scroll', onScroll);
          if (interval) clearInterval(interval);
        }
      }, 500);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      const l = (window as any).__lenis;
      if (l && typeof l.off === 'function') {
        l.off('scroll', onScroll);
      }
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // If navigating to a hash anchor, scroll to anchor, else scroll to top
    if (hash) {
      let attempts = 0;
      const maxAttempts = 15;
      let timerId: ReturnType<typeof setTimeout>;

      const scrollToHashElement = () => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            const lenis = (window as any).__lenis;
            if (lenis) {
              lenis.scrollTo(element, { offset: -90, immediate: false });
            } else {
              element.scrollIntoView({ behavior: 'smooth' });
            }
            return true;
          }
        } catch {
          // ignore selector errors
        }
        return false;
      };

      const tryScroll = () => {
        if (scrollToHashElement()) return;
        attempts++;
        if (attempts < maxAttempts) {
          timerId = setTimeout(tryScroll, 100);
        }
      };

      tryScroll();
      return () => clearTimeout(timerId);
    }

    // Always reset to top (0, 0) on new route/section click

    // Stop any in-progress Lenis animation first (prevents it overriding the reset)
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }

    // Belt-and-suspenders: hard-reset scroll on both the document root and window
    // (needed on touch devices where Lenis is not active)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // for Safari
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search, hash]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(0, { immediate: false, duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className={`fixed right-3 sm:right-6 bottom-[130px] sm:bottom-24 lg:bottom-24 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#DF711B] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-[#C45B0E] hover:-translate-y-1 hover:scale-105 active:scale-95 group cursor-pointer ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-3 opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="hidden lg:group-hover:block absolute right-full mr-2.5 px-2.5 py-1 text-[11px] font-mono font-bold text-white bg-[#0B1E34] rounded-lg whitespace-nowrap shadow-md pointer-events-none">
        Back to top
      </span>
    </button>
  );
};

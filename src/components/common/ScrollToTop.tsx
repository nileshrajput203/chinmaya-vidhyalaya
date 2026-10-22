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
    // ALWAYS scroll to top first on any route change (even with hash).
    // This prevents the user from seeing the bottom of the page while
    // waiting for the target section to render.
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // If navigating to a hash anchor, scroll to the target section
    if (hash) {
      let attempts = 0;
      const maxAttempts = 30;
      let timerId: ReturnType<typeof setTimeout>;
      const allTimers: ReturnType<typeof setTimeout>[] = [];

      // Compute the exact pixel position and jump there immediately.
      // Using a numeric value avoids Lenis animation drift caused by
      // layout shifts when images load after the scroll starts.
      const scrollToHashElement = () => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            const rect = element.getBoundingClientRect();
            const currentScroll = window.scrollY || document.documentElement.scrollTop;
            const targetY = Math.max(0, rect.top + currentScroll - 100);

            const l = (window as any).__lenis;
            if (l) {
              l.scrollTo(targetY, { immediate: true });
            } else {
              window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
            }
            return true;
          }
        } catch {
          // ignore selector errors
        }
        return false;
      };

      const tryScroll = () => {
        if (scrollToHashElement()) {
          // Re-adjust after short delays to compensate for images loading
          // and causing layout shifts that change the element's position
          const delays = [200, 500, 1000, 2000];
          delays.forEach((delay) => {
            const t = setTimeout(() => scrollToHashElement(), delay);
            allTimers.push(t);
          });
          return;
        }
        attempts++;
        if (attempts < maxAttempts) {
          timerId = setTimeout(tryScroll, 100);
        }
      };

      // Small initial delay to let React render the target component
      timerId = setTimeout(tryScroll, 50);

      return () => {
        clearTimeout(timerId);
        allTimers.forEach((t) => clearTimeout(t));
      };
    }
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

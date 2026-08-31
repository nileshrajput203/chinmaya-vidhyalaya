import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

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

  return null;
};

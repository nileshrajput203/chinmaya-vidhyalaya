import { useEffect } from 'react';

/**
 * Universal Scroll Lock Hook for Modals, Drawers, and Lightboxes.
 * 
 * Features:
 * 1. Locks document.body and document.documentElement overflow to 'hidden'.
 * 2. Compensates for scrollbar width so background content doesn't jitter or jump.
 * 3. Pauses and resumes Lenis smooth scroller ((window as any).__lenis).
 * 4. Ref-counted stack locking so nested or sequential modals don't prematurely unlock the background.
 */

let lockCount = 0;
let previousBodyOverflow = '';
let previousHtmlOverflow = '';
let previousBodyPaddingRight = '';

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
      previousHtmlOverflow = document.documentElement.style.overflow;
      previousBodyPaddingRight = document.body.style.paddingRight;

      // Compensate for scrollbar width to prevent page layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Pause Lenis smooth scrolling if active
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
    }

    lockCount++;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.body.style.paddingRight = previousBodyPaddingRight;

        // Resume Lenis smooth scrolling if active
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.start === 'function') {
          lenis.start();
        }
      }
    };
  }, [isLocked]);
}

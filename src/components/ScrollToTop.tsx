import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  // Helper to scroll window instantly or smoothly, temporarily overriding CSS smooth scroll if needed
  const scrollWindow = (x: number, y: number, smooth: boolean) => {
    const root = document.documentElement;
    if (!smooth) {
      root.style.scrollBehavior = 'auto';
    }
    window.scrollTo({
      left: x,
      top: y,
      behavior: smooth ? 'smooth' : 'auto'
    });
    if (!smooth) {
      void root.offsetHeight; // Force reflow
      root.style.scrollBehavior = '';
    }
  };

  // Helper to scroll element instantly or smoothly, temporarily overriding CSS smooth scroll if needed
  const scrollElement = (element: HTMLElement, smooth: boolean) => {
    const root = document.documentElement;
    if (!smooth) {
      root.style.scrollBehavior = 'auto';
    }
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start'
    });
    if (!smooth) {
      void root.offsetHeight; // Force reflow
      root.style.scrollBehavior = '';
    }
  };

  useEffect(() => {
    const isSamePage = prevPathnameRef.current === pathname;
    prevPathnameRef.current = pathname;

    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      
      const performScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          scrollElement(element, isSamePage);
          ScrollTrigger.refresh();
          return true;
        }
        return false;
      };

      // Try scrolling synchronously immediately before layout paint
      const success = performScroll();

      if (!success) {
        let retries = 0;
        const tryScroll = () => {
          const done = performScroll();
          if (!done && retries < 15) {
            retries++;
            setTimeout(tryScroll, 60);
          }
        };
        setTimeout(tryScroll, 50);
      }
    } else {
      // No hash: scroll to top instantly
      scrollWindow(0, 0, false);
      setTimeout(() => ScrollTrigger.refresh(), 50);

      const t1 = setTimeout(() => {
        scrollWindow(0, 0, false);
        ScrollTrigger.refresh();
      }, 50);
      const t2 = setTimeout(() => {
        scrollWindow(0, 0, false);
        ScrollTrigger.refresh();
      }, 150);
      const t3 = setTimeout(() => {
        scrollWindow(0, 0, false);
        ScrollTrigger.refresh();
      }, 300);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname, hash]);

  return null;
}

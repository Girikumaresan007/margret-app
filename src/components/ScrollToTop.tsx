import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let retries = 0;
      const tryScroll = () => {
        const element = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (retries < 10) {
          retries++;
          setTimeout(tryScroll, 100);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);

      const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
      const t2 = setTimeout(() => window.scrollTo(0, 0), 150);
      const t3 = setTimeout(() => window.scrollTo(0, 0), 300);
      const t4 = setTimeout(() => window.scrollTo(0, 0), 500);
      const t5 = setTimeout(() => window.scrollTo(0, 0), 800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [pathname, hash]);

  return null;
}

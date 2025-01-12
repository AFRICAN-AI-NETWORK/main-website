import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHash = () => {
  const location = useLocation();

  const scrollToElement = useCallback((hash: string) => {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);

    if (element) {
      const navBarHeight = 100; // Approximate height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navBarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      // Delay scroll slightly to ensure content is rendered
      setTimeout(() => {
        scrollToElement(location.hash);
      }, 100);
    }
  }, [location.hash, scrollToElement]);

  return scrollToElement;
};

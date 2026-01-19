import React, { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis with "Light & Responsive" feel
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Standard multiplier for predictable distance
      touchMultiplier: 2, // Better mobile responsiveness
    });

    // Animation Frame Loop
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Global Anchor Click Interception
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only intercept hash links
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();

      if (href === '#') {
        lenis.scrollTo(0);
      } else if (href === '#contact') {
        // Special handling for the footer parallax: scroll to the very bottom
        lenis.scrollTo(document.body.scrollHeight);
      } else {
        const element = document.querySelector(href);
        if (element) {
          // Scroll to element with an offset to account for the fixed header
          lenis.scrollTo(element as HTMLElement, {
            offset: -100
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
};

export default SmoothScroll;
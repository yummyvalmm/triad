import { useState, useEffect } from 'react';

/**
 * Custom hook to track window scroll position and state
 * 
 * Monitors the vertical scroll position and provides a boolean flag
 * indicating whether the page has been scrolled past a threshold.
 * Useful for implementing scroll-triggered UI changes like sticky headers.
 * 
 * @param {number} threshold - Scroll position in pixels at which isScrolled becomes true (default: 50)
 * 
 * @returns {{scrollY: number, isScrolled: boolean}} Object containing:
 *   - scrollY: Current vertical scroll position in pixels
 *   - isScrolled: Boolean indicating if scroll position exceeds threshold
 * 
 * @example
 * ```tsx
 * const { scrollY, isScrolled } = useScrollPosition(100);
 * 
 * // Use in conditional rendering
 * <header className={isScrolled ? 'sticky' : 'static'}>
 *   Scrolled: {scrollY}px
 * </header>
 * ```
 * 
 * @performance
 * - Uses passive event listeners for better scroll performance
 * - Properly cleans up listeners on unmount
 * - Updates on threshold change
 */
export const useScrollPosition = (threshold: number = 50) => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > threshold);
        };

        // Set initial value
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return { scrollY, isScrolled };
};

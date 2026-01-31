import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @returns Object containing scrollY position and isScrolled boolean
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

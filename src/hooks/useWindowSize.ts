import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

/**
 * Custom hook to track window dimensions
 * 
 * Monitors window resize events and provides current width and height.
 * Handles SSR scenarios safely by checking for window availability.
 * Essential for responsive components and conditional rendering based on screen size.
 * 
 * @returns {{width: number, height: number}} Object containing:
 *   - width: Current window inner width in pixels
 *   - height: Current window inner height in pixels
 * 
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 * 
 * // Conditional rendering based on width
 * {width < 768 ? <MobileNav /> : <DesktopNav />}
 * 
 * // Calculate dynamic values
 * const columns = width > 1200 ? 4 : width > 768 ? 2 : 1;
 * ```
 * 
 * @performance
 * - Uses passive event listeners for better performance
 * - SSR-safe with window existence check
 * - Properly cleans up listeners on unmount
 * 
 * @ssr
 * Returns {width: 0, height: 0} during server-side rendering
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize, { passive: true });

        // Call handler right away so state gets updated with initial window size
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

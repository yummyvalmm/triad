import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

/**
 * Custom hook for observing element visibility using Intersection Observer API
 * 
 * Provides a ref to attach to any element and tracks when that element
 * enters or exits the viewport. Commonly used for lazy loading, animations,
 * and infinite scroll implementations.
 * 
 * @template T - Element type extending Element (default: HTMLElement)
 * 
 * @param {UseIntersectionObserverOptions} options - Configuration object
 * @param {number|number[]} options.threshold - Percentage of element visibility (0-1) that triggers callback (default: 0.5)
 * @param {Element|null} options.root - Element used as viewport for checking visibility (default: null = browser viewport)
 * @param {string} options.rootMargin - Margin around root. Same syntax as CSS margin (default: '0px')
 * @param {boolean} options.freezeOnceVisible - If true, stops observing after element becomes visible once (default: false)
 * 
 * @returns {{ref: React.MutableRefObject<T | null>, isVisible: boolean}} Object containing:
 *   - ref: React ref to attach to the target element
 *   - isVisible: Boolean indicating if element is currently visible
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { ref, isVisible } = useIntersectionObserver();
 * <div ref={ref}>
 *   {isVisible && <img src="photo.jpg" />}
 * </div>
 * 
 * // With custom threshold
 * const { ref, isVisible } = useIntersectionObserver({ 
 *   threshold: 0.75 // Element must be 75% visible
 * });
 * 
 * // Freeze on first view (animations)
 * const { ref, isVisible } = useIntersectionObserver({ 
 *   freezeOnceVisible: true,
 *   threshold: 0.1
 * });
 * ```
 * 
 * @performance
 * - Automatically disconnects observer when component unmounts
 * - Can freeze observation after first visibility for performance
 * - Uses modern Intersection Observer API (widely supported)
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API|MDN Intersection Observer}
 */
export const useIntersectionObserver = <T extends Element = HTMLElement>(
    options: UseIntersectionObserverOptions = {}
) => {
    const {
        threshold = 0.5,
        root = null,
        rootMargin = '0px',
        freezeOnceVisible = false
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // If already visible and frozen, don't observe
        if (freezeOnceVisible && isVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);

                // Disconnect if frozen once visible
                if (freezeOnceVisible && entry.isIntersecting) {
                    observer.disconnect();
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

    return { ref, isVisible };
};

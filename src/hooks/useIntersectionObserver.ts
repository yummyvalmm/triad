import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    freezeOnceVisible?: boolean;
}

/**
 * Custom hook for observing element visibility using Intersection Observer API
 * @param options - Intersection Observer options
 * @returns Object containing ref to attach to element and isVisible state
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

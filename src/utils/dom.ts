/**
 * Smoothly scroll to an element by ID
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with id "${elementId}" not found`);
        return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
};

/**
 * Scroll to top of page
 */
export const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Lock body scroll (useful for modals)
 */
export const lockBodyScroll = (): void => {
    document.body.style.overflow = 'hidden';
};

/**
 * Unlock body scroll
 */
export const unlockBodyScroll = (): void => {
    document.body.style.overflow = '';
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * Get scroll position
 */
export const getScrollPosition = (): { x: number; y: number } => {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
    };
};

/**
 * Check if scrolled past threshold
 */
export const isScrolledPast = (threshold: number): boolean => {
    return getScrollPosition().y > threshold;
};

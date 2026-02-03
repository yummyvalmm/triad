import React, { useEffect, useRef, useState } from 'react';

/**
 * Props for the Reveal component
 * 
 * @interface RevealProps
 * @property {React.ReactNode} children - Content to be revealed with animation
 * @property {'fit-content' | '100%'} [width='100%'] - Width of the reveal container
 * @property {number} [threshold=0.1] - Intersection observer threshold (0-1)
 * @property {number} [delay=0] - Animation delay in milliseconds
 * @property {number} [duration=900] - Animation duration in milliseconds
 * @property {number} [yOffset=30] - Vertical offset for slide animation in pixels
 * @property {string} [className=''] - Additional CSS classes for container
 * @property {() => void} [onReveal] - Callback fired when element becomes visible
 * @property {boolean} [forceTrigger] - If true, bypasses IntersectionObserver and forces reveal
 */
interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    threshold?: number;
    delay?: number;
    duration?: number;
    yOffset?: number;
    className?: string;
    onReveal?: () => void;
    forceTrigger?: boolean;
}

/**
 * Reveal - Scroll-triggered animation component
 * 
 * Wraps content and reveals it with a smooth slide + fade animation
 * when it enters the viewport. Uses IntersectionObserver for performance.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Reveal>
 *   <h1>This will fade in when scrolled into view</h1>
 * </Reveal>
 * 
 * // With custom animation timing
 * <Reveal delay={200} duration={1200} yOffset={50}>
 *   <div>Custom animation</div>
 * </Reveal>
 * 
 * // Force trigger without observer (for controlled animations)
 * <Reveal forceTrigger={isVisible}>
 *   <div>Controlled reveal</div>
 * </Reveal>
 * ```
 * 
 * @performance
 * - Disconnects observer after reveal for better performance
 * - Uses IntersectionObserver API (widely supported)
 * - Only animates when in viewport
 * 
 * @accessibility
 * Respects prefers-reduced-motion via global CSS
 */
const Reveal: React.FC<RevealProps> = ({
    children,
    width = '100%',
    threshold = 0.1,
    delay = 0,
    duration = 900, // Reduced from 1200ms for a "lighter" feel
    yOffset = 30, // Reduced from 40px for subtler movement
    className = "",
    onReveal,
    forceTrigger
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If forceTrigger is provided (boolean), we rely on it instead of IntersectionObserver
        if (typeof forceTrigger === 'boolean') {
            if (forceTrigger && !isVisible) {
                setIsVisible(true);
                if (onReveal) onReveal();
            }
            return;
        }

        // Default IntersectionObserver logic
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (onReveal) onReveal();
                observer.disconnect();
            }
        }, { threshold, rootMargin: '0px 0px -50px 0px' });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, onReveal, forceTrigger, isVisible]);

    return (
        <div ref={ref} className={className} style={{ width }}>
            <div
                className={`transform transition-all ease-luxury will-change-transform`}
                style={{
                    transitionDuration: `${duration}ms`,
                    transitionDelay: `${delay}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : `translateY(${yOffset}px) scale(0.98)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Reveal;
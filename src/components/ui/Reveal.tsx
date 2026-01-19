import React, { useEffect, useRef, useState } from 'react';

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
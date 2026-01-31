import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { CONFIG } from '../../constants';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    isActive: boolean;
    duration?: number;
}

/**
 * AnimatedCounter - Smoothly animates a number from 0 to target value
 * 
 * @param value - Target number to count to
 * @param suffix - Optional suffix (e.g., '%', '+', 'K')
 * @param isActive - Whether the counter should animate
 * @param duration - Animation duration in seconds (default: 1.5s)
 * 
 * @example
 * ```tsx
 * <AnimatedCounter value={98} suffix="%" isActive={true} />
 * ```
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    suffix = '',
    isActive,
    duration = CONFIG.COUNTER_ANIMATION_DURATION
}) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isActive) {
            const controls = animate(count, value, {
                duration,
                ease: [0.16, 1, 0.3, 1] // Smooth easing
            });
            return () => controls.stop();
        } else {
            count.set(0);
        }
    }, [isActive, value, count, duration]);

    return (
        <>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </>
    );
};

export default AnimatedCounter;

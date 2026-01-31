export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
    REVEAL: 600,
} as const;

export const EASING = {
    LUXURY: [0.76, 0, 0.24, 1] as const,
    SMOOTH: [0.16, 1, 0.3, 1] as const,
    BOUNCE: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const REVEAL_DEFAULTS = {
    DELAY: 0,
    THRESHOLD: 0.5,
    DURATION: 600,
} as const;

export const TRANSITION_DURATION = {
    SHORT: '300ms',
    MEDIUM: '500ms',
    LONG: '700ms',
} as const;

export const COLORS = {
    BRAND: {
        BLACK: '#050505',
        RED: '#FF2E00',
        ACCENT: '#FF6B5B',
    },
    GRAY: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
    },
    GREEN: {
        300: '#22c55e',
        400: '#16a34a',
        500: '#15803d',
    },
} as const;

// CSS variable names for use in components
export const CSS_VARS = {
    BRAND_BLACK: 'var(--brand-black)',
    BRAND_RED: 'var(--brand-red)',
    BRAND_ACCENT: 'var(--brand-accent)',
} as const;

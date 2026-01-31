export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

export const MEDIA_QUERIES = {
    SM: `@media (min-width: ${BREAKPOINTS.SM}px)`,
    MD: `@media (min-width: ${BREAKPOINTS.MD}px)`,
    LG: `@media (min-width: ${BREAKPOINTS.LG}px)`,
    XL: `@media (min-width: ${BREAKPOINTS.XL}px)`,
    '2XL': `@media (min-width: ${BREAKPOINTS['2XL']}px)`,
} as const;

export const isMobile = (): boolean => window.innerWidth < BREAKPOINTS.MD;
export const isTablet = (): boolean =>
    window.innerWidth >= BREAKPOINTS.MD && window.innerWidth < BREAKPOINTS.LG;
export const isDesktop = (): boolean => window.innerWidth >= BREAKPOINTS.LG;

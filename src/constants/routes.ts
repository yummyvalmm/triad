export const ROUTES = {
    HOME: '/',
    CONSULTATION: '/consultation',
} as const;

export const SECTIONS = {
    HERO: 'hero',
    ABOUT: 'about',
    SERVICES: 'services',
    PROJECTS: 'projects',
    PRICING: 'pricing',
    CONTACT: 'contact',
    FAQ: 'faq',
    TESTIMONIALS: 'testimonials',
} as const;

// Helper to get section hash
export const getSectionHash = (section: keyof typeof SECTIONS): string => {
    return `#${SECTIONS[section]}`;
};

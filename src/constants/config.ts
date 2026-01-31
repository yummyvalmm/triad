export const CONFIG = {
    // API Endpoints
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxAybjealpEpG-yiZdI4JtKFRg7LjhJyRzlya-Kv-YcCl8n9qoi_Le1GvDFrydlp04_/exec',

    // Scroll Configuration
    SCROLL_THRESHOLD: 30,
    NAVBAR_SCROLL_THRESHOLD: 30,
    FOOTER_VISIBILITY_THRESHOLD: 0.2,

    // Carousel Configuration
    CAROUSEL_CARD_WIDTH: 280,

    // Intersection Observer
    INTERSECTION_THRESHOLD: 0.5,
    INTERSECTION_THRESHOLD_LOW: 0.1,
    INTERSECTION_THRESHOLD_HIGH: 0.2,

    // Animation
    COUNTER_ANIMATION_DURATION: 1.5,
    MODAL_ANIMATION_DURATION: 0.5,

    // Form
    FORM_SUBMIT_TIMEOUT: 5000,

    // Performance
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
} as const;

// Environment detection
export const IS_DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';
export const IS_PROD = !IS_DEV;

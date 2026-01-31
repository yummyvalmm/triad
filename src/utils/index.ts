// DOM utilities
export {
    scrollToElement,
    scrollToTop,
    lockBodyScroll,
    unlockBodyScroll,
    isInViewport,
    getScrollPosition,
    isScrolledPast,
} from './dom';

// Format utilities
export {
    formatNumber,
    formatNumberWithSuffix,
    truncate,
    capitalize,
    capitalizeWords,
    slugify,
    formatCurrency,
    formatDate,
} from './format';

// Validation utilities
export {
    isValidEmail,
    isRequired,
    minLength,
    maxLength,
    isValidUrl,
    isValidPhone,
    validateField,
    VALIDATION_RULES,
    type ValidationRule,
} from './validation';

// Helper utilities
export {
    debounce,
    throttle,
    delay,
    clamp,
    lerp,
    mapRange,
    random,
    randomInt,
    isBetween,
} from './helpers';

// Logger utilities
export { logger, perfLogger } from './logger';

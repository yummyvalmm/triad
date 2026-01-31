/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

/**
 * Validate required field
 */
export const isRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const minLength = (value: string, min: number): boolean => {
    return value.trim().length >= min;
};

/**
 * Validate maximum length
 */
export const maxLength = (value: string, max: number): boolean => {
    return value.trim().length <= max;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validate phone number (basic)
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Form validation rule interface
 */
export interface ValidationRule {
    validator: (value: string) => boolean;
    message: string;
}

/**
 * Validate field against multiple rules
 */
export const validateField = (
    value: string,
    rules: ValidationRule[]
): string | null => {
    for (const rule of rules) {
        if (!rule.validator(value)) {
            return rule.message;
        }
    }
    return null;
};

/**
 * Common validation rules
 */
export const VALIDATION_RULES = {
    required: (message = 'This field is required'): ValidationRule => ({
        validator: isRequired,
        message,
    }),
    email: (message = 'Please enter a valid email'): ValidationRule => ({
        validator: isValidEmail,
        message,
    }),
    minLength: (min: number, message?: string): ValidationRule => ({
        validator: (value) => minLength(value, min),
        message: message || `Minimum ${min} characters required`,
    }),
    maxLength: (max: number, message?: string): ValidationRule => ({
        validator: (value) => maxLength(value, max),
        message: message || `Maximum ${max} characters allowed`,
    }),
};

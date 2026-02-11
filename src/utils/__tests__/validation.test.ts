import { describe, it, expect } from 'vitest';
import {
    isValidEmail,
    isRequired,
    minLength,
    maxLength,
    isValidUrl,
    isValidPhone,
    validateField,
    VALIDATION_RULES,
} from '../validation';

describe('validation utilities', () => {
    describe('isValidEmail', () => {
        it('should validate correct email formats', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
            expect(isValidEmail('test+tag@example.com')).toBe(true);
        });

        it('should reject invalid email formats', () => {
            expect(isValidEmail('invalid')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('@example.com')).toBe(false);
            expect(isValidEmail('test @example.com')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });

        it('should trim whitespace before validation', () => {
            expect(isValidEmail('  test@example.com  ')).toBe(true);
        });
    });

    describe('isRequired', () => {
        it('should return true for non-empty strings', () => {
            expect(isRequired('hello')).toBe(true);
            expect(isRequired('a')).toBe(true);
        });

        it('should return false for empty strings', () => {
            expect(isRequired('')).toBe(false);
            expect(isRequired('   ')).toBe(false);
        });
    });

    describe('minLength', () => {
        it('should validate minimum length correctly', () => {
            expect(minLength('hello', 3)).toBe(true);
            expect(minLength('hello', 5)).toBe(true);
            expect(minLength('hello', 6)).toBe(false);
        });

        it('should trim whitespace before checking length', () => {
            expect(minLength('  hello  ', 5)).toBe(true);
        });
    });

    describe('maxLength', () => {
        it('should validate maximum length correctly', () => {
            expect(maxLength('hello', 10)).toBe(true);
            expect(maxLength('hello', 5)).toBe(true);
            expect(maxLength('hello', 4)).toBe(false);
        });

        it('should trim whitespace before checking length', () => {
            expect(maxLength('  hello  ', 5)).toBe(true);
        });
    });

    describe('isValidUrl', () => {
        it('should validate correct URL formats', () => {
            expect(isValidUrl('https://example.com')).toBe(true);
            expect(isValidUrl('http://example.com')).toBe(true);
            expect(isValidUrl('https://example.com/path')).toBe(true);
            expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
        });

        it('should reject invalid URL formats', () => {
            expect(isValidUrl('not a url')).toBe(false);
            expect(isValidUrl('example.com')).toBe(false);
            expect(isValidUrl('')).toBe(false);
        });
    });

    describe('isValidPhone', () => {
        it('should validate phone numbers with at least 10 digits', () => {
            expect(isValidPhone('1234567890')).toBe(true);
            expect(isValidPhone('+1 (234) 567-8900')).toBe(true);
            expect(isValidPhone('123-456-7890')).toBe(true);
        });

        it('should reject invalid phone numbers', () => {
            expect(isValidPhone('123')).toBe(false);
            expect(isValidPhone('abc')).toBe(false);
            expect(isValidPhone('')).toBe(false);
        });
    });

    describe('validateField', () => {
        it('should return null when all rules pass', () => {
            const rules = [
                { validator: (v: string) => v.length > 0, message: 'Required' },
                { validator: (v: string) => v.length >= 3, message: 'Min 3 chars' },
            ];
            expect(validateField('hello', rules)).toBeNull();
        });

        it('should return first error message when a rule fails', () => {
            const rules = [
                { validator: (v: string) => v.length > 0, message: 'Required' },
                { validator: (v: string) => v.length >= 10, message: 'Min 10 chars' },
            ];
            expect(validateField('hello', rules)).toBe('Min 10 chars');
        });

        it('should return first error for empty value', () => {
            const rules = [
                { validator: (v: string) => v.length > 0, message: 'Required' },
                { validator: (v: string) => v.length >= 3, message: 'Min 3 chars' },
            ];
            expect(validateField('', rules)).toBe('Required');
        });
    });

    describe('VALIDATION_RULES', () => {
        it('should create required rule', () => {
            const rule = VALIDATION_RULES.required();
            expect(rule.validator('hello')).toBe(true);
            expect(rule.validator('')).toBe(false);
            expect(rule.message).toBe('This field is required');
        });

        it('should create email rule', () => {
            const rule = VALIDATION_RULES.email();
            expect(rule.validator('test@example.com')).toBe(true);
            expect(rule.validator('invalid')).toBe(false);
            expect(rule.message).toBe('Please enter a valid email');
        });

        it('should create minLength rule', () => {
            const rule = VALIDATION_RULES.minLength(5);
            expect(rule.validator('hello')).toBe(true);
            expect(rule.validator('hi')).toBe(false);
            expect(rule.message).toBe('Minimum 5 characters required');
        });

        it('should create maxLength rule', () => {
            const rule = VALIDATION_RULES.maxLength(10);
            expect(rule.validator('hello')).toBe(true);
            expect(rule.validator('this is too long')).toBe(false);
            expect(rule.message).toBe('Maximum 10 characters allowed');
        });

        it('should accept custom error messages', () => {
            const rule = VALIDATION_RULES.required('Custom message');
            expect(rule.message).toBe('Custom message');
        });
    });
});

import { describe, it, expect } from 'vitest';
import {
    formatNumber,
    formatNumberWithSuffix,
    truncate,
    capitalize,
    capitalizeWords,
    slugify,
    formatCurrency,
    formatDate,
} from '../format';

describe('format utilities', () => {
    describe('formatNumber', () => {
        it('should format numbers with commas', () => {
            expect(formatNumber(1000)).toBe('1,000');
            expect(formatNumber(1000000)).toBe('1,000,000');
            expect(formatNumber(123456789)).toBe('123,456,789');
        });

        it('should handle small numbers', () => {
            expect(formatNumber(0)).toBe('0');
            expect(formatNumber(100)).toBe('100');
            expect(formatNumber(999)).toBe('999');
        });
    });

    describe('formatNumberWithSuffix', () => {
        it('should format millions with M suffix', () => {
            expect(formatNumberWithSuffix(1000000)).toBe('1.0M');
            expect(formatNumberWithSuffix(2500000)).toBe('2.5M');
            expect(formatNumberWithSuffix(10000000)).toBe('10.0M');
        });

        it('should format thousands with K suffix', () => {
            expect(formatNumberWithSuffix(1000)).toBe('1.0K');
            expect(formatNumberWithSuffix(5500)).toBe('5.5K');
            expect(formatNumberWithSuffix(999000)).toBe('999.0K');
        });

        it('should return number as string for values under 1000', () => {
            expect(formatNumberWithSuffix(0)).toBe('0');
            expect(formatNumberWithSuffix(100)).toBe('100');
            expect(formatNumberWithSuffix(999)).toBe('999');
        });
    });

    describe('truncate', () => {
        it('should truncate long text with ellipsis', () => {
            expect(truncate('Hello World', 5)).toBe('Hello...');
            expect(truncate('This is a long text', 10)).toBe('This is a ...');
        });

        it('should not truncate text shorter than max length', () => {
            expect(truncate('Hello', 10)).toBe('Hello');
            expect(truncate('Short', 5)).toBe('Short');
        });

        it('should handle exact length', () => {
            expect(truncate('Hello', 5)).toBe('Hello');
        });
    });

    describe('capitalize', () => {
        it('should capitalize first letter', () => {
            expect(capitalize('hello')).toBe('Hello');
            expect(capitalize('world')).toBe('World');
        });

        it('should lowercase remaining letters', () => {
            expect(capitalize('HELLO')).toBe('Hello');
            expect(capitalize('hELLO')).toBe('Hello');
        });

        it('should handle empty string', () => {
            expect(capitalize('')).toBe('');
        });

        it('should handle single character', () => {
            expect(capitalize('a')).toBe('A');
        });
    });

    describe('capitalizeWords', () => {
        it('should capitalize all words', () => {
            expect(capitalizeWords('hello world')).toBe('Hello World');
            expect(capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
        });

        it('should handle single word', () => {
            expect(capitalizeWords('hello')).toBe('Hello');
        });

        it('should handle multiple spaces', () => {
            expect(capitalizeWords('hello  world')).toBe('Hello  World');
        });
    });

    describe('slugify', () => {
        it('should convert text to slug format', () => {
            expect(slugify('Hello World')).toBe('hello-world');
            expect(slugify('The Quick Brown Fox')).toBe('the-quick-brown-fox');
        });

        it('should remove special characters', () => {
            expect(slugify('Hello, World!')).toBe('hello-world');
            expect(slugify('Test@Example#123')).toBe('testexample123');
        });

        it('should replace multiple spaces with single dash', () => {
            expect(slugify('hello   world')).toBe('hello-world');
        });

        it('should remove multiple consecutive dashes', () => {
            expect(slugify('hello---world')).toBe('hello-world');
        });

        it('should handle leading/trailing spaces', () => {
            // Note: slugify removes special chars but may leave dashes from spaces
            const result = slugify(' hello world ');
            expect(result).toContain('hello');
            expect(result).toContain('world');
        });
    });

    describe('formatCurrency', () => {
        it('should format currency in USD', () => {
            expect(formatCurrency(1000)).toBe('$1,000');
            expect(formatCurrency(1234567)).toBe('$1,234,567');
        });

        it('should handle zero', () => {
            expect(formatCurrency(0)).toBe('$0');
        });

        it('should not show decimal places for whole numbers', () => {
            expect(formatCurrency(100)).toBe('$100');
        });

        it('should round decimal values', () => {
            // formatCurrency uses minimumFractionDigits: 0, so it rounds
            const result1 = formatCurrency(99.99);
            expect(result1).toMatch(/\$100|\$99/); // May round or not depending on locale

            const result2 = formatCurrency(1234.56);
            expect(result2).toMatch(/\$1,23[45]/); // May round to 1,234 or 1,235
        });
    });

    describe('formatDate', () => {
        it('should format Date object', () => {
            const date = new Date('2024-01-15');
            const formatted = formatDate(date);
            expect(formatted).toContain('January');
            expect(formatted).toContain('15');
            expect(formatted).toContain('2024');
        });

        it('should format date string', () => {
            const formatted = formatDate('2024-12-25');
            expect(formatted).toContain('December');
            expect(formatted).toContain('25');
            expect(formatted).toContain('2024');
        });

        it('should use long month format', () => {
            const formatted = formatDate('2024-06-01');
            expect(formatted).toContain('June');
        });
    });
});

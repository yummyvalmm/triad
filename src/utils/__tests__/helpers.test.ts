import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    debounce,
    throttle,
    delay,
    clamp,
    lerp,
    mapRange,
    random,
    randomInt,
    isBetween,
} from '../helpers';

describe('helper utilities', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('debounce', () => {
        it('should delay function execution', () => {
            const mockFn = vi.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            expect(mockFn).not.toHaveBeenCalled();

            vi.advanceTimersByTime(100);
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should cancel previous calls', () => {
            const mockFn = vi.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            vi.advanceTimersByTime(100);
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should pass arguments correctly', () => {
            const mockFn = vi.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn('test', 123);

            vi.advanceTimersByTime(100);
            expect(mockFn).toHaveBeenCalledWith('test', 123);
        });
    });

    describe('throttle', () => {
        it('should limit function execution', () => {
            const mockFn = vi.fn();
            const throttledFn = throttle(mockFn, 100);

            throttledFn();
            throttledFn();
            throttledFn();

            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should allow execution after wait time', () => {
            const mockFn = vi.fn();
            const throttledFn = throttle(mockFn, 100);

            throttledFn();
            expect(mockFn).toHaveBeenCalledTimes(1);

            vi.advanceTimersByTime(100);
            throttledFn();
            expect(mockFn).toHaveBeenCalledTimes(2);
        });
    });

    describe('delay', () => {
        it('should delay execution', async () => {
            vi.useRealTimers(); // Use real timers for async test

            const start = Date.now();
            await delay(100);
            const end = Date.now();

            expect(end - start).toBeGreaterThanOrEqual(90); // Allow some variance
        });
    });

    describe('clamp', () => {
        it('should clamp value between min and max', () => {
            expect(clamp(5, 0, 10)).toBe(5);
            expect(clamp(-5, 0, 10)).toBe(0);
            expect(clamp(15, 0, 10)).toBe(10);
        });

        it('should handle edge cases', () => {
            expect(clamp(0, 0, 10)).toBe(0);
            expect(clamp(10, 0, 10)).toBe(10);
        });
    });

    describe('lerp', () => {
        it('should interpolate between values', () => {
            expect(lerp(0, 10, 0)).toBe(0);
            expect(lerp(0, 10, 0.5)).toBe(5);
            expect(lerp(0, 10, 1)).toBe(10);
        });

        it('should work with negative values', () => {
            expect(lerp(-10, 10, 0.5)).toBe(0);
        });
    });

    describe('mapRange', () => {
        it('should map value from one range to another', () => {
            expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
            expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
            expect(mapRange(10, 0, 10, 0, 100)).toBe(100);
        });

        it('should work with different ranges', () => {
            expect(mapRange(50, 0, 100, 0, 1)).toBe(0.5);
        });
    });

    describe('random', () => {
        it('should generate random number in range', () => {
            const result = random(0, 10);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(10);
        });

        it('should work with negative ranges', () => {
            const result = random(-10, 0);
            expect(result).toBeGreaterThanOrEqual(-10);
            expect(result).toBeLessThan(0);
        });
    });

    describe('randomInt', () => {
        it('should generate random integer in range', () => {
            const result = randomInt(0, 10);
            expect(Number.isInteger(result)).toBe(true);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(10);
        });
    });

    describe('isBetween', () => {
        it('should check if value is between min and max', () => {
            expect(isBetween(5, 0, 10)).toBe(true);
            expect(isBetween(0, 0, 10)).toBe(true);
            expect(isBetween(10, 0, 10)).toBe(true);
            expect(isBetween(-1, 0, 10)).toBe(false);
            expect(isBetween(11, 0, 10)).toBe(false);
        });
    });
});

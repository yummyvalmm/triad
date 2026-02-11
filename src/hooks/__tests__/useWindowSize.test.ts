import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    beforeEach(() => {
        // Set initial window size
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 768,
        });
    });

    afterEach(() => {
        // Restore original values
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalInnerHeight,
        });
        vi.clearAllMocks();
    });

    it('should initialize with current window size', () => {
        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(1024);
        expect(result.current.height).toBe(768);
    });

    it('should update size when window resizes', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1920,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 1080,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(1920);
        expect(result.current.height).toBe(1080);
    });

    it('should update to mobile size', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 667,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(375);
        expect(result.current.height).toBe(667);
    });

    it('should handle multiple resize events', () => {
        const { result } = renderHook(() => useWindowSize());

        // First resize
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 768,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(768);

        // Second resize
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1440,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(1440);
    });

    it('should clean up event listener on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useWindowSize());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        );
    });

    it('should use passive event listener', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        renderHook(() => useWindowSize());

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'resize',
            expect.any(Function),
            { passive: true }
        );
    });

    // Note: SSR testing removed as it conflicts with jsdom environment
    // SSR scenarios should be tested in a separate Node.js environment
});

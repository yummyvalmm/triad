import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '../useScrollPosition';

describe('useScrollPosition', () => {
    beforeEach(() => {
        // Reset scroll position before each test
        window.scrollY = 0;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with scroll position 0 and isScrolled false', () => {
        const { result } = renderHook(() => useScrollPosition());

        expect(result.current.scrollY).toBe(0);
        expect(result.current.isScrolled).toBe(false);
    });

    it('should use custom threshold', () => {
        const { result } = renderHook(() => useScrollPosition(100));

        expect(result.current.scrollY).toBe(0);
        expect(result.current.isScrolled).toBe(false);
    });

    it('should update scrollY when window scrolls', () => {
        const { result } = renderHook(() => useScrollPosition());

        act(() => {
            window.scrollY = 150;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.scrollY).toBe(150);
    });

    it('should set isScrolled to true when scrollY exceeds threshold', () => {
        const { result } = renderHook(() => useScrollPosition(50));

        act(() => {
            window.scrollY = 100;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.isScrolled).toBe(true);
    });

    it('should set isScrolled to false when scrollY is below threshold', () => {
        const { result } = renderHook(() => useScrollPosition(100));

        // First scroll past threshold
        act(() => {
            window.scrollY = 150;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.isScrolled).toBe(true);

        // Then scroll back below threshold
        act(() => {
            window.scrollY = 50;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.isScrolled).toBe(false);
    });

    it('should update when threshold changes', () => {
        const { result, rerender } = renderHook(
            ({ threshold }) => useScrollPosition(threshold),
            { initialProps: { threshold: 50 } }
        );

        act(() => {
            window.scrollY = 75;
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.isScrolled).toBe(true);

        // Change threshold to 100
        rerender({ threshold: 100 });

        expect(result.current.isScrolled).toBe(false);
    });

    it('should clean up event listener on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useScrollPosition());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'scroll',
            expect.any(Function)
        );
    });

    it('should use passive event listener', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        renderHook(() => useScrollPosition());

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'scroll',
            expect.any(Function),
            { passive: true }
        );
    });
});

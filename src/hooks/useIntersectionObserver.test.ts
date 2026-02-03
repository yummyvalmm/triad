import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from './useIntersectionObserver';

describe('useIntersectionObserver', () => {
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockUnobserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let observerCallback: IntersectionObserverCallback;

    beforeEach(() => {
        mockObserve = vi.fn();
        mockUnobserve = vi.fn();
        mockDisconnect = vi.fn();

        // Mock IntersectionObserver
        global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
            observerCallback = callback;
            return {
                observe: mockObserve,
                unobserve: mockUnobserve,
                disconnect: mockDisconnect,
                root: null,
                rootMargin: '',
                thresholds: [],
                takeRecords: () => [],
            };
        });
    });

    it('should initialize with isVisible false', () => {
        const { result } = renderHook(() => useIntersectionObserver());

        expect(result.current.isVisible).toBe(false);
        expect(result.current.ref).toBeDefined();
    });

    it('should observe element when ref is set', () => {
        const { result } = renderHook(() => useIntersectionObserver());

        // Manually set the ref to simulate mounting
        const element = document.createElement('div');
        (result.current.ref as any).current = element;

        // Re-render to trigger effect
        renderHook(() => useIntersectionObserver());

        expect(global.IntersectionObserver).toHaveBeenCalled();
    });

    it('should update isVisible when element becomes visible', () => {
        const { result, rerender } = renderHook(() =>
            useIntersectionObserver({ threshold: 0.5 })
        );

        // Simulate element ref
        const element = document.createElement('div');
        (result.current.ref as any).current = element;

        rerender();

        // Simulate intersection
        if (observerCallback) {
            observerCallback(
                [{
                    isIntersecting: true,
                    target: element,
                    intersectionRatio: 1,
                    boundingClientRect: {} as DOMRectReadOnly,
                    intersectionRect: {} as DOMRectReadOnly,
                    rootBounds: null,
                    time: Date.now(),
                }],
                {} as IntersectionObserver
            );
        }

        expect(result.current.isVisible).toBe(true);
    });

    it('should disconnect observer on unmount', () => {
        const { result, unmount } = renderHook(() => useIntersectionObserver());

        const element = document.createElement('div');
        (result.current.ref as any).current = element;

        unmount();

        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('should freeze visibility when freezeOnceVisible is true', () => {
        const { result, rerender } = renderHook(() =>
            useIntersectionObserver({ freezeOnceVisible: true })
        );

        const element = document.createElement('div');
        (result.current.ref as any).current = element;

        rerender();

        // Simulate becoming visible
        if (observerCallback) {
            observerCallback(
                [{
                    isIntersecting: true,
                    target: element,
                    intersectionRatio: 1,
                    boundingClientRect: {} as DOMRectReadOnly,
                    intersectionRect: {} as DOMRectReadOnly,
                    rootBounds: null,
                    time: Date.now(),
                }],
                {} as IntersectionObserver
            );
        }

        expect(mockDisconnect).toHaveBeenCalled();
        expect(result.current.isVisible).toBe(true);
    });
});

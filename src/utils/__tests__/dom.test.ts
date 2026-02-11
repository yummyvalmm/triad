import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    scrollToElement,
    scrollToTop,
    lockBodyScroll,
    unlockBodyScroll,
    isInViewport,
    getScrollPosition,
    isScrolledPast,
} from '../dom';

describe('DOM utilities', () => {
    beforeEach(() => {
        // Reset DOM and scroll position
        document.body.innerHTML = '';
        window.scrollY = 0;
        document.body.style.overflow = '';
    });

    describe('scrollToElement', () => {
        it('should scroll to element by ID', () => {
            const scrollToSpy = vi.spyOn(window, 'scrollTo');

            // Create test element
            const div = document.createElement('div');
            div.id = 'test-element';
            document.body.appendChild(div);

            scrollToElement('test-element');

            expect(scrollToSpy).toHaveBeenCalledWith({
                top: expect.any(Number),
                behavior: 'smooth',
            });
        });

        it('should apply offset when scrolling', () => {
            const scrollToSpy = vi.spyOn(window, 'scrollTo');

            const div = document.createElement('div');
            div.id = 'test-element';
            document.body.appendChild(div);

            scrollToElement('test-element', 100);

            expect(scrollToSpy).toHaveBeenCalled();
        });

        it('should warn if element not found', () => {
            const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

            scrollToElement('non-existent');

            expect(consoleWarnSpy).toHaveBeenCalledWith(
                'Element with id "non-existent" not found'
            );

            consoleWarnSpy.mockRestore();
        });
    });

    describe('scrollToTop', () => {
        it('should scroll to top of page', () => {
            const scrollToSpy = vi.spyOn(window, 'scrollTo');

            scrollToTop();

            expect(scrollToSpy).toHaveBeenCalledWith({
                top: 0,
                behavior: 'smooth',
            });
        });
    });

    describe('lockBodyScroll', () => {
        it('should set body overflow to hidden', () => {
            lockBodyScroll();

            expect(document.body.style.overflow).toBe('hidden');
        });
    });

    describe('unlockBodyScroll', () => {
        it('should reset body overflow', () => {
            document.body.style.overflow = 'hidden';

            unlockBodyScroll();

            expect(document.body.style.overflow).toBe('');
        });
    });

    describe('isInViewport', () => {
        it('should return true for element in viewport', () => {
            const div = document.createElement('div');
            document.body.appendChild(div);

            // Mock getBoundingClientRect to return element in viewport
            vi.spyOn(div, 'getBoundingClientRect').mockReturnValue({
                top: 100,
                left: 100,
                bottom: 200,
                right: 200,
                width: 100,
                height: 100,
                x: 100,
                y: 100,
                toJSON: () => ({}),
            });

            expect(isInViewport(div)).toBe(true);
        });

        it('should return false for element outside viewport', () => {
            const div = document.createElement('div');
            document.body.appendChild(div);

            // Mock getBoundingClientRect to return element outside viewport
            vi.spyOn(div, 'getBoundingClientRect').mockReturnValue({
                top: -100,
                left: -100,
                bottom: -50,
                right: -50,
                width: 100,
                height: 100,
                x: -100,
                y: -100,
                toJSON: () => ({}),
            });

            expect(isInViewport(div)).toBe(false);
        });
    });

    describe('getScrollPosition', () => {
        it('should return current scroll position', () => {
            Object.defineProperty(window, 'pageXOffset', {
                writable: true,
                value: 100,
            });
            Object.defineProperty(window, 'pageYOffset', {
                writable: true,
                value: 200,
            });

            const position = getScrollPosition();

            expect(position.x).toBe(100);
            expect(position.y).toBe(200);
        });
    });

    describe('isScrolledPast', () => {
        it('should return true when scrolled past threshold', () => {
            Object.defineProperty(window, 'pageYOffset', {
                writable: true,
                value: 150,
            });

            expect(isScrolledPast(100)).toBe(true);
        });

        it('should return false when not scrolled past threshold', () => {
            Object.defineProperty(window, 'pageYOffset', {
                writable: true,
                value: 50,
            });

            expect(isScrolledPast(100)).toBe(false);
        });
    });
});

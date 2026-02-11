import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import CustomCursor from '../CustomCursor';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, style, ...props }: any) => <div style={style} {...props}>{children}</div>,
    },
    useMotionValue: (initial: number) => ({
        get: () => initial,
        set: vi.fn(),
    }),
    useSpring: (value: any) => value,
    animate: vi.fn(),
}));

describe('CustomCursor Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock desktop environment
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1920,
        });
        Object.defineProperty(navigator, 'maxTouchPoints', {
            writable: true,
            configurable: true,
            value: 0,
        });
    });

    it('should render cursor on desktop', () => {
        const { container } = render(<CustomCursor />);

        // Should render cursor elements
        const cursorElements = container.querySelectorAll('.fixed');
        expect(cursorElements.length).toBeGreaterThan(0);
    });

    it('should not render on mobile', () => {
        // Mock mobile environment
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        });
        Object.defineProperty(navigator, 'maxTouchPoints', {
            writable: true,
            configurable: true,
            value: 5,
        });

        const { container } = render(<CustomCursor />);

        // Should not render anything
        expect(container.firstChild).toBeNull();
    });

    it('should render main cursor dot', () => {
        const { container } = render(<CustomCursor />);

        const cursorDot = container.querySelector('.bg-brand-red');
        expect(cursorDot).toBeInTheDocument();
    });

    it('should render trailing ring', () => {
        const { container } = render(<CustomCursor />);

        const cursorRing = container.querySelector('.border');
        expect(cursorRing).toBeInTheDocument();
    });

    it('should have correct cursor dot size', () => {
        const { container } = render(<CustomCursor />);

        const cursorDot = container.querySelector('.w-4.h-4');
        expect(cursorDot).toBeInTheDocument();
    });

    it('should have correct ring size', () => {
        const { container } = render(<CustomCursor />);

        const cursorRing = container.querySelector('.w-10.h-10');
        expect(cursorRing).toBeInTheDocument();
    });

    it('should have pointer-events-none', () => {
        const { container } = render(<CustomCursor />);

        const cursorElements = container.querySelectorAll('.pointer-events-none');
        expect(cursorElements.length).toBe(2); // Both dot and ring
    });

    it('should have high z-index', () => {
        const { container } = render(<CustomCursor />);

        const highZIndex = container.querySelector('.z-\\[9999\\]');
        expect(highZIndex).toBeInTheDocument();
    });

    it('should use mix-blend-difference for cursor dot', () => {
        const { container } = render(<CustomCursor />);

        const blendMode = container.querySelector('.mix-blend-difference');
        expect(blendMode).toBeInTheDocument();
    });

    it('should be rounded', () => {
        const { container } = render(<CustomCursor />);

        const roundedElements = container.querySelectorAll('.rounded-full');
        expect(roundedElements.length).toBe(2); // Both dot and ring
    });

    it('should hide cursor on tablet', () => {
        // Mock tablet environment
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 768,
        });

        const { container } = render(<CustomCursor />);

        // Should not render on tablet
        expect(container.firstChild).toBeNull();
    });
});

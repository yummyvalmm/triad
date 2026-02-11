import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { AnimatedCounter } from '../AnimatedCounter';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        span: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    },
    useMotionValue: (initial: number) => ({
        get: () => initial,
        set: vi.fn(),
    }),
    useTransform: (_value: any, transform: (val: number) => number) => {
        // Return a simple mock that applies the transform
        return transform(0);
    },
    animate: vi.fn(() => ({
        stop: vi.fn(),
    })),
}));

describe('AnimatedCounter Component', () => {
    it('should render counter', () => {
        const { container } = render(
            <AnimatedCounter value={100} isActive={true} />
        );

        expect(container).toBeInTheDocument();
    });

    it('should display suffix when provided', () => {
        const { container } = render(
            <AnimatedCounter value={98} suffix="%" isActive={true} />
        );

        expect(container.textContent).toContain('%');
    });

    it('should display + suffix', () => {
        const { container } = render(
            <AnimatedCounter value={50} suffix="+" isActive={true} />
        );

        expect(container.textContent).toContain('+');
    });

    it('should display K suffix', () => {
        const { container } = render(
            <AnimatedCounter value={10} suffix="K" isActive={true} />
        );

        expect(container.textContent).toContain('K');
    });

    it('should work without suffix', () => {
        const { container } = render(
            <AnimatedCounter value={42} isActive={true} />
        );

        expect(container).toBeInTheDocument();
    });

    it('should accept custom duration', () => {
        const { container } = render(
            <AnimatedCounter value={100} isActive={true} duration={2.5} />
        );

        expect(container).toBeInTheDocument();
    });

    it('should handle isActive prop', () => {
        const { rerender, container } = render(
            <AnimatedCounter value={100} isActive={false} />
        );

        expect(container).toBeInTheDocument();

        // Rerender with isActive true
        rerender(<AnimatedCounter value={100} isActive={true} />);

        expect(container).toBeInTheDocument();
    });

    it('should handle value changes', () => {
        const { rerender, container } = render(
            <AnimatedCounter value={50} isActive={true} />
        );

        expect(container).toBeInTheDocument();

        // Change value
        rerender(<AnimatedCounter value={100} isActive={true} />);

        expect(container).toBeInTheDocument();
    });
});

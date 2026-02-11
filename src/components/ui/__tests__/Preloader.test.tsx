import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import Preloader from '../Preloader';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useUIStore
const mockUseUIStore = vi.fn();
vi.mock('../../../store/useUIStore', () => ({
    useUIStore: () => mockUseUIStore(),
}));

describe('Preloader Component', () => {
    const mockOnComplete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render preloader', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        const { container } = render(<Preloader onComplete={mockOnComplete} />);

        expect(container).toBeInTheDocument();
    });

    it('should display LYNE logo', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        const { container } = render(<Preloader onComplete={mockOnComplete} />);

        expect(container.textContent).toContain('LYNE');
    });

    it('should wait minimum time before completing', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: true });

        render(<Preloader onComplete={mockOnComplete} />);

        // Should not complete immediately even if image is loaded
        expect(mockOnComplete).not.toHaveBeenCalled();

        // Fast-forward 1800ms (minimum time)
        vi.advanceTimersByTime(1800);

        // Should still wait for exit animation
        expect(mockOnComplete).not.toHaveBeenCalled();

        // Fast-forward exit animation (800ms)
        vi.advanceTimersByTime(800);

        // Now it should complete
        expect(mockOnComplete).toHaveBeenCalled();
    });

    it('should wait for hero image to load', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        render(<Preloader onComplete={mockOnComplete} />);

        // Fast-forward minimum time
        vi.advanceTimersByTime(1800);

        // Should not complete because image not loaded
        expect(mockOnComplete).not.toHaveBeenCalled();
    });

    it('should complete when both conditions are met', () => {
        // Start with image not loaded
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        const { rerender } = render(<Preloader onComplete={mockOnComplete} />);

        // Fast-forward minimum time
        vi.advanceTimersByTime(1800);

        // Update to image loaded
        mockUseUIStore.mockReturnValue({ heroImageLoaded: true });
        rerender(<Preloader onComplete={mockOnComplete} />);

        // Fast-forward exit animation
        vi.advanceTimersByTime(800);

        // Should complete
        expect(mockOnComplete).toHaveBeenCalled();
    });

    it('should have correct background color', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        const { container } = render(<Preloader onComplete={mockOnComplete} />);

        const preloaderDiv = container.querySelector('.bg-\\[\\#FF2E00\\]');
        expect(preloaderDiv).toBeInTheDocument();
    });

    it('should be positioned fixed and full screen', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        const { container } = render(<Preloader onComplete={mockOnComplete} />);

        const preloaderDiv = container.querySelector('.fixed.inset-0');
        expect(preloaderDiv).toBeInTheDocument();
    });

    it('should have high z-index', () => {
        mockUseUIStore.mockReturnValue({ heroImageLoaded: false });

        const { container } = render(<Preloader onComplete={mockOnComplete} />);

        const preloaderDiv = container.querySelector('.z-\\[100\\]');
        expect(preloaderDiv).toBeInTheDocument();
    });
});

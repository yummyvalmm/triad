import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Hero from '../Hero';
import { useUIStore } from '../../../store/useUIStore';

// Mock the store
vi.mock('../../../store/useUIStore');

describe('Hero Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        vi.clearAllMocks();

        // Default mock implementation
        (useUIStore as any).mockReturnValue({
            heroImageLoaded: false,
            setHeroImageLoaded: vi.fn(),
            loading: true,
        });
    });

    it('should render hero section with correct structure', () => {
        render(<Hero />);

        const section = screen.getByRole('region');
        expect(section).toBeInTheDocument();
    });

    it('should display hero image with correct attributes', () => {
        render(<Hero />);

        const image = screen.getByAltText(/abstract portrait with neon lighting/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/images/hero.webp');
        expect(image).toHaveAttribute('loading', 'eager');
        expect(image).toHaveAttribute('fetchPriority', 'high');
    });

    it('should display establishment year', () => {
        render(<Hero />);

        expect(screen.getByText('EST. 2020')).toBeInTheDocument();
    });

    it('should display main title "Digital"', () => {
        render(<Hero />);

        expect(screen.getByRole('heading', { name: /digital/i })).toBeInTheDocument();
    });

    it('should display subtitle "Design Studio"', () => {
        render(<Hero />);

        expect(screen.getByText(/design studio/i)).toBeInTheDocument();
    });

    it('should display service list on desktop', () => {
        render(<Hero />);

        expect(screen.getByText('UX/UI Design')).toBeInTheDocument();
        expect(screen.getByText('Development')).toBeInTheDocument();
        expect(screen.getByText('Brand Guidelines')).toBeInTheDocument();
        expect(screen.getByText('Ongoing Support')).toBeInTheDocument();
    });

    it('should display description text', () => {
        render(<Hero />);

        const description = screen.getByText(/we create digital designs/i);
        expect(description).toBeInTheDocument();
    });

    it('should call setHeroImageLoaded when image loads', () => {
        const mockSetHeroImageLoaded = vi.fn();
        (useUIStore as any).mockReturnValue({
            heroImageLoaded: false,
            setHeroImageLoaded: mockSetHeroImageLoaded,
            loading: true,
        });

        render(<Hero />);

        const image = screen.getByAltText(/abstract portrait with neon lighting/i);

        // Simulate image load
        image.dispatchEvent(new Event('load'));

        expect(mockSetHeroImageLoaded).toHaveBeenCalledWith(true);
    });

    it('should apply reveal animation when image is loaded', async () => {
        (useUIStore as any).mockReturnValue({
            heroImageLoaded: true,
            setHeroImageLoaded: vi.fn(),
            loading: false,
        });

        render(<Hero />);

        // Wait for reveal animation to start
        await waitFor(() => {
            const image = screen.getByAltText(/abstract portrait with neon lighting/i);
            expect(image).toHaveClass('scale-100');
        }, { timeout: 100 });
    });

    it('should have proper semantic HTML structure', () => {
        render(<Hero />);

        // Check for section element
        const section = screen.getByRole('region');
        expect(section).toBeInTheDocument();

        // Check for heading
        const heading = screen.getByRole('heading', { name: /digital/i });
        expect(heading.tagName).toBe('H1');
    });

    it('should have responsive classes', () => {
        render(<Hero />);

        const section = screen.getByRole('region');
        expect(section).toHaveClass('h-[100dvh]');
        expect(section).toHaveClass('min-h-[600px]');
    });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Services from '../Services';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}));

// Mock the Reveal component
vi.mock('../../ui/Reveal', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock useIntersectionObserver
vi.mock('../../../hooks', () => ({
    useIntersectionObserver: () => ({
        ref: { current: null },
        isVisible: true,
    }),
}));

describe('Services Component', () => {
    it('should render services section', () => {
        render(<Services />);

        const section = screen.getByRole('region', { name: /our services/i });
        expect(section).toBeInTheDocument();
    });

    it('should display section heading', () => {
        render(<Services />);

        expect(screen.getByText('Our Services')).toBeInTheDocument();
    });

    it('should render all 4 services', () => {
        render(<Services />);

        expect(screen.getByText('Branding')).toBeInTheDocument();
        expect(screen.getByText('Development')).toBeInTheDocument();
        expect(screen.getByText('Websites')).toBeInTheDocument();
        expect(screen.getByText('Design Support')).toBeInTheDocument();
    });

    it('should display service numbers', () => {
        render(<Services />);

        expect(screen.getByText('(01)')).toBeInTheDocument();
        expect(screen.getByText('(02)')).toBeInTheDocument();
        expect(screen.getByText('(03)')).toBeInTheDocument();
        expect(screen.getByText('(04)')).toBeInTheDocument();
    });

    it('should display service descriptions', () => {
        render(<Services />);

        expect(screen.getByText(/create impactful brand identities/i)).toBeInTheDocument();
        expect(screen.getByText(/robust and scalable frontend/i)).toBeInTheDocument();
        expect(screen.getByText(/custom websites that go beyond/i)).toBeInTheDocument();
        expect(screen.getByText(/ongoing design assistance/i)).toBeInTheDocument();
    });

    it('should render service images', () => {
        render(<Services />);

        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
    });

    it('should have proper ARIA attributes', () => {
        render(<Services />);

        const section = screen.getByRole('region');
        expect(section).toHaveAttribute('aria-labelledby', 'services-heading');
        expect(section).toHaveAttribute('id', 'services');
    });

    it('should render list items with proper role', () => {
        render(<Services />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(4);
    });

    it('should handle mouse hover interactions', async () => {
        const user = userEvent.setup();
        render(<Services />);

        const brandingService = screen.getByText('Branding').closest('li');
        expect(brandingService).toBeInTheDocument();

        if (brandingService) {
            await user.hover(brandingService);
            // Service should still be in document after hover
            expect(screen.getByText('Branding')).toBeInTheDocument();
        }
    });

    it('should preload all service images', () => {
        render(<Services />);

        // Check for hidden preloader div
        const preloaderImages = screen.getAllByRole('img', { hidden: true });
        expect(preloaderImages.length).toBeGreaterThan(0);
    });

    it('should have responsive layout classes', () => {
        render(<Services />);

        const section = screen.getByRole('region');
        expect(section).toHaveClass('min-h-screen');
        expect(section).toHaveClass('bg-brand-black');
    });
});

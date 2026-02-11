import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Clients from '../Clients';

describe('Clients Component', () => {
    it('should render clients section', () => {
        render(<Clients />);

        const section = screen.getByRole('region');
        expect(section).toBeInTheDocument();
    });

    it('should display section heading', () => {
        render(<Clients />);

        expect(screen.getByText(/live partners/i)).toBeInTheDocument();
    });

    it('should display all client logos', () => {
        render(<Clients />);

        // Check for client names
        const lodarwalElements = screen.getAllByText('LoDarWal');
        expect(lodarwalElements.length).toBeGreaterThan(0);

        const bubbleElements = screen.getAllByText('Bubble');
        expect(bubbleElements.length).toBeGreaterThan(0);

        const luckyElements = screen.getAllByText('Lucky Mart');
        expect(luckyElements.length).toBeGreaterThan(0);
    });

    it('should display client industries', () => {
        render(<Clients />);

        expect(screen.getAllByText('FASHION RETAIL').length).toBeGreaterThan(0);
        expect(screen.getAllByText('LIFESTYLE RETAIL').length).toBeGreaterThan(0);
        expect(screen.getAllByText('GROCERY & MARKET').length).toBeGreaterThan(0);
    });

    it('should render client logos with correct alt text', () => {
        render(<Clients />);

        const lodarwalLogo = screen.getAllByAltText('LoDarWal brand logo')[0];
        expect(lodarwalLogo).toBeInTheDocument();
        expect(lodarwalLogo).toHaveAttribute('src', '/images/LOGO%20NO%20BG%202.png');
    });

    it('should display live indicator', () => {
        render(<Clients />);

        expect(screen.getByText('LIVE PARTNERS')).toBeInTheDocument();
    });

    it('should have marquee animation elements', () => {
        render(<Clients />);

        // Check for list elements (marquee tracks)
        const lists = screen.getAllByRole('list');
        expect(lists.length).toBeGreaterThan(0);
    });

    it('should duplicate client items for seamless marquee', () => {
        render(<Clients />);

        // Each client should appear multiple times (original + duplicates for marquee)
        const lodarwalElements = screen.getAllByText('LoDarWal');
        expect(lodarwalElements.length).toBeGreaterThan(1);
    });

    it('should have proper section styling', () => {
        render(<Clients />);

        const section = screen.getByRole('region');
        expect(section).toHaveClass('bg-white');
        expect(section).toHaveClass('text-brand-black');
    });

    it('should render description text', () => {
        render(<Clients />);

        expect(screen.getByText(/we partner with brands/i)).toBeInTheDocument();
    });

    it('should have scroll margin for navigation', () => {
        render(<Clients />);

        const section = screen.getByRole('region');
        expect(section).toHaveClass('scroll-mt-28');
    });
});

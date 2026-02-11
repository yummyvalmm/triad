import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pricing from '../Pricing';

// Mock Reveal component
vi.mock('../../ui/Reveal', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Pricing Component', () => {
    it('should render pricing section', () => {
        renderWithRouter(<Pricing />);

        const section = screen.getByRole('region');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', 'pricing');
    });

    it('should display base package heading', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('Standard Package')).toBeInTheDocument();
    });

    it('should display base price', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('$799')).toBeInTheDocument();
        expect(screen.getByText('/ one-time')).toBeInTheDocument();
    });

    it('should display all package features', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText(/Universal Device Compatibility/i)).toBeInTheDocument();
        expect(screen.getByText(/High-Performance Optimization/i)).toBeInTheDocument();
        expect(screen.getByText(/SEO-Ready Site Architecture/i)).toBeInTheDocument();
        expect(screen.getByText(/Secure Hosting/i)).toBeInTheDocument();
        expect(screen.getByText(/Integrated Visitor Analytics/i)).toBeInTheDocument();
        expect(screen.getByText(/Lead Generation/i)).toBeInTheDocument();
    });

    it('should display "Book A Consultation" button', () => {
        renderWithRouter(<Pricing />);

        const consultButton = screen.getByRole('link', { name: /book a consultation/i });
        expect(consultButton).toBeInTheDocument();
        expect(consultButton).toHaveAttribute('href', '/consultation');
    });

    it('should display satisfaction guarantee', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('100% Satisfaction Guarantee')).toBeInTheDocument();
    });

    it('should display custom quote section', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText(/Build your own/i)).toBeInTheDocument();
        expect(screen.getByText(/custom quote/i)).toBeInTheDocument();
    });

    it('should display "The Lyne Experience" badge', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('The Lyne Experience')).toBeInTheDocument();
    });

    it('should display pricing philosophy text', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText(/Rigid pricing tables are outdated/i)).toBeInTheDocument();
    });

    it('should display Discovery Call feature', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('Discovery Call')).toBeInTheDocument();
        expect(screen.getByText(/We discuss your vision/i)).toBeInTheDocument();
    });

    it('should display Transparent Quote feature', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('Transparent Quote')).toBeInTheDocument();
        expect(screen.getByText(/Receive a detailed breakdown/i)).toBeInTheDocument();
    });

    it('should display custom feature link', () => {
        renderWithRouter(<Pricing />);

        const customLink = screen.getByRole('link', { name: /ask for a custom feature/i });
        expect(customLink).toBeInTheDocument();
        expect(customLink).toHaveAttribute('href', '#contact');
    });

    it('should display "Base Foundation" badge', () => {
        renderWithRouter(<Pricing />);

        expect(screen.getByText('Base Foundation')).toBeInTheDocument();
    });

    it('should have checkmarks for all features', () => {
        renderWithRouter(<Pricing />);

        // There should be 6 features with checkmarks
        const features = screen.getAllByRole('listitem');
        expect(features.length).toBe(6);
    });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
        button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useScrollPosition hook
vi.mock('../../../hooks', () => ({
    useScrollPosition: () => ({ scrollY: 0, isScrolled: false }),
}));

describe('Navbar Component', () => {
    it('should render navbar', () => {
        render(<Navbar />);

        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('should display logo', () => {
        render(<Navbar />);

        const logo = screen.getByLabelText('Lyne Home');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveTextContent('LYNE');
    });

    it('should render all navigation links', () => {
        render(<Navbar />);

        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Pricing')).toBeInTheDocument();
        expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
    });

    it('should have correct href attributes', () => {
        render(<Navbar />);

        const aboutLink = screen.getByText('About').closest('a');
        expect(aboutLink).toHaveAttribute('href', '#about');

        const servicesLink = screen.getByText('Services').closest('a');
        expect(servicesLink).toHaveAttribute('href', '#services');
    });

    it('should render mobile menu button', () => {
        render(<Navbar />);

        const menuButton = screen.getByLabelText('Open menu');
        expect(menuButton).toBeInTheDocument();
    });

    it('should toggle mobile menu on button click', async () => {
        const user = userEvent.setup();
        render(<Navbar />);

        const menuButton = screen.getByLabelText('Open menu');

        // Click to open
        await user.click(menuButton);

        // Menu should be open (aria-expanded should be true)
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close mobile menu when clicking close button', async () => {
        const user = userEvent.setup();
        render(<Navbar />);

        const menuButton = screen.getByLabelText('Open menu');

        // Open menu
        await user.click(menuButton);

        // Find close button
        const closeButton = screen.getByLabelText('Close menu');
        expect(closeButton).toBeInTheDocument();

        // Close menu
        await user.click(closeButton);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have proper ARIA labels', () => {
        render(<Navbar />);

        const nav = screen.getByRole('navigation', { name: /main navigation/i });
        expect(nav).toBeInTheDocument();
    });

    it('should lock body scroll when mobile menu is open', async () => {
        const user = userEvent.setup();
        render(<Navbar />);

        const menuButton = screen.getByLabelText('Open menu');

        // Open menu
        await user.click(menuButton);

        // Body overflow should be hidden
        expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unlock body scroll when mobile menu is closed', async () => {
        const user = userEvent.setup();
        render(<Navbar />);

        const menuButton = screen.getByLabelText('Open menu');

        // Open and close menu
        await user.click(menuButton);
        const closeButton = screen.getByLabelText('Close menu');
        await user.click(closeButton);

        // Body overflow should be reset
        expect(document.body.style.overflow).toBe('');
    });
});

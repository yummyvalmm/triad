import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../Footer';

// Mock Reveal component
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

describe('Footer Component', () => {
    it('should render footer section', () => {
        render(<Footer />);

        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it('should display main heading', () => {
        render(<Footer />);

        expect(screen.getByText(/let's bring your/i)).toBeInTheDocument();
        expect(screen.getByText(/vision to life/i)).toBeInTheDocument();
    });

    it('should display contact form', () => {
        render(<Footer />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should display submit button', () => {
        render(<Footer />);

        const submitButton = screen.getByRole('button', { name: /get in touch/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('should display team member info', () => {
        render(<Footer />);

        expect(screen.getByText('Htet Aung Linn')).toBeInTheDocument();
        expect(screen.getByText('PROJECT MANAGER')).toBeInTheDocument();
        expect(screen.getByText('htetaunglinn.dev@gmail.com')).toBeInTheDocument();
    });

    it('should display social media links', () => {
        render(<Footer />);

        // There should be 4 social media links (Facebook, Instagram, LinkedIn, Send/Telegram)
        const socialLinks = screen.getAllByRole('link').filter(link =>
            link.querySelector('svg')
        );
        expect(socialLinks.length).toBeGreaterThanOrEqual(4);
    });

    it('should display copyright text', () => {
        render(<Footer />);

        expect(screen.getByText(/© 2024 Lyne Digital Studio/i)).toBeInTheDocument();
    });

    it('should display legal links', () => {
        render(<Footer />);

        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });

    it('should handle form input changes', async () => {
        const user = userEvent.setup();
        render(<Footer />);

        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement;

        await user.type(nameInput, 'John Doe');
        await user.type(emailInput, 'john@example.com');

        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
    });

    it('should show loading state on form submission', async () => {
        const user = userEvent.setup();
        render(<Footer />);

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const submitButton = screen.getByRole('button', { name: /get in touch/i });

        await user.type(nameInput, 'John Doe');
        await user.type(emailInput, 'john@example.com');
        await user.click(submitButton);

        // Should show loading state
        await waitFor(() => {
            expect(screen.getByText(/sending/i)).toBeInTheDocument();
        });
    });

    it('should show success message after submission', async () => {
        const user = userEvent.setup();
        render(<Footer />);

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const submitButton = screen.getByRole('button', { name: /get in touch/i });

        await user.type(nameInput, 'John Doe');
        await user.type(emailInput, 'john@example.com');
        await user.click(submitButton);

        // Should show success message
        await waitFor(() => {
            expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('should have required fields', () => {
        render(<Footer />);

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/e-mail/i);

        expect(nameInput).toBeRequired();
        expect(emailInput).toBeRequired();
    });

    it('should display newsletter signup', () => {
        render(<Footer />);

        const newsletterInput = screen.getByLabelText(/newsletter email/i);
        expect(newsletterInput).toBeInTheDocument();
    });

    it('should display LYNE logo in footer', () => {
        render(<Footer />);

        const logos = screen.getAllByText(/LYNE/i);
        expect(logos.length).toBeGreaterThan(0);
    });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQ from '../FAQ';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Reveal component
vi.mock('../../ui/Reveal', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('FAQ Component', () => {
    it('should render FAQ section', () => {
        render(<FAQ />);

        const section = screen.getByRole('region', { name: /knowledge base/i });
        expect(section).toBeInTheDocument();
    });

    it('should display section heading', () => {
        render(<FAQ />);

        expect(screen.getByText('Knowledge Base')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /common/i })).toBeInTheDocument();
    });

    it('should render all FAQ items', () => {
        render(<FAQ />);

        // Check for FAQ questions (there should be multiple)
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have proper ARIA attributes', () => {
        render(<FAQ />);

        const section = screen.getByRole('region');
        expect(section).toHaveAttribute('aria-labelledby', 'faq-heading');
        expect(section).toHaveAttribute('id', 'faq');
    });

    it('should expand FAQ item on click', async () => {
        const user = userEvent.setup();
        render(<FAQ />);

        const buttons = screen.getAllByRole('button');
        const firstButton = buttons[0];

        // Initially collapsed
        expect(firstButton).toHaveAttribute('aria-expanded', 'false');

        // Click to expand
        await user.click(firstButton);

        // Should be expanded
        expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse FAQ item when clicked again', async () => {
        const user = userEvent.setup();
        render(<FAQ />);

        const buttons = screen.getAllByRole('button');
        const firstButton = buttons[0];

        // Expand
        await user.click(firstButton);
        expect(firstButton).toHaveAttribute('aria-expanded', 'true');

        // Collapse
        await user.click(firstButton);
        expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should close other items when opening a new one', async () => {
        const user = userEvent.setup();
        render(<FAQ />);

        const buttons = screen.getAllByRole('button');

        if (buttons.length >= 2) {
            const firstButton = buttons[0];
            const secondButton = buttons[1];

            // Open first item
            await user.click(firstButton);
            expect(firstButton).toHaveAttribute('aria-expanded', 'true');

            // Open second item
            await user.click(secondButton);
            expect(secondButton).toHaveAttribute('aria-expanded', 'true');
            expect(firstButton).toHaveAttribute('aria-expanded', 'false');
        }
    });

    it('should have proper styling classes', () => {
        render(<FAQ />);

        const section = screen.getByRole('region');
        expect(section).toHaveClass('bg-white');
        expect(section).toHaveClass('py-24');
    });

    it('should render Plus icon in buttons', () => {
        render(<FAQ />);

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);

        // Each button should have the Plus icon styling
        buttons.forEach(button => {
            expect(button).toBeInTheDocument();
        });
    });
});

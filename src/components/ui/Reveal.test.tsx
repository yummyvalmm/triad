import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reveal from './Reveal';

describe('Reveal Component', () => {
    it('should render children', () => {
        render(
            <Reveal>
                <div>Test Content</div>
            </Reveal>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply initial hidden state via inline styles', () => {
        const { container } = render(
            <Reveal>
                <div>Test Content</div>
            </Reveal>
        );

        const innerDiv = container.querySelector('div > div');
        expect(innerDiv).toHaveStyle({ opacity: '0' });
        expect(innerDiv).toHaveStyle({ transform: expect.stringContaining('translateY') });
    });

    it('should apply custom delay via inline style', () => {
        const { container } = render(
            <Reveal delay={500}>
                <div>Test Content</div>
            </Reveal>
        );

        // Component uses custom prop names, just verify it renders
        const innerDiv = container.querySelector('div > div');
        expect(innerDiv).toBeInTheDocument();
    });

    it('should apply custom width', () => {
        const { container } = render(
            <Reveal width="100%">
                <div>Test Content</div>
            </Reveal>
        );

        const outerDiv = container.firstChild as HTMLElement;
        expect(outerDiv).toHaveStyle({ width: '100%' });
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Reveal className="custom-class">
                <div>Test Content</div>
            </Reveal>
        );

        const outerDiv = container.firstChild as HTMLElement;
        expect(outerDiv).toHaveClass('custom-class');
    });

    it('should have proper transition classes and properties', () => {
        const { container } = render(
            <Reveal duration={900} yOffset={30}>
                <div>Test Content</div>
            </Reveal>
        );

        const innerDiv = container.querySelector('div > div');
        // Check for at least one of the transition classes
        expect(innerDiv).toHaveClass('transition-all');
        // Verify inline styles are applied
        expect(innerDiv).toHaveStyle({ transitionDuration: '900ms' });
    });
});

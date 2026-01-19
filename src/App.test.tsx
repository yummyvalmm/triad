import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Basic check to see if the main layout or some content renders.
        // Since we have a lot of content, let's just check for something generic or specific to the home page.
        // For example, the Hero section usually has a button or heading.
        // Let's check for the existence of the main, which we know is in MainLayout.
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeDefined();
    });
});

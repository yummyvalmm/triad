import '@testing-library/react';
import { vi } from 'vitest';

// Mock ResizeObserver
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

global.ResizeObserver = ResizeObserver;

// Mock window.scrollTo
global.scrollTo = vi.fn();

// Mock IntersectionObserver if needed (often used in Reveals)
class IntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
global.IntersectionObserver = IntersectionObserver as any;

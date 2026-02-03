import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Custom render function that wraps components with necessary providers
 * Use this instead of @testing-library/react's render for component tests
 */
export function renderWithRouter(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    return render(ui, {
        wrapper: ({ children }) => (
            <BrowserRouter>{children}</BrowserRouter>
        ),
        ...options,
    });
}

/**
 * Creates a mock IntersectionObserver entry
 */
export function createMockIntersectionObserverEntry(
    isIntersecting: boolean = true
): IntersectionObserverEntry {
    return {
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: isIntersecting ? 1 : 0,
        intersectionRect: {} as DOMRectReadOnly,
        isIntersecting,
        rootBounds: null,
        target: document.createElement('div'),
        time: Date.now(),
    };
}

/**
 * Wait for a specific amount of time (useful for testing animations/delays)
 */
export function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a mock project item for testing
 */
export function createMockProject(overrides = {}) {
    return {
        id: '1',
        title: 'Test Project',
        category: 'Web Development',
        year: '2024',
        image: '/test-image.jpg',
        tags: ['React', 'TypeScript'],
        description: 'A test project description',
        challenge: 'Test challenge',
        solution: 'Test solution',
        results: ['Result 1', 'Result 2'],
        testimonial: 'Great work!',
        clientName: 'Test Client',
        clientRole: 'CEO',
        techStack: ['React', 'TypeScript', 'Tailwind'],
        features: ['Feature 1', 'Feature 2'],
        metrics: {
            metric1: '100%',
            metric2: '50',
        },
        deliverables: ['Deliverable 1'],
        ...overrides,
    };
}

/**
 * Creates a mock service item for testing
 */
export function createMockService(overrides = {}) {
    return {
        id: '1',
        title: 'Test Service',
        description: 'Test service description',
        icon: 'Code',
        features: ['Feature 1', 'Feature 2'],
        ...overrides,
    };
}

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from '../Portfolio';

// Mock Reveal component
vi.mock('../../ui/Reveal', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock PortfolioCard
vi.mock('../PortfolioCard', () => ({
    default: ({ project, onCardClick }: any) => (
        <div data-testid={`card-${project.id}`} onClick={() => onCardClick(project.id)}>
            {project.title}
        </div>
    ),
}));

// Mock PortfolioModal
vi.mock('../PortfolioModal', () => ({
    default: ({ project, onClose, onNext }: any) => (
        <div data-testid="portfolio-modal">
            <h2>{project.title}</h2>
            <button onClick={onClose}>Close</button>
            <button onClick={onNext}>Next</button>
        </div>
    ),
}));

// Mock useIntersectionObserver
vi.mock('../../../hooks', () => ({
    useIntersectionObserver: () => ({
        ref: { current: null },
        isVisible: true,
    }),
}));

// Mock portfolio data
vi.mock('../portfolioData', () => ({
    projects: [
        { id: 'project-1', title: 'Project 1', category: 'Web Design', image: '/img1.jpg', tags: ['React', 'TypeScript'] },
        { id: 'project-2', title: 'Project 2', category: 'E-commerce', image: '/img2.jpg', tags: ['Next.js', 'Tailwind'] },
        { id: 'project-3', title: 'Project 3', category: 'Branding', image: '/img3.jpg', tags: ['UI/UX', 'Design'] },
    ],
}));

describe('Portfolio Component', () => {
    it('should render portfolio section', () => {
        render(<Portfolio />);

        const section = screen.getByRole('region', { name: /3d project carousel/i });
        expect(section).toBeInTheDocument();
    });

    it('should display section heading', () => {
        render(<Portfolio />);

        expect(screen.getByText('Web Showcase')).toBeInTheDocument();
    });

    it('should display "Selected Work" badge', () => {
        render(<Portfolio />);

        expect(screen.getByText('Selected Work')).toBeInTheDocument();
    });

    it('should display description text', () => {
        render(<Portfolio />);

        expect(screen.getByText(/strategic design templates/i)).toBeInTheDocument();
    });

    it('should render navigation controls', () => {
        render(<Portfolio />);

        const prevButton = screen.getByLabelText('Previous Project');
        const nextButton = screen.getByLabelText('Next Project');

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    it('should render all projects in mobile view', () => {
        render(<Portfolio />);

        expect(screen.getByText('Project 1')).toBeInTheDocument();
        expect(screen.getByText('Project 2')).toBeInTheDocument();
        expect(screen.getByText('Project 3')).toBeInTheDocument();
    });

    it('should display "View Design Studies" CTA', () => {
        render(<Portfolio />);

        expect(screen.getByText('View Design Studies')).toBeInTheDocument();
    });

    it('should have proper ARIA labels', () => {
        render(<Portfolio />);

        const heading = screen.getByRole('heading', { name: /web showcase/i });
        expect(heading).toHaveAttribute('id', 'projects-heading');
    });

    it('should display drag instruction text', () => {
        render(<Portfolio />);

        expect(screen.getByText('Drag to explore')).toBeInTheDocument();
    });

    it('should have correct section ID for navigation', () => {
        render(<Portfolio />);

        const section = screen.getByRole('region', { name: /3d project carousel/i });
        expect(section).toHaveAttribute('id', 'projects');
    });
});

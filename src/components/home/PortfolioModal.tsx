import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import { ProjectItem } from '../../types';
import {
    X,
    MoveRight,
    Check,
    Sparkles,
    Globe,
    Calendar,
    Eye,
    Layers,
} from 'lucide-react';

/**
 * Props for the PortfolioModal component
 * 
 * @interface PortfolioModalProps
 * @property {ProjectItem} project - The project data to display in the modal
 * @property {() => void} onClose - Callback function to close the modal
 * @property {() => void} onNext - Callback function to navigate to next project
 */
interface PortfolioModalProps {
    project: ProjectItem;
    onClose: () => void;
    onNext: () => void;
}

/**
 * PortfolioModal - Full-page project detail modal
 * 
 * Displays comprehensive project information in a full-screen overlay.
 * Includes focus trapping for accessibility, escape key handling,
 * and renders as a React portal to ensure proper z-index stacking.
 * 
 * @component
 * 
 * @features
 * - **Focus Management**: Traps focus within modal using focus-trap-react
 * - **Keyboard Navigation**: Closes on Escape key press
 * - **Scroll Lock**: Prevents body scrolling when open
 * - **Portal Rendering**: Renders outside main DOM hierarchy for proper layering
 * - **Accessibility**: Proper ARIA attributes (role="dialog", aria-modal, aria-labelledby)
 * 
 * @example
 * ```tsx
 * const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
 * 
 * {selectedProject && (
 *   <PortfolioModal
 *     project={selectedProject}
 *     onClose={() => setSelectedProject(null)}
 *     onNext={() => setSelectedProject(getNextProject())}
 *   />
 * )}
 * ```
 * 
 * @accessibility
 * - Focus trapped within modal when open
 * - Announces as dialog to screen readers
 * - Escape key closes modal
 * - Modal title connected via aria-labelledby
 * 
 * @performance
 * - Resets scroll position when project changes
 * - Uses React portal for optimal rendering
 * - Properly cleans up event listeners and observers
 */
const PortfolioModal: React.FC<PortfolioModalProps> = ({
    project,
    onClose,
    onNext,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Reset scroll position when project changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
    }, [project]);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const modalContent = (
        <FocusTrap
            focusTrapOptions={{
                initialFocus: false,
                allowOutsideClick: true,
                escapeDeactivates: true,
            }}
        >
            <section
                className="fixed inset-0 z-[200] bg-white w-screen h-screen flex flex-col animate-in slide-in-from-bottom-10 duration-500"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header Bar */}
                <header className="shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-50">
                    <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-gray-500 truncate">
                        <span className="text-brand-black font-bold">Lyne</span>
                        <span className="text-gray-300">/</span>
                        <span className="hidden md:inline">Marketplace</span>
                        <span className="hidden md:inline text-gray-300">/</span>
                        <span className="text-gray-900 truncate">{project.title}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} className="text-gray-500 hover:text-brand-black" />
                        </button>
                    </div>
                </header>

                {/* Main Scrollable Content */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto w-full h-full bg-white"
                    data-lenis-prevent
                >
                    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
                        {/* Title & Action Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                            <div>
                                <h1
                                    id="modal-title"
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 tracking-tight"
                                >
                                    {project.title}
                                </h1>
                                <p className="text-xl text-gray-500">{project.category}</p>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-6 py-3 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-colors text-sm uppercase tracking-wide">
                                    Preview
                                </button>
                                <button className="flex-1 md:flex-none px-6 py-3 bg-brand-black hover:bg-gray-800 text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wide shadow-lg shadow-black/20">
                                    Start Project $4k+
                                </button>
                            </div>
                        </div>

                        {/* Bento Grid Images */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                            {/* Hero Image */}
                            <div className="md:col-span-2 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm aspect-[16/9] group relative">
                                <img
                                    src={project.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Main Project View"
                                />
                            </div>

                            {/* Gallery Images */}
                            {project.gallery.map((img, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm aspect-[4/3] group relative"
                                >
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        alt={`Gallery view ${i + 1}`}
                                    />
                                </div>
                            ))}

                            {/* Feature Card */}
                            <div className="rounded-2xl bg-gray-900 p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group min-h-[300px]">
                                <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <Sparkles size={48} className="mb-6 text-brand-red" />
                                    <h3 className="text-2xl font-bold mb-3">Visual Architecture</h3>
                                    <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
                                        Fully responsive design system adapted for mobile, tablet, and
                                        desktop environments.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 border-t border-gray-100 pt-16">
                            {/* Left Column */}
                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                    About this Template
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-12 font-light">
                                    {project.description}
                                </p>

                                <h3 className="text-2xl font-bold mb-6 text-gray-900">Features</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.highlights.map((h) => (
                                        <li
                                            key={h}
                                            className="flex items-center gap-3 text-gray-600 font-medium p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-gray-100 text-brand-black flex items-center justify-center shrink-0">
                                                <Check size={14} />
                                            </div>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Column (Sidebar) */}
                            <div className="space-y-10">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                        Details
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-gray-700 font-medium group">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-black group-hover:text-white transition-colors">
                                                <Globe size={14} />
                                            </div>
                                            <span>Client: Ditych</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 font-medium group">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-black group-hover:text-white transition-colors">
                                                <Calendar size={14} />
                                            </div>
                                            <span>Released: 3 weeks ago</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 font-medium group">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-black group-hover:text-white transition-colors">
                                                <Eye size={14} />
                                            </div>
                                            <span>31.5K views</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                        Categories
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors cursor-default border border-gray-100"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                        Pages Included
                                    </h4>
                                    <ul className="space-y-3">
                                        {['Home', '404', 'Privacy Policy', 'Services', 'Contact'].map(
                                            (page) => (
                                                <li
                                                    key={page}
                                                    className="flex items-center gap-3 text-gray-500 text-sm font-medium hover:text-brand-black transition-colors cursor-default"
                                                >
                                                    <Layers size={14} />
                                                    {page}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Project Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 py-20 text-center mt-20">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                            Continue Browsing
                        </p>
                        <button
                            onClick={onNext}
                            className="text-3xl font-bold text-gray-900 hover:text-brand-accent transition-colors flex items-center justify-center gap-3 mx-auto"
                        >
                            Next Project <MoveRight />
                        </button>
                    </div>
                </div>
            </section>
        </FocusTrap >
    );

    return createPortal(modalContent, document.body);
};

export default PortfolioModal;

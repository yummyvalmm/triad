import React from 'react';
import { ProjectItem } from '../../types';
import { LayoutTemplate, ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
    project: ProjectItem;
    angle: number;
    radius: number;
    cardWidth: number;
    onCardClick: (projectId: string) => void;
}

/**
 * PortfolioCard - Individual project card for the 3D carousel
 * Renders a single project with image, tags, and hover effects
 */
const PortfolioCard: React.FC<PortfolioCardProps> = ({
    project,
    angle,
    radius,
    cardWidth,
    onCardClick,
}) => {
    return (
        <article
            className="absolute top-1/2 left-1/2 transform-style-preserve-3d"
            style={{
                width: `${cardWidth}px`,
                height: '420px',
                marginLeft: `-${cardWidth / 2}px`,
                marginTop: '-210px',
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
            }}
        >
            <div
                data-magnetic
                className="group relative w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer transition-all duration-300 ease-out will-change-transform backface-hidden hover:border-brand-accent/50 hover:shadow-brand-accent/20"
                style={{ backfaceVisibility: 'hidden' }}
                onClick={() => onCardClick(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onCardClick(project.id);
                }}
                aria-label={`View details for ${project.title}`}
            >
                {/* Image Section */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-200 relative group-hover:shadow-inner">
                    {/* Browser Chrome Dots */}
                    <div
                        className="absolute top-3 left-3 z-20 flex gap-1.5 px-2 py-1.5 bg-white/80 backdrop-blur rounded-full border border-white/20 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>

                    {/* Template Badge */}
                    <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <LayoutTemplate size={10} />
                        Template
                    </div>

                    <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                    {/* View Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-lg">
                        <ArrowUpRight size={20} className="text-brand-black" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 h-2/5 flex flex-col justify-between bg-white relative z-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-2xl font-bold text-brand-black group-hover:text-brand-accent transition-colors mb-1">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-500">{project.category}</p>
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="w-full h-1 bg-gray-100 mt-4 overflow-hidden rounded-full">
                        <div className="h-full bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </div>
                </div>
            </div>
        </article>
    );
};

/**
 * Custom comparison function for React.memo
 * Only re-render if project id, angle, or radius changes
 */
const arePropsEqual = (
    prevProps: PortfolioCardProps,
    nextProps: PortfolioCardProps
): boolean => {
    return (
        prevProps.project.id === nextProps.project.id &&
        prevProps.angle === nextProps.angle &&
        prevProps.radius === nextProps.radius &&
        prevProps.cardWidth === nextProps.cardWidth
    );
};

export default React.memo(PortfolioCard, arePropsEqual);

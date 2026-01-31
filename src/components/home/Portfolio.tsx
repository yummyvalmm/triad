import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ProjectItem } from '../../types';
import Reveal from '../ui/Reveal';
import { MoveLeft, MoveRight, ChevronLeft, ChevronRight, LayoutTemplate } from 'lucide-react';
import { projects } from './portfolioData';
import PortfolioCard from './PortfolioCard';
import PortfolioModal from './PortfolioModal';
import { useIntersectionObserver } from '../../hooks';
import { CONFIG } from '../../constants';

/**
 * Portfolio Section - 3D Carousel with project showcase
 * Features drag-to-rotate on desktop and horizontal scroll on mobile
 */
const Portfolio: React.FC = () => {
  // DOM Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const currentRotation = useRef(0);

  // State
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  // Physics Refs
  const startX = useRef(0);
  const startRotation = useRef(0);
  const velocityRef = useRef(0);
  const requestRef = useRef<number>(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const dragStartTime = useRef(0);
  const dragStartX = useRef(0);
  const targetRotationRef = useRef<number | null>(null);

  // Geometry calculations
  const count = projects.length;
  const theta = 360 / count;
  const radius = Math.round((CONFIG.CAROUSEL_CARD_WIDTH / 2) / Math.tan(Math.PI / count)) + 50;

  // Intersection Observer for performance
  const { ref: containerRef, isVisible: isInView } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1
  });

  // URL & History sync
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const proj = projects.find((p) => p.id === projectId);
      if (proj) setSelectedProject(proj);
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentId = currentParams.get('project');
      if (currentId) {
        const proj = projects.find((p) => p.id === currentId);
        if (proj) setSelectedProject(proj);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Project navigation handlers
  const openProject = (project: ProjectItem) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.pushState({ projectId: project.id }, '', url.toString());
  };

  const closeProject = () => {
    setSelectedProject(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url.toString());
  };

  const nextProject = () => {
    if (!selectedProject) return;
    const idx = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = (idx + 1) % projects.length;
    openProject(projects[nextIdx]);
  };

  // Animation loop
  const animate = useCallback(() => {
    let newRotation = currentRotation.current;
    let needsUpdate = false;

    // Button navigation mode
    if (targetRotationRef.current !== null) {
      const dist = targetRotationRef.current - newRotation;
      const step = dist * 0.1;

      if (Math.abs(dist) < 0.1) {
        newRotation = targetRotationRef.current;
        targetRotationRef.current = null;
        velocityRef.current = 0;
        setIsMoving(false);
      } else {
        newRotation += step;
        needsUpdate = true;
      }
    }
    // Inertia mode
    else if (!isDragging && Math.abs(velocityRef.current) > 0.005) {
      setIsMoving(true);
      velocityRef.current *= 0.95;
      newRotation += velocityRef.current * 10;
      needsUpdate = true;
    } else if (!isDragging && targetRotationRef.current === null) {
      setIsMoving(false);
      velocityRef.current = 0;
    }

    if (needsUpdate || isDragging) {
      currentRotation.current = newRotation;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateZ(-${radius}px) rotateY(${newRotation}deg)`;
      }
    }

    if (isInView) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [isDragging, radius, isInView]);

  useEffect(() => {
    if (isInView && window.innerWidth >= 768) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate, isInView]);

  // Drag handlers
  const handleDragStart = (x: number) => {
    setIsDragging(true);
    setIsMoving(true);
    targetRotationRef.current = null;
    startX.current = x;
    startRotation.current = currentRotation.current;
    lastX.current = x;
    lastTime.current = Date.now();
    dragStartTime.current = Date.now();
    dragStartX.current = x;
    velocityRef.current = 0;
  };

  const handleDragMove = (x: number) => {
    if (!isDragging) return;
    const delta = x - startX.current;
    const sensitivity = 0.25;
    const newRot = startRotation.current + delta * sensitivity;
    currentRotation.current = newRot;

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-${radius}px) rotateY(${newRot}deg)`;
    }

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const dx = x - lastX.current;
      velocityRef.current = dx / dt;
      lastX.current = x;
      lastTime.current = now;
    }
  };

  const handleDragEnd = () => setIsDragging(false);

  const handlePrev = () => {
    const currentSnap = Math.round(currentRotation.current / theta) * theta;
    targetRotationRef.current = currentSnap + theta;
    setIsMoving(true);
  };

  const handleNext = () => {
    const currentSnap = Math.round(currentRotation.current / theta) * theta;
    targetRotationRef.current = currentSnap - theta;
    setIsMoving(true);
  };

  const handleCardClick = (projectId: string) => {
    const dragDuration = Date.now() - dragStartTime.current;
    const dragDist = Math.abs(lastX.current - dragStartX.current);

    if (dragDuration < 400 && dragDist < 30) {
      const proj = projects.find((p) => p.id === projectId);
      if (proj) openProject(proj);
    }
  };

  // Mouse event handlers
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientX);
    }
  };
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      aria-labelledby="projects-heading"
      className="bg-gray-50 py-24 md:py-32 overflow-hidden select-none relative z-20 scroll-mt-28"
    >
      {/* Header */}
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
          <div>
            <Reveal>
              <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold tracking-widest uppercase rounded mb-4">
                Selected Work
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h2
                id="projects-heading"
                className="text-4xl md:text-7xl font-bold leading-none tracking-tight text-brand-black"
              >
                Web Showcase
              </h2>
            </Reveal>
          </div>
          <div className="text-right mt-6 md:mt-0 hidden md:block">
            <Reveal delay={400}>
              <span className="block text-xl font-bold text-gray-400">Case Studies</span>
              <div className="flex items-center justify-end gap-2 text-sm text-gray-600 mt-2">
                <MoveLeft size={16} className="animate-pulse-slow-x" aria-hidden="true" />
                <span>Drag to explore</span>
                <MoveRight size={16} className="animate-pulse-slow-x" aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={300}>
          <p className="text-gray-500 max-w-xl text-lg border-l-2 border-brand-accent pl-6">
            A collection of strategic design templates tailored for specific industries. We build with conversion, brand authority, and scalability in mind.
          </p>
        </Reveal>
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <Reveal delay={400}>
        <div className="md:hidden w-full overflow-x-auto pb-8 hide-scrollbar px-6 flex gap-6 snap-x snap-mandatory">
          {projects.map((project) => (
            <div
              key={project.id}
              className="snap-center shrink-0 w-[85vw] max-w-[340px] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100"
              onClick={() => openProject(project)}
            >
              <div className="aspect-[4/3] bg-gray-200 relative">
                <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10 flex items-center gap-1">
                  <LayoutTemplate size={10} />
                  Template
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-1">{project.title}</h3>
                <p className="text-xs text-gray-500 mb-4">{project.category}</p>
                <button className="w-full py-2 bg-gray-50 text-brand-black text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-black hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Desktop View - 3D Carousel */}
      <Reveal delay={500} className="hidden md:block">
        <div
          className={`flex relative w-full h-[55vh] min-h-[400px] max-h-[600px] items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-transform duration-500`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          style={{ perspective: '2000px' }}
          role="region"
          aria-label="3D Project Carousel"
        >
          <div
            ref={carouselRef}
            className="relative w-full h-full will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(0deg)`,
            }}
          >
            {projects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                angle={theta * index}
                radius={radius}
                cardWidth={CONFIG.CAROUSEL_CARD_WIDTH}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Navigation Controls */}
      <Reveal delay={600}>
        <nav
          className="hidden md:flex container mx-auto px-6 mt-8 justify-center items-center gap-6"
          aria-label="Carousel Navigation"
        >
          <button
            onClick={handlePrev}
            data-magnetic
            className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-black hover:border-brand-black hover:text-white transition-all active:scale-95"
            aria-label="Previous Project"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
            Navigate
          </span>
          <button
            onClick={handleNext}
            data-magnetic
            className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-black hover:border-brand-black hover:text-white transition-all active:scale-95"
            aria-label="Next Project"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </nav>
      </Reveal>

      <Reveal delay={700}>
        <div className="text-center mt-8 hidden md:block">
          <a
            href="#projects"
            data-magnetic
            className="inline-block px-8 py-4 border border-brand-black text-brand-black font-bold uppercase tracking-wider hover:bg-brand-black hover:text-white transition-colors duration-300 text-sm"
          >
            View Design Studies
          </a>
        </div>
      </Reveal>

      {/* Project Modal */}
      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={closeProject}
          onNext={nextProject}
        />
      )}

      {/* CSS for 3D transforms */}
      <style>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @keyframes pulse-slow-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-pulse-slow-x {
          animation: pulse-slow-x 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
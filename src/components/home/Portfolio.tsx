import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ProjectItem } from '../../types';
import Reveal from '../ui/Reveal';
import { MoveLeft, MoveRight, ExternalLink, ChevronLeft, ChevronRight, X, ArrowUpRight, Check, Sparkles, LayoutTemplate, Palette, Globe, Monitor, Zap, Smartphone, Calendar, Eye, Layers } from 'lucide-react';

const projects: ProjectItem[] = [
  {
    id: 't1',
    title: 'Velocity Esports',
    category: 'Gaming Organization',
    image: '/images/portfolio/p1.webp',
    tags: ['Esports', 'Next.js', 'Dark UI'],
    description: "A high-octane interface designed to capture the aggressive energy of competitive gaming. We structured the layout to prioritize fan engagement through real-time stats and match feeds, turning casual viewers into loyal community members.",
    highlights: [
      "Dynamic Match Schedule & Results",
      "Player Roster with K/D Stats",
      "Merch Store Front via Shopify",
      "Twitch Stream Embedding"
    ],
    gallery: [
      "/images/portfolio/p1-1.webp",
      "/images/portfolio/p1-2.webp"
    ]
  },
  {
    id: 't2',
    title: 'Lumina Dental',
    category: 'Medical Practice',
    image: '/images/portfolio/p2.webp',
    tags: ['Healthcare', 'Booking', 'Clean'],
    description: "Trust is the currency of healthcare. For Lumina, we utilized a calming color psychology and whitespace-heavy layout to reduce patient anxiety. The user flow is engineered to guide visitors seamlessly from 'learning' to 'booking' in under 3 clicks.",
    highlights: [
      "HIPAA-Compliant Appointment Forms",
      "Before & After Case Study Sliders",
      "Insurance & Payment Info Sections",
      "Staff Profile Management CMS"
    ],
    gallery: [
      "/images/portfolio/p2-1.webp",
      "/images/portfolio/p2-2.webp"
    ]
  },
  {
    id: 't3',
    title: 'Vogue Threads',
    category: 'Fashion E-commerce',
    image: '/images/portfolio/p3.webp',
    tags: ['Retail', 'Shopify', 'Minimal'],
    description: "In fashion, the product is the hero. We stripped away all non-essential UI elements to create a gallery-like shopping experience. The typographic hierarchy is designed to feel editorial, elevating the perceived value of every item.",
    highlights: [
      "Lookbook & Editorial Layouts",
      "Advanced Product Filtering",
      "Size Guide Modal & Quick View",
      "Instagram Shoppable Feed"
    ],
    gallery: [
      "/images/portfolio/p3-1.webp",
      "/images/portfolio/p3-2.webp"
    ]
  },
  {
    id: 't4',
    title: 'Savor Bistro',
    category: 'Restaurant & Bar',
    image: '/images/portfolio/p4.webp',
    tags: ['Hospitality', 'Menu', 'Events'],
    description: "We translated the sensory experience of fine dining into a digital format. High-contrast imagery paired with elegant serif typography creates an appetite before the guest even arrives. The mobile experience prioritizes immediate needs: menu, location, and reservations.",
    highlights: [
      "CMS-Managed Digital Menu",
      "Private Dining Inquiry Forms",
      "Reservation Platform Integration",
      "Immersive Video Backgrounds"
    ],
    gallery: [
      "/images/portfolio/p4-1.webp",
      "/images/portfolio/p4-2.webp"
    ]
  },
  {
    id: 't5',
    title: 'Maison N°3',
    category: 'High Jewelry',
    image: '/images/portfolio/p5.webp',
    tags: ['Jewelry', 'Luxury', 'Ecommerce'],
    description: "A seasonal edit shaped by fluid lines, warm palettes, and understated luxury. This template features a refined earthy color system, bringing focus to the intimate details of fine jewelry and the stories behind them.",
    highlights: [
      "Seasonal Collection Drops",
      "Interactive Jewelry Try-On",
      "Heritage & Sourcing Stories",
      "Sophisticated Editorial Layouts"
    ],
    gallery: [
      "/images/portfolio/p5-1.webp",
      "/images/portfolio/p5-2.webp"
    ]
  },
  {
    id: 't6',
    title: 'AeroTravel',
    category: 'Travel Agency',
    image: '/images/portfolio/p6.webp',
    tags: ['Travel', 'Booking', 'Agency'],
    description: "Travel planning can be chaotic. AeroTravel solves this with a clean, modular card-based design that organizes complex itineraries into digestible visuals. The focus is on 'dreaming' first, then 'booking', using aspirational imagery to drive decision-making.",
    highlights: [
      "Destination Search Filtering",
      "Trip Itinerary Builder UI",
      "Customer Reviews Widget",
      "Multi-currency Support"
    ],
    gallery: [
      "/images/portfolio/p6-1.webp",
      "/images/portfolio/p6-2.webp"
    ]
  },
  {
    id: 't7',
    title: 'Azure Resort',
    category: 'Hotel & Resort',
    image: '/images/portfolio/p7.webp',
    tags: ['Hotel', 'Resort', 'Vacation'],
    description: "For Azure, the website serves as the first day of the vacation. We implemented full-screen immersive video headers and a seamless, floating booking engine that follows the user without being obtrusive. Every interaction reinforces relaxation.",
    highlights: [
      "Room Availability Checker",
      "Resort Amenities Icon Grid",
      "Local Area & Activities Guide",
      "Virtual Tour Support"
    ],
    gallery: [
      "/images/portfolio/p7-1.webp",
      "/images/portfolio/p7-2.webp"
    ]
  }
];

const CARD_WIDTH = 340;

const Portfolio: React.FC = () => {
  // Direct DOM Refs for Performance
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentRotation = useRef(0);

  // Interaction State
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMoving, setIsMoving] = useState(false); // Used for visual cursor state only
  const [isInView, setIsInView] = useState(false); // Visibility optimization

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

  // Calculate geometry
  const count = projects.length;
  const theta = 360 / count;
  const radius = Math.round((CARD_WIDTH / 2) / Math.tan(Math.PI / count)) + 50;

  // --- INTERSECTION OBSERVER FOR PERFORMANCE ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- URL & HISTORY SYNC ---
  useEffect(() => {
    // Check URL on mount
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const proj = projects.find(p => p.id === projectId);
      if (proj) setSelectedProject(proj);
    }

    // Handle back button
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentId = currentParams.get('project');
      if (currentId) {
        const proj = projects.find(p => p.id === currentId);
        if (proj) setSelectedProject(proj);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --- AUTO SCROLL TOP ON PROJECT CHANGE ---
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [selectedProject]);

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
    const idx = projects.findIndex(p => p.id === selectedProject.id);
    const nextIdx = (idx + 1) % projects.length;
    openProject(projects[nextIdx]);
  };

  // --- MODAL SCROLL LOCK ---
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [selectedProject]);

  // --- ANIMATION LOOP (Runs at 60-120fps) ---
  const animate = useCallback(() => {
    let newRotation = currentRotation.current;
    let needsUpdate = false;

    // 1. Button Navigation Mode
    if (targetRotationRef.current !== null) {
      const dist = targetRotationRef.current - newRotation;
      const step = dist * 0.1;

      if (Math.abs(dist) < 0.1) {
        newRotation = targetRotationRef.current;
        targetRotationRef.current = null;
        velocityRef.current = 0;
        // Snap finish
        setIsMoving(false);
      } else {
        newRotation += step;
        needsUpdate = true;
      }
    }
    // 2. Inertia Mode
    else if (!isDragging && Math.abs(velocityRef.current) > 0.005) {
      setIsMoving(true);
      velocityRef.current *= 0.95; // Friction
      newRotation += velocityRef.current * 10;
      needsUpdate = true;
    }
    else if (!isDragging && targetRotationRef.current === null) {
      setIsMoving(false);
      velocityRef.current = 0;
      // Animation Idle
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
    // Only run animation loop when component is visible and on desktop
    if (isInView && window.innerWidth >= 768) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate, isInView]);


  // --- DRAG HANDLERS ---
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
    const currentX = x;
    const delta = currentX - startX.current;
    const sensitivity = 0.25;

    // Update ref directly
    const newRot = startRotation.current + delta * sensitivity;
    currentRotation.current = newRot;

    // Apply immediate transform for zero-latency feel
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(-${radius}px) rotateY(${newRot}deg)`;
    }

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const dx = currentX - lastX.current;
      velocityRef.current = dx / dt;
      lastX.current = currentX;
      lastTime.current = now;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Loop continues to handle inertia
  };

  // --- BUTTON HANDLERS ---
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

  const handleClick = (projectId: string) => {
    const dragDuration = Date.now() - dragStartTime.current;
    const dragDist = Math.abs(lastX.current - dragStartX.current);

    // More generous threshold for clicking vs dragging
    if (dragDuration < 400 && dragDist < 30) {
      const proj = projects.find(p => p.id === projectId);
      if (proj) openProject(proj);
    }
  };

  // Input Handlers
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientX);
    }
  };
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };

  return (
    <section
      id="projects"
      ref={containerRef}
      aria-labelledby="projects-heading"
      // Reduced vertical padding (py-12 md:py-20) to fix "top margin too far"
      className="bg-gray-50 py-12 md:py-20 overflow-hidden select-none relative z-20 scroll-mt-28"
    >
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        {/* Adjusted items alignment to center and reduced margin bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
          <div>
            <Reveal>
              <div className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold tracking-widest uppercase rounded mb-4">
                Playground
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h2 id="projects-heading" className="text-4xl md:text-7xl font-bold leading-none tracking-tight text-brand-black">
                Web Showcase
              </h2>
            </Reveal>
          </div>
          <div className="text-right mt-6 md:mt-0 hidden md:block">
            <Reveal delay={400}>
              <span className="block text-xl font-bold text-gray-400">Industry Ready</span>
              <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mt-2">
                <MoveLeft size={16} aria-hidden="true" />
                <span>Drag to explore</span>
                <MoveRight size={16} aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={300}>
          <p className="text-gray-500 max-w-xl text-lg border-l-2 border-brand-red pl-6">
            A collection of strategic design templates tailored for specific industries. We build with conversion, brand authority, and scalability in mind.
          </p>
        </Reveal>
      </div>

      {/* --- MOBILE VIEW: NATIVE SCROLL SNAP LIST --- */}
      <Reveal delay={400}>
        <div className="md:hidden w-full overflow-x-auto pb-8 hide-scrollbar px-6 flex gap-6 snap-x snap-mandatory">
          {projects.map((project) => (
            <div
              key={project.id}
              className="snap-center shrink-0 w-[85vw] max-w-[340px] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100"
              onClick={() => openProject(project)}
            >
              <div className="h-[200px] bg-gray-200 relative">
                <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10 flex items-center gap-1">
                  <LayoutTemplate size={10} /> Template
                </div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 px-2 py-1 rounded">
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

      {/* --- DESKTOP VIEW: 3D CAROUSEL --- */}
      <Reveal delay={500} className="hidden md:block">
        <div
          className={`flex relative w-full h-[55vh] min-h-[400px] max-h-[600px] items-center justify-center perspective-1000 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-transform duration-500`}
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
            className="relative w-full h-full transform-style-3d will-change-transform"
            style={{
              // Initial render state
              transform: `translateZ(-${radius}px) rotateY(0deg)`,
              transition: 'none'
            }}
          >
            {projects.map((project, index) => {
              const angle = theta * index;
              return (
                <article
                  key={project.id}
                  className="absolute top-1/2 left-1/2 transform-style-preserve-3d"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: '420px',
                    marginLeft: `-${CARD_WIDTH / 2}px`,
                    marginTop: '-210px',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                  }}
                >
                  {/* CARD CONTAINER */}
                  <div
                    data-magnetic
                    className={`group relative w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl 
                        border border-white/20 cursor-pointer
                        transition-all duration-300 ease-out will-change-transform backface-hidden
                        hover:border-brand-red/50 hover:shadow-brand-red/20
                    `}
                    style={{ backfaceVisibility: 'hidden' }}
                    onClick={() => handleClick(project.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleClick(project.id);
                    }}
                    aria-label={`View details for ${project.title}`}
                  >
                    {/* Internal Image with Browser Chrome */}
                    <div className="h-3/5 w-full overflow-hidden bg-gray-200 relative group-hover:shadow-inner">
                      {/* Browser Header Overlay */}
                      <div className="absolute top-3 left-3 z-20 flex gap-1.5 px-2 py-1.5 bg-white/80 backdrop-blur rounded-full border border-white/20 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      </div>

                      {/* Template Badge Overlay */}
                      <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <LayoutTemplate size={10} /> Template
                      </div>

                      <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-lg">
                        <ArrowUpRight size={20} className="text-brand-black" />
                      </div>
                    </div>

                    <div className="p-6 h-2/5 flex flex-col justify-between bg-white relative z-10">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-brand-black group-hover:text-brand-red transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500">{project.category}</p>
                      </div>

                      <div className="w-full h-1 bg-gray-100 mt-4 overflow-hidden rounded-full">
                        <div className="h-full bg-brand-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* MANUAL NAVIGATION CONTROLS (DESKTOP) */}
      <Reveal delay={600}>
        <nav className="hidden md:flex container mx-auto px-6 mt-8 justify-center items-center gap-6" aria-label="Carousel Navigation">
          <button
            onClick={handlePrev}
            data-magnetic
            className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-black hover:border-brand-black hover:text-white transition-all active:scale-95"
            aria-label="Previous Project"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Navigate</span>

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
          <a href="#projects" data-magnetic className="inline-block px-8 py-4 border border-brand-black text-brand-black font-bold uppercase tracking-wider hover:bg-brand-black hover:text-white transition-colors duration-300 text-sm">
            View Design Studies
          </a>
        </div>
      </Reveal>

      {/* FULL PAGE PROJECT VIEW - RENDERED VIA PORTAL */}
      {selectedProject && createPortal(
        <section
          className="fixed inset-0 z-[200] bg-white w-screen h-screen flex flex-col animate-in slide-in-from-bottom-10 duration-500"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >

          {/* Header Bar */}
          <header className="shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-medium text-gray-500 truncate">
              <span className="text-brand-black font-bold">Triad</span>
              <span className="text-gray-300">/</span>
              <span className="hidden md:inline">Marketplace</span>
              <span className="hidden md:inline text-gray-300">/</span>
              <span className="text-gray-900 truncate">{selectedProject.title}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button onClick={closeProject} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 tracking-tight">{selectedProject.title}</h1>
                  <p className="text-xl text-gray-500">{selectedProject.category}</p>
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
                {/* Hero Image - Spans 2 cols */}
                <div className="md:col-span-2 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm aspect-[16/9] group relative">
                  <img src={selectedProject.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main Project View" />
                </div>

                {/* Secondary Images */}
                {selectedProject.gallery.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm aspect-[4/3] group relative">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={`Gallery view ${i + 1}`} />
                  </div>
                ))}

                {/* Abstract/Feature Card to fill grid */}
                <div className="rounded-2xl bg-gray-900 p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group min-h-[300px]">
                  <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors"></div>
                  {/* Decorative background circles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <Sparkles size={48} className="mb-6 text-brand-red" />
                    <h3 className="text-2xl font-bold mb-3">Visual Architecture</h3>
                    <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
                      Fully responsive design system adapted for mobile, tablet, and desktop environments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Grid (Left: Description, Right: Meta Sidebar) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 border-t border-gray-100 pt-16">

                {/* Left Column (Content) */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">About this Template</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-12 font-light">
                    {selectedProject.description}
                  </p>

                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map(h => (
                      <li key={h} className="flex items-center gap-3 text-gray-600 font-medium p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-gray-100 text-brand-black flex items-center justify-center shrink-0">
                          <Check size={14} />
                        </div>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column (Sticky Sidebar) */}
                <div className="space-y-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Details</h4>
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
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors cursor-default border border-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Pages Included</h4>
                    <ul className="space-y-3">
                      {['Home', '404', 'Privacy Policy', 'Services', 'Contact'].map((page) => (
                        <li key={page} className="flex items-center gap-3 text-gray-500 text-sm font-medium hover:text-brand-black transition-colors cursor-default">
                          <Layers size={14} />
                          {page}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Next Project Navigation Footer */}
            <div className="bg-gray-50 border-t border-gray-200 py-20 text-center mt-20">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Continue Browsing</p>
              <button
                onClick={nextProject}
                className="text-3xl font-bold text-gray-900 hover:text-brand-red transition-colors flex items-center justify-center gap-3"
              >
                Next Project <MoveRight />
              </button>
            </div>
          </div>
        </section>,
        document.body
      )}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
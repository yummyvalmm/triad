import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { PenTool, MousePointer2, Move, Eraser, Trash2, Undo } from 'lucide-react';
import { DrawArrow, ScribbleHighlight } from '../ui/HandDrawn';

const BlueprintSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const coordRef = useRef<HTMLDivElement>(null);
    const [activeTool, setActiveTool] = useState<'select' | 'pen' | 'move'>('select');
    // const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // REMOVED CAUSE OF LAG
    const [isDrawing, setIsDrawing] = useState(false);

    // Drawing State
    const [paths, setPaths] = useState<string[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('');

    // Physics for Cursor (Fixed Position)
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    // Reduced stiffness/damping for smoother, less jittery follow
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    // Physics for Grid Lines (Relative Position)
    const gridX = useMotionValue(0);
    const gridY = useMotionValue(0);
    const smoothGridX = useSpring(gridX, springConfig);
    const smoothGridY = useSpring(gridY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        // 1. Update Global Cursor (Fixed)
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // 2. Update Local Grid Lines (Absolute) & Logic
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const relativeY = e.clientY - rect.top;

            // setMousePos({ x: relativeX, y: relativeY }); // REMOVED RE-RENDER

            // Direct DOM update for performance
            if (coordRef.current) {
                coordRef.current.innerText = `LOC: ${Math.round(relativeX)}px, ${Math.round(relativeY)}px`;
            }

            gridX.set(relativeX);
            gridY.set(relativeY);

            // Drawing Logic
            if (isDrawing && activeTool === 'pen') {
                setCurrentPath((prev) => `${prev} L ${relativeX} ${relativeY}`);
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'pen') {
            setIsDrawing(true);
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setCurrentPath(`M ${x} ${y}`);
            }
        }
    };

    const handleMouseUp = () => {
        if (isDrawing && activeTool === 'pen') {
            setIsDrawing(false);
            if (currentPath) {
                setPaths(prev => [...prev, currentPath]);
                setCurrentPath('');
            }
        }
    };

    const clearCanvas = () => {
        setPaths([]);
        setCurrentPath('');
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDrawing(false)}
            className={`relative min-h-[90vh] bg-[#F7F7F5] overflow-hidden flex flex-col items-center justify-center select-none ${activeTool === 'select' ? 'cursor-default' : 'cursor-none'}`}
        >
            {/* Custom Grid Background - Reduced Opacity */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Helper Lines (Relative to Container) */}
            <motion.div
                className="absolute top-0 bottom-0 w-px bg-brand-red/10 pointer-events-none"
                style={{ x: smoothGridX }}
            />
            <motion.div
                className="absolute left-0 right-0 h-px bg-brand-red/10 pointer-events-none"
                style={{ y: smoothGridY }}
            />

            {/* User Drawings Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {paths.map((d, i) => (
                    <path key={i} d={d} stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                ))}
                {currentPath && (
                    <path d={currentPath} stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                )}
            </svg>

            {/* Floating Toolbar - More Minimal */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="absolute top-8 md:top-12 z-50 flex gap-2 bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 p-1.5 rounded-full"
            >
                {[
                    { id: 'select', icon: MousePointer2, label: 'Select Tool' },
                    { id: 'pen', icon: PenTool, label: 'Sketch Tool' },
                    { id: 'move', icon: Move, label: 'Move Tool' },
                ].map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id as any)}
                        className={`p-2.5 rounded-full transition-all border border-transparent ${activeTool === tool.id ? 'bg-brand-black text-white shadow-md' : 'hover:bg-gray-100 text-gray-500 hover:border-gray-200'}`}
                        title={tool.label}
                        aria-label={tool.label}
                    >
                        <tool.icon size={16} />
                    </button>
                ))}
                <div className="w-px bg-gray-200 mx-1 my-2"></div>
                <button
                    onClick={clearCanvas}
                    className="p-2.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                    title="Clear Canvas"
                    aria-label="Clear Canvas"
                >
                    <Trash2 size={16} />
                </button>
            </motion.div>

            {/* Main Content Area - Draggable if Move Tool */}
            <motion.div
                drag={activeTool === 'move'}
                dragConstraints={containerRef}
                dragElastic={0.05}
                dragMomentum={false}
                className={`relative z-20 text-center max-w-4xl mx-auto px-6 ${activeTool === 'move' ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Annotation Note - Rotates slightly when moved for effect */}
                    <div className="absolute -top-16 -left-12 rotate-[-12deg] hidden md:block pointer-events-none opacity-80">
                        <p className="font-handwriting text-2xl text-blue-600">Start here!</p>
                        <DrawArrow delay={1} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 p-8 border border-transparent hover:border-dashed hover:border-gray-200 rounded-3xl transition-colors">
                        <div className="relative group">
                            <span className="absolute -top-6 left-0 text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{'<h1>Default</h1>'}</span>

                            <h2 className="text-6xl md:text-8xl font-display font-bold text-gray-300 tracking-tighter opacity-100 transition-opacity">
                                Idea
                            </h2>
                        </div>

                        <div className="text-gray-300 rotate-90 md:rotate-0 pointer-events-none opacity-50">
                            <DrawArrow delay={0.5} />
                        </div>

                        <div className="relative group perspective-1000">
                            {/* 3D Highlight Layer - Reduced Blur */}
                            <div className="absolute inset-0 bg-brand-red/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <h2 className="relative text-6xl md:text-8xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-black to-brand-red tracking-tighter cursor-pointer transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                                Reality
                                <ScribbleHighlight width={300} />
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Custom Cursor Element (Fixed) */}
            {activeTool !== 'select' && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[100] text-brand-black mix-blend-darken hidden md:block"
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: activeTool === 'pen' ? 0 : '-50%',
                        translateY: activeTool === 'pen' ? -24 : '-50%'
                    }}
                >
                    {activeTool === 'pen' ? <PenTool size={24} className="transform rotate-[-15deg] origin-bottom-left" /> :
                        activeTool === 'move' ? <Move size={24} /> : null
                    }
                </motion.div>
            )}

            {/* Coordinates Footer - Optimized with Ref */}
            <div ref={coordRef} className="absolute bottom-6 left-6 font-mono text-[10px] text-gray-400">
                LOC: 0px, 0px
            </div>

        </section>
    );
};

export default BlueprintSection;
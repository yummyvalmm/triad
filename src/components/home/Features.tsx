// @ts-nocheck
import React, { useRef } from 'react';
import { IconBolt, IconPalette, IconShieldCheck, IconCheck, IconGlobe } from '@tabler/icons-react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../ui/Reveal';
import { AnimatedCounter } from '../ui/AnimatedCounter';

// --- NEW CLIENT-FRIENDLY VISUALS ---

// 1. SPEED VISUAL - Animated Speedometer with Globe
const SpeedVisual: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const radius = 50;
    const circumference = Math.PI * radius; // Half circle
    const speedValue = 98;

    return (
        <div className="flex flex-col h-full w-full relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
            {/* Animated Globe Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <IconGlobe size={200} strokeWidth={0.5} />
                </motion.div>
            </div>

            {/* Connection Lines Animation - More Dense and Bright */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent"
                        style={{
                            top: `${10 + i * 8}%`,
                            left: 0,
                            right: 0,
                        }}
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={isActive ? { x: '100%', opacity: [0, 1, 0] } : { x: '-100%', opacity: 0 }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                ))}
            </div>

            {/* Main Speedometer */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                <div className="relative w-36 h-20 flex items-end justify-center">
                    <svg className="w-full h-full" viewBox="0 0 120 70">
                        {/* Background Arc */}
                        <path
                            d="M 10 60 A 50 50 0 0 1 110 60"
                            fill="none"
                            stroke="#334155"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        {/* Progress Arc */}
                        <motion.path
                            d="M 10 60 A 50 50 0 0 1 110 60"
                            fill="none"
                            stroke="url(#speedGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: isActive ? circumference * (1 - speedValue / 100) : circumference }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <defs>
                            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FF6B5B" />
                                <stop offset="50%" stopColor="#FF2E00" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Needle */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 origin-bottom"
                        style={{ height: '40px', width: '3px' }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: isActive ? -90 + (speedValue / 100) * 180 : -90 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-full h-full bg-gradient-to-t from-white to-white/50 rounded-full" />
                    </motion.div>
                </div>

                {/* Speed Value */}
                <div className="mt-4 text-center">
                    <div className="text-3xl font-bold text-white tracking-tight">
                        <AnimatedCounter value={speedValue} suffix="%" isActive={isActive} />
                    </div>
                    <div className="text-xs text-brand-accent font-medium mt-1">Performance</div>
                </div>

                {/* Stats Row */}
                <div className="flex gap-6 mt-4">
                    {[
                        { label: 'Load Time', value: '0.8s' },
                        { label: 'Uptime', value: '99.9%' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <div className="text-sm font-semibold text-white">{stat.value}</div>
                            <div className="text-[10px] text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2. BRANDING VISUAL - Color Palette & Typography Preview
const BrandingVisual: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const colors = [
        { name: 'CTA Red', color: '#FF2E00', hex: '#FF2E00' },
        { name: 'Accent', color: '#FF6B5B', hex: '#FF6B5B' },
        { name: 'Dark', color: '#050505', hex: '#050505' },
        { name: 'Light', color: '#f8fafc', hex: '#F8FAFC' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-gradient-to-br from-[#fafafa] to-[#f1f5f9] p-4">
            {/* Color Palette */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Brand Colors</div>
                <div className="flex gap-2 mb-3">
                    {colors.map((c, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div
                                className="h-10 md:h-12 rounded-lg shadow-lg mb-1.5 ring-1 ring-black/5"
                                style={{ backgroundColor: c.color }}
                            />
                            <div className="text-[8px] font-mono text-gray-500 text-center">{c.hex}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Typography Preview - Systematic approach */}
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                    <span>Typography System</span>
                    <span className="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono">Manrope / Space Grotesk</span>
                </div>
                <motion.div
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="text-xl font-bold text-gray-900 leading-none mb-0.5">Aa Bb Cc</div>
                    <div className="text-xs text-gray-500">Inter • Modern Sans-Serif</div>
                    <div className="flex gap-2 mt-2">
                        <span className="text-[10px] font-light text-gray-400">Light</span>
                        <span className="text-[10px] font-normal text-gray-500">Regular</span>
                        <span className="text-[10px] font-semibold text-gray-700">Semi</span>
                        <span className="text-[10px] font-bold text-gray-900">Bold</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// 3. QUALITY VISUAL - Shield with Animated Checkmarks
const QualityVisual: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const checks = [
        'Mobile Responsive',
        'SEO Optimized',
        'Cross-Browser Tested',
        'Performance Audited',
    ];

    return (
        <div className="flex flex-col h-full w-full bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] p-3 relative overflow-hidden">
            {/* Glowing Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-32 h-32 rounded-full bg-green-500/20 blur-3xl"
                    animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 1, opacity: 0.2 }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                {/* Shield Badge */}
                <motion.div
                    className="relative mb-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isActive ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    <div className="w-14 h-16 relative">
                        <svg viewBox="0 0 80 96" className="w-full h-full">
                            <defs>
                                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#22c55e" />
                                    <stop offset="100%" stopColor="#16a34a" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M40 0 L80 20 L80 52 C80 72 60 88 40 96 C20 88 0 72 0 52 L0 20 Z"
                                fill="url(#shieldGradient)"
                            />
                        </svg>
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <IconCheck size={24} className="text-white" strokeWidth={3} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quality Label */}
                <motion.div
                    className="text-center mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="text-sm font-bold text-white">Quality Verified</div>
                    <div className="text-[10px] text-green-300">All checks passed</div>
                </motion.div>

                {/* Checklist */}
                <div className="w-full max-w-[160px] space-y-1">
                    {checks.map((check, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-md px-2 py-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                        >
                            <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <IconCheck size={8} className="text-white" strokeWidth={3} />
                            </div>
                            <span className="text-[9px] text-white/90 font-medium">{check}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- FEATURE CARD WRAPPER ---
const FeatureCard: React.FC<{
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    Visual: React.FC<{ isActive: boolean }>;
    delay: number;
}> = ({ title, subtitle, description, icon, Visual, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger when 50% visible

    return (
        <Reveal delay={delay} width="100%" className="h-full">
            <div ref={ref} className="h-full flex flex-col rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500 group">
                {/* Visual Area - Adjusted Height for Mobile */}
                <div className="h-[200px] md:h-[240px] bg-[#0A0A0A] relative border-b border-gray-100 flex flex-col">
                    <Visual isActive={isInView} />
                    {/* Gloss */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 text-brand-black">
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-brand-black leading-none">{title}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">{subtitle}</span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mt-2">
                        {description}
                    </p>
                </div>
            </div>
        </Reveal>
    )
}


const Features: React.FC = () => {
    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden">
            {/* Background Cleaned Up */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-2xl mb-16 md:mb-20">
                    <Reveal>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 rounded-sm bg-brand-accent"></span>
                            <span className="text-brand-black font-mono text-xs uppercase tracking-widest font-bold">Performance DNA</span>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[0.95] tracking-tighter mb-6">
                            Built for speed.<br />
                            <span className="text-brand-accent">Designed for scale.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We don't just build websites; we engineer digital ecosystems. From the first pixel in Figma to the final deploy on Vercel, every step is optimized for performance and maintainability.
                        </p>
                    </Reveal>
                </div>

                {/* Grid Layout - Optimized ratio with md:grid-cols-2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Fast & Reliable"
                        subtitle="Lightning Performance"
                        description="Your website loads instantly, anywhere in the world. We build with cutting-edge technology that keeps your visitors engaged and your business running 24/7."
                        icon={<IconBolt size={20} />}
                        Visual={SpeedVisual}
                        delay={300}
                    />

                    <FeatureCard
                        title="Consistent Branding"
                        subtitle="Pixel-Perfect Design"
                        description="Your brand looks perfect across every page and device. We create cohesive visual systems that make your business look professional and memorable."
                        icon={<IconPalette size={20} />}
                        Visual={BrandingVisual}
                        delay={400}
                    />

                    <FeatureCard
                        title="Quality Assured"
                        subtitle="Thoroughly Tested"
                        description="Every update is automatically tested before going live. We ensure your website works flawlessly on all browsers and devices, giving you peace of mind."
                        icon={<IconShieldCheck size={20} />}
                        Visual={QualityVisual}
                        delay={500}
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
import React, { useState, useEffect, useRef } from 'react';
import { IconFileTypeTs, IconServer, IconBoxModel, IconCpu, IconPalette, IconRocket, IconActivity, IconTerminal2, IconFileCode } from '@tabler/icons-react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import Reveal from '../ui/Reveal';

// --- ANIMATED COUNTER COMPONENT (Synchronized) ---
const AnimatedCounter = ({ value, isActive }: { value: number, isActive: boolean }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isActive) {
            const controls = animate(count, value, { duration: 1.5, ease: [0.16, 1, 0.3, 1] });
            return () => controls.stop();
        } else {
            count.set(0);
        }
    }, [isActive, value, count]);

    return <motion.span>{rounded}</motion.span>;
};

// --- SHARED WINDOW HEADER ---
const WindowHeader = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111] w-full shrink-0 select-none">
     <div className="flex items-center gap-2">
        {icon}
        <span className="text-[9px] tracking-widest uppercase text-gray-500 font-mono">{title}</span>
     </div>
     <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/10"></div>
        <div className="w-2 h-2 rounded-full bg-white/10"></div>
     </div>
  </div>
);

// --- VISUAL SUB-COMPONENTS ---

// 1. ENGINEERING VISUAL (Middleware / Edge Config)
const EngineeringVisual: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="font-mono text-[10px] leading-relaxed text-gray-400 p-0 w-full h-full flex flex-col select-none relative bg-[#0D0D0D]">
      <WindowHeader 
        title="middleware.ts" 
        icon={<IconFileTypeTs size={12} className="text-blue-400" />} 
      />

      {/* Code Editor */}
      <div className="p-4 relative z-10 overflow-hidden flex-1">
         {/* Line Numbers */}
         <div className="absolute left-0 top-4 bottom-0 w-8 flex flex-col items-center text-gray-700 select-none text-[9px] leading-[1.6]">
             {Array.from({length: 12}).map((_, i) => <div key={i}>{i+1}</div>)}
         </div>

         {/* Code Body */}
         <div className="pl-8 space-y-1 opacity-90 text-[10px] leading-[1.6]">
            <div className="flex gap-1.5">
               <span className="text-purple-400">import</span>
               <span className="text-yellow-100">{'{ next }'}</span>
               <span className="text-purple-400">from</span>
               <span className="text-green-400">'@vercel/edge'</span>;
            </div>
            <div className="h-2"></div>
            <div className="flex gap-1.5">
               <span className="text-gray-500">// Geo-replication config</span>
            </div>
            <div className="flex gap-1.5">
               <span className="text-blue-400">export</span>
               <span className="text-blue-400">const</span>
               <span className="text-blue-300">config</span>
               <span className="text-white">=</span>
               <span className="text-yellow-400">{'{'}</span>
            </div>
            <div className="pl-4 flex gap-1.5">
               <span className="text-blue-300">matcher</span>:
               <span className="text-green-400">['/api/:path*']</span>,
            </div>
            <div className="pl-4 flex gap-1.5">
               <span className="text-blue-300">regions</span>:
               <span className="text-yellow-300">['iad1', 'sfo1']</span>,
            </div>
            <div className="text-yellow-400">{'}'};</div>
            <div className="h-2"></div>
            <div className="flex gap-1.5">
                <span className="text-blue-400">export</span>
                <span className="text-blue-400">default</span>
                <span className="text-blue-400">async</span>
                <span className="text-blue-400">function</span>
                <span className="text-yellow-300">middleware</span>() {'{'}
            </div>
            <div className="pl-4 flex gap-1.5">
                 <span className="text-purple-400">return</span>
                 <span className="text-yellow-100">next</span>();
            </div>
            <div className="text-yellow-400">{'}'}</div>
         </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none">
         <IconServer size={120} />
      </div>
    </div>
  );
};

// 2. DELIVERY VISUAL (Synchronized Animation)
const DeliveryVisual: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  // Circular Progress Logic
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const score = 99;
  
  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden bg-[#0D0D0D]">
       <WindowHeader 
         title="pipeline.yml" 
         icon={<IconFileCode size={12} className="text-purple-400" />} 
       />
       
       <div className="flex-1 flex flex-col items-center justify-center relative z-10">
           {/* Main Gauge */}
           <div className="relative w-32 h-32 flex items-center justify-center mb-4">
               <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                   {/* Track */}
                   <circle cx="50" cy="50" r={radius} fill="none" stroke="#1f2937" strokeWidth="6" />
                   {/* Progress Indicator */}
                   <motion.circle 
                        cx="50" 
                        cy="50" 
                        r={radius} 
                        fill="none" 
                        stroke="#10B981" 
                        strokeWidth="6" 
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: isActive ? circumference - (score / 100) * circumference : circumference }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                   />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">
                       <AnimatedCounter value={score} isActive={isActive} />
                   </span>
                   <span className="text-[9px] uppercase tracking-wider text-green-500 font-bold">Passed</span>
               </div>
           </div>
           
           {/* Metrics Grid */}
           <div className="grid grid-cols-3 gap-2 w-full px-6">
               {[
                   { label: "LCP", val: "0.6s", bar: 95 },
                   { label: "TBT", val: "0ms", bar: 100 },
                   { label: "CLS", val: "0.00", bar: 100 }
               ].map((metric, i) => (
                   <div key={i} className="bg-white/5 rounded border border-white/5 p-2 flex flex-col items-center gap-1.5">
                       <span className="text-[8px] text-gray-500 uppercase tracking-wider font-bold">{metric.label}</span>
                       <span className="text-xs font-mono text-white">{metric.val}</span>
                       <div className="w-full h-0.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                           <motion.div 
                                className="h-full bg-green-500"
                                initial={{ width: 0 }}
                                animate={{ width: isActive ? `${metric.bar}%` : 0 }}
                                transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                           />
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

// 3. DESIGNING VISUAL (Strict Types)
const DesigningVisual: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="flex flex-col h-full w-full bg-[#0D0D0D]">
        <WindowHeader 
          title="tokens.d.ts" 
          icon={<IconFileTypeTs size={12} className="text-blue-400" />} 
        />

        <div className="flex-1 flex overflow-hidden">
            {/* Left: Code Definition */}
            <div className="w-3/5 border-r border-white/5 p-4 font-mono text-[9px] text-gray-500 flex flex-col justify-center">
                <div className="space-y-1">
                    <div>
                        <span className="text-blue-400">type</span> <span className="text-yellow-300">Scale</span> = <span className="text-green-400">'sm'</span> | <span className="text-green-400">'lg'</span>;
                    </div>
                    <div className="h-1"></div>
                    <div>
                        <span className="text-blue-400">interface</span> <span className="text-yellow-300">Theme</span> {'{'}
                    </div>
                    <div className="pl-4 flex items-center gap-2">
                        <span className="text-blue-300">colors</span>:
                        <span className="text-yellow-300">Palette</span>;
                    </div>
                    <div className="pl-4 flex items-center gap-2">
                        <span className="text-blue-300">space</span>:
                        <span className="text-yellow-300">Record</span>&lt;<span className="text-yellow-300">Scale</span>, <span className="text-blue-400">number</span>&gt;;
                    </div>
                    <div>{'}'}</div>
                    <div className="mt-2 text-gray-600">// Immutable Design Tokens</div>
                </div>
            </div>

            {/* Right: Visual Preview */}
            <div className="w-2/5 flex flex-col items-center justify-center gap-3 p-4 bg-[#0A0A0A]">
                <div className="w-full aspect-square rounded-lg bg-brand-red flex items-center justify-center shadow-lg shadow-red-900/20 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                    <span className="text-white font-bold text-xs relative z-10">Aa</span>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="aspect-square rounded bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <div className="aspect-square rounded bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    </div>
                </div>
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
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red">{subtitle}</span>
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
                        <span className="w-1.5 h-1.5 rounded-sm bg-brand-red"></span>
                        <span className="text-brand-black font-mono text-xs uppercase tracking-widest font-bold">Our Workflow</span>
                    </div>
                 </Reveal>
                 <Reveal delay={100}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[0.95] tracking-tighter mb-6">
                        Built for speed.<br/>
                        <span className="text-brand-red">Designed for scale.</span>
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
                    title="Engineering"
                    subtitle="Edge-Native Architecture"
                    description="Built on Next.js and React Server Components. We leverage Vercel's Edge Network to execute logic globally, ensuring sub-50ms TTFB and infinite scalability."
                    icon={<IconCpu size={20} />}
                    Visual={EngineeringVisual}
                    delay={300}
                />
                
                <FeatureCard 
                    title="Designing"
                    subtitle="Systematic UI Tokens"
                    description="We bridge the gap between Figma and React. Design tokens are typed strictly in TypeScript, ensuring your brand's visual language is immutable and consistent."
                    icon={<IconPalette size={20} />}
                    Visual={DesigningVisual}
                    delay={400}
                />

                <FeatureCard 
                    title="Delivery"
                    subtitle="CI/CD & Performance"
                    description="Every commit triggers a preview environment. We enforce 100/100 Lighthouse scores via automated E2E testing, guaranteeing zero regressions in production."
                    icon={<IconRocket size={20} />}
                    Visual={DeliveryVisual}
                    delay={500}
                />
            </div>
       </div>
    </section>
  );
};

export default Features;
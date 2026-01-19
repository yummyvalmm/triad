import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { heroImageLoaded } = useUIStore();
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Minimum time the preloader must stay visible (to ensure branding is seen)
    const timer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only exit when BOTH min time has passed AND assets are ready
    if (isMinTimePassed && heroImageLoaded) {
      setIsExiting(true);

      // Wait for exit slide animation to finish
      const timer = setTimeout(() => {
        onComplete();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isMinTimePassed, heroImageLoaded, onComplete]);

  return (
    <>
      {(motion.div as any)({
        initial: { y: 0 },
        animate: { y: isExiting ? '-100%' : 0 },
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        className: "fixed inset-0 z-[100] bg-[#FF2E00] flex items-center justify-center overflow-hidden",
        children: (
          <div className="relative flex flex-col items-center">
            {(motion.div as any)({
              initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
              animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
              transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              },
              className: "flex items-baseline will-change-[transform,opacity,filter]",
              children: (
                <h1 className="text-[15vw] md:text-[12vw] font-display font-bold leading-none select-none flex items-baseline tracking-tighter">
                  <span className="text-white mix-blend-screen">TRIAD</span>
                  <span className="text-brand-black">.</span>
                </h1>
              )
            })}

            {/* Subtle loading indicator */}
            {(motion.div as any)({
              className: "absolute -bottom-12 w-48 h-px bg-white/20 overflow-hidden",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              children: (
                <div className="w-full h-full relative">
                  {(motion.div as any)({
                    className: "h-full bg-white",
                    initial: { x: '-100%' },
                    animate: { x: heroImageLoaded ? '0%' : '-40%' },
                    transition: { duration: 0.8, ease: "circOut" }
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  );
};

export default Preloader;
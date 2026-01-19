import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the cursor using spring
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Magnetic Button Logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or parent is magnetic
      const magneticElement = target.closest('[data-magnetic]');

      if (magneticElement) {
        setIsHovering(true);

        // Optional: We can add logic here to "snap" the cursor to the center
        // or let the button move towards the cursor (Inverse Magnetism)
        // For now, we scale the cursor to indicate interaction.
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-brand-red pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.8 : (isHovering ? 2.5 : 1)
        }}
      />

      {/* Trailing Ring (Optional - keeping it minimal for "High End" feel) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 0 : 1), // Hide ring on hover to focus on the dot
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
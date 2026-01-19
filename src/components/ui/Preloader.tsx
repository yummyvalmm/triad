import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [animationStep, setAnimationStep] = useState(0); // 0: enter/hold, 1: exit

  useEffect(() => {
    // 1. Allow text animation to play (duration ~1.5s) + hold time
    const holdTimer = setTimeout(() => {
      setAnimationStep(1); // Trigger slide up
    }, 1700);

    // 2. Wait for slide up animation (0.8s) to finish before unmounting
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#FF2E00] flex items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${animationStep === 1 ? '-translate-y-full' : 'translate-y-0'
        }`}
    >
      <style>{`
        @keyframes zoom-condense {
          0% {
            letter-spacing: 1em;
            transform: scale(3);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            letter-spacing: -0.05em;
            transform: scale(1);
            opacity: 1;
            filter: blur(0px);
          }
        }
        .animate-triad {
          animation: zoom-condense 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0; /* start hidden */
        }
      `}</style>

      <h1 className="text-[15vw] md:text-[12vw] font-display font-bold leading-none animate-triad select-none flex items-baseline">
        <span className="text-white mix-blend-screen">TRIAD</span>
        <span className="text-brand-black">.</span>
      </h1>
    </div>
  );
};

export default Preloader;
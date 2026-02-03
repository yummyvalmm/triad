import React, { useEffect, useState } from 'react';
import { useUIStore } from '../../store/useUIStore';

const Hero: React.FC = () => {
  const { heroImageLoaded, setHeroImageLoaded, loading } = useUIStore();
  const [isRevealStarted, setIsRevealStarted] = useState(false);

  useEffect(() => {
    // Reveal content as soon as image is ready. 
    // This allows the Hero to be visible DURING the preloader's slide-up animation.
    if (heroImageLoaded) {
      const timer = setTimeout(() => {
        setIsRevealStarted(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [heroImageLoaded]);

  return (
    // Use 100dvh (dynamic viewport height) to account for mobile browser address bars
    <section className="relative w-full h-[100dvh] min-h-[600px] bg-brand-black text-white overflow-hidden">
      {/* Background Image with Overlay & Slow Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-black">
        <img
          src="/images/hero.webp"
          onLoad={() => setHeroImageLoaded(true)}
          alt="Abstract portrait with neon lighting representing digital design"
          width={2864}
          height={1600}
          className={`w-full h-full object-cover opacity-50 transition-all duration-[2000ms] ease-out will-change-transform ${isRevealStarted ? 'scale-100' : 'scale-110'}`}
          loading="eager"
          fetchPriority="high"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            objectFit: 'cover',
            objectPosition: 'center',
            transformStyle: 'preserve-3d',
            opacity: isRevealStarted ? 0.5 : 0 // Fade in image only when ready
          }}
        />
        {/* Adjusted overlay for the red aesthetic using mix-blend-overlay on the gradient instead of the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-brand-red/40 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between pt-24 pb-12 md:pt-32">

        {/* Top Meta Data - Slide Down Entrance */}
        <div className="flex justify-between items-start overflow-hidden">
          <div
            className={`text-sm font-mono tracking-widest text-brand-accent transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRevealStarted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            style={{ transitionDelay: '100ms' }}
          >
            EST. 2020
          </div>

          <div
            className={`hidden md:flex flex-col gap-2 text-right text-sm font-mono text-white transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRevealStarted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="backdrop-blur-md bg-black/30 rounded-lg px-4 py-3 border border-white/10">
              <span className="block">UX/UI Design</span>
              <span className="block">Development</span>
              <span className="block">Brand Guidelines</span>
              <span className="block">Ongoing Support</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {/* Main Title 'Digital' - Masked Reveal Up */}
          {/* Aggressively increased padding to ensure 'g' tail is not clipped */}
          <div className="overflow-hidden pt-[2vw] -mt-[2vw] pb-[12vw] -mb-[12vw]">
            <h1
              className={`text-[15vw] leading-[0.9] font-display font-bold tracking-tighter text-white mix-blend-difference transform transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isRevealStarted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              style={{ transitionDelay: '300ms', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              Digital
            </h1>
          </div>

          {/* Divider Line - Expand Width */}
          <div className="w-full relative mt-2 md:mt-4">
            <div
              className={`absolute top-0 left-0 h-px bg-white/20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isRevealStarted ? 'w-full' : 'w-0'}`}
              style={{ transitionDelay: '500ms' }}
            ></div>
          </div>

          <div className="flex flex-col md:flex-row items-end justify-between w-full pt-6 mt-2">
            {/* Sub Title 'Design Studio' - Masked Reveal Up */}
            <div className="overflow-hidden pb-[4vw] -mb-[4vw]">
              <span
                className={`block text-[8vw] md:text-[6vw] leading-none font-display font-bold tracking-tighter text-brand-accent transform transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isRevealStarted ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}`}
                style={{ transitionDelay: '600ms', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                Design Studio
              </span>
            </div>

            {/* Paragraph - Fade In & Slide Up */}
            <div className="overflow-hidden md:text-right mt-4 md:mt-0">
              <p
                className={`max-w-md text-gray-300 text-sm md:text-base pb-2 transform transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${isRevealStarted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: '800ms' }}
              >
                We create digital designs that help brands move faster and convert better. Your business needs more than just a website. It needs results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
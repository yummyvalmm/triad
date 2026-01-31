// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Reveal from '../ui/Reveal';
import { motion } from 'framer-motion';
import { services } from '../../data';
import { useIntersectionObserver } from '../../hooks';

const Services: React.FC = () => {
  // selectedImageId tracks which image to show on the left.
  const [selectedImageId, setSelectedImageId] = useState<string>(services[0].id);
  // hoveredServiceId tracks user interaction. 
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold: 0.2
  });

  useEffect(() => {
    if (!isVisible) {
      setSelectedImageId(services[0].id);
      setHoveredServiceId(null);
    }
  }, [isVisible]);

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative min-h-screen bg-brand-black text-white flex items-center scroll-mt-0 overflow-hidden py-24 md:py-32"
    >
      {/* IMAGE PRELOADER - HIDDEN but EAGER */}
      <div className="hidden" aria-hidden="true">
        {services.map((s) => (
          <img key={s.id} src={s.image} alt="" loading="eager" decoding="async" />
        ))}
      </div>

      <div
        className={`absolute top-12 md:top-24 right-0 w-full px-6 md:px-12 flex justify-end z-30 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
      >
        <div className="flex flex-col items-end gap-4 pointer-events-auto">
          <h2 id="services-heading" className="text-[10px] font-bold tracking-widest text-brand-red uppercase">
            Our Services
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-24 h-full items-center justify-center pt-12 md:pt-0">

        {/* Left: Image Preview - OPTIMIZED RATIO & RESPONSIVENESS */}
        {/* Adjusted width to 45% on desktop for better aspect ratio balance */}
        <div
          className={`hidden lg:block w-[45%] min-w-[320px] max-w-[600px] relative h-[60vh] min-h-[500px] rounded-lg overflow-hidden border border-white/10 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
          aria-hidden="true"
        >
          {services.map((service) => (
            <React.Fragment key={service.id}>
              <div className={`absolute inset-0 transition-opacity duration-500 ease-linear ${selectedImageId === service.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <img src={service.image} alt="" className="w-full h-full object-cover transform scale-105" />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              <div className={`absolute bottom-8 left-8 max-w-[80%] transition-all duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] ${selectedImageId === service.id ? 'opacity-100 translate-y-0 z-20' : 'opacity-0 translate-y-4 z-0'}`}>
                <span className="text-xl 2xl:text-2xl font-bold mb-2 block">{service.title}</span>
                <p className="text-sm 2xl:text-base text-gray-300">{service.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Right: List */}
        <div
          className="flex-1 flex flex-col justify-center w-full max-w-2xl"
          onMouseLeave={() => setHoveredServiceId(null)}
        >
          <ul className="flex flex-col">
            {services.map((service, index) => {
              const isHovered = hoveredServiceId === service.id;
              const isListActive = hoveredServiceId !== null;

              return (
                <li
                  key={service.id}
                  className="relative border-t border-white/20 cursor-pointer group"
                  onMouseEnter={() => {
                    setHoveredServiceId(service.id);
                    setSelectedImageId(service.id);
                  }}
                  role="listitem"
                >
                  <Reveal width="100%" delay={index * 150}>
                    <div className="min-h-[100px] md:h-[120px] 2xl:h-[150px] flex flex-col justify-center px-2 py-6 md:py-0 relative overflow-hidden">
                      {/* Hover Highlight (Desktop) */}
                      {/* @ts-ignore */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 hidden md:block"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scaleX: isHovered ? 1 : 0,
                          originX: 0
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />

                      <div className="relative z-10">
                        {/* @ts-ignore */}
                        <motion.div
                          className="flex items-center justify-between md:pr-6"
                          animate={{
                            x: isHovered ? 20 : 0,
                            opacity: isHovered ? 1 : (isListActive ? 0.3 : 1)
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="flex items-baseline justify-between overflow-hidden gap-6">
                            <span className={`text-base md:text-lg 2xl:text-xl font-mono transition-colors duration-300 ${isHovered ? 'text-brand-red' : 'text-gray-600'}`}>
                              ({service.number})
                            </span>
                            <h3 className={`text-2xl md:text-4xl 2xl:text-5xl font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
                              {service.title}
                            </h3>
                          </div>
                        </motion.div>

                        {/* Mobile Description (Visible on Mobile, Hidden on Desktop to prevent layout shift) */}
                        <div className="md:hidden mt-4 pl-10 block opacity-100">
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}

            <div
              className={`border-t border-white/20 transition-all duration-[1000ms] ease-out ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 origin-left'}`}
              aria-hidden="true"
            ></div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
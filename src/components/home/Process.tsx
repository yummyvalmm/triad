import React from 'react';
import { CornerDownRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { processSteps } from '../../data';

const Process: React.FC = () => {
  return (
    // Removed 'overflow-hidden' to ensure sticky positioning works correctly in Chrome/Safari
    <section aria-labelledby="process-heading" className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">

          {/* Left Column */}
          <header className="lg:w-[40%]">
            <div className="sticky top-32">
              <Reveal>
                <h2 id="process-heading" className="text-[12vw] lg:text-[7vw] leading-[1.1] font-bold tracking-tighter text-brand-black mb-12">
                  Our<br />process
                </h2>
              </Reveal>
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/30 via-transparent to-transparent hidden lg:block" />
              <Reveal delay={100}>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-16 max-w-md">
                  Our four-step process keeps you informed and involved at every stage, ensuring the final result meets your goals and resonates with your audience.
                </p>
              </Reveal>

              <Reveal delay={200} width="fit-content">
                <a href="#contact" data-magnetic className="inline-flex items-center gap-3 text-xl font-medium text-brand-black hover:text-brand-accent transition-colors group p-4 -ml-4 rounded-lg">
                  <CornerDownRight className="w-6 h-6 text-brand-accent mt-1 group-hover:translate-x-1 transition-transform" />
                  Schedule a consultation
                </a>
              </Reveal>
            </div>
          </header>

          {/* Right Column - Steps (Ordered List) */}
          <ol className="flex-1 flex flex-col">
            {processSteps.map((step, index) => (
              <Reveal key={index} delay={index * 100} width="100%">
                <li>
                  <article
                    className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-16 border-t border-gray-200 transition-colors hover:bg-gray-50/50 px-4 md:px-0 -mx-4 md:mx-0"
                  >
                    {/* Number */}
                    <div className="shrink-0 md:ml-4">
                      <span className="w-14 h-14 rounded-full border border-gray-100 bg-gray-50/50 flex items-center justify-center text-base font-bold text-gray-400 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-brand-accent/20">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 max-w-xl">
                      <h3 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Corner Accent (Top Right) */}
                    <div className="absolute top-8 right-4 md:right-0 w-3 h-3 border-t-2 border-r-2 border-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true" />
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>

        </div>
      </div>
    </section>
  );
};

export default Process;
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { stats } from '../../data';

// Helper Component for Counting Animation
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Parse numeric part and suffix
  const numericMatch = value.match(/[\d\.]+/);
  const number = numericMatch ? parseFloat(numericMatch[0]) : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = number;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = start + (end - start) * ease;

      // Formatting: keep decimals if original had them
      const isFloat = end % 1 !== 0;
      const formatted = isFloat ? current.toFixed(1) : Math.floor(current).toString();

      setDisplayValue(formatted);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end.toString()); // Ensure final value is exact
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, number]);

  // Reconstruct the full string with original non-numeric parts
  const originalSuffix = value.replace(/[\d\.]+/, '');

  return (
    <span ref={ref}>{displayValue}{originalSuffix}</span>
  );
};

const Stats: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="stats-heading"
      className="bg-white text-brand-black py-24 md:py-32 scroll-mt-28 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row gap-12 mb-20 items-start">
          {/* Icon - Scale & Fade */}
          <Reveal width="fit-content" delay={0}>
            <div
              className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0"
            >
              <TrendingUp className="text-brand-accent" size={24} aria-hidden="true" />
            </div>
          </Reveal>

          {/* Text - Slide Up */}
          <div className="max-w-2xl">
            <Reveal delay={100}>
              <h2
                id="stats-heading"
                className="text-3xl md:text-5xl font-bold leading-tight"
              >
                Our work speaks through numbers. Here's what we've achieved so far.
              </h2>
            </Reveal>
          </div>
        </header>

        {/* Semantic Definition List for Statistics */}
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 100} width="100%">
              <div
                data-magnetic
                className="flex flex-col gap-3 group cursor-pointer"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-5xl md:text-6xl font-bold text-brand-black group-hover:text-brand-accent transition-colors duration-300 tabular-nums tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </dd>
                <dd className="text-xl font-bold" aria-hidden="true">{stat.label}</dd>
                <dd className="text-gray-500 text-sm leading-relaxed">{stat.subtext}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stats;
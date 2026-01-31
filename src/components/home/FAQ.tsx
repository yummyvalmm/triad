import React, { useState } from 'react';
import Reveal from '../ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../../data';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

/**
 * FAQItem - Individual accordion item with expand/collapse animation
 */
const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className={`border-b border-gray-100 transition-colors duration-500 overflow-hidden ${isOpen ? 'bg-gray-50/50' : 'hover:bg-gray-50/30'
        }`}
    >
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group transition-all duration-300"
        data-magnetic
        aria-expanded={isOpen}
      >
        <span
          className={`text-xl md:text-2xl font-bold transition-all duration-500 tracking-tight ${isOpen ? 'text-brand-red' : 'text-brand-black group-hover:text-brand-red/80'
            }`}
        >
          {question}
        </span>
        <div
          className={`relative w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isOpen
            ? 'bg-brand-red border-brand-red text-white rotate-45'
            : 'bg-white border-gray-200 text-brand-black rotate-0 group-hover:border-brand-red group-hover:text-brand-red'
            }`}
        >
          <Plus size={20} className="transition-transform duration-500" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pb-8 pr-12">
              <p className="text-gray-500 text-lg leading-relaxed max-w-3xl font-light">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FAQ Section - Accordion-style frequently asked questions
 */
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-24 md:py-32 border-t border-gray-50 relative overflow-hidden"
    >
      {/* Background Texture */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <Reveal className="mb-4">
            <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs">
              Knowledge Base
            </span>
          </Reveal>
          <Reveal className="mb-16">
            <h2
              id="faq-heading"
              className="text-5xl md:text-7xl font-bold text-brand-black tracking-tighter leading-none"
            >
              Common <br />
              <span className="text-gray-300">Questions.</span>
            </h2>
          </Reveal>

          <div className="mt-12">
            {faqs.map((item, i) => (
              <Reveal key={i} delay={i * 100} width="100%">
                <FAQItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
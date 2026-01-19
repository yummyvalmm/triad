import React from 'react';
import Reveal from '../ui/Reveal';

const FAQ: React.FC = () => {
  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="container mx-auto px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl font-bold text-brand-black">FAQ</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "What is your typical process?", a: "We start with discovery, move to strategy, then design, development, and finally launch and support." },
                { q: "Do you offer ongoing support?", a: "Yes, we have dedicated support packages to ensure your digital product remains up to date." },
                { q: "How long does a project take?", a: "Typical website projects take 4-8 weeks depending on complexity." },
                { q: "Can you work with my existing brand?", a: "Absolutely. We can either refresh your current brand or work strictly within existing guidelines." }
              ].map((item, i) => (
                  <Reveal key={i} delay={i * 100} width="100%">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-bold text-lg mb-2 text-brand-black">{item.q}</h3>
                        <p className="text-gray-500">{item.a}</p>
                    </div>
                  </Reveal>
              ))}
          </div>
      </div>
    </section>
  );
};

export default FAQ;
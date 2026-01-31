// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks';
import { CONFIG, SECTIONS } from '../../constants';

const menuItems = [
  { label: 'About', href: `#${SECTIONS.ABOUT}` },
  { label: 'Services', href: `#${SECTIONS.SERVICES}` },
  { label: 'Projects', href: `#${SECTIONS.PROJECTS}` },
  { label: 'Pricing', href: `#${SECTIONS.PRICING}` },
  { label: 'Contact', href: `#${SECTIONS.CONTACT}` }
];

const Navbar: React.FC = () => {
  const { isScrolled } = useScrollPosition(CONFIG.NAVBAR_SCROLL_THRESHOLD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = menuItems.map(item => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(`#${id}`);
              }
            });
          },
          { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-luxury ${isScrolled
          ? 'bg-brand-black/85 backdrop-blur-xl backdrop-saturate-150 py-3 shadow-lg border-b border-white/10'
          : 'bg-transparent py-6 border-transparent'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            data-magnetic
            className="text-2xl font-display font-bold tracking-tighter text-white z-[60] relative group"
            onClick={() => {
              window.scrollTo(0, 0);
              setMobileMenuOpen(false);
            }}
            aria-label="Triad Home"
          >
            TRIAD<span className="text-brand-red transition-transform duration-300 group-hover:scale-200 inline-block origin-bottom">.</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-white/80" aria-label="Main Navigation">
            {menuItems.slice(0, 4).map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  data-magnetic
                  className={`transition-all duration-300 p-2 inline-block relative group ${isActive ? 'text-white' : 'hover:text-white'}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-2 h-px bg-brand-red transition-all duration-500 ease-luxury ${isActive ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'}`}
                  />
                </a>
              );
            })}

            <a
              href="#contact"
              data-magnetic
              className={`px-6 py-2 border rounded-full backdrop-blur-sm transition-all duration-500 ease-luxury hover:scale-105 active:scale-95 font-mono shadow-lg ${activeSection === '#contact'
                ? 'bg-white text-brand-black border-white'
                : 'bg-white/5 border-white/30 hover:bg-white hover:text-brand-black shadow-white/5'
                }`}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            data-magnetic
            className="md:hidden text-white z-[60] p-2 relative focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {/* We hide the header button when menu is open to defer to the internal close button */}
            <Menu size={24} aria-hidden="true" className={mobileMenuOpen ? "opacity-0" : "opacity-100 transition-opacity duration-300"} />
          </button>
        </div>
      </header>

      {/* High-End Mobile Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[55] bg-brand-black flex flex-col justify-center px-6 md:hidden"
            >
              {/* Close Button Top Right */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-6 p-2 text-white/50 hover:text-brand-red transition-colors z-[60]"
                aria-label="Close menu"
              >
                <X size={32} />
              </motion.button>

              {/* Background Decor - Stage Watermark */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center overflow-hidden">
                <span className="text-[40vh] font-bold text-white leading-none whitespace-nowrap transform -rotate-90 md:rotate-0">
                  MENU
                </span>
              </div>

              <nav className="flex flex-col gap-6 relative z-10 w-full max-w-sm mx-auto">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + (i * 0.1), ease: [0.76, 0, 0.24, 1] }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 pb-4"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-mono text-brand-red font-bold">0{i + 1}</span>
                      <span className="text-4xl font-bold text-white tracking-tighter group-hover:text-gray-300 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight className="text-brand-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={24} />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-10 left-6 right-6 flex flex-col items-center gap-4 text-xs text-gray-500 uppercase tracking-widest"
              >
                <div className="w-full h-px bg-white/10 mb-2"></div>
                <div className="flex justify-between w-full">
                  <span>© 2024 Triad Studio</span>
                  <span>Global Edge Network</span>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navbar;
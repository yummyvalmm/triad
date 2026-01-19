import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Instagram, Twitter, Linkedin, Dribbble, Loader2, Check, AlertCircle, Mail, Clock } from 'lucide-react';
import Reveal from '../ui/Reveal';

// --- CONFIGURATION ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAybjealpEpG-yiZdI4JtKFRg7LjhJyRzlya-Kv-YcCl8n9qoi_Le1GvDFrydlp04_/exec';

const Footer: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!footerRef.current) return;

            // If already visible, remove listener and return (Optimization)
            if (isVisible) {
                window.removeEventListener('scroll', handleScroll);
                return;
            }

            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;
            const footerHeight = footerRef.current.offsetHeight;

            // Calculate the maximum scrollable distance
            const maxScroll = docHeight - winHeight;

            // The footer starts being revealed when we are 'footerHeight' away from the bottom
            const revealStart = maxScroll - footerHeight;

            // Trigger animation when 20% of the footer is revealed to the user
            const triggerPoint = revealStart + (footerHeight * 0.2);

            // Only trigger if we have scrolled past this point
            if (scrollY > triggerPoint) {
                setIsVisible(true);
                // Cleanup immediately after triggering
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Check once on mount to handle cases where we land at the bottom
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
        if (status === 'success' || status === 'error') {
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        setStatus('submitting');

        try {
            if (!GOOGLE_SCRIPT_URL) {
                console.log('Simulating submission to: ', formData);
                await new Promise(resolve => setTimeout(resolve, 2000));
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                return;
            }

            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('message', formData.message);
            data.append('timestamp', new Date().toISOString());

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: data,
                mode: 'no-cors'
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
        }
    };

    return (
        <footer
            id="contact"
            ref={footerRef}
            // Changed to h-[100dvh] and flex-col to ensure it fits the viewport perfectly
            // Added overflow-y-auto to allow internal scrolling on very small landscape screens
            className="bg-brand-black text-white h-[100dvh] flex flex-col justify-between scroll-mt-0 overflow-y-auto hide-scrollbar"
        >
            {/* 
        MAIN CONTENT: Centered Vertically 
        flex-1 ensures it takes up all available space between top and bottom
        flex items-center centers it vertically
      */}
            <div className="flex-1 flex items-center w-full py-20 md:py-0">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                        {/* LEFT COLUMN: INTRO */}
                        <div className="flex flex-col justify-center">
                            <Reveal forceTrigger={isVisible} delay={0}>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-tight">
                                    Let's bring your<br />vision to life
                                </h2>
                            </Reveal>

                            {/* HIGH-END CONCIERGE CARD */}
                            <Reveal forceTrigger={isVisible} delay={200}>
                                <div className="relative group max-w-md">
                                    {/* Subtle Ambient Glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-purple-900/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                                    <div className="relative bg-[#0F0F0F] border border-white/10 p-6 rounded-2xl flex items-center gap-6 shadow-2xl overflow-hidden backdrop-blur-md">
                                        {/* Glass Shine Effect */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                        {/* Avatar with Status */}
                                        <div className="relative shrink-0">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/5 overflow-hidden">
                                                <img
                                                    src="/images/team/htet.webp"
                                                    alt="Director"
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                            {/* Status Dot */}
                                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-brand-black rounded-full flex items-center justify-center border border-white/10">
                                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-serif text-xl md:text-2xl text-white tracking-wide">Htet Aung Linn</h3>
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red mb-3">Lead Strategist</p>

                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-gray-400 font-mono">
                                                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                                                    <Mail size={12} />
                                                    <span>example@triad.com</span>
                                                </div>
                                                <div className="hidden sm:block w-px h-3 bg-gray-700"></div>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Clock size={12} />
                                                    <span>Reply &lt; 2h</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal forceTrigger={isVisible} delay={300}>
                                <p className="mt-8 text-gray-500 max-w-sm text-sm leading-relaxed hidden md:block">
                                    Direct access to leadership. No middlemen. We value clear communication as much as clean code.
                                </p>
                            </Reveal>
                        </div>

                        {/* RIGHT COLUMN: FORM */}
                        <div className="h-full w-full">
                            <Reveal forceTrigger={isVisible} delay={400} className="h-full w-full">
                                <div className="bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden h-full">
                                    {/* Form Background Accent */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] pointer-events-none"></div>

                                    <form className="flex flex-col gap-5 md:gap-6 relative z-10" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Name *</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    disabled={status === 'submitting'}
                                                    className="bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-brand-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-700 text-sm md:text-base"
                                                    placeholder="Your Name or Company"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">E-mail *</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled={status === 'submitting'}
                                                    className="bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-brand-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-700 text-sm md:text-base"
                                                    placeholder="triad@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                                            <textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                disabled={status === 'submitting'}
                                                className="bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-brand-red transition-colors h-20 md:h-24 resize-none disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-700 text-sm md:text-base"
                                                placeholder="Tell us what you want ! "
                                            ></textarea>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            <button
                                                type="submit"
                                                disabled={status === 'submitting' || status === 'success'}
                                                data-magnetic
                                                className={`
                                        flex items-center gap-2 font-bold p-4 -ml-4 rounded transition-all duration-300 group text-sm md:text-base
                                        ${status === 'success' ? 'text-white cursor-default' : 'text-brand-red hover:text-white cursor-pointer'}
                                        ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}
                                    `}
                                            >
                                                {status === 'submitting' && (
                                                    <>
                                                        <Loader2 className="animate-spin" size={18} />
                                                        <span>Sending...</span>
                                                    </>
                                                )}

                                                {status === 'success' && (
                                                    <>
                                                        <Check size={18} />
                                                        <span>Message Sent Successfully</span>
                                                    </>
                                                )}

                                                {status === 'error' && (
                                                    <>
                                                        <AlertCircle size={18} />
                                                        <span>Error. Try Again.</span>
                                                    </>
                                                )}

                                                {status === 'idle' && (
                                                    <>
                                                        Get in touch
                                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER BOTTOM: Pinned to bottom, auto height */}
            <div className="shrink-0 w-full pb-8 pt-4 border-t border-white/10 bg-brand-black z-10 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                        <div className="mb-8 md:mb-0">
                            <Reveal forceTrigger={isVisible} delay={500}>
                                <h3 className="text-[12vw] md:text-[8vw] leading-none font-bold tracking-tighter text-white">
                                    TRIAD<span className="text-brand-red transition-transform duration-300 group-hover:scale-150 inline-block origin-bottom">.</span>
                                </h3>
                            </Reveal>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full md:w-auto">
                            <div className="hidden md:block">
                                <Reveal forceTrigger={isVisible} delay={600}>
                                    <div>
                                        <h4 className="font-bold mb-4">Stay connected</h4>
                                        <div className="flex flex-col gap-2 text-gray-400 text-sm">
                                            <p>Join our newsletter for latest trends.</p>
                                            <form className="flex items-center gap-2 border-b border-gray-700 pb-1 mt-2">
                                                <label htmlFor="newsletter-email" className="sr-only">Newsletter Email</label>
                                                <input id="newsletter-email" type="email" placeholder="E-mail" className="bg-transparent focus:outline-none text-white w-full placeholder-gray-600" />
                                                <button type="submit" aria-label="Subscribe" className="hover:text-brand-red transition-colors text-white">
                                                    <ArrowRight size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                            <div className="flex gap-4">
                                {[Twitter, Instagram, Linkedin, Dribbble].map((Icon, i) => (
                                    <Reveal key={i} forceTrigger={isVisible} delay={700 + (i * 50)}>
                                        <a href="#" data-magnetic className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-colors text-white">
                                            <Icon size={18} />
                                        </a>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between text-xs text-gray-600">
                        <Reveal forceTrigger={isVisible} delay={900}>
                            <p>© 2024 Triad Digital Studio. All rights reserved.</p>
                        </Reveal>
                        <Reveal forceTrigger={isVisible} delay={950}>
                            <nav className="flex gap-6 mt-4 md:mt-0" aria-label="Legal">
                                <a href="#" className="hover:text-white">Privacy Policy</a>
                                <a href="#" className="hover:text-white">Terms of Service</a>
                            </nav>
                        </Reveal>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
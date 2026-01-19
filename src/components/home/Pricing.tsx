import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { Check, ArrowRight, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="bg-white py-24 md:py-32 scroll-mt-28 relative overflow-hidden border-t border-gray-100">
            <div className="container mx-auto px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT: The Base Price Card */}
                    <Reveal width="100%">
                        <div className="relative bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-2xl overflow-hidden group">
                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-brand-red"></div>

                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-brand-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        Base Foundation
                                    </span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Standard Package</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">
                                    The perfect starting point. Everything a professional business needs to launch a strong, credible digital presence.
                                </p>
                            </div>

                            <div className="mb-10 pb-10 border-b border-gray-200">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl md:text-7xl font-bold text-brand-black tracking-tighter">$799</span>
                                    <span className="text-gray-400 font-medium text-lg">/ one-time</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide font-bold">No monthly subscriptions</p>
                            </div>

                            <ul className="space-y-5 mb-10">
                                {[
                                    "Universal Device Compatibility (Mobile & Desktop)",
                                    "High-Performance Optimization (Speed Focused)",
                                    "SEO-Ready Site Architecture",
                                    "Secure Hosting & SSL Certificate Setup",
                                    "Integrated Visitor Analytics Dashboard",
                                    "Lead Generation & Contact Forms"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                                            <Check size={14} className="text-brand-red" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/checkout"
                                data-magnetic
                                className="block w-full py-5 bg-brand-black text-white text-center font-bold rounded-xl hover:bg-brand-red transition-all duration-300 uppercase tracking-widest text-sm shadow-lg group-hover:shadow-brand-red/20 cursor-pointer flex items-center justify-center gap-2"
                            >
                                Start Your Project
                            </Link>
                            <p className="text-center text-xs text-gray-400 mt-4">100% Satisfaction Guarantee</p>
                        </div>
                    </Reveal>

                    {/* RIGHT: The Custom Experience Text */}
                    <div className="lg:pl-6">
                        <Reveal delay={200}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 text-brand-red rounded-full mb-6 border border-brand-red/20">
                                <Sparkles size={14} />
                                <span className="text-xs font-bold uppercase tracking-widest">The Triad Experience</span>
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <h2 className="text-4xl md:text-6xl font-bold text-brand-black mb-8 leading-[1.1] tracking-tight">
                                Build your own <br />
                                <span className="text-brand-red">custom quote.</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={400}>
                            <p className="text-xl text-gray-500 mb-8 leading-relaxed font-light">
                                Rigid pricing tables are outdated. We believe you should only pay for the features you actually use.
                            </p>
                            <p className="text-gray-600 mb-12 leading-relaxed text-lg border-l-2 border-brand-black pl-6">
                                Start with our solid <strong>$799 foundation</strong>, then collaborate with us to add specific modules—like e-commerce, complex animations, or advanced branding—tailored exactly to your goals. You control the scope, ensuring you're never underpaid for feature creep.
                            </p>
                        </Reveal>

                        <Reveal delay={500}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="flex items-start gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-white transition-colors duration-300">
                                        <MessageSquare size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-black text-lg">Discovery Call</h4>
                                        <p className="text-sm text-gray-500 mt-1">We discuss your vision and define the exact scope together.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-white transition-colors duration-300">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-black text-lg">Transparent Quote</h4>
                                        <p className="text-sm text-gray-500 mt-1">Receive a detailed breakdown. Base price + your custom add-ons.</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={600}>
                            <div className="mt-12 pt-12 border-t border-gray-100 flex items-center gap-4 text-sm font-medium text-gray-400">
                                <span>Need something specific?</span>
                                <a href="#contact" className="text-brand-red flex items-center gap-1 hover:gap-2 transition-all">
                                    Ask for a custom feature <ArrowRight size={14} />
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
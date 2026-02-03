import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, CheckCircle2, ShieldCheck, User, Building2, Briefcase, DollarSign, MessageSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Consultation: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectType: 'E-commerce',
        budget: 'Under $3k',
        message: ''
    });

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep('success');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (step === 'success') {
        return (
            <div className="bg-brand-black min-h-screen flex items-center justify-center px-6 pt-32 pb-20 font-sans">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl text-center border border-gray-100">
                        <div className="w-20 h-20 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-red/20">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-brand-black mb-4">Inquiry Received</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Thank you, <span className="font-bold text-brand-black">{formData.name}</span>. Our team will review your project details and reach out within 24 hours to schedule your consultation.
                        </p>
                        <Link
                            to="/"
                            className="block w-full py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-red transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-brand-red/20"
                        >
                            Return to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 font-sans">
            <div className="container mx-auto px-6 max-w-6xl">

                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-black transition-colors mb-8 font-medium group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Studio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* LEFT: Consultation Context */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 text-brand-red rounded-full mb-6 border border-brand-red/20">
                                <Sparkles size={14} />
                                <span className="text-xs font-bold uppercase tracking-widest">Consultation Request</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-brand-black mb-8 leading-[1.1] tracking-tight">
                                Let's build your <br />
                                <span className="text-brand-red underline decoration-brand-red/20 underline-offset-8">digital legacy.</span>
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-light">
                                We specialize in high-impact digital experiences for brands that demand excellence. Share your vision, and we'll handle the rest.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-brand-red shadow-sm">
                                        <MessageSquare size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-black text-lg">Discovery Phase</h4>
                                        <p className="text-sm text-gray-500 mt-1">A 30-minute deep dive into your goals, audience, and vision.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-brand-red shadow-sm">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-black text-lg">Strategic Roadmap</h4>
                                        <p className="text-sm text-gray-500 mt-1">We'll present a tailored execution plan and transparent quote.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Consultation Form */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div
                                data-magnetic
                                className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 relative overflow-hidden transition-all duration-500 hover:border-brand-red/20 group/card"
                            >
                                {step === 'processing' && (
                                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <p className="font-bold text-brand-black animate-pulse uppercase tracking-widest text-xs">Sending Request...</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                                <User size={12} /> Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="Your full name"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-red text-brand-black transition-all font-medium placeholder:text-gray-300"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                                <Send size={12} /> Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="Your email address"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-red text-brand-black transition-all font-medium placeholder:text-gray-300"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                            <Building2 size={12} /> Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Your business or company"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-red text-brand-black transition-all font-medium placeholder:text-gray-300"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                                <Briefcase size={12} /> Project Type
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    name="projectType"
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-red text-brand-black transition-all font-medium appearance-none relative z-10"
                                                    onChange={handleChange}
                                                >
                                                    <option className="text-brand-black">E-commerce</option>
                                                    <option className="text-brand-black">Corporate Website</option>
                                                    <option className="text-brand-black">Brand Identity</option>
                                                    <option className="text-brand-black">Custom Web App</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 z-20 pointer-events-none group-focus-within:text-brand-red transition-colors" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                                <DollarSign size={12} /> Budget Range
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    name="budget"
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-red text-brand-black transition-all font-medium appearance-none relative z-10"
                                                    onChange={handleChange}
                                                >
                                                    <option className="text-brand-black">Under $3k</option>
                                                    <option className="text-brand-black">$3k to $10k</option>
                                                    <option className="text-brand-black">$10k+</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 z-20 pointer-events-none group-focus-within:text-brand-red transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                            <MessageSquare size={12} /> How can we help?
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            placeholder="Tell us about your project goals..."
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:border-brand-red text-brand-black transition-all font-medium resize-none placeholder:text-gray-300"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        data-magnetic
                                        className="w-full py-5 bg-brand-black text-white font-bold rounded-2xl hover:bg-brand-red transition-all duration-300 flex items-center justify-center gap-2 mt-8 shadow-xl shadow-black/10 hover:shadow-brand-red/20 uppercase tracking-widest text-sm"
                                    >
                                        Book Your Consultation
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-400 text-xs font-medium">
                    <p>Private & Confidential. We never share your data.</p>
                </div>
            </div>
        </div>
    );
};

export default Consultation;

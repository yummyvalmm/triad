import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
    const [formData, setFormData] = useState({
        email: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (step === 'success') {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center px-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white max-w-md w-full rounded-2xl p-8 shadow-xl text-center border border-gray-100"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-black mb-4">Payment Successful</h2>
                    <p className="text-gray-500 mb-8">
                        Thank you for your order. We've sent a confirmation email to <span className="font-bold text-brand-black">{formData.email}</span> with your project onboarding details.
                    </p>
                    <Link
                        to="/"
                        className="block w-full py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Return to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-6xl">

                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-black transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} /> Back to Pricing
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* LEFT: Order Summary */}
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-brand-black mb-8 tracking-tight">Checkout</h1>

                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Order Summary</h3>

                            <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <h4 className="text-xl font-bold text-brand-black">Standard Package</h4>
                                    <p className="text-sm text-gray-500 mt-1">Single-page application with premium animations</p>
                                </div>
                                <span className="font-mono text-lg font-bold">$799.00</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>$799.00</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Taxes (Estimated)</span>
                                    <span>$0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                <span className="font-bold text-brand-black">Total Due</span>
                                <span className="text-3xl font-bold text-brand-black tracking-tighter">$799.00</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-blue-50 text-blue-700 rounded-xl text-sm border border-blue-100">
                            <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                            <p>
                                <strong>Secure 256-bit Encryption.</strong> All payments are processed securely by Stripe. We do not store your card details.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Payment Form */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 relative overflow-hidden">
                            {step === 'processing' && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="font-bold text-brand-black animate-pulse">Processing Payment...</p>
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-brand-black mb-6 flex items-center gap-2">
                                <CreditCard size={20} /> Payment Details
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="you@company.com"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Name on Card</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            required
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={19}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all font-mono"
                                            onChange={handleChange}
                                        />
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Expiration</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            required
                                            placeholder="MM / YY"
                                            maxLength={5}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all font-mono"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wide text-gray-500 flex items-center justify-between">
                                            CVC <HelpCircle size={12} className="text-gray-400" />
                                        </label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            required
                                            placeholder="123"
                                            maxLength={4}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all font-mono"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-red transition-colors flex items-center justify-center gap-2 mt-8 shadow-lg text-lg"
                                >
                                    <Lock size={18} /> Pay $799.00
                                </button>
                            </form>
                        </div>

                        <div className="mt-8 text-center">
                            <img src="https://cdn.brandfetch.io/id65s_9l32/theme/dark/logo.svg?c=1dxbfHSJF0680" alt="Powered by Stripe" className="h-6 opacity-30 mx-auto grayscale" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;

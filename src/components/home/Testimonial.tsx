import React from 'react';
import Reveal from '../ui/Reveal';

const Testimonial: React.FC = () => {
    return (
        <section aria-label="Client Testimonials" className="bg-white py-24 border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <Reveal delay={200}>
                            <figure>
                                <svg className="w-12 h-12 text-brand-red mb-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.017 21L14.017 18C14.017 16.896 14.353 15.975 15.025 15.237C15.697 14.499 16.636 13.918 17.842 13.494V10.456C16.805 10.984 15.894 11.838 15.109 13.018C14.324 14.198 13.932 15.626 13.932 17.302L13.932 21H14.017ZM8.003 21L8.003 18C8.003 16.896 8.339 15.975 9.011 15.237C9.683 14.499 10.622 13.918 11.828 13.494V10.456C10.791 10.984 9.88 11.838 9.095 13.018C8.31 14.198 7.918 15.626 7.918 17.302L7.918 21H8.003Z"></path></svg>
                                <blockquote className="text-2xl md:text-4xl font-medium leading-tight text-brand-black mb-8">
                                    "Think of us as your creative partners. We help you build things people actually want to use, and we stay right by your side to make sure it all turns out exactly how you pictured it.""
                                </blockquote>
                                <figcaption className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img src="/images/team/htet.webp" alt="Htet Aung Linn" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Htet Aung Linn</p>
                                        <p className="text-gray-500 text-sm">Project Manager and Founder</p>
                                    </div>
                                </figcaption>
                            </figure>
                        </Reveal>
                    </div>

                    <div className="flex-1 w-full relative">
                        <Reveal delay={400} width="100%">
                            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden" role="img" aria-label="Our diverse team of creators">
                                <img src="/images/testimonials/bg.webp" alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Meet our team</h3>
                                    <p className="text-sm opacity-80 max-w-xs">A diverse group of creators, strategists, and developers driven by passion.</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Semantic Data Grid */}
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-100">
                    {[
                        { val: '3', label: 'Creative Thinkers' },
                        { val: '7', label: 'Skilled Developers' },
                        { val: '9', label: 'Experienced Designers' },
                        { val: '20+', label: 'Awards Won' }
                    ].map((item, index) => (
                        <Reveal key={index} delay={600 + (index * 100)} width="100%">
                            <div>
                                <dt className="sr-only">{item.label}</dt>
                                <dd className="block text-4xl font-bold mb-1">{item.val}</dd>
                                <dd className="text-sm text-gray-500 uppercase tracking-wide">{item.label}</dd>
                            </div>
                        </Reveal>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default Testimonial;
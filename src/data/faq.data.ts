/**
 * FAQ section data
 * Questions and answers for the FAQ accordion
 */
export interface FAQItem {
    q: string;
    a: string;
}

export const faqs: FAQItem[] = [
    {
        q: 'What is your typical process?',
        a: 'We start with discovery, move to strategy, then design, development, and finally launch and support. Each phase is collaborative and transparent.',
    },
    {
        q: 'Do you offer ongoing support?',
        a: 'Yes, we provide premium support packages tailored to your needs, ensuring your digital products remain secure, updated, and optimized for performance.',
    },
    {
        q: 'How long does a project take?',
        a: 'Typical website projects take 4-8 weeks, while complex web applications can take 12+ weeks. We prioritize quality and strategic alignment at every step.',
    },
    {
        q: 'Can you work with my existing brand?',
        a: 'Absolutely. We excel at translating existing brand guidelines into high-end digital experiences, or we can help evolve your brand for the modern web.',
    },
];

/**
 * Process section data
 * Steps in the agency's workflow process
 */
export interface ProcessStep {
    number: string;
    title: string;
    description: string;
}

export const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Discovery & Strategy',
        description: 'Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution.'
    },
    {
        number: '02',
        title: 'Design & Prototyping',
        description: 'Our designers bring your vision to life with wireframes and prototypes, focusing on an engaging user experience.'
    },
    {
        number: '03',
        title: 'Development & Integration',
        description: 'We transform approved designs into high-quality, responsive code using modern frameworks and best practices.'
    },
    {
        number: '04',
        title: 'Launch & Support',
        description: 'After testing and final approvals, we launch the site and provide ongoing support to ensure your digital presence remains flawless.'
    }
];

/**
 * Services section data
 * List of services offered by the agency
 */
import { ServiceItem } from '../types';

export const services: ServiceItem[] = [
    {
        id: 's1',
        number: '01',
        title: 'Branding',
        description: 'We create impactful brand identities that differentiate your business.',
        image: '/images/services/ui.jpg'
    },
    {
        id: 's2',
        number: '02',
        title: 'Development',
        description: 'Robust and scalable frontend and backend solutions.',
        image: '/images/services/dev.jpg'
    },
    {
        id: 's3',
        number: '03',
        title: 'Websites',
        description: 'Custom websites that go beyond aesthetics to drive conversion.',
        image: '/images/services/brand.jpg'
    },
    {
        id: 's4',
        number: '04',
        title: 'Design Support',
        description: 'Ongoing design assistance to keep your brand fresh.',
        image: '/images/services/support.jpg'
    },
];

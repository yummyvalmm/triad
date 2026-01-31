import { IconBolt, IconPalette, IconShieldCheck } from '@tabler/icons-react';

export interface FeatureData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string; // Icon name for dynamic import
    visualType: 'speed' | 'branding' | 'quality';
    delay: number;
}

export const features: FeatureData[] = [
    {
        id: 'speed',
        title: 'Fast & Reliable',
        subtitle: 'Lightning Performance',
        description: 'Your website loads instantly, anywhere in the world. We build with cutting-edge technology that keeps your visitors engaged and your business running 24/7.',
        icon: 'IconBolt',
        visualType: 'speed',
        delay: 300
    },
    {
        id: 'branding',
        title: 'Consistent Branding',
        subtitle: 'Pixel-Perfect Design',
        description: 'Your brand looks perfect across every page and device. We create cohesive visual systems that make your business look professional and memorable.',
        icon: 'IconPalette',
        visualType: 'branding',
        delay: 400
    },
    {
        id: 'quality',
        title: 'Quality Assured',
        subtitle: 'Thoroughly Tested',
        description: 'Every update is automatically tested before going live. We ensure your website works flawlessly on all browsers and devices, giving you peace of mind.',
        icon: 'IconShieldCheck',
        visualType: 'quality',
        delay: 500
    }
];

// Icon mapping for dynamic rendering
export const iconMap = {
    IconBolt,
    IconPalette,
    IconShieldCheck
};

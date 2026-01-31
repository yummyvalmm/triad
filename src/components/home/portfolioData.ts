import { ProjectItem } from '../../types';

/**
 * Portfolio project data
 * Centralized data store for all portfolio projects displayed in the carousel
 */
export const projects: ProjectItem[] = [
    {
        id: 't1',
        title: 'Velocity Esports',
        category: 'Gaming Organization',
        image: '/images/portfolio/p1.webp',
        tags: ['Esports', 'Next.js', 'Dark UI'],
        description: "A high-octane interface designed to capture the aggressive energy of competitive gaming. We structured the layout to prioritize fan engagement through real-time stats and match feeds, turning casual viewers into loyal community members.",
        highlights: [
            "Dynamic Match Schedule & Results",
            "Player Roster with K/D Stats",
            "Merch Store Front via Shopify",
            "Twitch Stream Embedding"
        ],
        gallery: [
            "/images/portfolio/p1-1.webp",
            "/images/portfolio/p1-2.webp"
        ]
    },
    {
        id: 't2',
        title: 'Lumina Dental',
        category: 'Medical Practice',
        image: '/images/portfolio/p2.webp',
        tags: ['Healthcare', 'Booking', 'Clean'],
        description: "Trust is the currency of healthcare. For Lumina, we utilized a calming color psychology and whitespace-heavy layout to reduce patient anxiety. The user flow is engineered to guide visitors seamlessly from 'learning' to 'booking' in under 3 clicks.",
        highlights: [
            "HIPAA-Compliant Appointment Forms",
            "Before & After Case Study Sliders",
            "Insurance & Payment Info Sections",
            "Staff Profile Management CMS"
        ],
        gallery: [
            "/images/portfolio/p2-1.webp",
            "/images/portfolio/p2-2.webp"
        ]
    },
    {
        id: 't3',
        title: 'Vogue Threads',
        category: 'Fashion E-commerce',
        image: '/images/portfolio/p3.webp',
        tags: ['Retail', 'Shopify', 'Minimal'],
        description: "In fashion, the product is the hero. We stripped away all non-essential UI elements to create a gallery-like shopping experience. The typographic hierarchy is designed to feel editorial, elevating the perceived value of every item.",
        highlights: [
            "Lookbook & Editorial Layouts",
            "Advanced Product Filtering",
            "Size Guide Modal & Quick View",
            "Instagram Shoppable Feed"
        ],
        gallery: [
            "/images/portfolio/p3-1.webp",
            "/images/portfolio/p3-2.webp"
        ]
    },
    {
        id: 't4',
        title: 'Savor Bistro',
        category: 'Restaurant & Bar',
        image: '/images/portfolio/p4.webp',
        tags: ['Hospitality', 'Menu', 'Events'],
        description: "We translated the sensory experience of fine dining into a digital format. High-contrast imagery paired with elegant serif typography creates an appetite before the guest even arrives. The mobile experience prioritizes immediate needs: menu, location, and reservations.",
        highlights: [
            "CMS-Managed Digital Menu",
            "Private Dining Inquiry Forms",
            "Reservation Platform Integration",
            "Immersive Video Backgrounds"
        ],
        gallery: [
            "/images/portfolio/p4-1.webp",
            "/images/portfolio/p4-2.webp"
        ]
    },
    {
        id: 't5',
        title: 'Maison N°3',
        category: 'High Jewelry',
        image: '/images/portfolio/p5.webp',
        tags: ['Jewelry', 'Luxury', 'Ecommerce'],
        description: "A seasonal edit shaped by fluid lines, warm palettes, and understated luxury. This template features a refined earthy color system, bringing focus to the intimate details of fine jewelry and the stories behind them.",
        highlights: [
            "Seasonal Collection Drops",
            "Interactive Jewelry Try-On",
            "Heritage & Sourcing Stories",
            "Sophisticated Editorial Layouts"
        ],
        gallery: [
            "/images/portfolio/p5-1.webp",
            "/images/portfolio/p5-2.webp"
        ]
    },
    {
        id: 't6',
        title: 'AeroTravel',
        category: 'Travel Agency',
        image: '/images/portfolio/p6.webp',
        tags: ['Travel', 'Booking', 'Agency'],
        description: "Travel planning can be chaotic. AeroTravel solves this with a clean, modular card-based design that organizes complex itineraries into digestible visuals. The focus is on 'dreaming' first, then 'booking', using aspirational imagery to drive decision-making.",
        highlights: [
            "Destination Search Filtering",
            "Trip Itinerary Builder UI",
            "Customer Reviews Widget",
            "Multi-currency Support"
        ],
        gallery: [
            "/images/portfolio/p6-1.webp",
            "/images/portfolio/p6-2.webp"
        ]
    },
    {
        id: 't7',
        title: 'Azure Resort',
        category: 'Hotel & Resort',
        image: '/images/portfolio/p7.webp',
        tags: ['Hotel', 'Resort', 'Vacation'],
        description: "For Azure, the website serves as the first day of the vacation. We implemented full-screen immersive video headers and a seamless, floating booking engine that follows the user without being obtrusive. Every interaction reinforces relaxation.",
        highlights: [
            "Room Availability Checker",
            "Resort Amenities Icon Grid",
            "Local Area & Activities Guide",
            "Virtual Tour Support"
        ],
        gallery: [
            "/images/portfolio/p7-1.webp",
            "/images/portfolio/p7-2.webp"
        ]
    }
];

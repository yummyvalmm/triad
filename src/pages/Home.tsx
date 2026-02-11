import React from 'react';
import {
    Hero,
    Stats,
    Features,
    Process,
    Clients,
    Services,
    Testimonial,
    Pricing,
    FAQ,
} from '../components/home';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Features />
            <Process />
            <Clients />
            <Services />
            <Testimonial />
            <Pricing />
            <FAQ />
        </>
    );
};

export default Home;

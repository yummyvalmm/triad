import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import BlueprintSection from '../components/home/BlueprintSection';
import Features from '../components/home/Features';
import Process from '../components/home/Process';
import Portfolio from '../components/home/Portfolio';
import Services from '../components/home/Services';
import Testimonial from '../components/home/Testimonial';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Stats />
            <BlueprintSection />
            <Features />
            <Process />
            <Portfolio />
            <Services />
            <Testimonial />
            <Pricing />
            <FAQ />
        </>
    );
};

export default Home;

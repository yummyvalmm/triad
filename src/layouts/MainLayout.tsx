import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CustomCursor from '../components/ui/CustomCursor';
import SmoothScroll from '../components/ui/SmoothScroll';
import Preloader from '../components/ui/Preloader';
import { useUIStore } from '../store/useUIStore';

const MainLayout: React.FC = () => {
    const { loading, setLoading, footerHeight, setFooterHeight } = useUIStore();
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.borderBoxSize && entry.borderBoxSize[0]) {
                    setFooterHeight(entry.borderBoxSize[0].blockSize);
                }
            }
        });

        if (footerRef.current) {
            resizeObserver.observe(footerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [setFooterHeight]);

    return (
        <div className="min-h-screen bg-brand-black text-brand-black selection:bg-brand-red selection:text-white">
            <CustomCursor />
            <SmoothScroll />

            {/* Visual Texture Overlay for Premium Feel */}
            <div className="noise-overlay" aria-hidden="true"></div>

            {loading && <Preloader onComplete={() => setLoading(false)} />}

            <Navbar />

            {/* 
        MAIN CONTENT WRAPPER 
        - z-10: Ensures this sits physically ON TOP of the fixed footer.
        - bg-white: Opaque background to hide the footer until the scroll ends.
        - margin-bottom: Pushes the document end down so the footer can be fully revealed.
        - rounded-b-3xl: Adds a stylish curve to the bottom of the content 'sheet'.
        - transform: translateZ(0): Force hardware acceleration to fix Safari border-radius clipping bug.
      */}
            <main
                className="relative z-10 bg-white shadow-2xl rounded-b-[50px] overflow-hidden"
                style={{
                    marginBottom: footerHeight,
                    transform: 'translateZ(0)'
                }}
            >
                <Outlet />
            </main>

            {/* 
        FIXED FOOTER
        - z-0: Sits BEHIND the main content.
        - fixed bottom-0: Stays stationary at the bottom of the viewport.
      */}
            <div
                ref={footerRef}
                className="fixed bottom-0 left-0 w-full z-0"
            >
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
